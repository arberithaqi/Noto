# Noto App

Eine minimalistische Notiz-App mit Electron und React, entwickelt in TypeScript.

## Features (geplant)

📝 **Notiz-Funktionen:**
- Plain Text Editor mit Indents, Nummerierung (1., a., i. usw.)
- Contextual Math (z. B. "2 Betten à 4 Pflanzen = 8")
- Einheiten- & Währungsumrechnung (z. B. km → miles, € → $)
- Reaktive Variablen (a = 5; b = a * 2)

🧠 **Tools & Komfort:**
- Timer & Pomodoro
- Screenshot zu Text (OCR)
- One-Click Export (.txt oder .md)
- Global Hotkey für sofortigen Zugriff
- ChatGPT-Integration

## Entwicklung

### Voraussetzungen
- Node.js (>= 18)
- npm oder yarn

### Installation
```bash
# Repository klonen
git clone [repo-url]
cd noto-app

# Abhängigkeiten installieren
npm install
```

### Entwicklungsserver starten
```bash
# Entwicklungsmodus
npm run dev

# Electron starten
npm run electron:start
```

### Build erstellen
```bash
npm run build
```

## Projektstruktur

```
.
├── src/
│   ├── main/                   # Electron Main Process
│   │   ├── index.ts
│   │   ├── windows/           # Fensterverwaltung
│   │   ├── ipc/              # IPC-Handler
│   │   ├── features/         # Module (Timer, Export etc.)
│   │   └── core/            # App-Lifecycle, Logging etc.
│   ├── renderer/             # Frontend (React)
│   │   ├── index.html
│   │   ├── index.tsx
│   │   ├── components/      # UI-Bausteine
│   │   ├── features/        # Feature-Module
│   │   ├── views/          # Seiten
│   │   ├── state/         # Zustandsverwaltung
│   │   └── styles/        # CSS/SCSS/Tailwind
│   ├── shared/             # Gemeinsamer Code
│   │   ├── types/
│   │   ├── utils/
│   │   └── constants/
│   └── config/            # Konfigurationen
├── tests/                # Tests
├── scripts/             # Build & Dev Tools
├── dist/               # Kompilierte App
└── docs/              # Dokumentation
```

## Lizenz
MIT 