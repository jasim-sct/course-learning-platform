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

The AI tutor UI currently uses a local demo response. Connect it to your backend/API before production. PWA manifest is included; add a service worker and app icons before considering the PWA complete.
# course-learning-platform
