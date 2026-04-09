# Gima Agric Backend

Spring Boot + Firebase Auth + JWT

## Setup

1. Go to [Firebase Console](https://console.firebase.google.com), create a project, enable **Authentication > Email/Password**.
2. Download the service account JSON: Project Settings > Service Accounts > Generate new private key.
3. Place it at `gima-agric-backend/firebase-service-account.json` (never commit this file).
4. Set the env variable or leave the default path in `application.yml`.

## Run

```bash
cd gima-agric-backend
./gradlew bootRun
```

Server starts on `http://localhost:8080`.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login existing user |
| POST | `/api/contact` | Send contact form email (public) |

### Contact body
```json
{ "name": "John Doe", "email": "john@example.com", "subject": "Partnership", "message": "Hello..." }
```
The email lands in `info@gimasl.com`. Staff just hit **Reply** in their mail client to respond directly to the sender.

## Email Setup (Gmail)

1. Use a Gmail account (e.g. `info@gimasl.com` or a dedicated sender account).
2. Enable **2-Step Verification**, then generate an **App Password** (Google Account > Security > App Passwords).
3. Set environment variables before running:

```bash
export MAIL_USERNAME=your-gmail@gmail.com
export MAIL_PASSWORD=your-app-password
export COMPANY_EMAIL=info@gimasl.com
```

### Signup body
```json
{ "name": "John Doe", "email": "john@example.com", "password": "secret123" }
```

### Login body
```json
{ "email": "john@example.com", "password": "secret123" }
```

Both return:
```json
{ "id": "firebase-uid", "name": "John Doe", "email": "john@example.com", "token": "jwt..." }
```

## Note on Login
Firebase Admin SDK doesn't verify passwords server-side. For production, use the Firebase Client SDK on the frontend to sign in and get an ID token, then send that token to the backend for verification via `firebaseAuth.verifyIdToken(idToken)`.
