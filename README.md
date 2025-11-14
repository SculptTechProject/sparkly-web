# Sparkly Web

Frontend client for **Sparkly**, a build‑in‑public social platform. This repository contains the Angular + Tailwind web application that talks to the `sparkly-server` backend and renders the user interface.

> Status: early development – routes, layout and components are actively changing.

---

## Tech stack

* **Framework**: Angular (standalone components, Angular router)
* **Styling**: Tailwind CSS
* **Build tool**: Angular CLI / Vite (depending on setup)
* **Language**: TypeScript

Sparkly Web is designed to be a classic SPA (single‑page application) that communicates with the backend via JSON APIs.

---

## Project structure

High‑level folder layout (may evolve as the app grows):

```text
sparkly-web/
├─ src/
│  ├─ app/
│  │  ├─ core/              # core services (auth, api client, interceptors)
│  │  ├─ shared/            # shared UI components (navbar, buttons, layout)
│  │  ├─ features/
│  │  │  ├─ auth/           # login, register, password reset
│  │  │  ├─ dashboard/      # main in-app experience
│  │  │  ├─ profile/        # user profile & settings
│  │  ├─ app.routes.ts      # top-level route configuration
│  │  ├─ app.config.ts      # application providers (router, http, etc.)
│  │  └─ app.component.*    # root shell / layout
│  ├─ assets/               # static assets (icons, logos, images)
│  └─ styles.css            # global styles + Tailwind entry
├─ tailwind.config.js       # Tailwind config (content, theme extensions)
├─ postcss.config.js        # PostCSS pipeline for Tailwind
├─ angular.json             # Angular workspace config
└─ package.json             # dependencies and scripts
```

This structure is meant to grow into a feature‑based layout where each feature module (e.g. `auth`, `dashboard`) owns its own components, routes and services.

---

## Getting started

### Prerequisites

* Node.js (LTS version recommended)
* npm or pnpm
* Angular CLI installed globally (optional but convenient)

### 1. Install dependencies

```bash
npm install
# or
pnpm install
```

### 2. Configure environment

Environment files live under `src/environments/` (for classic Angular setup) or in a custom config layer if you are using another approach.

Typical configuration values you will need:

* `API_BASE_URL` – base URL of the `sparkly-server` backend
* `APP_NAME` – application name shown in the UI / title

Keep real production URLs and keys out of the repository; commit only safe defaults and examples.

### 3. Run the dev server

```bash
npm start
# usually equivalent to:
ng serve
```

By default the app runs at `http://localhost:4200` (unless overridden). Make sure the backend (`sparkly-server`) is running and the `API_BASE_URL` is set correctly if you want live data.

---

## Tailwind CSS

Tailwind is used as the main styling system.

Global setup (in `styles.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Tailwind scans HTML and TypeScript templates via `tailwind.config.js`:

```js
export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

When adding new components or layouts, use Tailwind utility classes and, where it makes sense, extract reusable pieces into shared components.

---

## Routing & layout

The app uses Angular Router with a root shell component that provides the main layout (background, navbar, content area). A typical setup looks like this:

* `AppComponent` – wraps the whole app, renders `<app-navbar>` and `<router-outlet>` inside a layout container
* `NavbarComponent` – top navigation bar shared across most routes
* `routes` – defined in `app.routes.ts`, for example:

  * `/` – public landing page
  * `/dashboard` – main in-app experience (requires auth)
  * `/login`, `/register` – authentication pages

As the app grows, consider lazy loading feature routes (e.g. `dashboard`, `profile`) to keep bundle size under control.

---

## Talking to the backend

Sparkly Web communicates with `sparkly-server` via HTTP (REST‑style JSON endpoints).

Recommended pattern:

* central `ApiService` that wraps Angular `HttpClient` and handles base URL, headers and error handling
* feature‑specific services (e.g. `AuthService`, `ProjectsService`, `ProfileService`) built on top of `ApiService`
* interceptors for auth (attach JWT / access token to outgoing requests)

Example responsibilities:

* `AuthService`: login, logout, register, refresh token, current user info
* `DashboardService`: fetch dashboard data / feed
* `ProfileService`: user profile details, updating profile settings

---

## Scripts

Commonly useful npm scripts (adjust names to match `package.json`):

```bash
npm run start       # start dev server
npm run build       # production build
npm run lint        # lint the project
npm run test        # run unit tests (if configured)
```

Check `package.json` in this repo for the exact script names.


## Roadmap ideas

Potential next steps for Sparkly Web:

* Auth flow: login, registration, password reset, basic guard for protected routes.
* First version of the dashboard (projects, updates, basic feed UI).
* Profile page with editable user information.
* Responsive navigation (mobile menu / sidebar for smaller screens).
* Integration with real backend data and, later on, billing state from Stripe.

---

## Contributing

This frontend is developed together with the Sparkly backend (`sparkly-server`). External contributions are welcome once the main architecture stabilises.

If you want to suggest improvements:

* open an issue with screenshots and a short description, or
* open a draft PR with your proposed UI/UX changes.

---

## License

License: **TBD**

Until a license is added, treat this repository as source‑available but not licensed for unrestricted commercial reuse.
