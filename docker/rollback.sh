#!/usr/bin/env bash
set -Eeuo pipefail

ROLLBACK_FILE=".previous_image"
COMPOSE_FILE="docker-compose.yml"
CONTAINER_NAME="golden-palmera-global"

log() {
    local level="$1"
    shift
    printf '[%s] [%s] [rollback] %s\n' \
        "$(date -u '+%Y-%m-%dT%H:%M:%SZ')" "$level" "$*"
}

if [[ ! -s "$ROLLBACK_FILE" ]]; then
    log ERROR "No previous image is available."
    exit 1
fi

if [[ $# -ne 1 ]]; then
    log ERROR "Usage: ./rollback.sh <health_url>"
    exit 2
fi

HEALTH_URL="$1"
PREVIOUS_IMAGE=$(<"$ROLLBACK_FILE")

# Expect a tagged image reference, such as ghcr.io/org/app:tag.
if [[ "$PREVIOUS_IMAGE" != *:* ]]; then
    log ERROR "Previous image does not contain a tag."
    exit 1
fi

IMAGE_TAG="${PREVIOUS_IMAGE##*:}"
IMAGE_NAME="${PREVIOUS_IMAGE%:*}"

if [[ -z "$IMAGE_NAME" || -z "$IMAGE_TAG" ]]; then
    log ERROR "Previous image reference is invalid."
    exit 1
fi

export IMAGE_NAME IMAGE_TAG

log INFO "Restoring previous image."
docker compose -f "$COMPOSE_FILE" pull app
docker compose -f "$COMPOSE_FILE" up -d --remove-orphans

log INFO "Waiting for restored application health."
for i in {1..30}; do
    if RESPONSE=$(curl --connect-timeout 3 --max-time 8 \
        --silent --fail "$HEALTH_URL" 2>/dev/null); then
        if printf '%s' "$RESPONSE" | node -e '
          let s = "";
          process.stdin.setEncoding("utf8");
          process.stdin.on("data", d => s += d);
          process.stdin.on("end", () => {
            try {
              process.exit(JSON.parse(s).status === "ok" ? 0 : 1);
            } catch { process.exit(1); }
          });
        '; then
            docker compose -f "$COMPOSE_FILE" ps
            log INFO "Rollback verified: previous application is healthy."
            exit 0
        fi
    fi

    log WARN "Restored release not ready (${i}/30)."
    sleep 5
done

log ERROR "Rollback health verification failed."
docker compose -f "$COMPOSE_FILE" ps >&2
docker compose -f "$COMPOSE_FILE" logs --tail=80 app >&2
exit 1
