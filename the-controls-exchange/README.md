# The Controls Exchange: project folder

Shared working notes for maintaining [The Controls Exchange](https://albertmontilla472-creator.github.io/the-controls-exchange/). Claude and Codex both read this folder before changing the site, so either one can pick up where the other left off.

This folder is **not part of the website's design or content**. But the repository is public and GitHub Pages serves every file, so anything here is publicly readable. Don't store private information here.

| File | Use it for |
| --- | --- |
| `site-guide.md` | How the site is built: files, data model, CSP hashes, nav tree, icons, storage, writing style. Read before any change. |
| `release-checklist.md` | Step-by-step for shipping a new edition (5.38 → 5.39). |
| `maintainer-profile.md` | Who Albert is, project history, content and design preferences. |
| `codex-handoff.md` | Prompts for moving knowledge from Codex / ChatGPT into this folder. |
| `icons-manifest.json` | SHA-256 fingerprints and dimensions of every file in `icons/`. |
| `tools/check-site.py` | Static checks. `--fix-hashes` rewrites CSP hashes after editing inline code. |
| `tools/smoke-test.js` | Loads every page in headless Chromium (desktop and phone) and fails on errors. |
| `tools/codex/` | Public-safe Codex rendering modules, a write-free reproducibility check and extraction/draft-output commands. |

Run both tools from the repository root before every push:

```bash
python3 the-controls-exchange/tools/check-site.py
node the-controls-exchange/tools/smoke-test.js
```

When you learn something new about how Albert wants the site run, or the site's structure changes, update the matching file here in the same commit.
