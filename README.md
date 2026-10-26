# Luma Course Frontend

React + TypeScript + Vite frontend prototype for a mobile-first course-learning application.

## Run locally

```bash
pnpm install
pnpm dev
```

## Production build

```bash
pnpm build
pnpm preview
```

## Current prototype features

- Monochrome cream glassmorphism design system
- Responsive dashboard, course roadmap, lesson view, question prompts, and AI tutor drawer
- Framer Motion page transitions and micro-interactions
- Hardcoded sample courses and YouTube video IDs in `src/App.tsx`
- Installable PWA manifest starter at `public/manifest.webmanifest`

## Replace the demo videos

Update each lesson's `videoId` in `src/App.tsx` with the YouTube video ID you want to embed. For a video URL such as `https://www.youtube.com/watch?v=VIDEO_ID`, use `VIDEO_ID`.

## Deploy on Vercel

### Option 1: Automatic Git Deployment (Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/new).
2. Import the Git repository: **`jasim-sct/course-learning-platform`**.
3. Vercel automatically detects the framework from `vercel.json`:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build` (or `pnpm build`)
   - **Output Directory**: `dist`
4. Click **Deploy**. Any future commits to `main` will automatically trigger a production deployment.

### Option 2: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel
vercel --prod
```

