# Environment Variables Guide

Understanding how environment variables work across different environments.

---

## File Structure

```
e:\rafa-design-website\
├── .env.example           ← Template (committed to Git)
├── .env.local             ← Local development (NOT committed)
├── .env.production        ← Production defaults (committed to Git)
└── Vercel Dashboard       ← Production secrets (web UI only)
```

---

## Priority Order (Next.js)

Next.js loads environment variables in this priority (highest to lowest):

1. **`.env.local`** ← Overrides everything locally
2. **`.env.production`** ← Used in production builds
3. **`.env`** ← General defaults (not used in this project)
4. **Vercel Environment Variables** ← Injected at build time

---

## What Goes Where

### `.env.example` (Committed ✅)

**Purpose:** Documentation template for developers

```env
# Shows what variables are needed
# No real values
NEXT_PUBLIC_SITE_URL=
SANITY_API_TOKEN=
```

**Use:** Copy to `.env.local` to start local development

---

### `.env.local` (NOT Committed ❌)

**Purpose:** Your local development environment

```env
NEXT_PUBLIC_SITE_URL=http://localhost:8000
NEXT_PUBLIC_SANITY_PROJECT_ID=9rbnou67
SANITY_API_TOKEN=your_real_token_here
RESEND_API_KEY=your_test_key_here
```

**Contains:**

- Localhost URLs
- Real API keys for testing
- Development secrets

**Who uses it:** Only you on your machine

---

### `.env.production` (Committed ✅)

**Purpose:** Public production defaults (non-secret only)

```env
NEXT_PUBLIC_SITE_URL=https://rafadesign.com
NEXT_PUBLIC_SANITY_PROJECT_ID=9rbnou67
NEXT_PUBLIC_SANITY_DATASET=production
```

**Contains:**

- Public configuration
- Non-sensitive defaults
- **NO SECRETS**

**Who uses it:** Vercel during production builds

---

### Vercel Environment Variables (Web UI Only 🌐)

**Purpose:** Production secrets

**Contains:**

- `SANITY_API_TOKEN`
- `RESEND_API_KEY`
- `CRON_SECRET`
- All sensitive credentials

**Who manages it:** You via Vercel dashboard

---

## Security Rules

### ✅ Safe to Commit

- Public URLs
- Public API endpoints
- Project IDs (like Sanity project ID)
- Dataset names
- API versions
- Non-sensitive configuration

### ❌ NEVER Commit

- API keys
- API tokens
- Secrets
- Private keys
- Passwords
- Database URLs with credentials

---

## How It Works in Practice

### Local Development (`npm run dev`)

```
1. Next.js loads .env.local
2. Uses localhost:8000
3. Uses your test API keys
4. Hot reloads on changes
```

### Production Build (Vercel)

```
1. Vercel clones your repo
2. Loads .env.production (committed)
3. Injects Vercel Environment Variables (secrets)
4. Runs: npm run build
5. Deploys to CDN
```

---

## Workflow Example

### Starting New Development

```powershell
# 1. Clone repository
git clone <repo-url>
cd rafa-design-website

# 2. Copy environment template
cp .env.example .env.local

# 3. Add your credentials to .env.local
# (never commit this file)

# 4. Start development
npm run dev
```

### Deploying to Production

```powershell
# 1. Update public defaults (if needed)
# Edit .env.production

# 2. Commit changes
git add .env.production
git commit -m "feat: update production configuration"
git push origin main

# 3. Vercel auto-deploys
# Uses .env.production + Vercel Environment Variables
```

---

## Checking Environment Variables

### In Local Development

```typescript
// Print all environment variables (development only)
console.log("Site URL:", process.env.NEXT_PUBLIC_SITE_URL);
console.log("Sanity Project:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
```

### In Production

Check Vercel dashboard:

1. Project → Settings → Environment Variables
2. See all configured variables
3. Edit or add new ones

---

## Common Issues & Solutions

### Issue: "Environment variable not found"

**Local Development:**

```powershell
# Check .env.local exists
ls .env.local

# Restart dev server
npm run dev
```

**Production:**

1. Check Vercel → Settings → Environment Variables
2. Verify variable name matches exactly
3. Redeploy to apply changes

---

### Issue: "Different behavior local vs production"

**Cause:** Different environment variables

**Solution:**

```powershell
# Compare values
cat .env.local          # Local values
# vs
# Vercel dashboard      # Production values
```

Ensure both have same structure (different values is normal).

---

### Issue: "Accidentally committed secrets"

**Immediate action:**

```powershell
# Remove from Git history (dangerous!)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env.local" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (WARNING: coordinate with team)
git push origin --force --all
```

**Better solution:**

1. Rotate compromised keys immediately
2. Generate new secrets
3. Update Vercel environment variables
4. Never commit that file again

---

## Best Practices

### ✅ DO

- Keep `.env.local` for local development
- Commit `.env.production` with public values only
- Store all secrets in Vercel dashboard
- Document variables in `.env.example`
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Rotate secrets regularly

### ❌ DON'T

- Commit API keys or tokens
- Share `.env.local` file
- Put secrets in `.env.production`
- Hardcode sensitive values in code
- Reuse production keys locally
- Leave default/example secrets in production

---

## Environment Variable Types

### Public Variables (Client-Side)

Prefix: `NEXT_PUBLIC_`

```env
NEXT_PUBLIC_SITE_URL=https://rafadesign.com
NEXT_PUBLIC_SANITY_PROJECT_ID=9rbnou67
```

**Available in:**

- Server-side code
- Client-side code (browser)

**Use for:**

- Public URLs
- Public API endpoints
- Feature flags
- Non-sensitive configuration

---

### Private Variables (Server-Side Only)

No prefix

```env
SANITY_API_TOKEN=secret_token_here
RESEND_API_KEY=secret_key_here
CRON_SECRET=secret_cron_key
```

**Available in:**

- Server-side code only
- API routes
- `getServerSideProps`
- `getStaticProps`

**Use for:**

- API keys
- Secrets
- Database credentials
- Authentication tokens

---

## Current Project Setup

### Your Environment Files

| File              | Status       | Purpose              |
| ----------------- | ------------ | -------------------- |
| `.env.example`    | ✅ Committed | Template for team    |
| `.env.local`      | ❌ Ignored   | Your local secrets   |
| `.env.production` | ✅ Committed | Public prod defaults |

### Your Variables

**Local Development (`.env.local`):**

```env
NEXT_PUBLIC_SITE_URL=http://localhost:8000
NEXT_PUBLIC_SANITY_PROJECT_ID=9rbnou67
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-08-20
SANITY_API_TOKEN=skVoTAPCF...
RESEND_API_KEY=re_gjh5F...
RESEND_FROM_EMAIL=RAFA Design Hub <onboarding@resend.dev>
CRON_SECRET=a49973e2d...
```

**Production (`.env.production` + Vercel):**

Committed to Git (`.env.production`):

```env
NEXT_PUBLIC_SITE_URL=https://rafadesign.com
NEXT_PUBLIC_SANITY_PROJECT_ID=9rbnou67
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-08-20
```

In Vercel Dashboard (secrets):

```env
SANITY_API_TOKEN=skVoTAPCF...
RESEND_API_KEY=re_gjh5F...
RESEND_FROM_EMAIL=RAFA Design Hub <onboarding@resend.dev>
CRON_SECRET=a49973e2d...
```

---

## Quick Reference

### Loading Priority

```
.env.local (dev) > .env.production (prod) > Vercel Env Vars
```

### Security Check

```
✅ Public config → .env.production (committed)
❌ Secrets → .env.local (ignored) + Vercel Dashboard
```

### When to Update

| Change              | Update Where               |
| ------------------- | -------------------------- |
| Production URL      | `.env.production` + Vercel |
| API Key (secret)    | Vercel Dashboard only      |
| Project ID (public) | `.env.production`          |
| Local testing       | `.env.local` only          |

---

## Summary

Your project now has:

1. **`.env.local`** → Your local development secrets (not committed)
2. **`.env.production`** → Public production defaults (committed)
3. **Vercel Dashboard** → Production secrets (web UI)

This setup ensures:

- Secrets never get committed to Git
- Production configuration is documented
- Local development stays independent
- Team can easily set up their own environment

---

**Next:** Follow `START-HERE.md` to deploy to production!
