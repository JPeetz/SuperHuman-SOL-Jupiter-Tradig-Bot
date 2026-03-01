# Deploy to Vercel

## Option A — Vercel CLI (fastest)
```bash
npm install -g vercel
cd neural-swarm-site
vercel
```
Follow prompts. Done. Your site is live.

## Option B — GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo (can be private)
2. Go to vercel.com → New Project → Import your repo
3. Vercel auto-detects Next.js — click Deploy
4. Live in ~60 seconds

## Option C — Drag & drop
1. Run `npm run build` locally
2. Go to vercel.com → New Project → drag the `.next` folder

## Custom domain (optional)
In Vercel Dashboard → Project → Settings → Domains
Add your domain e.g. neural-swarm.io
