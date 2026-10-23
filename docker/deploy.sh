
#!/usr/bin/env bash
set -Eeuo pipefail

COMPOSE_FILE="docker-compose.yml"
CONTAINER_NAME="golden-palmera-global"
ROLLBACK_FILE=".previous_image"
DEPLOY_SUCCEEDED=false
START_TIME=$(date +%s)

log() {
    local level="$1"
    shift
    printf '[%s] [%s] [deploy] %s\n' \
        "$(date -u '+%Y-%m-%dT%H:%M:%SZ')" "$level" "$*"
}

if [[ $# -ne 4 ]]; then
    echo "Usage: ./deploy.sh <image_name> <image_tag> <health_url> <base_url>" >&2
    exit 2
fi

IMAGE_NAME="$1"
IMAGE_TAG="$2"
HEALTH_URL="$3"
BASE_URL="$4"

export IMAGE_NAME IMAGE_TAG

# Capture the previous release before changing anything.
log INFO "Starting deployment; image=${IMAGE_NAME}:${IMAGE_TAG}"

CURRENT_IMAGE=$(
    docker inspect "$CONTAINER_NAME" \
        --format='{{.Config.Image}}' 2>/dev/null || true
)

if [[ -n "$CURRENT_IMAGE" ]]; then
    printf '%s\n' "$CURRENT_IMAGE" > "$ROLLBACK_FILE"
    log INFO "Previous image recorded."
else
    log WARN "No previous container detected; automatic rollback may be unavailable."
fi

on_exit() {
    local status=$?
    trap - EXIT
    set +e

    if [[ "$status" -ne 0 && "$DEPLOY_SUCCEEDED" != true ]]; then
        log ERROR "Deployment failed (exit=${status}, line=${BASH_LINENO[0]:-unknown})."

        docker compose -f "$COMPOSE_FILE" ps >&2
        log ERROR "Recent application container logs follow:"
        docker compose -f "$COMPOSE_FILE" logs --tail=80 app >&2

        if [[ -s "$ROLLBACK_FILE" ]]; then
            log WARN "Attempting rollback to the previous release."
            if ./rollback.sh "$HEALTH_URL"; then
                log INFO "Rollback script completed; inspect its health verification."
            else
                log ERROR "Rollback failed. Manual recovery is required."
            fi
        else
            log ERROR "No saved previous image; automatic rollback is unavailable."
        fi
    fi

    local duration=$(( $(date +%s) - START_TIME ))
    log INFO "Deployment process ended; exit=${status}; duration_seconds=${duration}"
    exit "$status"
}
trap on_exit EXIT

log INFO "Pulling target image."
docker compose -f "$COMPOSE_FILE" pull app

log INFO "Starting target application."
docker compose -f "$COMPOSE_FILE" up -d --remove-orphans

log INFO "Checking health endpoint (deadline: 150 seconds)."
HEALTHY=false

for i in {1..30}; do
    if RESPONSE=$(curl --connect-timeout 3 --max-time 8 \
        --silent --show-error --fail "$HEALTH_URL" 2>/dev/null); then
        if printf '%s' "$RESPONSE" | \
            node -e '
              let s = "";
              process.stdin.setEncoding("utf8");
              process.stdin.on("data", d => s += d);
              process.stdin.on("end", () => {
                try {
                  const v = JSON.parse(s);
                  process.exit(v.status === "ok" ? 0 : 1);
                } catch { process.exit(1); }
              });
            '; then
            HEALTHY=true
            break
        fi
    fi

    log WARN "Health check not ready (${i}/30)."
    sleep 5
done

if [[ "$HEALTHY" != true ]]; then
    log ERROR "Health verification failed."
    exit 1
fi

log INFO "Health endpoint verified."

if [[ -x "./health-check.sh" ]]; then
    log INFO "Running additional health checks."
    ./health-check.sh "$HEALTH_URL"
fi

if [[ -x "./smoke-test.sh" ]]; then
    log INFO "Running smoke tests."
    ./smoke-test.sh "$BASE_URL"
fi

docker compose -f "$COMPOSE_FILE" ps
docker image prune -f >/dev/null || \
    log WARN "Unused image cleanup failed; deployment remains healthy."

DEPLOY_SUCCEEDED=true
rm -f "$ROLLBACK_FILE"
log INFO "Deployment completed successfully."
