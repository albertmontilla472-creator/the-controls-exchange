# Release checklist

Every change visible on the site ships as a numbered **edition**. Small fixes bump the minor number (for example 5.40 → 5.41); `check-site.py` prints the current one. The history is in `maintenance` inside `index.html` and in commit messages.

Changes that only touch this `the-controls-exchange/` folder, `AGENTS.md` or `CLAUDE.md` do not change the website and **do not** need an edition.

## 1. Make the change

- Follow `site-guide.md`. Keep the existing layout, folder ids, resource ids and storage keys unless Albert explicitly asks otherwise.
- New resources: next free id per track (`check-site.py` prints them), every required field, flat fields equal to `metadata`, `checked` = today, `addedEdition` = the new edition, link host in `security.approvedHosts` (add the host if it's a new, reviewed publisher domain).
- New creator: add to `recommended.publishers`, and add a logo only if it's verified (see site guide §6).
- Update the matching static collection page(s) for any added, edited or removed resource.
- Removed resource: delete the record, add its id to `retiredResourceIds`, remove it from collection pages and programming paths.

## 2. Bump the edition (all of these, same version and date)

1. `release`: `version`, `updated` (e.g. `November 4, 2026`), `changes` (2–3 sentences).
2. `maintenance`: insert a new entry **at the top** with the same `version`, `date`, a one-line `review`, and the same `changes`.
3. `publicSite.updated`: same date.
4. `?v=` cache-busters on **every** HTML page (`controls-exchange-mark.svg?v=…`, `controls-exchange-logo.svg?v=…`): 4 places in `index.html`, 2 in each collection page, 1 in privacy/terms.
5. `privacy.html` and `terms.html`: "Updated <date>" line.
6. `README.md`: append a short paragraph, e.g. `Edition 5.39 adds …`. Keep the counts accurate (resources, direct videos, documentation references, credited publishers; `check-site.py` prints them).
7. If the CSS in `index.html` changed: copy the identical `<style>` into `privacy.html` and `terms.html`.

Shortcut for steps 4, 5 and 7 plus all CSP hashes: after editing the data in `index.html` (steps 1–3), render with `node the-controls-exchange/tools/codex/generate-public.mjs --output-dir <folder outside the repo>` and copy back only the `.html` files that differ. Edition 5.40 was released this way.

Release-note voice: what changed, then what was preserved ("All N learning records, saved notes, IDs, source links and true addition dates are preserved.").

## 3. Verify

```bash
python3 the-controls-exchange/tools/check-site.py --fix-hashes
python3 the-controls-exchange/tools/check-site.py
node the-controls-exchange/tools/smoke-test.js
```

Both must end with 0 errors / "All pages loaded without errors". Also open the page and look at the area you changed (desktop and phone width).

## 4. Preview for Albert

- Take desktop (1440×900) and phone (390×844) screenshots of the changed area. `node the-controls-exchange/tools/smoke-test.js <folder>` saves Home screenshots to `<folder>`; capture the changed area separately if it isn't on Home.
- Show Albert the screenshots plus a short summary: what changed and what stayed the same.
- **Wait for Albert to say "publish".** If he asks for adjustments, make them, re-run the checks and preview again.

## 5. Publish (only after Albert says "publish")

- Commit message style: `Release 5.39: <what changed>` or `<What changed> (5.39)`.
- `main` is live. Claude pushes its `claude/...` branch, opens a pull request and merges it into `main`. Codex commits to `main`. Neither publishes before Albert's OK.
- GitHub Pages usually updates within a minute or two of the change reaching `main`.
