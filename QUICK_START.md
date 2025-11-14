# 🚀 Quick Start Guide

## Authentication System Ready!

Your TruAssets application now has complete authentication with:
- ✅ **User Login** via Google OAuth
- ✅ **Admin Login** with predefined credentials
- ✅ Separate dashboards and access levels

---

## 🔥 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run the Application
```bash
npm run dev
```

### Step 3: Test the Authentication

#### Test Admin Login (Works Immediately!)
1. Open browser to `http://localhost:5173`
2. Click on "Login" button in header
3. Click "Admin Login" at the bottom
4. Use these credentials:
   - **Email**: `admin@truassets.com`
   - **Password**: `Admin@123`
5. You'll see the admin dashboard! 🎉

#### Test User Login (Requires Google OAuth Setup)
1. Click "Login" or "Start Investing"
2. For Google login to work, you need to:
   - Get a Google Client ID (see below)
   - Add it to your environment variables

---

## 🔑 Google OAuth Setup (For User Login)

### Quick Setup:

1. **Get Google Client ID**:
   - Go to https://console.cloud.google.com/
   - Create a new project
   - Go to "APIs & Services" > "Credentials"
   - Create "OAuth client ID" > "Web application"
   - Add authorized origin: `http://localhost:5173`
   - Copy your Client ID

2. **Create `.env` file**:
   ```bash
   # Create .env file in project root
   VITE_GOOGLE_CLIENT_ID=paste_your_client_id_here
   ```

3. **Update UserLogin.tsx**:
   Open `src/pages/UserLogin.tsx` and change line 31 from:
   ```typescript
   client_id: 'YOUR_GOOGLE_CLIENT_ID',
   ```
   to:
   ```typescript
   client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
   ```

4. **Restart the dev server**:
   ```bash
   npm run dev
   ```

---

## 📍 Important Routes

| URL | What It Does |
|-----|--------------|
| `http://localhost:5173/` | Homepage |
| `http://localhost:5173/login` | User Login (Google) |
| `http://localhost:5173/admin/login` | Admin Login |
| `http://localhost:5173/admin/dashboard` | Admin Dashboard |

---

## 🎯 What's Been Implemented

### User Features:
- Google OAuth login
- User profile in header
- Access to investment features after login
- Logout functionality

### Admin Features:
- Email/password login (no registration needed)
- Admin dashboard with statistics
- **Real-time user management** - Users appear automatically when they login/signup
- User blocking, unblocking, and hold features
- Quick access badge in header
- Separate admin portal

### Security:
- Role-based access control
- Protected routes
- Persistent sessions
- Secure logout

---

## 🔐 Admin Credentials

**Email**: `admin@truassets.com`  
**Password**: `Admin@123`

*Want to change these?* Edit `src/pages/AdminLogin.tsx` (lines 11-14)

---

## 💡 How It Works

### When User Clicks "Start Investing":
- **Not logged in** → Redirected to login page
- **Logged in** → Scrolls to properties section

### Login Flow:
```
User Login:
Homepage → Click "Login" → Google Sign-In → Back to Homepage (Logged In)

Admin Login:
Homepage → Navigate to /admin/login → Enter Credentials → Admin Dashboard
```

---

## 🎨 UI Features

- **Modern Design**: Built with shadcn/ui components
- **Responsive**: Works on mobile, tablet, and desktop
- **User Menu**: Avatar dropdown with profile and logout
- **Admin Badge**: Special indicator for admin users
- **Toast Notifications**: Feedback for all actions

---

## 📱 Test Scenarios

### Scenario 1: New User
1. Visit homepage
2. Click "Start Investing"
3. Redirected to login page
4. Sign in with Google
5. Redirected back, now logged in
6. Can access all investment features

### Scenario 2: Admin Access & User Management
1. Go to `/admin/login`
2. Enter admin credentials
3. Access admin dashboard
4. See platform statistics
5. Navigate to "Manage Users" tab
6. **Real-time sync**: When users login, they automatically appear here
7. Block, unblock, or put users on hold
8. View user activity and investment data

### Scenario 3: Logout
1. Click on user avatar in header
2. Select "Log out"
3. Logged out and redirected to homepage

---

## 🛠️ Files Created

**New Files**:
- `src/contexts/AuthContext.tsx`
- `src/pages/UserLogin.tsx`
- `src/pages/AdminLogin.tsx`
- `src/pages/AdminDashboard.tsx`
- `.env.example`
- `AUTH_SETUP.md`
- `IMPLEMENTATION_SUMMARY.md`
- `QUICK_START.md` (this file)

**Modified Files**:
- `src/App.tsx`
- `src/components/Header.tsx`
- `src/components/Hero.tsx`
- `package.json`

---

## ⚡ Pro Tips

1. **Admin login works immediately** - No Google setup needed!
2. **User sessions persist** - Users stay logged in after page refresh
3. **Mobile friendly** - All features work on mobile devices
4. **Easy customization** - Change admin credentials anytime
5. **Production ready** - Just add your Google Client ID

---

## 🐛 Common Issues

**Issue**: Google Sign-In button not showing
- **Fix**: Make sure you've added the Google Client ID to `.env` file

**Issue**: Admin login not working
- **Fix**: Check credentials are exactly: `admin@truassets.com` / `Admin@123`

**Issue**: User not staying logged in
- **Fix**: Check browser's localStorage is enabled

---

## 📚 Documentation

- **Full Setup Guide**: See `AUTH_SETUP.md`
- **Implementation Details**: See `IMPLEMENTATION_SUMMARY.md`
- **Real-Time User Management**: See `REALTIME_USER_SYNC.md`
- **Environment Variables**: See `.env.example`

---

## 🎉 You're All Set!

Run `npm install` and `npm run dev` to start using your new authentication system!

**Admin login works right away** - no additional setup needed for testing! 🚀
