---
name: correct-chord-sheet
description: >-
    Instructions for correcting a song chord sheet by verifying lyrics and
    chords against reliable online sources before editing the Markdown post.
user-invocable: true
---

# Correct Chord Sheet

Use this skill when you need to fix an existing song sheet in `content/posts/`
because the chords, section labels, or chord placement look wrong.

## Goal

Produce a corrected Markdown chord sheet that matches the song more closely
without inventing unsupported changes.

## Required workflow

1. Open the existing post and identify the song title, artist, and current key.
2. Search online for chord and lyric references before editing anything.
3. Compare at least two independent sources when possible.
4. Prefer sources that include both lyrics and chords, not chord names alone.
5. If available, use the official recording or a reliable live performance as a tie-breaker.
6. Edit the existing post in place. Do not create a duplicate song file unless explicitly asked.

## Search strategy

- Search using combinations of artist, song title, `accordi`, `chords`, `tab`,
  and `testo e accordi`.
- Prefer reputable chord/lyrics references over random reposts.
- If sources disagree, check whether one version is transposed or uses a capo.
- Distinguish between:
  - genuinely wrong chords
  - correct chords in a different key
  - formatting differences that do not change harmony
- Treat user-submitted chord sites as hints, not ground truth.

## Editing rules

- Preserve the existing front matter unless a metadata error is directly relevant.
- Keep the song under the same `content/posts/<artist-slug>/` path unless the user asks for a move.
- Keep the chord sheet inside a fenced `text` code block.
- Preserve the overall repository style: section headers like `[Intro]`, `[Strofa 1]`, `[Ritornello]`, `[Bridge]`, `[Outro]`.
- Keep UI text and prose in Italian.
- Maintain readable lyric/chord alignment, but prioritize harmonic correctness over perfect spacing.
- Do not rewrite lyrics beyond the minimum needed to align the corrected chords and obvious textual mistakes found during verification.

## Decision rules

- Make a correction only when it is supported by strong evidence from the comparison.
- If a whole song is consistently shown in another key, normalize only if the current file is clearly wrong rather than merely transposed.
- If uncertainty remains on a passage, prefer the version best supported by multiple sources and the recording.
- Do not add speculative embellishment chords just because one source is more complex.
- Keep simplified chords if they still fit the recording and the repository style, unless the current sheet is plainly incorrect.

## Expected output

The final result should be a corrected Markdown post with:

- harmonically credible chords
- section structure consistent with the song
- preserved Hugo front matter and YouTube shortcode, if present
- no duplicate files or unrelated cleanup
