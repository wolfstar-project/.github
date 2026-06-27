<div align="center"><a name="readme-top"></a>

<img src="https://github.com/WolfStarBot.png" width="15%" alt="WolfStar Logo">

# WolfStar Project · GitHub

Shared GitHub metadata, reusable workflows, and community templates for the [WolfStar Project][profile-link]
organization.<br/>

[Official Site][official-site] · [Dashboard][dashboard-link] · [WolfStar Invite Link][invite-link] · [Support
Server][discord-link] · [Feedback][github-issues-link]

<!-- SHIELD GROUP -->

[![GitHub license badge][github-license-shield]][github-license-link]
[![Discord community badge][discord-shield]][discord-link]
[![GitHub contributors badge][github-contributors-shield]][github-contributors-link]<br/>
[![GitHub forks badge][github-forks-shield]][github-forks-link]
[![GitHub stars badge][github-stars-shield]][github-stars-link]
[![GitHub issues badge][github-issues-shield]][github-issues-link]<br/>
[![PRs welcome badge][pr-welcome-shield]][pr-welcome-link]

### Share WolfStar Project

[![][share-linkedin-shield]][share-linkedin-link] [![][share-reddit-shield]][share-reddit-link]
[![][share-telegram-shield]][share-telegram-link] [![][share-whatsapp-shield]][share-whatsapp-link]
[![][share-x-shield]][share-x-link] <sup>Centralized GitHub metadata and CI workflows for the WolfStar ecosystem. Built
for maintainers and contributors.</sup>

</div>

<details>
<summary><kbd>Table of contents</kbd></summary>

## Table of Contents

- [✨ Features](#-features)
- [📦 Organization Metadata](#-organization-metadata)
- [🔄 Reusable Workflows](#-reusable-workflows)
- [⌨️ Local Development](#️-local-development)
- [💻 Online Development](#-online-development)
- [🤝 Contributing](#-contributing)
- [❤️ Sponsor](#️-sponsor)

<br/>

</details>

<div id="-welcome-to-wolfstar-github">

## 👋🏻 Welcome to WolfStar Project · GitHub

This repository is the **central hub for GitHub organization metadata** across the WolfStar Project ecosystem. It
provides issue templates, community guidelines, label definitions, problem matchers, and reusable GitHub Actions
workflows that other repositories in the organization can consume.

</div>

<div id="-features">

## ✨ Features

- **Issue Templates**: Structured YAML templates for bug reports and feature requests, with a configurable issue
  chooser.
- **Community Guidelines**: Code of conduct, contributing guide, security policy, and privacy policy shared across all
  organization repositories.
- **Label Sync**: Centralized label definitions in `.github/labels.yml` for consistent issue and pull request triage.
- **Reusable Workflows**: Pre-built GitHub Actions workflows for Node.js/pnpm setup, label synchronization, and
  multi-platform Docker image publishing.
- **Problem Matchers**: GitHub Actions problem matchers for ESLint and TypeScript compiler output.
- **Renovate Configuration**: Shared Renovate bot settings for automated dependency updates.

</div>

<div id="-organization-metadata">

## 📦 Organization Metadata

The following files are maintained in this repository and referenced by other WolfStar Project repositories:

| File                         | Description                              |
| ---------------------------- | ---------------------------------------- |
| `.github/ISSUE_TEMPLATE/`    | Bug report and feature request templates |
| `.github/CODE_OF_CONDUCT.md` | Community code of conduct                |
| `.github/CONTRIBUTING.md`    | Contribution guidelines                  |
| `.github/SECURITY.md`        | Security vulnerability reporting policy  |
| `.github/PRIVACY_POLICY.md`  | Privacy policy                           |
| `.github/labels.yml`         | Organization-wide label definitions      |
| `.github/problemMatchers/`   | ESLint and TypeScript problem matchers   |
| `.github/renovate.json`      | Shared Renovate bot configuration        |
| `.github/CODEOWNERS`         | Default code ownership rules             |

</div>

<div id="-reusable-workflows">

## 🔄 Reusable Workflows

This repository provides reusable GitHub Actions workflows that can be called from any repository in the organization
via `workflow_call`.

### Setup pnpm & Node

The `reusable-setup.yml` workflow handles checkout, pnpm and Node.js setup, and optional dependency installation. It
supports configurable Node.js versions, pnpm versions, operating systems, and frozen lockfile installs.

```yaml
jobs:
  build:
    uses: wolfstar-project/.github/.github/workflows/reusable-setup.yml@main
    with:
      node-version: 24
      install-dependencies: true
```

### Label Sync

The `reusable-labelsync.yml` workflow synchronizes GitHub labels from `.github/labels.yml` to a target repository. It
supports merging with repository-specific label overrides.

```yaml
jobs:
  labels:
    uses: wolfstar-project/.github/.github/workflows/reusable-labelsync.yml@main
    with:
      merge-labels: false
```

### Publish Docker Image

The `reusable-publish-image.yml` workflow builds and publishes multi-platform Docker images to GitHub Container Registry
(GHCR). It supports configurable platforms, tags, build context, and Dockerfile paths.

```yaml
jobs:
  publish:
    uses: wolfstar-project/.github/.github/workflows/reusable-publish-image.yml@main
    with:
      registryImage: wolfstar-project/wolfstar
      tag: latest
```

</div>

<div id="️-local-development">

## ⌨️ Local Development

### Prerequisites

- **Bun** or **Node.js** (v24+)
- **mise** (optional, for tool version management)

### Available Scripts

- `bun run format` — Format files with Oxfmt.

Refer to [CONTRIBUTING.md][contributing-link] for detailed setup instructions across WolfStar Project repositories.

</div>

<div id="-online-development">

## 💻 Online Development

Click any of the buttons below to start a new development environment to demo or contribute to the codebase without
having to install anything on your machine:

<div align="center">

[![Open in VS Code](https://img.shields.io/badge/Open%20in-VS%20Code-blue?logo=visualstudiocode)](https://vscode.dev/github/wolfstar-project/.github)
[![Open in GitHub1s](https://img.shields.io/badge/Open%20in-GitHub1s-blue?logo=github)](https://github1s.com/wolfstar-project/.github)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/wolfstar-project/.github)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/wolfstar-project/.github)
[![Edit in Codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/wolfstar-project/.github)
[![Open in Codeanywhere](https://codeanywhere.com/img/open-in-codeanywhere-btn.svg)](https://app.codeanywhere.com/#https://github.com/wolfstar-project/.github)
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/wolfstar-project/.github)

</div>

</div>

<div id="️-contributing">

## 🤝 Contributing

Thank you to all the people who already contributed to WolfStar Project! Please make sure to read the [Contributing
Guide][contributing-link] before making a pull request.

<a href="https://github.com/wolfstar-project/.github/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=wolfstar-project/.github" alt="Project contributors" />
</a>

</div>

<div id="️-sponsor">

## ❤️ Sponsor

If you like WolfStar and want to support the project, consider making a donation. Every contribution helps to maintain
and improve the bot.

[![Support on Ko-fi](https://img.shields.io/badge/Support%20on%20Ko--fi-ff5e5b?style=for-the-badge&logo=ko-fi&logoColor=white)][ko-fi-link]
[![Support on Patreon](https://img.shields.io/badge/Support%20on%20Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white)][patreon-link]
[![Sponsor on GitHub](https://img.shields.io/badge/Sponsor%20on%20GitHub-ffcb47?style=for-the-badge&logo=github&logoColor=white)][github-sponsor-link]

Thank you for your support!

</div>

<!-- LINK GROUP -->

---

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

---

<summary><h4>📝 License</h4>

Copyright © 2024 [WolfStar Project][profile-link]. <br /> This project is [MIT](./LICENSE) licensed.

<!-- LINK GROUP -->

[ko-fi-link]: https://ko-fi.com/redstar071
[patreon-link]: https://www.patreon.com/RedStar071
[github-sponsor-link]: https://github.com/sponsors/wolfstar-project
[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square
[contributing-link]: https://github.com/wolfstar-project/.github/blob/main/.github/CONTRIBUTING.md
[discord-link]: https://join.wolfstar.rocks
[discord-shield]:
  https://img.shields.io/discord/830481105261821952?color=5865F2&label=discord&labelColor=black&logo=discord&logoColor=white&style=flat-square
[github-contributors-link]: https://github.com/wolfstar-project/.github/graphs/contributors
[github-contributors-shield]:
  https://img.shields.io/github/contributors/wolfstar-project/.github?color=c4f042&labelColor=black&style=flat-square
[github-forks-link]: https://github.com/wolfstar-project/.github/network/members
[github-forks-shield]:
  https://img.shields.io/github/forks/wolfstar-project/.github?color=8ae8ff&labelColor=black&style=flat-square
[github-issues-link]: https://github.com/wolfstar-project/.github/issues
[github-issues-shield]:
  https://img.shields.io/github/issues/wolfstar-project/.github?color=ff80eb&labelColor=black&style=flat-square
[github-license-link]: https://github.com/wolfstar-project/.github/blob/main/LICENSE
[github-license-shield]:
  https://img.shields.io/github/license/wolfstar-project/.github?labelColor=black&style=flat-square
[github-stars-link]: https://github.com/wolfstar-project/.github/network/stargazers
[github-stars-shield]:
  https://img.shields.io/github/stars/wolfstar-project/.github?color=ffcb47&labelColor=black&style=flat-square
[official-site]: https://wolfstar.rocks
[dashboard-link]: https://github.com/wolfstar-project/wolfstar.rocks
[invite-link]: https://invite.wolfstar.rocks
[pr-welcome-link]: https://github.com/wolfstar-project/.github/pulls
[pr-welcome-shield]: https://img.shields.io/badge/🤯_pr_welcome-%E2%86%92-ffcb47?labelColor=black&style=for-the-badge
[profile-link]: https://github.com/wolfstar-project
[share-linkedin-shield]:
  https://img.shields.io/badge/-share%20on%20linkedin-black?labelColor=black&logo=linkedin&logoColor=white&style=flat-square
[share-linkedin-link]: https://linkedin.com/feed
[share-reddit-shield]:
  https://img.shields.io/badge/-share%20on%20reddit-black?labelColor=black&logo=reddit&logoColor=white&style=flat-square
[share-reddit-link]:
  https://www.reddit.com/submit?title=Check%20this%20GitHub%20repository%20out%20%F0%9F%A4%AF%20WolfStar%20Project%20-%20Shared%20GitHub%20metadata%20and%20workflows%20for%20the%20WolfStar%20ecosystem.&url=https%3A%2F%2Fgithub.com%2Fwolfstar-project%2F.github
[share-telegram-shield]:
  https://img.shields.io/badge/-share%20on%20telegram-black?labelColor=black&logo=telegram&logoColor=white&style=flat-square
[share-telegram-link]:
  https://t.me/share/url?text=Check%20this%20GitHub%20repository%20out%20%F0%9F%A4%AF%20WolfStar%20Project%20-%20Shared%20GitHub%20metadata%20and%20workflows%20for%20the%20WolfStar%20ecosystem.&url=https%3A%2F%2Fgithub.com%2Fwolfstar-project%2F.github
[share-whatsapp-shield]:
  https://img.shields.io/badge/-share%20on%20whatsapp-black?labelColor=black&logo=whatsapp&logoColor=white&style=flat-square
[share-whatsapp-link]:
  https://api.whatsapp.com/send?text=Check%20this%20GitHub%20repository%20out%20%F0%9F%A4%AF%20WolfStar%20Project%20-%20Shared%20GitHub%20metadata%20and%20workflows%20for%20the%20WolfStar%20ecosystem.%20https%3A%2F%2Fgithub.com%2Fwolfstar-project%2F.github
[share-x-shield]:
  https://img.shields.io/badge/-share%20on%20x-black?labelColor=black&logo=x&logoColor=white&style=flat-square
[share-x-link]:
  https://x.com/intent/tweet?text=Check%20this%20GitHub%20repository%20out%20%F0%9F%A4%AF%20WolfStar%20Project%20-%20Shared%20GitHub%20metadata%20and%20workflows%20for%20the%20WolfStar%20ecosystem.&url=https%3A%2F%2Fgithub.com%2Fwolfstar-project%2F.github
