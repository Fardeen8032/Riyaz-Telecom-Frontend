# Riyaz Telecom — Frontend

A React-based frontend for a mobile shop management and e-commerce application. Riyaz Telecom provides an interface for browsing mobile products, exploring product categories, viewing product details, and managing the shopping cart with authentication support.

## Features

- **Product Listing:** Browse available mobile products.
- **Product Categories:** Explore products by category.
- **Product Details:** View individual products through dedicated product pages.
- **Shopping Cart:** Access cart functionality through the application.
- **Authentication:** Sign in using Google Authentication with Firebase.
- **Form Validation:** Validate form inputs using React Hook Form and Zod.
- **API Integration:** Communicate with the backend using Axios.
- **Client State Management:** Manage application state using Redux Toolkit.
- **Notifications:** Display user feedback using React Toastify.
- **Responsive UI:** Build a responsive interface using Tailwind CSS.

## Tech Stack

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| Vite | Development server and build tooling |
| JavaScript | Application logic |
| React Router | Client-side routing |
| Redux Toolkit | Application state management |
| Axios | HTTP requests to the backend API |
| Firebase Authentication | Google sign-in |
| React Hook Form | Form state management |
| Zod | Schema-based validation |
| Tailwind CSS | Styling and responsive layouts |
| React Toastify | Toast notifications |
| lucide-react | Icons |

## Prerequisites

Before running the project, install:

- Node.js and npm
- Git
- Access to the Riyaz Telecom backend API
- A Firebase project configured for Google Authentication

Use a Node.js version compatible with the project's Vite version.

## Getting Started

### 1. Clone the repository

```bash
git clone
```

Navigate into the project directory:

```bash
cd <YOUR_LOCAL_DIRECTORY>
```

Replace the placeholders with your actual GitHub repository URL and local directory name.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root, alongside `package.json`.

```env
# Backend API
VITE_API_BASE_URL=your_backend_local_project_url

# Firebase configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

# Optional: Firebase Analytics configuration
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**Important:**

- Replace the example values with your actual configuration.
- Update the API URL and port to match your backend configuration.
- The Firebase measurement ID is needed only if the application uses Firebase Analytics.
- The variable names must match those referenced in your frontend source code.
- Vite exposes variables prefixed with `VITE_` to client-side code. Never put private server credentials, database passwords, or secret API keys in these variables.
- Add `.env` to `.gitignore` and never commit real credentials.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL printed in your terminal, usually:

```text
http://localhost:5173
```

Ensure the backend API is running and accessible at the configured URL.

## Available Scripts

The following are common Vite commands. Confirm that each script exists in your `package.json` before using it.

| Command | Purpose |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint, if configured |

## Project Configuration

### Backend API

The frontend communicates with the backend through the `VITE_API_BASE_URL` environment variable.

Configure the variable to point to the appropriate backend environment:

- **Local development:** Your locally running backend API.
- **Production:** Your deployed backend API.

Keep the `/api` path only if it matches the backend's actual API prefix. Avoid hardcoding different backend URLs throughout the source code.

### Firebase Authentication

The application uses Firebase Authentication for Google sign-in.

## Production Build

Generate an optimized production build:

```bash
npm run build
```

Vite typically writes the build output to the `dist/` directory.