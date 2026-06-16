# Adding a Platform

See [CONTRIBUTING.md](../CONTRIBUTING.md) for the full guide.

## Quick Reference

1. **Theme** — `src/lib/platform-themes.ts`
2. **Registry** — `src/lib/platform-registry.ts`
3. **Preview** — `src/components/platforms/PlatformPreview.tsx` (if new template)
4. **Validate** — `npm run validate-registry`

## Template Reuse

| Template | Use for |
|----------|---------|
| `bubble-chat` | WhatsApp, Telegram, Signal, Messenger |
| `imessage` | iMessage, Tech Texts |
| `slack` | Slack, Teams, Discord |
| `dating` | Tinder, Bumble |
| `social-dm` | Instagram DM, Snapchat, TikTok DM |
| `twitter` | X chat, X post, Bluesky |
| `ai-chat` | ChatGPT, Claude, Gemini, Grok, Perplexity |
| `linkedin` | LinkedIn chat & posts |
| `comment` | All comment generators |
| `story` | Instagram & Snapchat stories |
| `email` | Gmail, Outlook, Apple Mail |

Most new platforms only need a registry entry and theme — no new component required.
