# Gallery Plus

React + Fastify full‑stack photo gallery with albums, uploads, search and a JSON file database. The backend serves REST APIs and static images; the frontend is a Vite React app using TanStack Query and React Router.

## Stack
- **Frontend**: React 19, React Router 7, TanStack Query 5, Tailwind CSS 4, Vite
- **Backend**: Fastify 4, @fastify/cors, @fastify/multipart, @fastify/static
- **Data**: File‑based JSON DB at `data/db.json` and images under `data/images`
- **Build/Tooling**: TypeScript, tsup, ESLint

## Features
- Browse, search, and view photos
- Create and delete albums; assign photos to albums
- Upload image files for photos (multipart)
- Static serving of uploaded images at `/images/*`
- Clean TypeScript services and Zod‑validated endpoints

## Project structure
```
server/
  main.ts                  # Fastify app bootstrap and plugins
  services/
    database-service.ts    # JSON file DB read/write and initialization
    image-service.ts       # Image persistence (filesystem)
  photos/                  # Photos domain (routes, service, interfaces)
  albums/                  # Albums domain (routes, service, interfaces)
src/
  App.tsx                  # Providers and router host
  routes/router.tsx        # Routes: /, /photos/:id, /components
  pages/                   # Layout and pages
  contexts/                # Feature modules (hooks, components, models)
  components/              # UI components
data/
  db.json                  # JSON database (auto‑created if missing)
public/images/             # Static demo images for the frontend
```

## Prerequisites
- Node.js 20+
- pnpm 9+

## Getting started
Install dependencies:

```bash
pnpm install
```

Start the backend (terminal 1):

```bash
pnpm dev-server
```

Start the frontend (terminal 2):

```bash
pnpm dev
```

Default ports:
- Backend: `http://localhost:5799` (configurable via `PORT` env)
- Frontend: `http://localhost:5173`
- Images: `http://localhost:5799/images/...`

## NPM scripts
- `pnpm dev`: Run Vite dev server (frontend)
- `pnpm dev-server`: Watch + run Fastify server from `server/dist/main.js`
- `pnpm build`: Build backend then frontend
- `pnpm build-server`: Type‑check server and bundle with tsup
- `pnpm run-server`: Run the built server (requires prior `build-server`)
- `pnpm preview`: Preview built frontend
- `pnpm lint`: Lint project

## API overview
Base URL: `http://localhost:5799`

Health
- `GET /health` → `{ status: "ok", timestamp }`

Photos
- `GET /photos?albumId=<id>&q=<text>` → list photos (optional album/search)
- `GET /photos/:id` → get a photo
- `POST /photos` → create photo (JSON: `{ title: string }`)
- `POST /photos/:id/image` → upload image file (multipart field: `file`)
- `PATCH /photos/:id` → update photo title (JSON: `{ title?: string }`)
- `DELETE /photos/:id` → delete photo
- `PUT /photos/:id/albums` → manage photo albums (JSON: `{ add?: string[], remove?: string[] }`)

Albums
- `GET /albums` → list albums
- `GET /albums/:id` → get album by id
- `POST /albums` → create album (JSON: `{ name: string }`)
- `DELETE /albums/:id` → delete album

Static files
- `GET /images/<filename>` → serves uploaded images from `data/images`

## Data & storage
- On first run, the server ensures the `data/` directory and initializes `data/db.json` with empty collections.
- Uploaded files are stored under `data/images` and exposed via `/images/`.

## Mermaid architecture
```mermaid
graph TD
  A[Browser / React App]\nVite + React Router + TanStack Query -->|HTTP| B[Fastify Server]
  B --> C[/@fastify/cors/]
  B --> D[/@fastify/multipart/]
  B --> E[/@fastify/static → /images/*/]

  subgraph Routes
    B --> R1[GET/POST/PATCH/DELETE /photos]
    B --> R2[POST /photos/:id/image]
    B --> R3[GET/POST/DELETE /albums]
    B --> R4[GET /health]
  end

  subgraph Services
    R1 --> S1[PhotosService]
    R2 --> S1
    R3 --> S2[AlbumsService]
    S1 --> S3[ImageService]
    S1 --> S4[DatabaseService]
    S2 --> S4
  end

  S4 --> F[(data/db.json)]
  S3 --> G[(data/images)]
```

## Frontend routes
- `/` Home (photos list, filters, widgets)
- `/photos/:id` Photo details
- `/components` Internal component showcase

## Importing API collection
A Postman collection is available at `Gallery+.postman_collection.json`.

## Notes
- Set a custom backend port with `PORT=XXXX pnpm dev-server`.
- Ensure `data/` is writable by the Node process.

