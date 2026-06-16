# Open Mock

Open-source mockup generator for fake chat screenshots, social posts, AI conversations, stories, and emails.

**49 platforms** · **Free** · **No signup** · **No watermarks** · **Client-side only**

## Features

- **22 chat generators** — WhatsApp, iMessage, Discord, Slack, Telegram, and more
- **5 AI chat generators** — ChatGPT, Claude, Gemini, Grok, Perplexity
- **8 social post generators** — Instagram, X, Facebook, LinkedIn, and more
- **8 comment generators** — YouTube, Reddit, TikTok, and more
- **2 story generators** — Instagram, Snapchat
- **4 email generators** — Gmail, Outlook, Apple Mail, Redacted Email

### Export

- High-resolution PNG (1x, 2x, 3x)
- Transparent background
- Video export with typing animations (chat & AI)
- Device frames (iPhone, Android)
- 3D perspective view
- Dark mode per platform

## Quick Start

```bash
git clone https://github.com/lucianodiisouza/open-mock.git
cd open-mock
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Self-Hosting

### Vercel

Connect your GitHub repo to Vercel. No environment variables required.

### Production

```bash
npm run build
npm start
```

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Zustand
- html-to-image

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add a new platform generator.

## License

MIT — see [LICENSE](LICENSE).

## Disclaimer

For educational and demo purposes only. Not affiliated with WhatsApp, Apple, Meta, Google, or any platform shown.
