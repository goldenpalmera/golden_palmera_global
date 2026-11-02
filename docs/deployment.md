# Deployment Guide

**Application:** Golden Palmera Global  
**Current production host:** Hostinger  
**Future container target:** VPS / OCI  
**Container registry:** `ghcr.io/goldenpalmera/golden_palmera_global`

## 1. Deployment model

The website is currently deployed on Hostinger. Hostinger also manages the company's domain and business email services.

A separate Docker/GHCR/VPS pipeline remains in the repository for a future migration to a VPS/OCI environment. It must be treated as a future deployment path until the target compute, DNS, TLS, secrets, monitoring, backup and rollback arrangements are provisioned and tested.

Do not describe the VPS pipeline as the current production deployment.

## 2. Branch and release flow

The intended promotion path is:

```text
feature branch
   │ push → CI
   ▼
pull request → CI + review
   ▼
develop
   │
   ▼
staging
   │
   ▼
main / production release
```

GitHub Actions run on every push to feature branches and on pull requests before merge. The `main` branch is protected: direct pushes are prohibited and administrator approval is required.

## 3. Workflows

The team refers to the deployment workflows as:

- `deploy_development`
- `deploy_staging`
- `deploy_production`

In the inspected repository branch, workflow files use hyphenated filenames:

- `.github/workflows/deploy-development.yml`
- `.github/workflows/deploy-staging.yml`
- `.github/workflows/deploy-production.yml`

The reusable deployment implementation is in `.github/workflows/deploy.yml`. CI, Docker image and notification workflows are separate.

### Development

The checked-in development workflow listens for a completed Docker workflow on `develop` and also declares manual dispatch. Its job is gated by `ENABLE_VPS_DEPLOYMENT == 'true'` and checks workflow-run event fields. Because manual dispatch does not provide the same `workflow_run` payload, validate/fix that condition before relying on manual dispatch.

### Staging

The checked-in staging workflow is triggered by pushes to `staging`. It calls the reusable deployment workflow, then performs a health check and smoke test against the staging URL.

### Production

The checked-in production workflow is manually dispatched with a full SHA image tag. It validates the tag format, deploys the selected image, and defines a rollback job for deployment failure. Apply the repository's protected environment approval rules before enabling a production deployment.

Workflow names, paths, triggers and secrets can change. The current checked-in YAML and GitHub Environment settings are authoritative.

## 4. CI and image pipeline

The CI workflow performs dependency installation, Prisma client generation, linting, type-checking and build. It declares push triggers for feature branches, `develop`, `staging` and `main`, and pull-request triggers for the integration/release branches.

The Docker workflow builds and publishes images to GHCR on push events, scans the image and repository configuration with Trivy, checks for non-root execution, and signs the image with Cosign. BuildKit provenance and SBOM output are enabled in the workflow.

Important CI verification item: the unit-test step currently uses a Jest-configuration file check even though the package test script is `vitest run`. Verify that Vitest actually runs in CI and correct the condition if necessary.

The reusable deployment workflow verifies the SHA-tagged image, signature and SLSA provenance before transferring the Docker deployment assets to the VPS and running the deploy script.

## 5. Current Hostinger deployment

Hostinger is the live hosting provider. The domain registration, Business Web Hosting and Starter Business Email are managed there.

For a Hostinger production release:

1. Confirm the approved source commit and build result.
2. Follow the actual deployment mechanism configured for the purchased Hostinger hosting plan.
3. Verify environment variables and production secrets through the provider's supported configuration interface.
4. Confirm the live domain, TLS certificate, key pages and enquiry journey.
5. Review application/provider logs and retain the release record.

Do not assume that shared Business Web Hosting supports Docker, arbitrary long-running Node processes or SSH-based container deployment. Verify plan capabilities before choosing a deployment method.

## 6. Future VPS/OCI deployment prerequisites

Before enabling `ENABLE_VPS_DEPLOYMENT` or using the VPS workflows, confirm:

- A provisioned and reachable compute instance.
- Supported CPU architecture and sufficient memory/storage.
- Docker Engine and Docker Compose installed and maintained.
- Firewall rules restricted to required ports.
- SSH access using a dedicated deployment identity.
- DNS records and valid TLS for the intended environment subdomains.
- GHCR read credentials and GitHub Environment secrets.
- Runtime secrets stored outside the image and source repository.
- Database/CMS connectivity and backup arrangements.
- Monitoring, logs, alerting and incident ownership.
- Health endpoint and smoke tests that accurately represent service health.
- A tested rollback and recovery procedure.

OCI compute has not been confirmed as a working production target. Previous Ampere A1 Flex capacity attempts in the Switzerland AD-1 availability domain were unsuccessful. Reassess region/capacity and cost before committing to that target.

## 7. Container image and runtime

The Dockerfile uses a multi-stage Node 22 Alpine build and a minimal runtime stage. It creates a non-root `nextjs` user, copies the Next.js standalone output and starts `server.js`.

The Docker workflow builds images with tags including the full commit SHA. Prefer immutable SHA tags for deployment and promotion. Do not deploy a mutable branch tag as the production release identifier.

The image build receives public Sanity project/dataset identifiers as build arguments and selected privileged values through BuildKit secrets. Review the Dockerfile and workflow together whenever build-time configuration changes. Never bake secrets into image layers.

## 8. Required deployment configuration

Names below are representative of the checked-in workflows; confirm GitHub configuration before use.

| Scope | Configuration |
|---|---|
| Registry | `ghcr.io` |
| Image | `ghcr.io/goldenpalmera/golden_palmera_global` |
| Development host | `DEV_HOST`, `DEV_USER`, `DEV_SSH_KEY` |
| Staging host | `STAGING_HOST`, `STAGING_USER`, `STAGING_SSH_KEY` |
| Production host | `PRODUCTION_HOST`, `PRODUCTION_USER`, `PRODUCTION_SSH_KEY` |
| Registry credentials | `GHCR_USERNAME`, `GHCR_TOKEN` |
| VPS deployment gate | `ENABLE_VPS_DEPLOYMENT` repository variable |
| Notifications | `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` |

The reusable deployment workflow uses GitHub Environments named development, staging and production. Configure environment-specific secrets and approval rules rather than sharing credentials across environments.

## 9. Health verification

The deployment scripts expect the health URL to return a successful response with JSON containing:

```json
{"status":"ok"}
```

The workflows reference `/api/health`. The route was not present at the path inspected during this documentation review. Implement and test the route (or update workflow configuration to the real endpoint) before enabling the VPS pipeline.

A successful HTTP response alone is not enough if critical dependencies are unavailable. Keep readiness checks bounded and avoid exposing sensitive configuration in health output.

## 10. Deploy script and rollback

The repository's `docker/deploy.sh` accepts:

```bash
./deploy.sh <image_name> <image_tag> <health_url> <base_url>
```

It records the current container image when available, pulls the target image, starts the application, polls the health endpoint, runs optional health/smoke scripts and attempts rollback after failure if a previous image was recorded.

Rollback can fail or be unavailable when no previous image exists. Verify the target host, compose file, container name and saved image before running recovery commands. Review `docker/rollback.sh` and the actual deployment logs.

## 11. Database migrations

Do not couple an unreviewed destructive database change to an application release. Before production migrations:

1. Confirm which database is the active system of record.
2. Confirm backup completion and restore readiness.
3. Review migration SQL and backward compatibility.
4. Apply through an approved controlled process.
5. Verify application behavior and data integrity.

The existence of a Prisma schema does not prove that the live enquiry path uses PostgreSQL. Trace the implementation before planning a migration.

## 12. Release record

For each production release, record:

- Release identifier and date/time.
- Approved commit SHA.
- Container image digest/tag if applicable.
- CI and security scan results.
- Target environment and deployment method.
- Approver.
- Health/smoke-test result.
- Database migration details, if any.
- Rollback version and recovery notes.

---
**Release rule:** Hostinger is current production hosting. VPS/OCI deployment remains a future target until infrastructure and end-to-end deployment have been successfully tested.
