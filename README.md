# ⚡ Pokémon Battle Arena ⚡

An arcade-inspired Pokémon battle experience built with React, Express, MongoDB and the PokéAPI.

This project is not focused on creating a complex AAA combat engine.  
Instead, the goal is to create a fast, stylish and enjoyable battle experience with strong game-feel, smooth UI flow and cinematic presentation elements.

---

# 🎮 Core Experience

The player enters a small Pokémon battle world:

INTRO → START → LOGIN → SELECT → VS → BATTLE → RESULT → LEADERBOARD

The experience is designed to feel:

- fast ⚡
- responsive 💥
- arcade-like 🕹️
- atmospheric 🌌
- easy to understand 🙂

while still demonstrating:

- authentication 🔐
- API integration 🌐
- database usage 🗄️
- state management ⚙️
- teamwork & architecture 🧩

---

# ✨ Main Features

## 🎬 Cinematic Intro

A small animated intro sequence introduces the game world before entering the main menu.

The intro focuses on:

- motion
- atmosphere
- transitions
- sound design
- arcade feeling

without slowing down the player experience.

---

## 👤 User Authentication

Players can:

- register
- login
- logout

Each player has their own:

- battle history
- scores
- wins/losses
- leaderboard progress

---

## 🦖 Pokémon Selection

Players can choose their fighter from a Pokémon roster.

The selection screen is inspired by classic arcade and fighting games:

- animated cards
- visual feedback
- dynamic transitions
- versus presentation

---

## ⚔️ Battle System

The battle system is intentionally lightweight and focused on game-feel rather than complex simulation.

Battles include:

- HP system ❤️
- attack values 💥
- defense values 🛡️
- random enemies 🎲
- animated feedback ✨
- visual hit effects ⚡
- score system 🏆

The player fights against AI-controlled opponents.

---

## 🏟️ Arena Flow

The project focuses heavily on smooth flow:

```text
SELECT → FIGHT → BOOM 💥
```

The goal is to minimize unnecessary navigation and keep the experience fun and immediate.

---

## 📊 Leaderboard

After battles:

- scores are saved
- statistics are updated
- players appear on the leaderboard

Tracked data includes:

- total battles
- wins
- losses
- total score

---

# 🔥 Game Feel

This project is designed with the idea that:
good game-feel comes from feedback and atmosphere.

The experience uses:

- animations
- transitions
- visual feedback
- responsive interactions
- cinematic timing
- sound effects

to create excitement without requiring a heavy game engine.

---

# 🏗️ Project Structure

```text
pokemon-battle/
│
├── frontend/
│   ├── src/
│   │   ├── features/
│   │   │   ├── intro/
│   │   │   ├── auth/
│   │   │   ├── select/
│   │   │   ├── battle/
│   │   │   ├── leaderboard/
│   │   │   └── result/
│   │   │
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── assets/
│   │   ├── animations/
│   │   └── services/
│   │
│   └── public/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── services/
│   │   └── utils/
│
├── docs/
│
└── README.md
```

---

# 🛠️ Tech Stack

## Frontend

- React ⚛️
- Vite ⚡
- React Router 🧭
- TailwindCSS 🎨
- Framer Motion / GSAP ✨

## Backend

- Node.js 🟢
- Express 🚂
- MongoDB 🍃
- Mongoose 🗄️
- JWT Authentication 🔐

## API

- PokéAPI 🌐

---

# 🤝 Team Workflow

The project uses:

- feature branches 🌿
- pull requests 🔀
- GitHub issues 📌
- documentation 📝

The `main` branch is protected and only updated through pull requests.

---

# 🚀 Vision

Built to feel fast, playful and energetic — inspired by the spirit of classic arcade battles 🎮⚡
