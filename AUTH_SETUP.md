# Authentication Setup Guide

## Overview
This application now has separate authentication for **Users** and **Admins**:

- **Users**: Login via Google OAuth
- **Admins**: Login with predefined credentials (no registration needed)

---

## Admin Credentials

**Email**: `admin@truassets.com`  
**Password**: `Admin@123`

These credentials are hardcoded in the application. You can change them in:
`src/pages/AdminLogin.tsx` (line 11-14)

---

## Google OAuth Setup for User Login

### Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Choose **Web application**
6. Add authorized JavaScript origins:
   - `http://localhost:5173` (for development)
   - Your production domain (when deployed)
7. Add authorized redirect URIs:
   - `http://localhost:5173` (for development)
   - Your production domain (when deployed)
8. Click **Create** and copy your **Client ID**

### Step 2: Configure the Application

1. Create a `.env` file in the project root (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Add your Google Client ID to the `.env` file:
   ```
   VITE_GOOGLE_CLIENT_ID=your_actual_google_client_id_here
   ```

3. Update `src/pages/UserLogin.tsx` (line 31) to use the environment variable:
   ```typescript
   client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
   ```

---

## Routes

- **Home**: `/`
- **User Login**: `/login`
- **Admin Login**: `/admin/login`
- **Admin Dashboard**: `/admin/dashboard`

---

## Features

### User Authentication
- ✅ Google OAuth login
- ✅ User profile display in header
- ✅ Persistent login (localStorage)
- ✅ Logout functionality
- ✅ Protected investment actions

### Admin Authentication
- ✅ Email/password login
- ✅ Predefined credentials (no registration)
- ✅ Admin dashboard access
- ✅ Admin badge in header
- ✅ Separate admin portal

### Security Features
- ✅ Role-based access control (user/admin)
- ✅ Protected routes
- ✅ Session persistence
- ✅ Secure logout

---

## Installation & Running

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

---

## Testing the Authentication

### Test User Login:
1. Click "Login" or "Start Investing" button
2. Click the Google Sign-In button
3. Sign in with your Google account
4. You'll be redirected to the home page as a logged-in user

### Test Admin Login:
1. Navigate to `/admin/login` or click "Admin Login" from the user login page
2. Enter credentials:
   - Email: `admin@truassets.com`
   - Password: `Admin@123`
3. You'll be redirected to the admin dashboard

---

## Customization

### Change Admin Credentials
Edit `src/pages/AdminLogin.tsx`:
```typescript
const ADMIN_CREDENTIALS = {
  email: 'your_admin_email@example.com',
  password: 'YourSecurePassword123',
};
```

### Add Multiple Admins
Modify the `ADMIN_CREDENTIALS` to be an array and update the validation logic accordingly.

---

## Notes

- The Google OAuth integration requires a valid Client ID to work
- Admin credentials are currently hardcoded for demo purposes
- In production, consider using a backend API for authentication
- User sessions are stored in localStorage
- The app uses React Context for state management
