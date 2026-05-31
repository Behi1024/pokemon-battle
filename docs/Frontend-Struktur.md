# Frontend Struktur & Implementierungsreihenfolge

## Tech Stack

| Technologie | Zweck |
|---|---|
| Vite | Build Tool & Dev Server |
| React 19 | UI Framework |
| TypeScript | Typsicherheit |
| React Router v7 | Routing & Navigation |
| Tailwind CSS v4 | Styling |
| DaisyUI v5 | UI Komponenten |
| Zod | Validierung (Formulare & API) |
| ESLint | Code-Qualität |

---

## Ordnerstruktur

```
frontend/
├── public/
├── src/
│   ├── assets/          # Statische Dateien (Bilder, Icons)
│   ├── components/      # Wiederverwendbare UI-Komponenten
│   ├── context/         # React Context (globaler State)
│   ├── hooks/           # Custom React Hooks
│   ├── pages/           # Seiten (eine pro Route)
│   ├── router/          # Router-Konfiguration
│   ├── schemas/         # Zod-Validierungsschemata
│   ├── services/        # API-Calls
│   ├── types/           # TypeScript Typdefinitionen
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── eslint.config.js
```

---

## Routen

| Pfad | Seite | Geschützt |
|---|---|---|
| `/login` | LoginPage | Nein |
| `/register` | RegisterPage | Nein |
| `/` | HomePage | Ja |
| `/pokemon/:id` | PokemonDetailPage | Ja |
| `/team` | TeamPage | Ja |
| `/battle` | BattlePage | Ja |
| `/leaderboard` | LeaderboardPage | Ja |

---

## Implementierungsreihenfolge

Von unten nach oben — jede Datei baut auf bereits vorhandenen auf.

### 1. Types (`src/types/`)
Keine Abhängigkeiten — reine TypeScript-Interfaces.

- `pokemon.ts` — Pokemon, Move, Stat
- `auth.ts` — User, LoginPayload, Token
- `battle.ts` — BattleState, BattleResult

### 2. Schemas (`src/schemas/`)
Nutzen die Types für Zod-Validierung.

- `authSchemas.ts` — Login- und Register-Formular
- `pokemonSchemas.ts` — PokeAPI-Response-Validierung

### 3. Services (`src/services/`)
Nutzen Types und Schemas für API-Calls.

- `api.ts` — Basis-Fetch-Wrapper (Base-URL, Auth-Header)
- `authService.ts` — POST /login, POST /register
- `pokeApiService.ts` — PokeAPI-Calls

### 4. Context (`src/context/`)
Nutzen Types für globalen State.

- `AuthContext.tsx` — Eingeloggter User + JWT
- `TeamContext.tsx` — Ausgewähltes Pokemon-Team

### 5. Hooks (`src/hooks/`)
Nutzen Context und Services.

- `useAuth.ts` — Zugriff auf AuthContext
- `usePokemon.ts` — Datenfetching von PokeAPI

### 6. Components (`src/components/`)
Nutzen Types, werden von Pages verwendet.

- `Header.tsx`
- `Layout.tsx`
- `PokemonCard.tsx` — Karte mit Bild, Name, Typ
- `PokemonStats.tsx` — HP/Attack/Defense-Balken
- `BattleArena.tsx`
- `Button.tsx`
- `LoadingSpinner.tsx`

### 7. Pages (`src/pages/`)
Nutzen alles bisher.

- `LoginPage.tsx`
- `RegisterPage.tsx`
- `HomePage.tsx`
- `PokemonDetailPage.tsx`
- `TeamPage.tsx`
- `BattlePage.tsx`
- `LeaderboardPage.tsx`

### 8. Router (`src/router/`)
Braucht die Pages und den AuthContext.

- `ProtectedRoute.tsx` — Redirect auf `/login` wenn nicht eingeloggt
- `index.tsx` — `createBrowserRouter` mit allen Routen

### 9. Einstiegspunkt
Bindet alles zusammen.

- `App.tsx` — `RouterProvider`
- `main.tsx` — `ReactDOM.createRoot`
