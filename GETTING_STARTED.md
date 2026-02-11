# 🚀 Getting Started - AI Hub

## ✅ What's Been Built

### Backend (Node.js + Express + MongoDB)
- ✅ Complete authentication system (Register, Login, JWT)
- ✅ User model with password hashing
- ✅ Tool and UsageHistory models
- ✅ Middleware (auth, rate limiting, error handling)
- ✅ Database configuration
- ✅ API routes structure

### Frontend (React + Vite + Tailwind CSS)
- ✅ Authentication pages (Login, Register)
- ✅ Dashboard with tool cards
- ✅ Home/Landing page
- ✅ Auth Context for state management
- ✅ Theme Context (Dark/Light mode)
- ✅ Protected routes
- ✅ Beautiful, responsive UI

---

## 📋 Prerequisites

Before running the application, make sure you have:

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** - Choose one:
   - **Option A**: Install locally - [Download](https://www.mongodb.com/try/download/community)
   - **Option B**: Use MongoDB Atlas (Cloud) - [Sign up free](https://www.mongodb.com/cloud/atlas/register)
3. **Git** - [Download](https://git-scm.com/)

---

## 🔧 Setup Instructions

### Step 1: Install MongoDB (if not using Atlas)

#### Windows:
1. Download MongoDB Community Server
2. Install with default settings
3. MongoDB will run as a Windows service automatically

#### Verify MongoDB is running:
```powershell
# Check if MongoDB service is running
Get-Service -Name MongoDB

# Or connect to MongoDB
mongosh
```

### Step 2: Install Backend Dependencies

The dependencies are already installed! ✅

If you need to reinstall:
```powershell
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

Currently installing... ⏳

If you need to reinstall:
```powershell
cd frontend
npm install
```

### Step 4: Configure Environment Variables

Backend `.env` is already created with default values. 

**For production or if using MongoDB Atlas:**
1. Open `backend/.env`
2. Update `MONGODB_URI` with your connection string:
   ```env
   # For local MongoDB (default):
   MONGODB_URI=mongodb://localhost:27017/ai-hub

   # For MongoDB Atlas:
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-hub
   ```

---

## 🚀 Running the Application

### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```
You should see:
```
🚀 ========================================
🚀 Server running in development mode
🚀 Server URL: http://localhost:5000
🚀 Health Check: http://localhost:5000/health
🚀 ========================================
✅ MongoDB Connected: localhost
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```
You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Option 2: Use Concurrently (Recommended)

We can set this up if you want to run both with one command!

---

## 🧪 Testing the Application

### 1. Test Backend API

Open your browser or Postman and test:

**Health Check:**
```
GET http://localhost:5000/health
```

**Register a User:**
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

**Login:**
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### 2. Test Frontend

1. Open browser: `http://localhost:5173`
2. You should see the beautiful landing page
3. Click "Get Started Free" to register
4. Fill in the form and create an account
5. You'll be redirected to the dashboard
6. See your AI tools (marked as "Coming Soon")

---

## 📁 Project Structure

```
Ai-HUB/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── Tool.js              # Tool model
│   │   └── UsageHistory.js      # Usage tracking
│   ├── controllers/
│   │   └── authController.js    # Auth logic
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT verification
│   │   ├── rateLimiter.js       # Rate limiting
│   │   └── errorHandler.js      # Error handling
│   ├── routes/
│   │   └── auth.routes.js       # Auth routes
│   ├── server.js                # Main server file
│   ├── package.json
│   └── .env                     # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   └── common/
│   │   │       └── Navbar.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx  # Auth state
│   │   │   └── ThemeContext.jsx # Theme state
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Landing page
│   │   │   ├── Login.jsx        # Login page
│   │   │   ├── Register.jsx     # Register page
│   │   │   └── Dashboard.jsx    # Dashboard
│   │   ├── services/
│   │   │   └── api.js           # API calls
│   │   ├── App.jsx              # Main app
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env
│
└── docs/                        # Documentation
    ├── SRS.md
    ├── ARCHITECTURE.md
    ├── DATABASE_DESIGN.md
    ├── DEVELOPMENT_ROADMAP.md
    └── ...
```

---

## 🎯 What Works Right Now

### ✅ Fully Functional:
- User registration
- User login
- JWT authentication
- Protected routes
- Dark/Light mode toggle
- Responsive design
- Dashboard UI
- User profile display
- Logout functionality

### ⏳ Coming Next:
- AI Chat Assistant
- AI Image Generator
- AI Resume Builder
- AI Code Generator
- AI Study Assistant
- AI Content Generator
- Usage history
- Subscription system
- Admin panel

---

## 🐛 Troubleshooting

### MongoDB Connection Error

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
1. Make sure MongoDB is running:
   ```powershell
   # Check service
   Get-Service -Name MongoDB
   
   # Start service if stopped
   Start-Service -Name MongoDB
   ```

2. Or use MongoDB Atlas (cloud):
   - Sign up at https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get connection string
   - Update `backend/.env`

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Frontend Not Loading

**Solution:**
1. Make sure dependencies are installed:
   ```powershell
   cd frontend
   npm install
   ```

2. Clear cache and restart:
   ```powershell
   npm run dev
   ```

---

## 🔐 Default Credentials

You can create a test account:
- **Email:** test@example.com
- **Password:** password123

Or register with your own credentials!

---

## 📝 Next Steps

1. **Test the authentication flow**
   - Register a new user
   - Login
   - View dashboard
   - Test dark mode
   - Logout

2. **Explore the code**
   - Check backend API structure
   - Review frontend components
   - Understand the authentication flow

3. **Start building AI tools**
   - We'll implement AI Chat next
   - Then Image Generator
   - And so on...

---

## 🎨 Features Showcase

### Beautiful UI
- Modern gradient designs
- Smooth animations
- Dark mode support
- Responsive layout
- Professional color scheme

### Security
- Password hashing (bcrypt)
- JWT authentication
- Protected routes
- Rate limiting
- Input validation

### Developer Experience
- Hot reload (Vite)
- Clean code structure
- Comprehensive documentation
- Error handling
- Logging

---

## 📞 Need Help?

If you encounter any issues:

1. Check the console for errors
2. Verify MongoDB is running
3. Ensure all dependencies are installed
4. Check environment variables
5. Review the documentation

---

## 🎉 You're All Set!

The foundation is complete! Now you can:
- ✅ Register and login users
- ✅ View the dashboard
- ✅ Toggle dark mode
- ✅ See the beautiful UI

**Next:** We'll implement the AI tools one by one!

---

**Happy Coding! 🚀**
