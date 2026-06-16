# Contributing to Open Mock

Thank you for contributing! This guide explains how to add a new platform generator.

## Development Setup

```bash
npm install
npm run dev
```

## Adding a New Platform

### 1. Add theme (if new brand colors)

Edit `src/lib/platform-themes.ts` and add an entry to `PLATFORM_THEMES`.

### 2. Register the platform

Edit `src/lib/platform-registry.ts` and add a config entry:

```typescript
chatPlatform("my-platform", "My Platform", "bubble-chat"),
```

Categories: `chat`, `ai`, `post`, `comment`, `story`, `email`.

Templates: `bubble-chat`, `imessage`, `slack`, `dating`, `social-dm`, `twitter`, `ai-chat`, `linkedin`, `reddit-chat`, `facebook`, `post`, `comment`, `story`, `email`.

### 3. Custom preview (optional)

If an existing template is close enough, skip this step. Otherwise:

1. Create `src/components/platforms/templates/MyPlatformPreview.tsx`
2. Wire it in `src/components/platforms/PlatformPreview.tsx`

### 4. Test

```bash
npm run lint
npm run build
npm run validate-registry
```

Visit `/generators/your-slug` and verify:
- [ ] Editor updates preview live
- [ ] PNG export works
- [ ] Dark mode toggles correctly
- [ ] Mobile layout is usable

## Pull Request Checklist

- [ ] Platform added to registry with SEO metadata
- [ ] Default state provides sensible demo content
- [ ] No copyrighted assets (fonts, icons) without license
- [ ] `npm run build` passes

## Code Style

- Match existing TypeScript and Tailwind conventions
- Keep platform-specific CSS in CSS modules when pixel fidelity matters
- Prefer reusing base templates over duplicating components
