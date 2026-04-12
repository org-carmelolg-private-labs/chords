---
name: melo-chords
description: >-
    Repository guide for Melo Chords: Hugo build commands, site architecture,
    song content conventions, and taxonomy rules.
user-invocable: true
---

# Melo Chords

A personal Hugo static site archiving guitar chord sheets for Italian songs, deployed to GitHub Pages.

## Build & Development

```bash
# Start local dev server (with drafts)
hugo server -D

# Production build (output -> docs/)
hugo --destination docs

# Production build with minification
hugo --minify
```

> Requires Hugo Extended v0.112+. Themes are git submodules - clone with:
> `git clone --recurse-submodules <repo>`

No Node.js build pipeline. No test suite.

## Architecture

- **Theme:** `hugo-PaperMod` in **Profile Mode** (configured in `hugo.yaml`)
- **Output dir:** `docs/` - committed to the repo; GitHub Pages serves from there
- **CI:** `.github/workflows/main.yml` builds on every push to `master` and auto-commits the updated `docs/`
- **`layouts/`** is intentionally empty - all layouts come from the PaperMod theme
- **`assets/css/extended/`** is where CSS overrides live (`vars.css` for CSS custom properties, `custom.css` for component overrides); PaperMod automatically loads any CSS in this path

## Content Conventions

All song posts live under `content/posts/<artist-slug>/`. Each post is a Markdown file with this front matter:

```yaml
---
author: ["carmelolg"]
title: "Artist - Song Title"
date: "YYYY-MM-DD"
description: ""
livello: Basso          # Basso | Medio-Basso | Medio | Medio-Alto | Alto
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
| `livello` | Basso / Medio-Basso / Medio / Medio-Alto / Alto | Difficulty |
| `autori` | Artist name | Filter by artist |
| `genere` | e.g. Cantautorato, Rock | Filter by genre |

When adding a song, all three should be populated. `autori` values must match the existing taxonomy entries to avoid creating duplicate filter pages.

## Difficulty assignment

Use these exact taxonomy values when setting `livello`: `Basso`, `Medio-Basso`, `Medio`, `Medio-Alto`, `Alto`.

Assign the value based on the actual playing difficulty of the arrangement in the post, not just the popularity of the song:

| Level | Typical characteristics |
|-------|-------------------------|
| `Basso` | 3-4 mostly open major/minor chords, steady rhythm, no difficult barre chords, and no recurring extended or unconventional voicings |
| `Medio-Basso` | mostly open chords with a few faster changes, one manageable barre chord, or occasional color chords such as `maj7`, `sus`, `add9`, `6`, slash chords, or simple fifth chords |
| `Medio` | wider chord vocabulary, recurring barre chords, recurring color chords, or some non-conventional harmony that still stays playable in a straightforward arrangement |
| `Medio-Alto` | several extended, altered, slash, or non-standard chords, quick transitions, syncopated rhythm, or voicings that require good control |
| `Alto` | advanced harmony, many recurring non-open or non-conventional shapes, demanding rhythm, complex transitions, or parts that are hard to sing and play together |

When in doubt, estimate the level from these signals:

- **Chord vocabulary:** open chords are easier; frequent barre, `maj7`, `7`, `m7`, `6`, `sus`, slash chords, fifth chords that need precise muting, or unusual shapes increase difficulty.
- **Transition speed:** fast changes and awkward jumps increase difficulty.
- **Rhythm:** syncopation, stops, accents, and irregular phrasing make the song harder.
- **Structure:** long forms, many sections, and instrumental parts increase the memory load.
- **Coordination:** if the strumming or picking pattern is hard to keep while singing, lean toward a higher level.

Recurring or structurally important extended chords should affect the final level more than a single passing color chord.

Prefer the lower adjacent category only when the arrangement can still be played convincingly in a simplified way without changing the song's identity.

## Adding a New Song

1. Create `content/posts/<artist-slug>/<song-slug>.md`
2. Fill in the front matter (see above)
3. Add the chord sheet in a `text` code block
4. Optionally embed a YouTube video with `{{< youtube ID >}}`
5. Push to `master` - CI builds and deploys automatically

## Site Language

The site is in **Italian** (`languageCode: it-IT`). Menu labels, taxonomy names, and UI strings should remain Italian. PaperMod's i18n files in the theme handle built-in UI strings.
