# Gallery Plus

React + Fastify full‑stack photo gallery with albums, uploads, search and a JSON file database. The backend serves REST APIs and static images; the frontend is a Vite React app using TanStack Query and React Router.

## Stack
- **Frontend**: React 19, React Router 7, TanStack Query 5, Tailwind CSS 4, Vite 6
- **Backend**: Fastify 4, @fastify/cors, @fastify/multipart, @fastify/static
- **Forms**: React Hook Form 7, Zod 3 for validation, @hookform/resolvers
- **UI Components**: Radix UI (Dialog), Sonner (Toasts), Tailwind Variants
- **Data**: File‑based JSON DB at `data/db.json` and images under `data/images`
- **Build/Tooling**: TypeScript 5.8, tsup, ESLint 9, SWC

## Features
- **Photo Gallery**: Browse, search, and view photos with responsive design
- **Album Management**: Create, delete albums and assign photos to multiple albums
- **Photo Creation**: Create new photos with title and upload images
- **Photo Deletion**: Delete photos and their associated images
- **Advanced Search**: Real-time search with debounced input and URL state persistence
- **Photo Filtering**: Filter photos by album with URL-based state management
- **Photo Navigation**: Navigate between photos with previous/next functionality
- **Image Upload**: Upload image files via multipart form data with drag-and-drop support
- **Form Validation**: React Hook Form with Zod schema validation
- **Toast Notifications**: User feedback with Sonner toast notifications
- **Responsive UI**: Modern, mobile-friendly interface with Tailwind CSS v4
- **Static Serving**: Efficient serving of uploaded images at `/images/*`
- **Type Safety**: Full TypeScript implementation with Zod-validated endpoints
- **State Management**: TanStack Query for server state and URL state for filters

## Project structure
```
server/
  main.ts                  # Fastify app bootstrap and plugins
  models.ts                # Shared TypeScript interfaces
  services/
    database-service.ts    # JSON file DB read/write and initialization
    image-service.ts       # Image persistence (filesystem)
  photos/                  # Photos domain (routes, service, interfaces)
    photos-routes.ts       # Photo API endpoints
    photos-service.ts      # Photo business logic
    photos-interfaces.ts   # Photo type definitions
  albums/                  # Albums domain (routes, service, interfaces)
    albums-routes.ts       # Album API endpoints
    albums-service.ts      # Album business logic
    albums-interfaces.ts   # Album type definitions
src/
  App.tsx                  # App component with providers and router
  main.tsx                 # React app entry point
  routes/router.tsx        # Routes: /, /photos/:id, /components
  pages/                   # Page components and layouts
    layout-main.tsx        # Main layout component
    page-home.tsx          # Home page with photo gallery
    page-photo-details.tsx # Photo detail view
    page-components.tsx    # Component showcase page
  contexts/                # Feature modules with schemas
    photos/schemas.ts      # Photo-related Zod schemas
    album/schemas.ts       # Album-related Zod schemas
  components/              # Reusable UI components
  helpers/                 # Utility functions and API helpers
    api.ts                 # API client configuration
    utils.ts               # General utility functions
  assets/                  # Static assets (icons, images)
data/
  db.json                  # JSON database (auto‑created if missing)
public/
  images/                  # Static demo images for the frontend
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

## Environment Variables

### Backend (.env)
```bash
PORT=5799                    # Server port (default: 5799)
```

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:5799  # Backend API URL
VITE_IMAGES_URL=http://localhost:5799/images  # Images base URL
```

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

### Photos API
- `GET /photos?albumId=<id>&q=<text>` → List photos with optional album filter and search
- `GET /photos/:id` → Get photo details with navigation data (nextPhotoId, previousPhotoId)
- `POST /photos` → Create new photo (JSON: `{ title: string }`)
- `POST /photos/:id/image` → Upload image file (multipart field: `file`)
- `PATCH /photos/:id` → Update photo metadata (JSON: `{ title?: string }`)
- `DELETE /photos/:id` → Delete photo and associated image
- `PUT /photos/:id/albums` → Manage photo-album associations (JSON: `{ add?: string[], remove?: string[] }`)

### Albums API
- `GET /albums` → List all albums
- `GET /albums/:id` → Get album details by ID
- `POST /albums` → Create new album (JSON: `{ name: string }`)
- `DELETE /albums/:id` → Delete album (removes associations with photos)

### Query Parameters
- `albumId`: Filter photos by specific album ID
- `q`: Search photos by title/text content

Static files
- `GET /images/<filename>` → serves uploaded images from `data/images`

## Data & storage
- On first run, the server ensures the `data/` directory and initializes `data/db.json` with empty collections.
- Uploaded files are stored under `data/images` and exposed via `/images/`.

## Architecture Overview

```mermaid
graph TB
  subgraph "Frontend (React App)"
    A[React Router 7] --> B[Page Components]
    B --> C[Photo Details]
    B --> D[Home Gallery]
    C --> E[PhotosNavigator]
    D --> F[AlbumsFilter]
    D --> G[PhotosSearch]
    
    H[TanStack Query] --> I[usePhotos Hook]
    H --> J[usePhoto Hook]
    H --> K[useAlbums Hook]
    
    I --> L[URL State Management]
    L --> M[nuqs - Query Params]
    
    F --> I
    G --> I
    E --> J
  end

  subgraph "Backend (Fastify Server)"
    N[Fastify 4] --> O[CORS Plugin]
    N --> P[Multipart Plugin]
    N --> Q[Static Files Plugin]
    
    subgraph "API Routes"
      R1[GET /photos?albumId&q]
      R2[GET /photos/:id]
      R3[POST /photos]
      R4[POST /photos/:id/image]
      R5[PATCH /photos/:id]
      R6[DELETE /photos/:id]
      R7[PUT /photos/:id/albums]
      R8[GET /albums]
      R9[POST /albums]
      R10[DELETE /albums/:id]
    end
    
    subgraph "Services Layer"
      S1[PhotosService]
      S2[AlbumsService]
      S3[ImageService]
      S4[DatabaseService]
    end
    
    R1 --> S1
    R2 --> S1
    R3 --> S1
    R4 --> S1
    R5 --> S1
    R6 --> S1
    R7 --> S1
    R8 --> S2
    R9 --> S2
    R10 --> S2
    
    S1 --> S3
    S1 --> S4
    S2 --> S4
  end

  subgraph "Data Layer"
    T1[(data/db.json)]
    T2[(data/images/)]
  end

  subgraph "External"
    U[Browser URL State]
  end

  %% Connections
  I -.->|HTTP Requests| R1
  I -.->|HTTP Requests| R2
  J -.->|HTTP Requests| R2
  K -.->|HTTP Requests| R8
  
  M -.->|Query Params| U
  
  S4 --> T1
  S3 --> T2
  Q -.->|Static Serving| T2
```

### Key Features Highlighted:
- **State Management**: URL-based filtering and search with nuqs
- **Real-time Search**: Debounced search with query parameter persistence  
- **Photo Navigation**: Previous/next navigation between photos
- **Album Filtering**: Dynamic album selection with visual feedback
- **Type Safety**: Full TypeScript implementation across the stack

## Frontend routes
- `/` Home (photos list, filters, widgets)
- `/photos/:id` Photo details
- `/components` Internal component showcase

## Importing API collection
A Postman collection is available at `Gallery+.postman_collection.json`.

## Recent Updates
- ✅ Photo deletion functionality with image cleanup
- ✅ New album creation with photo assignment during creation
- ✅ Enhanced photo creation workflow with form validation
- ✅ Improved dialog components with proper accessibility
- ✅ Better form state management and validation schemas

## Development Notes
- Set a custom backend port with `PORT=XXXX pnpm dev-server`
- Ensure `data/` is writable by the Node process
- The project uses SWC for fast React compilation via Vite
- SVG icons are handled via vite-plugin-svgr for optimized imports
- Form validation uses Zod schemas defined in the contexts directory

