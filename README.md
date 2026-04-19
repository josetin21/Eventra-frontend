# Eventra — Frontend

React-based SPA for the Eventra event management platform. Supports event browsing, registration, QR-based attendance scanning, organizer tools, user profiles, and an admin approval panel.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v3 |
| HTTP Client | Axios |
| QR Scanning | html5-qrcode |
| Bundler | Vite 8 |

---

## Prerequisites

- Node.js 18+
- npm or yarn
- The Eventra backend running locally or deployed

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/eventra-frontend.git
cd eventra-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set environment variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Point this at wherever your backend is running. For production, use your deployed backend URL (e.g. your Railway domain).

### 4. Run the dev server

```bash
npm run dev
```

App starts on `http://localhost:5173`.

---

## HTTPS for Local Mobile Testing

The QR scanner requires camera access, which browsers only allow over HTTPS. For testing on a mobile device locally:

1. Generate a local certificate with [mkcert](https://github.com/FiloSottile/mkcert) and place the files in a `certs/` folder at the project root.
2. Vite will automatically detect the certs and serve over HTTPS (see `vite.config.js`).
3. Alternatively, use [ngrok](https://ngrok.com/) to tunnel your local frontend or backend over HTTPS.

---

## Project Structure

```
src/
├── api/
│   ├── axios.js          # Axios instance with base URL + JWT interceptor
│   └── cloudinary.js     # Cloudinary upload helper
├── components/
│   └── Navbar.jsx        # Top navigation bar
├── context/
│   └── AuthContext.jsx   # Global auth state (user, token, login/logout)
├── pages/
│   ├── Home.jsx               # Public event listing
│   ├── EventDetails.jsx       # Single event view + register action
│   ├── CreateEvent.jsx        # Create a new event form
│   ├── EditEvent.jsx          # Edit an existing event
│   ├── MyEvents.jsx           # Events created by the logged-in user
│   ├── MyRegistrations.jsx    # Events the user has registered for
│   ├── MyParticipation.jsx    # Attendance history
│   ├── EventRegistrants.jsx   # Registrant list + CSV/Excel export (organizer)
│   ├── ScanQR.jsx             # QR scanner for marking attendance (organizer)
│   ├── AdminDashboard.jsx     # Admin overview and stats
│   ├── PendingEvents.jsx      # Events awaiting approval (admin)
│   ├── Profile.jsx            # View own profile
│   ├── EditProfile.jsx        # Edit profile details
│   ├── ChangePassword.jsx     # Change password
│   ├── ForgotPassword.jsx     # Request password reset OTP
│   ├── ResetPassword.jsx      # Submit OTP + new password
│   ├── Login.jsx
│   └── Register.jsx
└── App.jsx                    # Route definitions + ProtectedRoute wrapper
```

---

## Routes

| Path | Access | Page |
|---|---|---|
| `/` | Public | Event listing (Home) |
| `/login` | Public | Login |
| `/register` | Public | Register |
| `/events/:id` | Public | Event details |
| `/forgot-password` | Public | Request OTP |
| `/reset-password` | Public | Reset password with OTP |
| `/my-registrations` | User | My registered events |
| `/my-attendance` | User | My attendance history |
| `/my-events` | User | Events I created |
| `/create-event` | User | Create a new event |
| `/events/:id/edit` | Organizer | Edit an event |
| `/events/:id/registrants` | Organizer | View and export registrants |
| `/scan-qr` | Organizer | QR scanner for attendance |
| `/profile` | User | View profile |
| `/profile/edit` | User | Edit profile |
| `/profile/change-password` | User | Change password |
| `/admin-dashboard` | Admin | Admin stats overview |
| `/pending-events` | Admin | Approve or reject pending events |

---

## Authentication

Auth state is managed globally via `AuthContext`. On login, the JWT is stored in `localStorage` and automatically attached to every API request by the Axios interceptor in `src/api/axios.js`.

`ProtectedRoute` in `App.jsx` guards routes by role (`USER` / `ADMIN`). Unauthenticated users are redirected to `/login`.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## Deployment

The project includes a `vercel.json` for zero-config deployment on [Vercel](https://vercel.com):

1. Push to GitHub.
2. Import the repo in Vercel.
3. Set `VITE_API_BASE_URL` to your deployed backend URL in Vercel's environment variables.
4. Deploy — Vercel handles the build automatically.

You can also deploy to **Railway** or any static hosting (Netlify, Cloudflare Pages) by running `npm run build` and serving the `dist/` folder.
