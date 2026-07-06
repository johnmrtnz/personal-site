# personal-site

Personal website and blog, live at [johnmrtnz.github.io/personal-site](https://johnmrtnz.github.io/personal-site/).

Built with [Astro](https://astro.build) and React (used for the interactive hero effects and navbar).

## Development

```bash
npm install
npm run dev       # dev server at http://localhost:4321/personal-site/
npm run build     # production build to dist/
npm run preview   # serve the production build locally
```

## Writing a blog post

Add a markdown file to `src/content/blog/`:

```markdown
---
title: "My Post Title"
description: "One-line summary shown in the post list and meta tags."
pubDate: 2026-07-06
---

Post content in markdown...
```

Set `draft: true` in the frontmatter to keep a post out of the published site.

## Deployment

Every push to `main` triggers the GitHub Actions workflow
(`.github/workflows/deploy.yml`), which builds the site and deploys it to
GitHub Pages. No manual deploy step.
