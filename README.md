# Noto App

A minimalist note-taking app built with Electron and React, developed in TypeScript.

## Features (planned)

📝 **Note Functions:**
- Plain Text Editor with indents, numbering (1., a., i., etc.)
- Contextual Math (e.g., "2 beds at 4 plants = 8")
- Unit & Currency conversion (e.g., km → miles, € → $)
- Reactive variables (a = 5; b = a * 2)

🧠 **Tools & Comfort:**
- Timer & Pomodoro
- Screenshot to Text (OCR)
- One-Click Export (.txt or .md)
- Global Hotkey for instant access
- ChatGPT integration

## Development

### Prerequisites
- Node.js (>= 18)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone [repo-url]
cd noto-app

# Install dependencies
npm install
```

### Start Development Server
```bash
# Development mode
npm run dev

# Start Electron
npm run electron:start
```

### Create Build
```bash
npm run build
```

## Project Structure

```
.
├── src/
│   ├── main/                   # Electron Main Process
│   │   ├── index.ts
│   │   ├── windows/           # Window Management
│   │   ├── ipc/              # IPC Handlers
│   │   ├── features/         # Modules (Timer, Export, etc.)
│   │   └── core/            # App Lifecycle, Logging, etc.
│   ├── renderer/             # Frontend (React)
│   │   ├── index.html
│   │   ├── index.tsx
│   │   ├── components/      # UI Components
│   │   ├── features/        # Feature Modules
│   │   ├── views/          # Pages
│   │   ├── state/         # State Management
│   │   └── styles/        # CSS/SCSS/Tailwind
│   ├── shared/             # Shared Code
│   │   ├── types/
│   │   ├── utils/
│   │   └── constants/
│   └── config/            # Configurations
├── tests/                # Tests
├── scripts/             # Build & Dev Tools
├── dist/               # Compiled App
└── docs/              # Documentation
```

## Lizenz
MIT 