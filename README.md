CSRF-csrf demo (React + Express)

This repository demonstrates using `csrf-csrf` (Double Submit Cookie pattern) with a JWT cookie for authentication.

Backend (Express) — simplified blog structure for teaching
- Project layout (backend):
  - `index.js` — application bootstrap, mounts routes and middleware
  - `csrfConfig.js` — configures `csrf-csrf` utilities and middleware
  - `routes/authRoutes.js`, `controllers/authController.js` — login/logout
  - `routes/postsRoutes.js`, `controllers/postsController.js` — simple in-memory blog CRUD

- Endpoints:
  - POST /auth/login { username }
    - issues an httpOnly cookie `token` (JWT)
  - POST /auth/logout
    - clears the cookie
  - GET /csrf-token
    - returns JSON { csrfToken } and sets the CSRF cookie
  - GET /posts
    - list posts (public)
  - POST /posts
    - create post (requires `x-csrf-token` header)
  - DELETE /posts/:id
    - delete post (requires `x-csrf-token` header)

Frontend (Vite + React)
- Simple UI in `frontend/src/App.jsx` demonstrating login, fetching CSRF token, listing, adding, and deleting items.

Frontend (organized for students)
- `src/components/Login.jsx` — login form that hits `/auth/login`
- `src/components/BlogList.jsx` — lists posts and can delete them
- `src/components/NewPost.jsx` — create a new post
- `src/App.jsx` wires components together and manages fetching the CSRF token

Env variables (backend)
- JWT_SECRET: secret for signing JWTs (default: dev-jwt-secret)
- CSRF_SECRET: secret for csrf-csrf (default: dev-csrf-secret)
- PORT: backend port (default: 4000)

Run locally (Windows PowerShell):

# in backend
cd backend
npm install
npm start

# in frontend
cd frontend
npm install
npm run dev

Open the frontend dev server (Vite) shown in the console (usually http://localhost:5173).

Notes:
- In production set secure cookie flags and use HTTPS.
- The demo uses an in-memory store; replace with persistent DB for real apps.
