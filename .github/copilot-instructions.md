# Copilot Instructions — Melo Chords

A personal Hugo static site archiving guitar chord sheets for Italian songs, deployed to GitHub Pages.

## Build & Development

```bash
# Start local dev server (with drafts)
hugo server -D

# Production build (output → docs/)
hugo --destination docs

# Production build with minification
hugo --minify
```

> Requires Hugo Extended v0.112+. Themes are git submodules — clone with:
> `git clone --recurse-submodules <repo>`

No Node.js build pipeline. No test suite.

## Architecture

- **Theme:** `hugo-PaperMod` in **Profile Mode** (configured in `hugo.yaml`)
- **Output dir:** `docs/` — committed to the repo; GitHub Pages serves from there
- **CI:** `.github/workflows/main.yml` builds on every push to `master` and auto-commits the updated `docs/`
- **`layouts/`** is intentionally empty — all layouts come from the PaperMod theme
- **`assets/css/extended/`** is where CSS overrides live (`vars.css` for CSS custom properties, `custom.css` for component overrides); PaperMod automatically loads any CSS in this path

## Content Conventions

All song posts live under `content/posts/<artist-slug>/`. Each post is a Markdown file with this front matter:

```yaml
---
author: ["carmelolg"]
title: "Artist - Song Title"
date: "YYYY-MM-DD"
description: ""
livello: [Basso]        # Basso | Medio | Alto
autori: Artist Name     # must match existing taxonomy values exactly
genere: Cantautorato    # genre taxonomy
ShowToc: false
---
```

For songs shared by two artists, use a combined directory (e.g. `content/posts/colapesce-dimartino/`) and join the names with `&` in both `title` and `autori`:

```yaml
title: "Colapesce & Dimartino - Song Title"
autori: "Colapesce & Dimartino"
```

Chord sheets go in a fenced ` ```text ``` ` code block. YouTube embeds use the built-in shortcode: `{{< youtube VIDEO_ID >}}`.

## Taxonomies

Three custom taxonomies drive the site filters:

| Taxonomy | Values | Purpose |
|----------|--------|---------|
| `livello` | Basso / Medio / Alto | Difficulty |
| `autori` | Artist name | Filter by artist |
| `genere` | e.g. Cantautorato, Rock | Filter by genre |

When adding a song, all three should be populated. `autori` values must match the existing taxonomy entries to avoid creating duplicate filter pages.

## Adding a New Song

1. Create `content/posts/<artist-slug>/<song-slug>.md`
2. Fill in the front matter (see above)
3. Add the chord sheet in a `text` code block
4. Optionally embed a YouTube video with `{{< youtube ID >}}`
5. Push to `master` — CI builds and deploys automatically

## Site Language

The site is in **Italian** (`languageCode: it-IT`). Menu labels, taxonomy names, and UI strings should remain Italian. PaperMod's i18n files in the theme handle built-in UI strings.
