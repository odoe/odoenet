# CLAUDE.md - AI Assistant Guide for odoenet

## Project Overview

**odoenet** is a personal technical blog built with Astro 5, focusing on geodevelopment (ArcGIS) and web development. The site features 275+ blog posts, podcast page, and merchandise showcase.

- **Site URL**: https://odoe.net
- **Framework**: Astro 5.12.2 (Static Site Generator)
- **Content Focus**: ArcGIS Maps SDK for JavaScript, web development, TypeScript
- **Node Version**: >=22 (required)
- **License**: BSD-3-Clause

## Directory Structure

```
/home/user/odoenet/
├── src/
│   ├── assets/              # Image assets (blog/, images/, made/)
│   ├── components/          # Reusable Astro components
│   │   ├── BaseHead.astro   # SEO, Open Graph, meta tags
│   │   ├── Header.astro     # Navigation with social links
│   │   ├── Footer.astro     # Footer with social links
│   │   ├── FormattedDate.astro
│   │   └── HeaderLink.astro
│   ├── content/
│   │   └── blog/            # 275+ blog posts (*.md files)
│   ├── layouts/
│   │   ├── BlogPost.astro   # Blog post layout
│   │   └── Page.astro       # Generic page layout
│   ├── pages/               # Route pages
│   │   ├── index.astro      # Homepage
│   │   ├── blog/            # Blog listing & dynamic routes
│   │   ├── podcast.astro    # Podcast page
│   │   ├── made.astro       # Books/merch showcase
│   │   └── rss.xml.js       # RSS feed (10 most recent)
│   ├── styles/
│   │   └── global.css       # Global styles (Bear Blog based)
│   ├── consts.ts            # Site constants
│   └── content.config.ts    # Content collection schema
├── public/                  # Static assets (fonts, favicon)
├── output/dist/             # Build output (custom path)
├── astro.config.mjs         # Astro configuration
├── package.json             # Dependencies & scripts
├── tsconfig.json            # TypeScript config (strict mode)
└── .prettierrc              # Prettier config with Astro plugin
```

## Tech Stack

### Core Dependencies

- **astro**: ^5.12.2 - Static site generator
- **@astrojs/mdx**: ^4.3.1 - Enhanced Markdown with JSX
- **@astrojs/rss**: ^4.0.12 - RSS feed generation
- **@astrojs/sitemap**: ^3.4.1 - Automatic sitemap
- **sharp**: ^0.34.2 - Image optimization

### External Integrations

- **lite-youtube-embed**: Lightweight YouTube embeds (loaded in BlogPost layout)
- **Buy Me a Coffee**: Support widget (loaded in BaseHead)
- **Calcite Components**: Referenced in blog content for UI components

### Development Tools

- **prettier**: ^3.6.2 with prettier-plugin-astro
- **TypeScript**: Strict mode enabled

## Content Collection Schema

Blog posts are validated with Zod schema in `/home/user/odoenet/src/content.config.ts`:

```typescript
{
  title: z.string(),           // Required
  description: z.string(),     // Required
  pubDate: z.coerce.date(),    // Required
  updatedDate: z.coerce.date().optional(),
  heroImage: image().optional(),
  published: boolean,          // Not in schema but used in frontmatter
  author: string,              // Not in schema but used in frontmatter
  tags: string                 // Not in schema but used in frontmatter
}
```

### Example Blog Post Frontmatter

```yaml
---
title: Shadow DOM and Slots in ArcGIS Map Components
description: Big component updates in the ArcGIS Maps SDK for JavaScript 4.34 release
published: true
author: Rene Rubalcava
pubDate: 2025-11-06T10:00:00.000Z
heroImage: "../../assets/blog/shadow-dom-slot-map-components/images/cover.jpg"
tags: javascript
---
```

## Development Workflow

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build → output/dist/
npm run preview  # Preview production build
npm run astro    # Direct Astro CLI access
```

### Git Branch Convention

- Main branch: `main` (or check `gitStatus` for current state)
- Feature branches: `claude/claude-md-<session-id>`
- Always develop on designated feature branch
- Commit with clear, descriptive messages
- Push with: `git push -u origin <branch-name>`

### Important Git Notes

- Branch names MUST start with `claude/` and include session ID
- Retry network failures up to 4 times with exponential backoff (2s, 4s, 8s, 16s)
- Use `git fetch origin <branch-name>` for specific branches
- GitHub CLI (`gh`) is NOT available - ask user for GitHub info directly

## Component Guidelines

### Component Patterns

1. **BaseHead.astro** (`/home/user/odoenet/src/components/BaseHead.astro`)
   - Accepts: `title`, `description`, `image` props
   - Handles: SEO meta tags, Open Graph, Twitter Cards, font preloading
   - Includes: Buy Me a Coffee widget
   - Always use for consistent meta tags

2. **Header.astro** (`/home/user/odoenet/src/components/Header.astro`)
   - Navigation links: Home, Blog, Podcast, Made
   - Social icons: GitHub, YouTube, LinkedIn
   - Uses HeaderLink component for active state

3. **Footer.astro** (`/home/user/odoenet/src/components/Footer.astro`)
   - Social links: Mastodon, Twitter, GitHub, YouTube, Twitch, LinkedIn
   - RSS feed link
   - Copyright info

4. **BlogPost.astro** (`/home/user/odoenet/src/layouts/BlogPost.astro`)
   - Loads lite-youtube-embed CSS/JS
   - Displays hero image (1020x510)
   - Shows pubDate and optional updatedDate
   - Max content width: 720px

### Creating New Components

- Use `.astro` extension
- Include TypeScript type definitions
- Use scoped `<style>` tags
- Follow existing component patterns
- Use CSS custom properties for colors

## Styling Conventions

### Global CSS (`/home/user/odoenet/src/styles/global.css`)

Based on Bear Blog's default CSS (MIT licensed) with customizations:

**Custom Properties:**
```css
--accent: #2337ff
--accent-dark: #000d8a
/* RGB-based color system for transparency */
--gray: 96, 115, 159
--gray-light: 229, 233, 240
--gray-dark: 34, 41, 57
--gray-gradient: ... /* Gradient background */
```

**Typography:**
- Font: Atkinson (regular 400, bold 700)
- Preloaded for performance
- Located in `/public/fonts/`

**Layout:**
- Max content width: 720px
- Mobile breakpoint: 720px
- Gradient background
- Responsive design (mobile-first)

### Accessibility

- Use `.sr-only` utility class for screen readers
- Include ARIA labels on social links
- Semantic HTML structure
- Proper heading hierarchy

## Content Management

### Adding Blog Posts

1. **Location**: `/home/user/odoenet/src/content/blog/`
2. **Format**: Markdown (`.md`) or MDX (`.mdx`)
3. **Naming**: Use kebab-case (e.g., `my-new-post.md`)
4. **Images**: Store in `/home/user/odoenet/src/assets/blog/[post-name]/images/`

### Content Features

- **CodePen embeds**: Supported in Markdown
- **YouTube videos**: Use `<lite-youtube videoid="..."></lite-youtube>`
- **Hero images**: Relative path from blog post (e.g., `../../assets/blog/...`)
- **Code highlighting**: Shiki with "catppuccin-mocha" theme
- **Remote images**: Supported via Astro's Image component

### RSS Feed

- **Location**: `/home/user/odoenet/src/pages/rss.xml.js`
- **Count**: Returns 10 most recent posts
- **Sorting**: Newest first by pubDate

## Common Tasks

### Add a New Blog Post

```bash
# 1. Create markdown file
touch src/content/blog/my-new-post.md

# 2. Add frontmatter and content
# 3. Add images to src/assets/blog/my-new-post/images/
# 4. Reference images: heroImage: "../../assets/blog/my-new-post/images/cover.jpg"
```

### Update Site Constants

Edit `/home/user/odoenet/src/consts.ts`:
```typescript
export const SITE_TITLE = "odoenet";
export const SITE_DESCRIPTION = "Geodev and web development";
```

### Modify Syntax Highlighting Theme

Edit `/home/user/odoenet/astro.config.mjs`:
```javascript
markdown: {
  shikiConfig: {
    theme: "catppuccin-mocha", // Change theme here
  },
}
```

### Add New Social Links

1. Update `/home/user/odoenet/src/components/Header.astro`
2. Update `/home/user/odoenet/src/components/Footer.astro`
3. Use existing icon pattern (no external icon libraries)

## Important Conventions for AI Assistants

### File Operations

1. **ALWAYS Read Before Edit/Write**: Must use Read tool before Edit/Write on existing files
2. **Prefer Edit Over Write**: Use Edit tool for existing files, Write only for new files
3. **No Unnecessary Files**: Don't create documentation files unless explicitly requested
4. **No Emojis**: Don't use emojis unless user explicitly requests them

### Code Standards

1. **TypeScript Strict Mode**: All code must pass strict type checking
2. **Security**: Watch for OWASP Top 10 vulnerabilities (XSS, injection, etc.)
3. **Accessibility**: Include semantic HTML and ARIA labels
4. **Performance**:
   - Preload critical assets
   - Optimize images with Sharp
   - Use lazy loading where appropriate

### Content Guidelines

1. **Focus Areas**: ArcGIS Maps SDK for JavaScript, web development, TypeScript
2. **Tone**: Technical, informative, conversational
3. **Code Examples**: Include working code snippets with syntax highlighting
4. **External Resources**: Link to official docs (MDN, ArcGIS, etc.)

### Component Development

1. **Scoped Styles**: Always use scoped `<style>` in components
2. **Type Safety**: Define TypeScript types for props
3. **CSS Variables**: Use existing custom properties when possible
4. **Responsive**: Test at mobile breakpoint (720px)

### Build & Deployment

1. **Output Directory**: Custom path `./output/dist/` (don't change)
2. **Static Site**: All pages are pre-rendered at build time
3. **Integrations**: MDX, Sitemap, RSS feed are essential
4. **Image Optimization**: Sharp handles automatic optimization

## Configuration Files

### astro.config.mjs

```javascript
export default defineConfig({
  outDir: "./output/dist",           // Custom build output
  site: "https://odoe.net",          // Site URL for sitemap/RSS
  integrations: [mdx(), sitemap()],  // Essential integrations
  markdown: {
    shikiConfig: {
      theme: "catppuccin-mocha",     // Syntax highlighting theme
    },
  },
});
```

### tsconfig.json

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "strictNullChecks": true
  },
  "exclude": ["dist"]
}
```

### .npmrc

```
shamefully-hoist=true  # Required for pnpm with Astro dependencies
```

## SEO & Performance

### SEO Features

- Canonical URLs
- Open Graph tags (Facebook/LinkedIn sharing)
- Twitter Card tags
- Sitemap.xml (automatic)
- RSS feed
- Descriptive meta tags
- Structured data ready

### Performance Optimizations

- Font preloading (Atkinson font)
- Image optimization (Sharp)
- Static site generation (fast page loads)
- Lazy loading for images
- Minimal JavaScript
- CSS custom properties (no CSS-in-JS runtime)

## Testing & Validation

### Before Committing

1. Run `npm run build` - Ensure clean build
2. Check TypeScript errors - Must pass strict checks
3. Test responsive design - Verify at 720px breakpoint
4. Validate links - Ensure no broken internal/external links
5. Check images - Verify hero images load correctly

### Common Build Issues

1. **Missing images**: Check relative paths in frontmatter
2. **Type errors**: Verify frontmatter matches schema
3. **MDX syntax**: Ensure proper JSX syntax in .mdx files
4. **Import errors**: Check file paths and extensions

## Key Files Reference

| File | Purpose | Location |
|------|---------|----------|
| Site constants | SITE_TITLE, SITE_DESCRIPTION | `/home/user/odoenet/src/consts.ts` |
| Content schema | Blog post validation | `/home/user/odoenet/src/content.config.ts` |
| Global styles | Site-wide CSS | `/home/user/odoenet/src/styles/global.css` |
| Astro config | Build & integrations | `/home/user/odoenet/astro.config.mjs` |
| Blog posts | All blog content | `/home/user/odoenet/src/content/blog/` |
| Blog images | Post hero images | `/home/user/odoenet/src/assets/blog/` |
| RSS feed | 10 recent posts | `/home/user/odoenet/src/pages/rss.xml.js` |

## Additional Notes

### Package Manager

- Use `npm` (package-lock.json present)
- Node version >=22 required
- `.npmrc` configured for Astro compatibility

### Content Collection Loader

- Uses Astro's new glob loader pattern (Astro 5+)
- Loads from `./src/content/blog`
- Patterns: `**/*.{md,mdx}`
- Type-safe with Zod validation

### Image Handling

- Local images: Import from `src/assets/`
- Remote images: Supported via Astro Image component
- Hero image dimensions: 1020x510 recommended
- Automatic optimization via Sharp

### External Dependencies Loading

- lite-youtube-embed: CDN loaded in BlogPost layout
- Buy Me a Coffee: Script in BaseHead component
- No external CSS frameworks (custom CSS only)

## Questions or Issues?

When encountering unclear situations:

1. **Check existing patterns**: Look at similar components/pages
2. **Verify schema**: Ensure content matches collection schema
3. **Test locally**: Use `npm run dev` to verify changes
4. **Build verification**: Run `npm run build` before committing
5. **Ask user**: When in doubt about design/content decisions

## Summary

This is a well-maintained, focused technical blog with:
- Clean, minimal design
- Strong SEO foundation
- Type-safe content management
- Performance-optimized builds
- Accessibility considerations
- Consistent coding patterns

When working on this codebase, prioritize:
- Code quality and type safety
- Performance and accessibility
- Consistency with existing patterns
- Security best practices
- Clear, maintainable code
