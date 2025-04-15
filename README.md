# Noto App

A minimalist note-taking app built with Electron and React, developed in TypeScript.

## Features

📝 **Note Functions:**
- ✅ Plain Text Editor with swipe gestures to navigate between notes
- ✅ Contextual Math Calculations: 
  - Type a mathematical expression followed by an equals sign (e.g., "2 + 2 =")
  - Automatically calculates and displays the result (e.g., "2 + 2 = 4")
  - Ignores non-numeric text (e.g., "5 apples + 10 apples = 15")
  - Supports addition, subtraction, multiplication, and division
- 🔜 Unit & Currency conversion (e.g., km → miles, € → $)
- 🔜 Reactive variables (a = 5; b = a * 2)

🧠 **Tools & Comfort:**
- 🔜 Timer & Pomodoro
- 🔜 Screenshot to Text (OCR)
- 🔜 One-Click Export (.txt or .md)
- 🔜 Global Hotkey for instant access
- 🔜 ChatGPT integration

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
npm run electron:dev
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
│   │   ├── App.tsx          # Main React component with note editor
│   │   ├── components/      # UI Components (PaginationDots, etc.)
│   │   ├── features/        # Feature Modules (NoteEditor, Timer, etc.)
│   │   ├── views/          # Pages (HomeView, SettingsView)
│   │   ├── hooks/         # Custom React hooks (useSwipeGesture)
│   │   ├── utils/         # Utility functions (contextualMath)
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

## License
MIT 