# SWINGLY — Desktop Companion App Website

A desktop application landing page inspired by Hangly, built with React, Vite, Framer Motion, Lucide React, and custom physics-based vector rope animations.

![Swingly Desktop Companion](https://raw.githubusercontent.com/username/swingly/main/public/favicon.svg)

## 🌟 Features

- **Physics-Based Swinging Characters**: Damped pendulum physics engine with responsive mouse interaction and seamless SVG rope attachment.
- **8 Original Vector Companions**: Orbit, Mochi, Sprout, Ember, Pebble, Cloudy, Astro, and Berry.
- **Interactive Desktop Simulator**: Live wallpaper themes, character toggles, speed sliders, and `localStorage` persistence.
- **Live Companion Customizer**: Tweak primary tints, swing amplitude, suspension rope length, and wallpaper backdrops in real-time.
- **High-Contrast Dark Download Section**: Platform cards for Windows and macOS with honest release status feedback.
- **Fully Responsive & Accessible**: Supports viewports from 320px to 1440px+, keyboard accordion navigation, and `prefers-reduced-motion`.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

---

## 📦 GitHub Deployment Instructions

To publish your SWINGLY repository to GitHub:

1. **Open terminal in the project directory**:
   ```bash
   cd "d:\New folder (7)"
   ```

2. **Initialize Git repository**:
   ```bash
   git init
   ```

3. **Stage and commit files**:
   ```bash
   git add .
   git commit -m "Initial commit: Swingly desktop companion website"
   ```

4. **Link to GitHub repository**:
   Create a new public or private repository on [GitHub](https://github.com/new) named `swingly-website`, then run:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/swingly-website.git
   git push -u origin main
   ```

---

## ⚡ Vercel Deployment Instructions

Deploying your Vite React app to Vercel is free and automatic:

### Option A: Via Vercel Web Dashboard (Recommended)
1. Sign in to [Vercel](https://vercel.com/) using your GitHub account.
2. Click **"Add New..."** → **"Project"**.
3. Import your `swingly-website` repository from GitHub.
4. Vercel will automatically detect **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**. Your live website URL (e.g., `https://swingly.vercel.app`) will be ready in seconds!
6. Any future `git push` to your `main` branch will automatically trigger a production redeployment.

### Option B: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 🛠️ Project Structure

```
src/
├── assets/         # Project visual assets
├── components/
│   ├── Navbar.jsx          # Sticky glassmorphism header & mobile drawer
│   ├── Hero.jsx            # Hero section with animated hanging companions
│   ├── HangingCharm.jsx    # SVG rope & physics pendulum animation component
│   ├── InteractiveDemo.jsx # Desktop simulator with wallpaper & speed controls
│   ├── Features.jsx       # 4 animated feature cards
│   ├── CharmGallery.jsx   # Filterable 8-character grid
│   ├── HowItWorks.jsx     # 3-step setup guide
│   ├── Customizer.jsx     # Studio for color, speed, and rope customization
│   ├── DownloadSection.jsx# Dark theme download section with platform cards
│   ├── FAQ.jsx            # Accordion FAQ with keyboard accessibility
│   ├── Toast.jsx          # Non-intrusive notification toast
│   └── Footer.jsx         # Legal links, modals, and dynamic copyright year
├── data/
│   ├── siteConfig.js      # Centralized brand, links, FAQ, and release config
│   └── charms.js          # Vector SVG artwork definitions & metadata
├── hooks/
│   ├── useLocalStorage.js # Persistent browser storage hook
│   └── useReducedMotion.js# Motion accessibility detector
├── styles/
│   ├── global.css         # CSS variables, typography, and container resets
│   └── animations.css     # Keyframes, glassmorphism, and slider styles
├── App.jsx                # Main layout coordinator
└── main.jsx               # Entrypoint
```

---

## 📄 License & Attribution

SWINGLY is an original desktop companion website created for demonstration purposes. All SVG artwork and branding are original.
