# Security Guide

**Application:** Golden Palmera Global  
**Scope:** Website application, CMS, integrations, CI/CD and future VPS infrastructure

## 1. Security objectives

The security approach is based on least privilege, defense in depth, secure defaults, server-side validation, secret isolation, traceability and continuous verification.

Describe controls according to their verified state. A configured workflow or planned control is not proof that production enforces it.

## 2. Application security

### Input validation

- Validate all untrusted request data at the server boundary.
- Use Zod schemas for API and form payloads.
- Enforce length, format, enum and required-field constraints.
- Reject unexpected fields where appropriate.
- Treat client-side validation as a usability feature, not a security boundary.

### Output and rendering

- Use React's normal escaping behavior.
- Avoid unsafe HTML rendering.
- Sanitize intentionally supported rich HTML before rendering.
- Validate external URLs and avoid open redirects.
- Do not expose stack traces, secrets or internal provider responses to visitors.

### API routes

- Apply authentication and authorization to protected operations.
- Validate request origin where appropriate.
- Apply rate limiting to public form endpoints.
- Use a honeypot or equivalent abuse signal where implemented.
- Return safe, consistent error responses.
- Generate request/reference identifiers for support and traceability.

## 3. Authentication and authorization

Auth.js / NextAuth v5 beta with Google OAuth is used for administrator access.

Expected configuration includes:
- `AUTH_SECRET`
- `AUTH_URL` where required
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`
- `ADMIN_EMAIL`

Requirements:
1. Keep provider credentials and session secrets server-side.
2. Enforce the administrator allowlist on the server.
3. Protect every admin page, route handler and mutation independently.
4. Distinguish authentication from authorization to perform an action.
5. Use HTTPS and secure cookie/session settings in production.
6. Review OAuth callback URLs separately for local, staging and production.
7. Remove access promptly when an administrator no longer requires it.

Do not grant broader access as a workaround for an individual login failure.

## 4. Security headers and Content Security Policy

The Next.js configuration includes headers intended to provide:
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: DENY`
- A restrictive `Permissions-Policy`
- HSTS with `max-age=31536000; includeSubDomains`

HSTS with `includeSubDomains` should be used only when every covered subdomain is ready to serve HTTPS. Validate header behavior at the actual production edge, not only in local development.

A nonce-based CSP and `strict-dynamic` strategy has been under development. Test CSP against:
- Next.js runtime scripts and chunk loading.
- Turbopack behavior in development.
- Auth.js routes and redirects.
- Sanity Studio and visual editing/bridge functionality.
- Required image, font and API origins.

Do not resolve CSP failures by permanently allowing all scripts or disabling the policy. Document each required source and keep policies environment-appropriate.

## 5. Public enquiry form protection

The enquiry flow uses or is designed around:
- Zod server-side validation.
- Origin validation.
- Honeypot field.
- Rate limiting through Upstash.
- Request IDs and enquiry references.
- Status tracking and restricted administrative access.

The intended rate-limit threshold discussed for the form is five requests per ten minutes. Confirm the active implementation and keying strategy before changing the limit. Consider shared networks and legitimate repeated requests when evaluating false positives.

Do not assume Upstash failure is fail-open or fail-closed; inspect the current code path and test provider outage behavior.

## 6. Secrets management

Never commit secrets, private keys, access tokens, database URLs or populated local environment files.

- Use local ignored environment files for development.
- Use GitHub Actions secrets and environment-scoped secrets for CI/CD.
- Use the hosting provider's supported secret/configuration mechanism for production.
- Separate development, staging and production credentials.
- Restrict access to people and workflows that require it.
- Rotate any credential that may have been exposed.
- Avoid printing secret values in logs.
- Never prefix a private secret with `NEXT_PUBLIC_`.

Sensitive integrations include Sanity, Resend, Upstash, Google OAuth, PostgreSQL and SSH deployment credentials.

## 7. Data protection and persistence

Enquiry information may contain personal and commercial contact details. Limit collection to information needed to respond, restrict access, and avoid copying production records into local development or test fixtures.

The repository includes a Prisma PostgreSQL schema, but the live enquiry persistence path must be confirmed from the active route and service implementation. Sanity is used for managed website content and has also had enquiry-related service integration. Do not assume which system is authoritative without tracing the current implementation.

For each data store:
- Define ownership and retention.
- Restrict administrative access.
- Protect credentials and network access.
- Back up important records.
- Test restoration.
- Avoid logging full payloads or unnecessary personal data.

## 8. Third-party integrations

**Sanity:** Use least-privilege tokens. Keep write tokens server-only. Review dataset permissions and audit access. Back up content before destructive operations.

**Resend:** Use authenticated sender identities. Keep the API key private. Review delivery/bounce events and restrict notification recipients to intended business addresses.

**Upstash:** Protect REST credentials. Review quotas, rate-limit configuration and outage behavior. Avoid exposing keys to browser code.

**Google OAuth:** Restrict redirect URIs to approved environments. Protect client secrets and review authorized administrator accounts.

## 9. Dependency and supply-chain security

- Commit and review the package lockfile.
- Review Dependabot updates before merging.
- Run lint, type-check, unit tests, browser tests and production build as appropriate.
- Review high/critical vulnerability findings and remediation availability.
- Do not assume a clean scan proves an application is secure.
- Pin or review GitHub Actions dependencies and third-party action versions.
- Keep the Docker runtime minimal and run as a non-root user.
- Do not embed credentials in Docker build layers.

The Docker workflow uses Trivy for image/configuration scanning and Cosign for image signing. BuildKit provenance and SBOM generation are configured. The reusable deploy workflow verifies image signature and provenance. Confirm these steps complete successfully for the exact release digest.

The CI workflow's unit-test condition should be checked: it currently looks for Jest configuration files while the package test script is Vitest. A skipped test step must not be reported as a passing test suite.

## 10. CI/CD and GitHub governance

- Feature-branch pushes and pull requests trigger GitHub Actions.
- Protect `main` from direct pushes.
- Require administrator approval for changes to `main`.
- Restrict who can approve and deploy production releases.
- Use least-privilege workflow permissions.
- Do not expose deployment secrets to untrusted pull-request code.
- Use GitHub Environments for environment-specific secrets and approvals.
- Preserve immutable image tags/digests through promotion.
- Review deployment workflow conditions and branch filters before changes.

The deployment workflows are a future VPS/OCI path. Hostinger remains the current website host. Keep these deployment contexts distinct.

## 11. Infrastructure security

For current Hostinger hosting, use the provider's supported security and access controls. Do not assume shared Business Web Hosting provides VPS-level firewall or Docker controls.

Before future VPS/OCI production use:
- Restrict inbound ports and administrative access.
- Use key-based SSH and a dedicated deployment user.
- Keep operating system and Docker packages updated.
- Use TLS for all public endpoints.
- Keep secrets outside source code and container images.
- Enable log retention and monitoring.
- Back up application data and configuration.
- Test restore and rollback procedures.
- Review network access to database, CMS and third-party services.

## 12. Logging and monitoring

Logs should support diagnosis without becoming a source of sensitive data. Do not log passwords, API keys, OAuth tokens, full database URLs or unnecessary personal enquiry payloads.

Monitor:
- Website availability and error rates.
- Enquiry submission success and notification delivery.
- Sanity, Resend and Upstash errors.
- Authentication failures and unusual admin activity.
- GitHub Actions failures and deployment outcomes.
- Container health and resource use when VPS hosting is enabled.

## 13. Vulnerability handling

Prioritize findings by exploitability, exposure, business impact and available remediation.

- Critical: assess immediately, contain exposure and prepare emergency remediation.
- High: assign an owner and expedited fix.
- Medium: schedule in the normal maintenance cycle.
- Low: track and address based on risk and maintenance capacity.

Do not publish unsupported claims about compliance, certification or guaranteed security. Escalate legal, privacy and breach-notification questions to qualified advisers.

## 14. Security incident response

1. Identify the affected service, account, secret or release.
2. Preserve logs, workflow runs, commit SHAs and provider evidence.
3. Contain compromised access and rotate affected credentials.
4. Determine the time window and likely data/systems affected.
5. Remove the root cause through reviewed changes.
6. Restore service and verify integrity.
7. Document decisions, impact, notifications and follow-up actions.

Do not delete evidence or make public statements about an incident before facts are established.

## 15. Verification checklist

- [ ] Admin routes and APIs enforce server-side authorization.
- [ ] Public inputs are validated server-side.
- [ ] Rate limiting is enabled and outage behavior is understood.
- [ ] Secrets are not exposed in source, logs, browser bundles or images.
- [ ] Security headers are verified on production responses.
- [ ] CSP is tested with Next.js and Sanity functionality.
- [ ] GitHub branch protection and environment approvals are active.
- [ ] CI actually executes the configured Vitest suite.
- [ ] Container image scans, signature and provenance checks pass.
- [ ] Backup and restore procedures are tested.
- [ ] Current Hostinger and future VPS responsibilities are clearly separated.

## 16. Review cadence

Review this guide at least quarterly and whenever authentication, enquiry handling, data persistence, hosting, deployment workflows or third-party integrations change.

---
This guide records architecture and security expectations. Verify each control in the active branch and production environment before representing it as enforced.
