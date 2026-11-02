# Operations Runbook

**Status:** Operational reference — verify environment-specific values before executing commands.  
**Application:** Golden Palmera Global  
**Current hosting:** Hostinger  
**Future container target:** VPS / OCI

## 1. Purpose

This runbook provides first-response procedures for website availability, deployments, enquiries, email, Sanity, database integrations, rate limiting, authentication and security incidents. It is not a substitute for the provider's recovery documentation or an approved incident commander.

## 2. Severity levels

| Severity | Definition | Initial response |
|---|---|---|
| SEV-1 | Website unavailable, confirmed compromise, or critical business data loss | Escalate immediately; preserve evidence; restore service safely |
| SEV-2 | Major customer-facing function unavailable, such as all enquiry submissions | Investigate immediately and communicate impact |
| SEV-3 | Degraded feature or intermittent errors with a workaround | Assign owner and track to resolution |
| SEV-4 | Minor defect, content issue or cosmetic problem | Schedule normal remediation |

Severity is based on customer and business impact, not merely the number of error messages.

## 3. First-response checklist

1. Record the time (UTC and local), reporter, affected URL, environment and observed symptoms.
2. Determine whether the issue affects all visitors or a subset.
3. Check the latest deployment/change and relevant GitHub Actions run.
4. Capture relevant logs and error identifiers before restarting services.
5. Check external dependencies: Hostinger, DNS/TLS, Sanity, Resend, Upstash, Google OAuth and database provider as applicable.
6. Avoid destructive actions, repeated form submissions or unreviewed production changes.
7. Assign an incident owner and keep a timeline of actions and outcomes.

## 4. Website availability

### Current Hostinger deployment

- Check the public site and affected route from an independent network.
- Check Hostinger service status, hosting resource usage, deployment logs and domain/TLS configuration.
- Review the most recent application deployment and build output.
- Check DNS records and certificate validity if the domain cannot be reached.
- If a rollback is available through the current Hostinger deployment method, use the last known-good release and record the version.

Do not assume Docker commands are available on Hostinger Business Web Hosting. The Docker procedures below apply only to a provisioned VPS that has the application container deployed.

### Future VPS diagnostics

Run only on the configured VPS:

```bash
docker ps -a
docker logs --tail=200 golden-palmera-global
docker inspect golden-palmera-global
docker compose ps
docker compose logs --tail=200 app
```

Confirm the actual container name and compose directory before running commands. Preserve logs before restarting.

## 5. Deployment failure

1. Open the relevant GitHub Actions run and identify the first failed step.
2. Record branch, commit SHA, image tag/digest, workflow name and target environment.
3. Distinguish build/scan/sign failures from SSH, registry, deployment and health-check failures.
4. Do not rerun production deployment repeatedly without understanding the failure.
5. For VPS deployment, inspect the deploy script output and health check. Use the documented rollback script only after confirming the saved previous image and target.
6. For current Hostinger production, follow the actual Hostinger deployment procedure; do not invoke VPS rollback scripts against shared hosting.

The Docker deployment script records the previous image and attempts rollback on failure when a previous image is available. Automatic rollback is not guaranteed when there is no prior container/image or when the rollback itself fails.

## 6. Enquiry submission or notification failure

Treat persistence and email delivery as separate checks.

- Ask for the enquiry reference, approximate submission time and email address; do not ask the visitor to submit again immediately.
- Search the active enquiry store for the record and reference.
- If the record exists but the notification is missing, investigate Resend delivery, sender verification, API key, recipient configuration and provider events.
- If no record exists, inspect the API response, application logs, validation errors and rate-limit behavior.
- Check for duplicate submissions before creating or replaying a record.

Relevant configuration may include `RESEND_API_KEY`, `RESEND_FROM_EMAIL` and `INQUIRY_NOTIFICATION_EMAIL`. Confirm actual variable names in the deployed environment and code before changing them. Ensure the sender domain is authenticated with Resend.

## 7. Sanity CMS

Symptoms: Studio unavailable, content missing, query errors, image failures or publish changes not appearing.

1. Check Sanity project ID, dataset and API version.
2. Check the server-side `SANITY_API_TOKEN` secret and its permissions/expiry.
3. Verify the dataset and document exist in Sanity.
4. Check GROQ query, schema and TypeScript types.
5. Review Sanity service status and API errors.
6. Confirm image URLs and allowed remote image configuration.

Do not recreate a dataset or delete documents to resolve a query/configuration problem. Export content before any destructive recovery action.

## 8. PostgreSQL and Prisma

The repository defines a PostgreSQL Prisma schema, but that alone does not establish that the live enquiry flow uses PostgreSQL. Trace the active route and service to identify the system of record before troubleshooting.

If PostgreSQL is confirmed in use:

- Verify database availability and network access.
- Check `DATABASE_URL` without exposing credentials in logs or screenshots.
- Check connection limits, TLS settings, migration status and application errors.
- Run non-destructive validation/generation commands only where appropriate.
- Review migration history before applying a migration.

Never use `prisma migrate reset`, database drop commands or manual table deletion in production as a routine fix. Restore from a verified backup only under an approved recovery plan.

## 9. Upstash rate limiting

- Check `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
- Review provider status, quotas, latency and application logs.
- Determine whether requests are being rejected by the rate limiter or by validation/origin checks.
- Confirm the actual fail-open/fail-closed behavior from the current implementation before changing provider settings.
- Do not disable rate limiting globally as a quick fix for legitimate traffic complaints.

## 10. Auth.js / administrator access

- Verify Google OAuth provider availability and callback URL.
- Check `AUTH_SECRET`, OAuth client ID/secret and administrator allowlist.
- Confirm the account email matches the configured server-side allowlist.
- Check session/cookie domain, HTTPS and clock-related errors.
- Review authorization checks on both admin pages and API routes.

Do not broaden administrator access to resolve an individual login problem. Rotate exposed credentials immediately.

## 11. Security incident

For suspected credential exposure, unauthorized access, malicious code or data exfiltration:

1. Escalate as SEV-1 or SEV-2 based on scope.
2. Preserve logs, workflow runs, relevant commit SHAs and provider audit events.
3. Revoke or rotate affected credentials (GitHub, Sanity, Resend, Upstash, Google OAuth, SSH and database).
4. Restrict compromised accounts, tokens or infrastructure.
5. Identify affected systems, data and time window.
6. Deploy a reviewed remediation and verify service integrity.
7. Document notification and legal obligations with appropriate advisers; do not make unsupported assurances about data impact.

Never paste live secrets into issue trackers, chat, commits or incident reports.

## 12. Backup and recovery

Maintain and periodically test backups for every system that actually stores business-critical data:

- Active enquiry system of record.
- Sanity datasets and uploaded assets.
- Deployment configuration and infrastructure definitions.
- Required database backups and migration history.
- DNS and provider configuration records.

Define and approve recovery time objective (RTO) and recovery point objective (RPO) with business owners. A backup is not proven until a restoration test succeeds. Store backups separately from the system they protect and restrict access.

## 13. Routine checks

### Daily / on business days
- Confirm public website availability and key enquiry flows.
- Review failed GitHub Actions and deployment notifications.
- Check enquiry notifications and provider errors.

### Weekly
- Review dependency alerts and security scan findings.
- Check CMS publishing and image delivery.
- Review administrator access and unusual traffic.

### Monthly
- Verify backup completion and review restore-test schedule.
- Review DNS/TLS, secrets ownership and provider access.
- Review incident history and outstanding technical risks.

## 14. Incident record template

- Incident ID:
- Severity:
- Start/end time:
- Reporter / owner:
- Environment and affected URL:
- User/business impact:
- Last known-good deployment / commit:
- Evidence and logs:
- Root cause:
- Actions taken:
- Recovery verification:
- Follow-up work and owner:

---
Do not treat the future VPS pipeline as the current Hostinger production deployment. Verify the target environment before executing infrastructure commands.
