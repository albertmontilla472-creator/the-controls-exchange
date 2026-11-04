# Bringing Codex / ChatGPT knowledge into this project

Codex and ChatGPT keep their memory in their own chat history. Claude can't read it. To share it, ask them to write it down, then put it where both tools look: this folder.

## Option A: Codex (it can edit this repository)

Paste this into Codex, in a task on this repository:

> I'm now also using Claude on this project. Both of you should work from the same written context in the `the-controls-exchange/` folder of this repo (read `AGENTS.md` and every file in that folder first).
>
> 1. Add to `the-controls-exchange/maintainer-profile.md`, under "Imported from Codex / ChatGPT", everything you know about me, my background, goals, preferences and past instructions for this website that is **not already in that file**, and correct anything in the *(inferred)* sections that is wrong. This repository is public: include only things that are safe to publish. Leave out private contact details, employer/customer information, credentials and building information. List anything private you left out in your reply to me instead of in the file.
> 2. Describe in `the-controls-exchange/site-guide.md`, under a new heading "Codex tooling", the scripts or process you used to generate `index.html`, the collection pages, privacy/terms and the logo fingerprints, and where they live. If they are safe to publish, add them to `the-controls-exchange/tools/`.
> 3. Explain where the private project backup and the "desktop filenames" you mention in release notes are kept, and what is in them (in your reply, not in the repo).
> 4. Don't change the website itself and don't bump the edition. Run `python3 the-controls-exchange/tools/check-site.py` and make sure it still reports 0 errors. Commit with the message "Add Codex project knowledge to the shared project folder".

## Option B: ChatGPT (no repository access)

Paste this into the ChatGPT conversation(s) where you worked on the site:

> Summarize everything you know about me and my website "The Controls Exchange" (free BAS training directory at albertmontilla472-creator.github.io/the-controls-exchange): my background and goals, design and content preferences, decisions we made, things I asked you never to do, open ideas and plans. Use short bullet points under headings. Mark anything private.

Then paste the answer to Claude and say "add this to the project folder". Claude will add the publishable parts to `maintainer-profile.md` and keep private details out of the repository.

ChatGPT's saved memories are also at Settings → Personalization → Memory → Manage. You can copy those and paste them the same way.

## After importing

Delete anything private that slipped in before merging to `main`. Merging publishes it, both on GitHub and on the live website.
