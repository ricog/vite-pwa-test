# Vite PWA Test

A production-ready Progressive Web App built with React, TypeScript, and Vite, featuring offline-first capabilities and modern development tooling.

## Features

### 🚀 Modern Stack
- **React 19** with TypeScript for type-safe development
- **Vite** for lightning-fast development and optimized builds
- **Tailwind CSS v4** for utility-first styling
- **PWA** with offline support and app installation

### 🔧 Developer Experience
- **Hot Module Replacement** for instant updates during development
- **Production-ready ESLint** with type-aware linting and React best practices
- **Flexible linting modes**: strict (default) or relaxed for development
- **Security scanning** with Semgrep integration

### ☁️ Deployment & CI/CD
- **Cloudflare Pages** deployment with preview environments
- **GitHub Actions** for automated testing, security scanning, and deployment
- **Dependabot** integration with auto-merge for dependency updates
- **Dynamic deployment URLs** with GitHub deployment status integration

### 📱 PWA Capabilities
- **Offline-first** architecture with service worker caching
- **App installation** support for mobile and desktop
- **Persistent state** - data survives app restarts
- **Optimized caching** with Workbox integration

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting (strict mode)
npm run lint

# Run relaxed linting
npm run lint:relaxed

# Run security scan
npm run security
```

## Setup for Your Project

### 1. Clone and Customize
```bash
# Clone this template
git clone <this-repo>
cd vite-pwa-test

# Update project details
# - Edit package.json (name, description)
# - Edit wrangler.toml (project name)
# - Update vite.config.ts (PWA manifest name/description)
```

### 2. Configure Cloudflare Pages
```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create your Pages project
wrangler pages create your-project-name

# Add Cloudflare API token to GitHub secrets
# CLOUDFLARE_API_TOKEN
```

### 3. Automatic Deployment
Once configured, the app automatically deploys:
- **Production**: Deploys from `main` branch after CI passes
- **Preview**: Creates preview deployments for pull requests  
- **Status tracking**: GitHub shows deployment status directly in PRs

## Architecture

Built with modern best practices:
- Component-based React architecture
- TypeScript for type safety
- Utility-first CSS with Tailwind
- Service worker for offline functionality
- Automated CI/CD pipeline with quality gates