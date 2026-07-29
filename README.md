# SoundWave Music

Music catalog platform for browsing albums, artists, and live concerts. Built with Angular 22 and Angular Material.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Architecture Overview](#architecture-overview)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Handoff](#handoff)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Angular 22.x (`@angular/core`) |
| **UI Library** | Angular Material 22.x (`@angular/material`, `@angular/cdk`) |
| **Language** | TypeScript ~6.0 |
| **RxJS** | ~7.8 |
| **Forms** | Angular Reactive Forms |
| **Routing** | Angular Router (lazy loading via `loadComponent`) |
| **Styling** | SCSS + Angular Material Design 3 theming |
| **Testing** | Vitest via `@angular/build:unit-test` |
| **Package Manager** | npm 11.x |
| **Linting / Formatting** | EditorConfig + Prettier (w/ Angular parser for HTML) |

---

## Getting Started

### Prerequisites

- **Node.js** >= 20.x
- **npm** >= 11.x

### Setup

```bash
npm install
ng serve        # http://localhost:4200
```

### Build

```bash
ng build                          # production build → dist/
ng build --configuration development  # dev build with source maps
```

### Test

```bash
ng test         # Vitest runner
```

---

## Project Structure

```
public/assets/
├── brand/              # Favicon, OG image, Apple touch icon
└── data/               # Static JSON data sources
    ├── albums.json     # Artists, tracks, releases
    └── concerts.json   # Live concerts with dates and venues

src/
├── index.html          # Entry HTML (SEO meta, Open Graph, Twitter Card)
├── main.ts             # App bootstrap (locale: it-IT)
├── styles.scss         # Angular Material theme (cyan primary, orange tertiary)
└── app/
    ├── app.ts             # Root component
    ├── app.html           # Root template (header + router-outlet + footer)
    ├── app.scss           # Global layout (max-width 1400px container)
    ├── app.config.ts      # Providers: router, HttpClient, locale it-IT
    ├── app.routes.ts      # Route definitions (lazy loaded)
    ├── components/
    │   ├── album-card/           # Reusable album card component
    │   ├── album-detail/         # Album detail page (/music/:id)
    │   ├── artist-detail/        # Artist detail page (/artist/:id)
    │   ├── booking-page/         # Booking history page (/prenotazioni)
    │   ├── catalog-page/         # Catalog with filters (/catalog)
    │   ├── concert-page/         # All concerts listing (/concerts)
    │   ├── empty-state/          # Reusable empty state component
    │   ├── favorites-page/       # Favorites page (/favorites)
    │   ├── filter-bar/           # Genre/type/year filter bar
    │   ├── footer/               # App footer
    │   ├── header/               # Navbar (desktop + mobile sidenav)
    │   ├── home-page/           # Home page (/)
    │   ├── not-found/            # 404 page (/not-found)
    │   └── tickets/              # Ticket booking form (/tickets/:concertId)
    ├── enums/
    │   ├── content-type.ts   # Single, EP, Album
    │   └── genre.ts          # Rock, Pop, Electronic, Jazz
    ├── models/
    │   ├── album.ts          # Album (extends WithId)
    │   ├── artist.ts         # Artist (extends WithId)
    │   ├── booking.ts        # Booking (extends WithId)
    │   ├── concert.ts        # Concert (extends WithId)
    │   ├── playlist.ts       # Playlist (extends WithId)
    │   ├── ticket.ts         # Ticket (extends WithId)
    │   ├── track.ts          # Track (extends WithId)
    │   └── with-id.ts        # Base interface with `id: string`
    ├── pipes/                # (reserved for custom pipes)
    ├── services/
    │   ├── booking.service.ts    # Booking CRUD + localStorage persistence
    │   ├── catalog.service.ts    # Albums/artists/tracks loader
    │   ├── concert.service.ts    # Concerts loader
    │   └── favorites.service.ts  # Favorites toggle + localStorage persistence
    └── validators/
        └── ticket.validator.ts   # Ticket seats validator (min 1, max 6, availability)
```

---

## Architecture Overview

### Routing (lazy loaded)

| Path | Component | Lazy |
|------|-----------|------|
| `/` | `HomePageComponent` | ✓ |
| `/catalog` | `CatalogPageComponent` | ✓ |
| `/music/:id` | `AlbumDetailComponent` | ✓ |
| `/artist/:id` | `ArtistDetailComponent` | ✓ |
| `/tickets/:concertId` | `TicketsComponent` | ✓ |
| `/favorites` | `FavoritesPageComponent` | ✓ |
| `/playlists` | `PlaylistsPageComponent` | ✓ |
| `/concerts` | `ConcertPageComponent` | ✓ |
| `/prenotazioni` | `BookingComponent` | ✓ |
| `/not-found` | `NotFoundComponent` | ✓ |
| `**` | redirect → `/not-found` | — |

### Lazy Loading

All routes except the home page (`/`) use **`loadComponent`** to defer loading of each page's JavaScript until the user navigates to it. This reduces the initial bundle from ~770 kB to **~580 kB**, keeping it under the 600 kB warning threshold.

Each lazy route produces a separate chunk file loaded on demand:

```
Initial:  main.js (572 kB)  ← HomePageComponent only
Lazy:     catalog-page.js   ← loaded on /catalog
Lazy:     artist-detail.js  ← loaded on /artist/:id
Lazy:     concert-page.js   ← loaded on /concerts
Lazy:     tickets.js        ← loaded on /tickets/:concertId
...etc
```

Route definition example:

```typescript
{
  path: 'concerts',
  loadComponent: () =>
    import('./components/concert-page/concert-page').then((m) => m.ConcertPageComponent),
}
```

Once loaded, chunks are cached by the browser and reused on subsequent visits.

### State Management

All state is managed through **Angular Signals** (`WritableSignal`, `computed`, `effect`) — no NgRx or external state library. Services fetch data via `HttpClient` at construction time and expose signals.

### Data Flow

1. **Static JSON** files in `public/assets/data/` are fetched by services on app load
2. **Services** parse raw data into typed models and expose signals
3. **Components** consume signals via `computed()` and render with Angular `@if` / `@for` control flow
4. **Booking** and **Favorites** persist to `localStorage`

### Key Patterns

- **Standalone components** — no NgModules
- **Signals** — synchronous reactive state with `computed` and `effect`
- **Lazy loading** — `loadComponent` for all non-initial routes
- **Reactive Forms** — with custom validators (`ticketValidator`)
- **Angular Material 3** — theming via `mat.theme()` with cyan primary, orange tertiary

### Observable Usage

Observables are used **only where Angular requires them** and are immediately converted to Signals or properly unsubscribed:

| Usage | File | Pattern |
|-------|------|---------|
| HTTP data fetch | `services/catalog.service.ts:74` | `http.get().subscribe()` → writes to `WritableSignal` |
| HTTP data fetch | `services/concert.service.ts:35` | `http.get().subscribe()` → writes to `WritableSignal` |
| Route param to signal | `components/album-detail/album-detail.ts:43` | `toSignal(route.paramMap.pipe(map(...)))` |
| Route param to signal | `components/artist-detail/artist-detail.ts:47` | `toSignal(route.paramMap.pipe(map(...)))` |
| Form value changes | `components/tickets/tickets.ts:101-103` | `.pipe(takeUntilDestroyed()).subscribe()` for auto-cleanup |

No `Subject`, `BehaviorSubject`, or manual `Observable` types are used anywhere.

---

## Configuration

### Angular CLI (`angular.json`)

| Setting | Value |
|---------|-------|
| Default config | `production` |
| Budget (initial) | Warning at **600 kB**, Error at **1 MB** |
| Budget (component style) | Warning at **4 kB**, Error at **8 kB** |
| Output hashing | Enabled in production |
| Style | SCSS (inline) |

### TypeScript (`tsconfig.json`)

- **Target:** ES2022
- **Module:** `preserve` (esbuild bundling)
- **Strict:** enabled via `strictInjectionParameters`, `strictInputAccessModifiers`
- **Decorators:** `experimentalDecorators: true`

### Locale

Italian locale (`it-IT`) is registered at bootstrap for date, currency, and number formatting.

### Theming (`src/styles.scss`)

Angular Material 3 theme:
- Primary palette: `$cyan-palette`
- Tertiary palette: `$orange-palette`
- Typography: `Roboto`
- Color scheme: `light`

### Formatting (`.editorconfig` + `.prettierrc`)

- Indentation: 2 spaces
- Quotes: single for TypeScript
- Print width: 100
- HTML parser: `angular`

---

## Handoff

### Environment

| Item | Value |
|------|-------|
| **Repository** | `git@github.com:Rhaastrake/SoundWave-Music_Team-Apulia.env.git` |
| **Branches** | `main` (stable), `dev` (integration), feature branches from `dev` |
| **Remote origin** | `https://github.com/Rhaastrake/SoundWave-Music_Team-Apulia.env.git` |

### How to deploy

```bash
ng build                          # outputs to dist/
# Serve dist/ with any static file server
```

No SSR, no server-side dependencies. The app is a fully static SPA.

### Dependencies to be aware of

- All data is loaded from **static JSON** files (`public/assets/data/`). To add or modify content, edit those files.
- **No backend API** — the app is entirely client-side. If a backend is added later, replace `HttpClient` calls to JSON files with API endpoints.
- **localStorage** is used for booking and favorites. Clearing browser storage will reset these.

### Adding a new page

1. Create a component in `src/app/components/<name>/`
2. Add a route in `app.routes.ts` using `loadComponent` for lazy loading
3. Add a link in `header.html` (desktop nav + mobile sidenav)

### Style conventions

- Follow the existing patterns: standalone components, signals, `computed`, `effect`
- Use Angular Material components (`mat-card`, `mat-button`, `mat-icon`, etc.)
- Keep page-level SCSS in the component's own `.scss` file
- Reuse `.event-card` and `.event-meta` styles from `artist-detail.scss` for concert-like cards

### Known budgets

The production build currently exceeds the 600 kB initial bundle warning threshold by ~170 kB (pre-existing, introduced by Angular Material itself). The error threshold is 1 MB, so the build still succeeds. Lazy loading has been applied to all non-initial routes to mitigate this.

### Branch workflow

```bash
git checkout dev
git pull origin dev
git checkout -b feature/<name>
# ... work ...
git push origin feature/<name>
# Create PR → merge into dev → eventually into main
```
