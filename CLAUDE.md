# Claude instructions

The project instructions live in `AGENTS.md` (imported below) and the `the-controls-exchange/` project folder. Put new shared rules there, not here. Codex was retired on November 23, 2026; Claude is the only assistant and does every GitHub step for Albert.

@AGENTS.md

## Claude-specific

- Cloud sessions push to their assigned `claude/...` branch. Send Albert the preview screenshots as files in the chat. After he says "publish", open a pull request and merge it into `main` (which publishes the site). Never push to `main` directly.
- When Albert shares background, preferences or decisions in chat, add the publishable parts to `the-controls-exchange/maintainer-profile.md` in the same change.
