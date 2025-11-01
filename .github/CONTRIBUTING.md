<div align="center"><a name="contributing-top"></a>

<img src="https://github.com/WolfStarBot.png" width="15%" height="15%" alt="WolfStar Logo">

# Contributing to WolfStar

A guide to contributing to the WolfStar project<br/>

[Discord Server] · [ESLint Setup][eslint] · [Development Guide](#running-typescript--gateway-based-wolfstar-project-bots-locally)

</div>

<details>
<summary><kbd>Table of contents</kbd></summary>

#### TOC

- [📝 Guidelines](#-guidelines)
- [🚀 Running TypeScript + Gateway Bots](#-running-typescript--gateway-based-wolfstar-project-bots-locally)
- [💻 Running TypeScript + HTTP Bots](#-running-typescript--http-only-based-wolfstar-project-bots-locally)
- [✨ Project Concepts](#-wolfstar-project-concept-guidelines)
- [👥 Development Tools](#-development-tools)

<br/>
</details>

<div id="-guidelines">

## 📝 Guidelines

**The issue tracker is only for issue reporting or proposals/suggestions. If you have a question, you can find us in our
[Discord Server]**.

To contribute to this repository, feel free to create a new fork of the repository and submit a pull request. We highly
suggest [ESLint] to be installed in your text editor or IDE of your choice to ensure builds from GitHub Actions do not
fail.

1. Fork, clone, and select the **main** branch.
2. Create a new branch in your fork.
3. Make your changes.
4. Ensure your linting and tests pass by running `bun test && bun lint`
5. Commit your changes, and push them.
6. Submit a Pull Request!

</div>

## 🚀 Running TypeScript + Gateway based WolfStar Project bots locally

To run any of the TypeScript + Gateway based WolfStar bots locally a few steps should be taken.

1. Install [Node.JS], [Bun] or [Pnpm] and [Docker].
2. In the Discord Developer portal go to your application and then to the "Bot" menu.
3. At "Privileged Gateway Intents" enable `SERVER MEMBERS INTENT` and `MESSAGE CONTENT INTENT`
4. Copy and paste the [`.env.development`][`.env.development`] file in the `src` directory and rename it to `.env.development.local`.
5. Scroll down to the tokens section.
6. At this section enter your own bot's API token at `DISCORD_TOKEN`.
7. Fill in any other API keys you have / want to fill in.
8. Install project dependencies with `bun install`.
9. Start the bot in development mode with `bun dev`.

A few other important commands:

```bash
# Install project dependencies with frozen lockfile:
$ bun install --frozen-lockfile

# Lints and format all the code:
$ bun lint

# Run the bot in development mode:
$ bun start
```

## 💻 Running TypeScript + HTTP-Only based WolfStar Project bots locally

To run any of the TypeScript + HTTP-Only based WolfStar bots locally a few steps should be taken.

1. Install [Node.JS], [Bun] or [Pnpm] and [Docker].
2. You will need an **HTTPS** public endpoint which Discord can send payload data to. We recommend using [Cloudflare
   Tunnels][cf-tunnels] for this. You can find instructions on how to set up a [Cloudflare Tunnel here][cf-tunnel].
   - The basic idea is that locally you start a cloudflare tunnel that forwards your `localhost:port` to the Cloudflare
     domain, for example `https://my-bot-project.mywebsite.xyz`.
3. In the Discord Developer portal go to your application and stick to the "General Information" menu.
4. At `INTERACTIONS ENDPOINT URL` enter the HTTPS endpoint you have set up.
   - Following the previous example this would be `https://my-bot-project.mywebsite.xyz`.
5. Copy and paste the [`.env.development`][`.env.development`] file in the `src` directory and rename it to `.env.development.local`.
6. Scroll down to the authentication section.
7. At this section enter your own bot's:
   1. Application ID (at `DISCORD_APPLICATION_ID`)
   2. Application Public Key (at `DISCORD_APPLICATION_PUBLIC_KEY`)
   3. The port at which you want to start the application (at `PORT`)
      - This is the port that you will forward with [Cloudflare Tunnels][cf-tunnels]
8. Fill in any other API keys you have / want to fill in.
9. Install project dependencies with `bun install`.
10. Start the bot in development mode with `bun dev`.
11. Start your [Cloudflare Tunnel][cf-tunnels] to start forwarding data
12. (**_First Time Only_**) on the Discord Developer portal press the "Save Changes" button to save the
    `INTERACTIONS ENDPOINT URL`.
    - **_IMPORTANT: Your bot has to be running and your Cloudflare Tunnel has to be active for the save to proceed
      successfully as Discord will send an acknowledgement message to the bot to ensure the URL being saved is correctly
      set up_**

A few other important commands:

```bash
# Install project dependencies with frozen lockfile:
$ bun install --frozen-lockfile

# Lints and format all the code:
$ bun lint

# Run the bot in development mode:
$ bun start
```

## ✨ WolfStar Project Concept Guidelines

There are a number of guidelines considered when reviewing Pull Requests to be merged. _This is by no means an
exhaustive list, but here are some things to consider before/while submitting your ideas._

- WolfStar Project should never change Sapphire's or Discord.js' default behavior. WolfStar should only add to Sapphire and
  Discord.js, and be as consistent as possible with them.
- Everything in WolfStar Project should be generally useful for the majority of users. Don't let that stop you if you've
  got a good concept though, as your idea still might be a great addition.
- Everything should be shard compliant. If code you put in a pull request would break when sharding, break other things
  from supporting sharding, or is incompatible with sharding; then you will need to think of a way to make it work with
  sharding in mind before the pull request will be accepted and merged.
- Everything should follow [OOP paradigms] and generally rely on behaviour over state where possible. This generally
  helps methods be predictable, keeps the codebase simple and understandable, reduces code duplication through
  abstraction, and leads to efficiency and therefore scalability.
- Everything should follow our ESLint rules as closely as possible, and should pass lint tests even if you must disable
  a rule for a single line.
- Everything should follow [Discord Bot Best Practices]
- Scripts that are to be ran outside of the scope of the bot should be added to a `scripts` directory at the root and
  should be in the `.mjs` file format.

<div id="-development-tools">

## 👥 Development Tools

You can develop WolfStar using any of these online environments:

[![Open in VS Code](https://img.shields.io/badge/Open%20in-VS%20Code-blue?logo=visualstudiocode)][vscode-link]
[![Open in GitHub1s](https://img.shields.io/badge/Open%20in-GitHub1s-blue?logo=github)][github1s-link]
[![Open in Glitch](https://img.shields.io/badge/Open%20in-Glitch-purple?logo=glitch)][glitch-link]
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)][codespaces-link]
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)][stackblitz-link]
[![Edit in Codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)][codesandbox-link]
[![Open in Repl.it](https://replit.com/badge/github/withastro/astro)][replit-link]
[![Open in Codeanywhere](https://codeanywhere.com/img/open-in-codeanywhere-btn.svg)][codeanywhere-link]
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)][gitpod-link]

These environments will automatically:
1. Clone the repository 
2. Install dependencies
3. Set up the development environment
4. Start the development server

</div>

<div align="right">

[![][back-to-top]](#contributing-top)

</div>

---

<!-- Link Dump -->

[discord server]: https://join.wolfstar.rocks
[eslint]: https://eslint.org/
[node.js]: https://nodejs.org/en/download/
[bun]: https://bun.sh/docs/installation
[pnpm]: https://pnpm.io/installation
[docker]: https://www.docker.com
[oop paradigms]: https://en.wikipedia.org/wiki/Object-oriented_programming
[discord bot best practices]: https://github.com/meew0/discord-bot-best-practices
[`.env.development`]: /src/.env.development
[cf-tunnels]: https://www.cloudflare.com/products/tunnel/
[vscode-link]: https://vscode.dev/
[github1s-link]: https://github1s.com/
[glitch-link]: https://glitch.com/
[codespaces-link]: https://github.com/codespaces
[stackblitz-link]: https://stackblitz.com/
[codesandbox-link]: https://codesandbox.io/
[replit-link]: https://replit.com/
[codeanywhere-link]: https://app.codeanywhere.com/
[gitpod-link]: https://gitpod.io/
