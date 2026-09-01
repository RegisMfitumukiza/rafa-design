# Deployment Workflow Diagram

Visual guide to understand how everything connects.

---

## System Architecture

```
┌─────────────────┐
│   Your Code     │
│  (GitHub Repo)  │
└────────┬────────┘
         │
         │ git push
         ▼
┌─────────────────┐
│     Vercel      │◄─── Auto-builds on push
│  (Hosting CDN)  │◄─── Runs Next.js
└────────┬────────┘
         │
         │ Serves traffic
         ▼
┌─────────────────┐
│   Cloudflare    │◄─── DNS management
│  (DNS Provider) │◄─── SSL/Security
└────────┬────────┘
         │
         │ Routes traffic
         ▼
┌─────────────────┐
│   Your Domain   │
│ yourdomain.com  │◄─── End users visit
└─────────────────┘
```

---

## Deployment Flow

```
Step 1: Local Development
┌──────────────────────────┐
│  e:\rafa-design-website  │
│  - Edit code             │
│  - Test locally          │
│  - Commit changes        │
└──────────┬───────────────┘
           │
           │ git push origin main
           ▼
Step 2: GitHub
┌──────────────────────────┐
│  GitHub Repository       │
│  - Stores code           │
│  - Triggers Vercel       │
└──────────┬───────────────┘
           │
           │ Webhook trigger
           ▼
Step 3: Vercel Build
┌──────────────────────────┐
│  Vercel Build System     │
│  - npm install           │
│  - npm run build         │
│  - Deploy to CDN         │
└──────────┬───────────────┘
           │
           │ Deployment complete
           ▼
Step 4: Vercel Hosting
┌──────────────────────────┐
│  Vercel CDN              │
│  - yoursite.vercel.app   │
│  - Global distribution   │
└──────────┬───────────────┘
           │
           │ DNS routing
           ▼
Step 5: Cloudflare DNS
┌──────────────────────────┐
│  Cloudflare Dashboard    │
│  - CNAME → Vercel        │
│  - SSL/TLS               │
└──────────┬───────────────┘
           │
           │ Points domain
           ▼
Step 6: Production
┌──────────────────────────┐
│  https://yourdomain.com  │
│  ✅ Live on the internet │
└──────────────────────────┘
```

---

## DNS Resolution Flow

**When a user visits your domain:**

```
User types: yourdomain.com
           │
           ▼
1. Browser checks DNS
           │
           ▼
2. DNS lookup → Cloudflare
   "Where is yourdomain.com?"
           │
           ▼
3. Cloudflare responds:
   "It's at cname.vercel-dns.com"
           │
           ▼
4. Browser connects to Vercel
           │
           ▼
5. Vercel serves Next.js app
           │
           ▼
6. User sees website ✅
```

---

## Data Flow (Content + Assets)

```
┌─────────────────┐
│   Sanity CMS    │◄─── You manage content
│  (Headless CMS) │
└────────┬────────┘
         │
         │ API request
         ▼
┌─────────────────┐
│   Next.js App   │◄─── Fetches content
│  (on Vercel)    │◄─── Renders pages
└────────┬────────┘
         │
         │ Delivers HTML
         ▼
┌─────────────────┐
│   User Browser  │◄─── Shows website
└─────────────────┘
```

### Static Assets (Images, Fonts)

```
┌─────────────────┐
│  Public folder  │
│  /fonts/*.ttf   │
│  /images/*.jpg  │
└────────┬────────┘
         │
         │ Deployed with app
         ▼
┌─────────────────┐
│   Vercel CDN    │◄─── Cached globally
└────────┬────────┘
         │
         │ Fast delivery
         ▼
┌─────────────────┐
│   User Browser  │
└─────────────────┘

┌─────────────────┐
│  Sanity CDN     │◄─── Dynamic images
│ cdn.sanity.io   │
└────────┬────────┘
         │
         │ Optimized delivery
         ▼
┌─────────────────┐
│   User Browser  │
└─────────────────┘
```

---

## Environment Variables Flow

```
Local Development:
┌─────────────────┐
│   .env.local    │◄─── NOT committed to Git
└────────┬────────┘
         │
         │ Used during: npm run dev
         ▼
┌─────────────────┐
│  localhost:8000 │
└─────────────────┘

Production:
┌─────────────────┐
│ Vercel Settings │◄─── Manually added
│ Environment Vars│
└────────┬────────┘
         │
         │ Injected at build time
         ▼
┌─────────────────┐
│ Production Build│
└────────┬────────┘
         │
         │ Available in app
         ▼
┌─────────────────┐
│ yourdomain.com  │
└─────────────────┘
```

---

## Email Flow (Contact Form)

```
User fills form on:
yourdomain.com/contact
         │
         ▼
Next.js API Route:
/api/contact
         │
         │ Validates form
         ▼
Resend API:
resend.com/api/send
         │
         │ Uses RESEND_API_KEY
         ▼
Email Delivery:
inquiry@yourdomain.com
         │
         │ SPF/DKIM verification
         ▼
Recipient Inbox ✅
```

### Email DNS Records

```
yourdomain.com
├── @ (root)
│   └── TXT: v=spf1 include:resend.com ~all
│
├── _dkim
│   └── TXT: (DKIM signature)
│
└── _dmarc
    └── TXT: v=DMARC1; p=quarantine
```

---

## Security Layers

```
┌─────────────────────────────────────┐
│         User Request                │
│    https://yourdomain.com           │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│     Cloudflare Security Layer       │
│  - DDoS protection                  │
│  - Bot management                   │
│  - Rate limiting                    │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│     SSL/TLS Encryption              │
│  - Cloudflare SSL                   │
│  - Vercel SSL                       │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│     Vercel Edge Network             │
│  - Global CDN                       │
│  - Edge caching                     │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│     Next.js Security Headers        │
│  - HSTS                             │
│  - X-Frame-Options                  │
│  - CSP                              │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│     Application Response            │
│  ✅ Secure, Fast, Global            │
└─────────────────────────────────────┘
```

---

## Continuous Deployment Cycle

```
                    ┌─────────────────┐
                    │   Development   │
                    │   (localhost)   │
                    └────────┬────────┘
                             │
                    git commit & push
                             │
                             ▼
    ┌────────────────────────────────────────┐
    │              GitHub                    │
    │         (Version Control)              │
    └────────┬───────────────────────────────┘
             │
    Webhook triggers Vercel
             │
             ▼
    ┌────────────────────────────────────────┐
    │         Vercel Build                   │
    │  1. Install dependencies               │
    │  2. Run build                          │
    │  3. Run tests                          │
    │  4. Deploy to CDN                      │
    └────────┬───────────────────────────────┘
             │
      Build Success?
             │
        ┌────┴────┐
        │         │
       Yes       No
        │         │
        ▼         ▼
    Deploy   Notify Failure
        │         │
        │    Fix & Retry
        │         │
        └────┬────┘
             │
             ▼
    ┌────────────────────────────────────────┐
    │         Production                     │
    │    https://yourdomain.com              │
    │    ✅ Live & Accessible                │
    └────────────────────────────────────────┘
```

---

## Rollback Strategy

```
Production Issue Detected!
           │
           ▼
┌──────────────────────┐
│  Vercel Dashboard    │
│  → Deployments       │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Find Last Stable    │
│  Deployment          │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Promote to Prod     │
│  (instant rollback)  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Site Stable ✅      │
│  Fix issue locally   │
└──────────────────────┘
```

---

## Monitoring & Analytics

```
User visits site
       │
       ▼
┌─────────────────┐
│  Vercel Edge    │─────► Logs & Metrics
└────────┬────────┘       (Vercel Dashboard)
         │
         ▼
┌─────────────────┐
│  Next.js App    │─────► Error Tracking
└────────┬────────┘       (Sentry - optional)
         │
         ▼
┌─────────────────┐
│  Page View      │─────► Analytics
└─────────────────┘       (GA/PostHog - optional)
```

---

## Summary: The Complete Picture

```
Developer ──► GitHub ──► Vercel ──► Cloudflare ──► User
    │                       │            │
    │                       │            │
    └──► .env.local         │            └──► DNS
                            │
                            ├──► Sanity CMS (content)
                            ├──► Resend (email)
                            └──► Next.js (app logic)
```

---

## Key Takeaways

1. **GitHub** = Source of truth for code
2. **Vercel** = Builds and hosts your Next.js app
3. **Cloudflare** = Manages DNS and security
4. **Sanity** = Provides content via API
5. **Resend** = Sends emails from contact form

Everything works together to deliver your site globally, fast and secure.

---

**Next Step:** Follow `DEPLOYMENT-CHECKLIST.md` to execute this workflow.
