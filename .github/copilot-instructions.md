# Copilot instructions for Melo Chords

## Start with the project skills

This repository defines three custom skills under `.github/skills/`:

1. **`melo-chords`**: use for general repository context, Hugo workflow, site structure, song-post conventions, taxonomy rules, and difficulty assignment.
2. **`correct-chord-sheet`**: use when fixing an existing song in `content/posts/`. Verify lyrics and chords against reliable sources before editing, preserve front matter unless the metadata itself is wrong, and keep section labels and formatting consistent with the repository style.
3. **`git-workflow`**: use whenever committing or pushing. Follow Conventional Commits, stage with `git add -A`, include the required `Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>` trailer, push to `master`, and never force-push.

When a task matches one of these skills, prefer using it instead of re-deriving the workflow from scratch.

## Repository purpose

Melo Chords is a Hugo static site that archives guitar chord sheets for Italian songs. The site language is Italian and user-facing strings, labels, taxonomy names, and prose should stay in Italian.

## Core architecture

- Hugo site configured in `hugo.yaml`
- Theme: `hugo-PaperMod`
- Homepage uses PaperMod Profile Mode
- Theme files live in `themes/` and are managed as git submodules
- `layouts/` is intentionally empty; prefer theme configuration over custom layouts unless a task clearly requires otherwise
- CSS overrides belong in `assets/css/extended/`, especially `vars.css` and `custom.css`
- Built site output is committed to `docs/`

## Build and development

There is no Node.js pipeline and no test suite in this repository.

Use Hugo commands only:

```bash
hugo server -D
hugo --destination docs
hugo --minify
```

Use `hugo --destination docs` when you need to regenerate the committed site output. Hugo Extended v0.112+ is required.

## Deployment and CI

- GitHub Actions runs on pushes to `master`
- The workflow rebuilds the site into `docs/`
- The workflow auto-commits updated generated output

Because CI may create a new commit on `master`, a push can fail if the remote moved ahead. If asked to push, follow the `git-workflow` skill guidance and rebase instead of force-pushing.

## Content structure

Song posts live under `content/posts/<artist-slug>/`.

- One song per Markdown file
- Shared-artist songs use a combined directory such as `content/posts/colapesce-dimartino/`
- Chord sheets belong inside a fenced `text` code block
- YouTube embeds use `{{< youtube VIDEO_ID >}}`

Typical supporting content such as search/archive pages lives directly under `content/`.

## Front matter requirements for song posts

Use this shape:

```yaml
---
author: ["carmelolg"]
title: "Artist - Song Title"
date: "YYYY-MM-DD"
description: ""
livello: Basso
autori: Artist Name
genere: Cantautorato
ShowToc: false
---
```

Important rules:

- `title` should follow `Artist - Song Title`
- For joint artists, use `&` in both `title` and `autori`
- Populate all three taxonomies: `livello`, `autori`, and `genere`
- Keep `autori` values consistent with existing entries to avoid duplicate taxonomy pages

## Taxonomies

The site uses these Italian taxonomies:

- `livello`: difficulty
- `autori`: artist
- `genere`: genre

Allowed difficulty values are exact and must not be renamed:

- `Basso`
- `Medio-Basso`
- `Medio`
- `Medio-Alto`
- `Alto`

Assign `livello` from the actual playing difficulty of the arrangement, considering chord vocabulary, transition speed, rhythm, structure, and sing-and-play coordination.

## Editing guidance

- Preserve existing style and structure unless the task requires a deliberate change
- Keep section labels in Italian when editing song sheets
- Prefer minimal, targeted edits over broad rewrites
- Do not create duplicate song files when correcting an existing entry unless explicitly asked
- Avoid introducing English UI copy into site content or navigation

## Contribution defaults

When contributing:

1. Read the relevant skill first.
2. Keep changes aligned with Hugo and PaperMod conventions already used in the repo.
3. Update generated `docs/` when the task requires a production build or modifies site output that should be committed.
4. Use documentation-style commits for instruction changes and content-style commits for song additions or fixes.
