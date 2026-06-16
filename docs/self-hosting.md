# Self-Hosting

## Vercel (Recommended)

1. Push the repository to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Deploy — no environment variables needed

## Node.js

```bash
npm install
npm run build
npm start
```

The app runs on port 3000 by default.

## Docker

Add `output: 'standalone'` to `next.config.ts`, then:

```bash
npm run build
docker build -t open-mock .
docker run -p 3000:3000 open-mock
```

## Static Export

Open Mock uses client-side state and export. SSR generator pages work best with a Node server. Static export is not recommended because Zustand persistence and export rely on browser APIs.

## Environment Variables

None required. The app is fully client-side with no backend.
