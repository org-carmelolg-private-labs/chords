---
name: git-workflow
description: >-
    Rules for writing commit messages, staging files, and pushing to the
    Melo Chords repository. Follow this skill whenever you need to commit
    and push changes.
user-invocable: true
---

# Git Workflow — Melo Chords

## Commit message format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <short summary>

<optional body>

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```

### Types

| Type | When to use |
|------|-------------|
| `feat` | New song or new feature |
| `fix` | Correcting chords, fixing a bug |
| `refactor` | Restructuring content/code without changing behaviour |
| `docs` | README, repo skills, or other documentation only |
| `chore` | Config, CI, or housekeeping changes |

### Summary rules

- Lowercase, no trailing period
- Max ~72 characters
- For songs: `feat: add <Artist> - <Song Title>`

### Body rules

- Explain *what* changed and *why* (not *how*)
- Use a bullet list when touching multiple files
- Leave a blank line between summary and body
- Always end with the `Co-authored-by` trailer

### Example

```
feat: add Colapesce & Dimartino - Sesso e architettura

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```

```
fix: merge duplicate Colapesce & Dimartino song into a single entry

- Remove duplicate from content/posts/colapesce/
- Remove duplicate from content/posts/dimartino/ (now empty, dir deleted)
- Add unified post under content/posts/colapesce-dimartino/
- Update README.md and `.github/skills/melo-chords/SKILL.md`

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```

## Staging and committing

Always stage **all** new and modified files before committing:

```bash
git add -A
git commit -m "<message>"
```

## Pushing

Push to `master`. If the push is rejected because the remote is ahead
(the CI workflow auto-commits the built `docs/` on every push), rebase
and push again:

```bash
git push || (git pull --rebase && git push)
```

Never force-push to `master`.
