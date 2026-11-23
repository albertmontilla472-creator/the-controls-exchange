# The Controls Exchange: project folder

Shared working notes for maintaining [The Controls Exchange](https://albertmontilla472-creator.github.io/the-controls-exchange/). Claude reads this folder before changing the site, so any session can pick up where the last one left off. (Codex worked on the project until November 23, 2026, when Albert retired it.)

This folder is **not part of the website's design or content**. But the repository is public and GitHub Pages serves every file, so anything here is publicly readable. Don't store private information here.

| File | Use it for |
| --- | --- |
| `site-guide.md` | How the site is built: files, data model, CSP hashes, nav tree, icons, storage, writing style. Read before any change. |
| `release-checklist.md` | Step-by-step for shipping a new edition. |
| `maintainer-profile.md` | Who Albert is, project history, content and design preferences. |
| `codex-handoff.md` | Historical: the November 2026 prompts that moved Codex / ChatGPT knowledge into this folder. Codex is no longer used. |
| `icons-manifest.json` | SHA-256 fingerprints and dimensions of every file in `icons/`. |
| `tools/check-site.py` | Static checks. `--fix-hashes` rewrites CSP hashes after editing inline code. |
| `tools/smoke-test.js` | Loads every page in headless Chromium (desktop and phone) and fails on errors. |
| `tools/codex/` | Public-safe rendering modules (originally written by Codex, now maintained by Claude), a write-free reproducibility check and extraction/draft-output commands. The folder keeps its name so existing references stay valid. |

Run both tools from the repository root before every push:

```bash
python3 the-controls-exchange/tools/check-site.py
node the-controls-exchange/tools/smoke-test.js
```

When you learn something new about how Albert wants the site run, or the site's structure changes, update the matching file here in the same commit.
