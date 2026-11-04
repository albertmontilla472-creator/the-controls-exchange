# Working on The Controls Exchange

Instructions for AI coding agents (Codex, Claude and others). Albert Montilla (Smarty.ctrl) maintains this free BAS learning directory with more than one assistant, so everything shared lives in the repo.

**Before any change, read the project folder `the-controls-exchange/`**: `site-guide.md` (how the site works), `release-checklist.md` (how to ship), `maintainer-profile.md` (Albert's preferences). Update those files when you learn something new.

## How Albert wants changes made (confirmed by Albert, November 3, 2026)

1. **Only make a change when you are absolutely confident it is what Albert wants.** If anything is unclear (wording, placement, which resource, how far the change should go), ask him first. A question is always better than a guess.
2. **Preview first.** Make the change on a branch or locally and run both checks. Then show Albert desktop and phone screenshots of the changed area and a short summary of what changed and what stayed the same. **Nothing reaches `main` (the live site) until he says "publish".** After that, publish it for him. Notes-only changes (this file, `CLAUDE.md`, `the-controls-exchange/`) need no screenshots, but tell him what you are recording.

## Non-negotiables

1. **`main` is the live website** (GitHub Pages, repository root, no build step). Only verified changes that Albert has approved go to `main`.
2. **Do exactly what Albert asks and keep everything else as it is**: layout, Home order, colors, folder structure, icons. He has reversed unrequested redesigns. Ask before broader visual changes.
3. **Every inline `<script>`/`<style>` is pinned by SHA-256 in each page's CSP.** After editing any of them (including the resource JSON in `index.html`) run `python3 the-controls-exchange/tools/check-site.py --fix-hashes`. A stale hash blanks the site. No inline `style=""` or `on*=` attributes, no remote images, scripts or fonts.
4. **Resource ids are permanent** (`N`, `H`, `S`, `C`, `J`, `D`, `B` + number). Never renumber or reuse, including `retiredResourceIds`. Never rename the browser storage keys. Visitors' saved notes depend on both.
5. **Free, public, original-source learning only.** Credit the creator, link to the original, never rehost. No paid/gated material, affiliate links, ads, trackers or embeds. Link hosts must be in `security.approvedHosts`.
6. **Visible site changes ship as a new edition** (5.38 → 5.39): bump `release`, add a `maintenance` entry, update `publicSite.updated`, the `?v=` cache-busters on every page, privacy/terms dates and the README. See `release-checklist.md`. Changes limited to `the-controls-exchange/`, `AGENTS.md` and `CLAUDE.md` don't need an edition.
7. **The repository is public.** Never commit private details, credentials, customer or building information. Albert keeps a separate private backup.
8. The daily automated review is **paused**. Don't restart it unless Albert asks.

## Verify before every push

```bash
python3 the-controls-exchange/tools/check-site.py
node the-controls-exchange/tools/smoke-test.js
```

Both must pass. Then check the changed area visually at desktop and phone widths.

## Editing the resource data

The JSON in `<script id="library-data">` round-trips exactly with `json.dumps(data, ensure_ascii=False, separators=(",", ":"))`. Load it, change it, write it back that way. Keep the flat fields identical to `metadata`. Update the matching static collection page(s) by hand.
