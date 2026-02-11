A P2P web-based board game where you try to move pieces to your home and avoid being sent back home by the other players!

[Devlog](https://publish.obsidian.md/grants-lab/Grants+Lab/%22Marbles%22+Dev+Log/2026-02-07)

# Codebase
This repo was initialized with [Vite's typescript preact template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-preact-ts). I also added in the following dependencies you'll want to be aware of.

- Vitest (Test runner)
- ThreeJS (Rendering the game)
- PeerJS (P2P network to make this game not need a server)
- Tailwind/Daisy (Utility & Component classes)

## Directory Structure

```
├── CONTRIBUTING.md
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── public
│   └── vite.svg
├── README.md
├── src
│   ├── app.tsx
│   ├── assets
│   │   └── preact.svg
│   ├── index.css
│   ├── main.tsx
│   ├── model // container for core-logic
│   │   ├── game.test.ts
│   │   └── game.ts // container for core game logic
│   ├── pages
│   │   ├── game
│   │   │   └── game.page.tsx // page for gameplay
│   │   └── join.page.tsx // page for setting up or joining games
│   ├── rtc
│   │   └── index.ts // network related code
│   └── style.css
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```


# Documentation
This is a game I'm working on for fun and by myself (at the time). Most documentation will be code comments. If more documentation is needed, it'll be added to this codebases wiki.
