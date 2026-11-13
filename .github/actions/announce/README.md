# Announce release

Posts release news for the `wolfstar-project` repositories to a Discord webhook. One action, three modes:

| Mode       | Used by                          | What it does                                                                                                                                                                                           |
| ---------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `packages` | `stars-components`, `plugins`    | Renders each published package from its `CHANGELOG.md` section, Sapphire-style (`# @wolfstar/cli@2.12.0 - (date)`, then 💥 / 🚀 / 🐛 / 🏠 sections). No AI: the same release renders the same message. |
| `draft`    | `wolfstar`, `staryl`, the site   | Reads the pull requests merged between two refs, has the [Pullfrog](https://docs.pullfrog.com) agent write the announcement as JSON, and renders it. Nothing is sent.                                  |
| `post`     | the job after a reviewed `draft` | Sends the rendered draft.                                                                                                                                                                              |

The agent only writes words. This action builds the Discord payload, so every message is valid, pings only the announced role (`allowed_mentions`), and carries the buttons and screenshots chosen here.

## Formats

`draft` renders one of two formats; `format: auto` lets the agent pick.

- **`text`**: the Skyra / WolfStar Announcements plain message. `## Title`, then `Updated **WolfStar Alpha**:` with nested bullets, and an italic closing hint. Split into several messages when it passes 2000 characters.
- **`components`**: a Components V2 container with the WolfStar gold accent (`#FEC609`), `##` sections split by separators, the screenshots as a media gallery, and link buttons (invite, release notes). Falls back to `text` past 4000 characters.

## Site screenshots

With `kind: site`, the action reads the pr-evidence comment of every merged pull request: a `| Before | After |` table, or images whose alt text says After. The newest capture wins. The agent picks up to `max-screenshots` pull requests whose change is the headline; the After images are downloaded and uploaded as attachments, so Discord never has to reach GitHub. Only images GitHub hosts (`github.com/user-attachments/assets/…`) are used.

## Review before posting

`draft` writes `message.json` and a preview in the job summary. The reusable workflow runs `post` in a separate job bound to a GitHub environment with required reviewers (the `environment` input, `discord-announcements` by default). The approver reads the preview, then the job sends it.

## Signed callbacks

Following the release notifications of [discordjs/discord.js#11673](https://github.com/discordjs/discord.js/pull/11673), every mode can POST `started`, `drafted`, `completed`, and `failed` events to `callback-url`. Each body is JSON with `schemaVersion`, `id`, `sequence` (a fixed position: `started` 1, `drafted` 2, `completed` 3, `failed` 4), `event`, `mode` (`packages`, `draft`, or `post`), `kind` (`bot`, `site`, or `null` for packages), `repository`, `runId`, `runUrl`, and event details, and carries:

- `X-Release-Delivery`: the event ID,
- `X-Release-Timestamp`: an ISO timestamp,
- `X-Release-Signature-256`: `sha256=` + HMAC-SHA256 of `<timestamp>.<body>` with `callback-secret`.

Callbacks are off unless both inputs are set, need HTTPS, refuse redirects, time out after 5 seconds, and retry 5xx and 429 twice. A failed callback only logs a warning. A receiver, such as a Cloudflare Worker or the Ring app, can verify the signature and react without holding the Discord webhook.

## Secrets and variables

| Name                                            | Where    | Use                                                                   |
| ----------------------------------------------- | -------- | --------------------------------------------------------------------- |
| `DISCORD_*_WEBHOOK_URL`                         | secret   | The webhook of the announcement channel. Without it, nothing is sent. |
| `DISCORD_*_ROLE_ID`                             | variable | The role pinged by the first message.                                 |
| `ANTHROPIC_API_KEY` or another provider key     | secret   | `draft` only, read by Pullfrog from the env of the calling step.      |
| `RELEASE_WEBHOOK_URL`, `RELEASE_WEBHOOK_SECRET` | secret   | Optional signed callbacks.                                            |

`draft` needs `id-token: write` (Pullfrog authenticates with OIDC) and `contents: read`. Pullfrog runs with `push: disabled`, `shell: restricted`, and no progress comments.

## Usage

Most repositories call one of two reusable workflows, which wrap this action: `reusable-announce-packages.yml` for published packages (needs `contents: read` and `pull-requests: read`) and `reusable-announce-release.yml` for a bot or site release, with the draft, review, and post jobs (also needs `id-token: write`). They are separate so a packages caller never has to grant `id-token: write`: GitHub checks the permissions of a called workflow even for the jobs it skips.

```yaml
# After the job that publishes (it exposes changesets/action's outputs)
announce:
  needs: release
  if: needs.release.outputs.published == 'true'
  permissions:
    contents: read
    pull-requests: read
  uses: wolfstar-project/.github/.github/workflows/reusable-announce-packages.yml@main
  with:
    published-packages: ${{ needs.release.outputs.publishedPackages }}
    role-id: ${{ vars.DISCORD_PACKAGES_ROLE_ID }}
  secrets:
    DISCORD_WEBHOOK_URL: ${{ secrets.DISCORD_PACKAGES_WEBHOOK_URL }}
```

```yaml
# A bot or site release: draft, wait for the environment's reviewers, post
announce:
  needs: tag
  permissions:
    contents: read
    pull-requests: read
    id-token: write # Pullfrog authenticates with OIDC
  uses: wolfstar-project/.github/.github/workflows/reusable-announce-release.yml@main
  with:
    kind: bot
    product: WolfStar Alpha
    version: ${{ needs.tag.outputs.tag }}
    from-ref: ${{ needs.tag.outputs.from }}
    stage: alpha
    role-id: ${{ vars.DISCORD_ANNOUNCEMENTS_ROLE_ID }}
    button-label: Invite WolfStar Alpha
    button-url: ${{ vars.DISCORD_INVITE_URL }}
  secrets:
    DISCORD_WEBHOOK_URL: ${{ secrets.DISCORD_ANNOUNCEMENTS_WEBHOOK_URL }}
    ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```

The caller grants the permissions, because a called workflow can only keep or lower them, and maps only the secrets it wants to share. The `post` job runs in the caller's `discord-announcements` environment (the `environment` input), so the reviewers are the caller's. `published-packages` also takes `name@version` entries, which is how a manual workflow re-sends an announcement. `dry-run: true` renders into the job summary and sends nothing.

To call the action without the workflow, use `wolfstar-project/.github/.github/actions/announce@main` with the inputs of `action.yml`.

## Tests

```bash
node --test '.github/actions/announce/test/*.test.ts'
```

The sources run on Node.js 24 type stripping, so they use erasable TypeScript only and import with `.ts` extensions.
