# React-v15-Greenfield-11091

A personal expense tracker for recording income and expenses, reviewing transaction history, managing custom categories, and viewing monthly totals. Data is persisted in browser localStorage.

## Tech stack
React + TypeScript, Vite, Tailwind CSS, React Router, axios.

## Getting started
```
npm install --legacy-peer-deps
cp .env.example .env
npm run dev
```
Then open http://localhost:41247

## Environment variables
See .env.example. VITE_API_URL is optional — every entity runs on local mock data (USE_MOCK = true in src/data/store.ts) until it's set and each entity's flag is flipped to false.

## Project structure
src/api — Shared configured axios client.
src/components — Application navigation and reusable interface components.
src/data — Typed starter data and localStorage-backed CRUD functions.
src/pages — Dashboard, transaction, category, summary, and error screens.
src/types — Shared TypeScript entity types.
