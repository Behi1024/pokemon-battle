# Projektaufgaben

---

## Frontend

- [ ] **FR014** React + Vite — Projekt mit Vite + React (JS oder TS) aufsetzen
- [ ] **FR015** React Router Navigation — Routen konfigurieren für: Registrierung, Login, Startseite, Pokémon-Details, Mein Kader, Kampf, Bestenliste
- [ ] **FR016** Routenschutz (Frontend) — Nicht eingeloggte Nutzer zu `/login` weiterleiten
- [ ] **FR017** Registrierungsseite — Formular sendet an `/auth/register`; Eingaben werden client-seitig geprüft
- [ ] **FR018** Anmeldeseite — Formular sendet an `/auth/login`; JWT wird bei Erfolg gespeichert
- [ ] **FR019** Startseite — Pokémon-Liste von der PokeAPI laden und als verlinkte Karten anzeigen
- [ ] **FR020** Pokémon-Detailseite — Stats, Typen und Fähigkeiten anzeigen; „Zum Kader hinzufügen"-Funktion
- [ ] **FR021** Mein Kader — Ausgewählte Pokémon auflisten; Entfernen ermöglichen; Kader speichern (localStorage oder Datenbank)
- [ ] **FR022** Kampfseite — Einfache Kampflogik gegen ein zufälliges Pokémon; Siege/Niederlagen verfolgen; Punkte an `/leaderboard` senden
- [ ] **FR023** Bestenliste — Daten von `/leaderboard` abrufen und anzeigen
- [ ] **FR024** Formulareingaben prüfen — Alle Nutzereingaben **client-seitig** validieren _(auch BE)_
- [ ] **FR025** Fehlerbehandlung & Rückmeldungen — Verständliche Fehlermeldungen bei API-/Netzwerkfehlern und Servervalidierungsfehlern anzeigen _(auch BE)_
- [ ] **FR026** Responsives Design — Bedienbarkeit auf Mobilgeräten und Desktop sicherstellen; Tailwind CSS empfohlen

---

## Backend

- [ ] **FR005** MongoDB Atlas — Datenbank-Cluster auf Atlas (oder vergleichbar) einrichten
- [ ] **FR006** Nutzer-Sammlung — Authentifizierungsdaten modellieren (E-Mail, Passwort-Hash, …) für Registrierung und Login
- [ ] **FR007** Punkte-Sammlung — Felder: `userId` (ObjectId-Referenz), `score` (Ganzzahl, Pflichtfeld), `date` (Standard: `Date.now`)
- [ ] **FR008** Express API einrichten — Backend mit Express + TypeScript (optional) nach Standard-Ordnerstruktur aufsetzen
- [ ] **FR009** Authentifizierungs-Endpunkte — `POST /auth/register`, `POST /auth/login`; bei erfolgreichem Login JWT zurückgeben
- [ ] **FR010** Routenschutz (Backend) — Middleware schützt alle Routen außer Registrierung/Login; JWT wird geprüft
- [ ] **FR011** Mongoose-Modelle — Nutzer- und Punkte-Schemas mit Validierung umsetzen
- [ ] **FR012** GET /leaderboard — Die besten Punktestände absteigend sortiert zurückgeben
- [ ] **FR013** POST /leaderboard — Neuen Punktestand für den eingeloggten Nutzer speichern
- [ ] **FR024** Formulareingaben prüfen — Alle Nutzereingaben **server-seitig** validieren _(auch FE)_
- [ ] **FR025** Fehlerbehandlung & Rückmeldungen — Server-seitige Validierungsfehler sauber als Antwort zurückgeben _(auch FE)_

---

## Generell

- [ ] **FR003** Zwei öffentliche Repositories — Je ein Repository für Frontend, Backend und den Authentifizierungsdienst; Kursleiter sind keine Mitarbeiter
- [ ] **FR004** Pull-Request-Workflow — Alle Änderungen an `main` über geprüfte Pull Requests einpflegen
