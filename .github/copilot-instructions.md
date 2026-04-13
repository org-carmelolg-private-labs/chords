# Copilot instructions for Melo Chords

## Build commands

Use Hugo directly; there is no Node.js toolchain in this repository.

```bash
# local development, including drafts
hugo server -D

# production-style build to the committed output directory
hugo --destination docs

# minified production build
hugo --minify
```

## Test and lint

There is no automated test suite or lint configuration in this repo.

For validation, use:

```bash
hugo --destination docs
```

## High-level architecture

Melo Chords is a Hugo static site built on the `hugo-PaperMod` theme and published through GitHub Pages.

- Site-wide configuration lives in `hugo.yaml`
- The homepage uses PaperMod **Profile Mode**
- The home page also emits **JSON** (`outputs.home = HTML/RSS/JSON`), which supports the search page in `content/search.md`
- Song content lives under `content/posts/<artist-slug>/`
- Guide pages live under `content/tips/` and are also surfaced through the `tips` menu tree in `hugo.yaml`
- The generated site is committed under `docs/`, and `.github/workflows/main.yml` rebuilds `docs/` on pushes to `master`

Most rendering comes from PaperMod, but this repository does have custom template overrides:

- `layouts/partials/header.html` replaces the default header with a custom navigation implementation, including the dropdown menu for Guides
- `layouts/partials/footer.html` customizes footer behavior while keeping PaperMod features like theme toggle and code-copy buttons
- `assets/css/extended/vars.css` and `assets/css/extended/custom.css` hold the theme variable overrides and custom UI styling that PaperMod auto-loads

## Content conventions

Each song is a single Markdown file inside the matching artist directory:

```text
content/posts/<artist-slug>/<song-slug>.md
```

Use front matter in this shape:

```yaml
---
title: "Artist - Song Title"
author: ["carmelolg"]
date: "YYYY-MM-DD"
description: ""
livello: Medio
autori: "Artist Name"
genere: "Cantautorato"
ShowToc: false
---
```

Important repository-specific rules:

- Keep user-facing text in Italian
- Put the chord sheet inside a fenced `text` code block
- Add YouTube embeds with `{{< youtube VIDEO_ID >}}`
- Use one directory per artist under `content/posts/`
- For collaborations, use a combined artist directory such as `content/posts/colapesce-dimartino/` and join artist names with `&` in both `title` and `autori`

## Taxonomies and metadata

`hugo.yaml` remaps Hugo taxonomies into the site’s Italian structure:

- `livello` -> difficulty filter
- `autori` -> artist filter
- `genere` -> genre filter

Populate all three on every song page.

Use these exact `livello` values:

- `Basso`
- `Medio-Basso`
- `Medio`
- `Medio-Alto`
- `Alto`

`autori` should match existing taxonomy values exactly to avoid creating duplicate artist filter pages with slightly different names.

## Chord-sheet editing conventions

When editing an existing song:

- edit the existing file in place unless the task explicitly requires a move
- preserve front matter unless the metadata itself is wrong
- keep section labels consistent with the repo style, e.g. `[Intro]`, `[Strofa 1]`, `[Ritornello]`, `[Bridge]`, `[Outro]`
- prefer harmonic correctness over perfect spacing, but keep chord/lyric alignment readable

When chords look suspicious, compare multiple sources before changing harmony; treat user-submitted chord sites as hints, not ground truth.

## Commit workflow

When asked to commit:

- use Conventional Commits
- stage with `git add -A`
- include the required trailer:

```text
Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```

Pushes go to `master`. Because CI auto-commits regenerated `docs/`, a rejected push should be handled with rebase rather than force-push.
