# 🎸 Melo Chords

A personal collection of guitar chord sheets, built as a static website with [Hugo](https://gohugo.io/) and the [PaperMod](https://github.com/adityatelange/hugo-PaperMod) theme.

Live site: <https://org-carmelolg-private-labs.github.io/chords>

---

## Overview

This repository contains the source files for **Melo Chords**, a digital archive of chord charts for songs played in a bedroom-musician style. Each song page shows the chords and lyrics together, making it easy to follow along while playing guitar.

The site is written in Italian and targets Italian-speaking guitarists, though the chord notation is universal.

---

## Repository Structure

```
chords/
├── archetypes/          # Hugo content templates
├── assets/              # CSS/JS assets
├── content/
│   ├── posts/           # Song chord sheets, organised by artist
│   │   ├── bianco/              # Songs by Bianco
│   │   ├── brunorisas/          # Songs by BrunoriSas
│   │   ├── colapesce/           # Songs by Colapesce
│   │   ├── colapesce-dimartino/ # Songs by Colapesce & Dimartino
│   │   ├── dalla/               # Songs by Lucio Dalla
│   │   └── .../                 # Songs by other artists
│   ├── archives.md      # Archive page
│   └── search.md        # Search page
├── static/              # Static files (images, favicon, …)
├── themes/              # Hugo themes (PaperMod as a git submodule)
├── hugo.yaml            # Hugo site configuration
└── README.md
```

---

## How Songs and Artists Are Organised

Each artist has its own sub-directory under `content/posts/`. Inside that directory every song is a single Markdown file with Hugo front matter. When a song is shared by two artists, a combined directory is used (e.g. `colapesce-dimartino/`) and the `autori` field is set to `"Artist A & Artist B"`.

**Example front matter:**

```yaml
---
author: ["carmelolg"]
title: "Lucio Dalla - L'ultima luna"
date: "2026-04-08"
description: ""
livello: Basso        # difficulty level: Basso / Medio / Alto
autori: Lucio Dalla   # artist name (used as a taxonomy tag)
genere: Cantautorato  # music genre (used as a taxonomy tag)
ShowToc: false
---
```

For songs by multiple artists, use `&` to join the names:

```yaml
autori: "Colapesce & Dimartino"
```

The site exposes three custom taxonomies that allow filtering by:

| Taxonomy | Values           | URL            |
|----------|------------------|----------------|
| `livello` | Basso / Medio / Alto | `/livello/`  |
| `autori`  | Artist names     | `/autori/`     |
| `genere`  | Music genres     | `/genere/`     |

---

## Local Development

### Prerequisites

- [Hugo](https://gohugo.io/installation/) (extended edition, v0.112+)
- [Git](https://git-scm.com/)

### Clone with submodules

```bash
git clone --recurse-submodules https://github.com/org-carmelolg-private-labs/chords.git
cd chords
```

If you already cloned without `--recurse-submodules`, run:

```bash
git submodule update --init --recursive
```

### Start the development server

```bash
hugo server -D
```

Open <http://localhost:1313> in your browser. The site rebuilds automatically on every file change.

### Build for production

```bash
hugo --minify
```

The output is generated in the `public/` directory.

---

## Adding a New Song

1. Create a new Markdown file inside the appropriate artist directory, e.g.:

   ```
   content/posts/dalla/nome-della-canzone.md
   ```

2. Add the front matter (see the example above).

3. Write the chord sheet inside a fenced `text` code block.

4. Optionally embed a YouTube video at the bottom:

   ```
   {{< youtube VIDEO_ID >}}
   ```

5. Commit and push — the CI/CD pipeline deploys the site automatically.

---

## Contribution Guidelines

Contributions are welcome! Please follow these steps:

1. **Fork** the repository and create a feature branch from `master`.
2. Add or update chord sheets following the structure described above.
3. Make sure the site builds locally without errors (`hugo server -D`).
4. Open a **Pull Request** with a clear description of what you added or changed.

> **Note:** By submitting a contribution you agree that your content will be licensed under the same [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) license that covers the rest of this repository.

---

## License

All content in this repository (chord charts, lyrics excerpts, and associated text) is licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International** license.

[![CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

You are free to:
- **Share** — copy and redistribute the material in any medium or format.
- **Adapt** — remix, transform, and build upon the material.

Under the following terms:
- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made.
- **NonCommercial** — You may not use the material for commercial purposes.
- **ShareAlike** — If you remix, transform, or build upon the material, you must distribute your contributions under the same license.

Full license text: <https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode>

---

## Credits

- Site built with [Hugo](https://gohugo.io/) and the [PaperMod](https://github.com/adityatelange/hugo-PaperMod) theme.
- Chord sheets curated by [@carmelolg](https://carmelolg.github.io).
