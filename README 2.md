# Noto - Electron Application

A simple Electron application named Noto.

## Project Structure

```
.
├── src/
│   ├── main/                     # Main Process Code
│   │   ├── index.ts             # Entry point
│   │   ├── window/              # Window Management
│   │   │   ├── MainWindow.ts    # Main Window Class
│   │   │   └── WindowManager.ts # Window Management Logic
│   │   ├── updater/             # Update Logic
│   │   │   ├── AutoUpdater.ts   # Update Manager Class
│   │   │   ├── UpdateEvents.ts  # Update Event Definitions
│   │   │   └── UpdateUI.ts      # Update UI Dialogs
│   │   └── shortcuts/           # Global Shortcuts
│   │       └── ShortcutManager.ts
│   ├── renderer/                 # Renderer Process Code
│   │   ├── index.html
│   │   ├── index.ts
│   │   └── styles/
│   ├── shared/                  # Shared between Main & Renderer
│   │   ├── types/
│   │   ├── constants/
│   │   └── utils/
│   └── config/                  # Configuration
│       ├── default.ts
│       ├── development.ts
│       └── production.ts
├── tests/                      # Test Files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── scripts/                    # Build & Deploy Scripts
├── dist/                       # Compiled Output
└── docs/                       # Documentation
```

## Setup and Running

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Build the Application:**
    This compiles the TypeScript code into JavaScript in the `dist` folder and copies HTML/CSS files.
    ```bash
    npm run build
    ```
3.  **Run the Application:**
    This runs the build script first and then starts the Electron application.
    ```bash
    npm run start
    ```

## Code Overview (`src/main.ts`)

The `src/main.ts` file is the entry point for the Electron main process. Here's a breakdown of its key functionalities:

1.  **Imports:** Imports necessary modules from `electron` (`app`, `BrowserWindow`, `globalShortcut`, `dialog`), `path`, `electron-updater`, and `electron-log`.
2.  **Logging Setup:** Configures `electron-log` to write logs to a file.
3.  **Auto-Update Configuration:**
    *   Initializes `autoUpdater` from `electron-updater`.
    *   Sets `electron-log` as the logger for the updater.
    *   Disables automatic downloads (`autoDownload = false`), requiring user confirmation.
4.  **`createWindow()` Function:**
    *   Creates the main application window (`BrowserWindow`).
    *   Sets window properties like size, `titleBarStyle`, `vibrancy`, etc.
    *   Loads the `index.html` file from the `dist` directory into the window.
    *   Handles the `closed` event to clear the `mainWindow` reference.
5.  **`app.whenReady()` Block:** This code runs after Electron initialization is complete.
    *   Calls `createWindow()` to open the application window.
    *   **Auto-Update Check:** Calls `autoUpdater.checkForUpdatesAndNotify()` to check for updates on application startup.
    *   **Auto-Update Event Handlers:** Sets up listeners for various `autoUpdater` events:
        *   `checking-for-update`: Logs when the check starts.
        *   `update-available`: Logs availability and shows a dialog asking the user if they want to download. Starts download if confirmed.
        *   `update-not-available`: Logs that no update is available.
        *   `error`: Logs errors and shows an error dialog to the user.
        *   `download-progress`: Logs download progress (can be used to show progress in the UI).
        *   `update-downloaded`: Logs completion and shows a dialog asking the user to restart the app to install the update. Calls `autoUpdater.quitAndInstall()` if confirmed.
    *   **Global Shortcut:** Registers a global shortcut (`Option+B`) to show/hide the main window.
    *   **`activate` Event (macOS):** Handles recreating/showing the window when the dock icon is clicked.
6.  **`will-quit` Event:** Unregisters all global shortcuts before the application quits.
7.  **`window-all-closed` Event:** Handles application termination when all windows are closed (except on macOS, where apps typically stay active).

## Building for Distribution

To package the application for distribution (e.g., creating `.app` or `.exe` files) and enable auto-updates, you'll need to configure `electron-builder`. Add a `build` section to your `package.json`.

Example for GitHub releases:
```json
"build": {
  "appId": "com.example.noto", // Replace with your App ID
  "productName": "Noto",
  "files": [
    "dist/**/*",
    "node_modules/**/*",
    "package.json"
  ],
  "publish": {
    "provider": "github",
    "owner": "YOUR_GITHUB_USERNAME", // Replace
    "repo": "YOUR_GITHUB_REPO"      // Replace
  },
  "mac": {
    "category": "public.app-category.utilities"
    // Add code signing configuration here
  },
  "win": {
    "target": "nsis"
    // Add code signing configuration here
  },
  "linux": {
    "target": "AppImage"
  }
}
```

Remember to configure code signing for macOS and Windows for reliable auto-updates. 