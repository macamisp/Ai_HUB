# System Architecture Documentation

## 1. Architecture Overview

The All-in-One AI Platform follows a **3-tier architecture**:

```
┌─────────────────────────────────────────────────────────┐
│                   PRESENTATION LAYER                     │
│                    (React Frontend)                      │
│  - User Interface                                        │
│  - State Management (Redux/Context)                      │
│  - Routing (React Router)                                │
└─────────────────────────────────────────────────────────┘
                          ↓ HTTP/HTTPS
┌─────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                      │
│                 (Node.js + Express API)                  │
│  - Authentication & Authorization                        │
│  - Business Logic                                        │
│  - AI Service Integration                                │
│  - Rate Limiting & Validation                            │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                      DATA LAYER                          │
│                   (MongoDB/MySQL)                        │
│  - User Data                                             │
│  - Usage History                                         │
│  - Subscription Data                                     │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

### Frontend
- **Framework**: React.js / Next.js
- **Styling**: Tailwind CSS
- **State Management**: Context API / Redux Toolkit
- **HTTP Client**: Axios
- **Routing**: React Router DOM

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Validation**: express-validator
- **Rate Limiting**: express-rate-limit

### Database
- **Primary**: MongoDB (with Mongoose ODM)
- **Alternative**: MySQL (with Sequelize ORM)

### AI Integration
- **OpenAI API** (GPT models for chat, code generation)
- **DALL-E / Stable Diffusion** (Image generation)
- **Custom AI Services** (Resume builder, content generator)

### DevOps & Deployment
- **Version Control**: Git + GitHub
- **Containerization**: Docker (optional)
- **Hosting**: Vercel/Netlify (Frontend), Railway/Render (Backend)
- **CI/CD**: GitHub Actions

---

## 3. System Components

### 3.1 Frontend Components

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   └── ProtectedRoute.jsx
│   ├── dashboard/
│   │   ├── DashboardLayout.jsx
│   │   ├── ToolCard.jsx
│   │   └── UsageStats.jsx
│   ├── tools/
│   │   ├── ChatAssistant.jsx
│   │   ├── ImageGenerator.jsx
│   │   ├── ResumeBuilder.jsx
│   │   ├── CodeGenerator.jsx
│   │   ├── StudyAssistant.jsx
│   │   └── ContentGenerator.jsx
│   ├── common/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Loader.jsx
│   │   └── ErrorBoundary.jsx
│   └── admin/
│       ├── UserManagement.jsx
│       ├── Analytics.jsx
│       └── ToolManagement.jsx
├── pages/
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   ├── Pricing.jsx
│   ├── History.jsx
│   └── Admin.jsx
├── context/
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── services/
│   └── api.js
└── utils/
    ├── constants.js
    └── helpers.js
```

### 3.2 Backend Components

```
server/
├── config/
│   ├── database.js
│   ├── jwt.js
│   └── ai-services.js
├── models/
│   ├── User.js
│   ├── Tool.js
│   ├── UsageHistory.js
│   └── Subscription.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── toolController.js
│   ├── aiController.js
│   └── adminController.js
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── tool.routes.js
│   ├── ai.routes.js
│   └── admin.routes.js
├── middleware/
│   ├── authMiddleware.js
│   ├── rateLimiter.js
│   ├── errorHandler.js
│   └── validator.js
├── services/
│   ├── aiService.js
│   ├── emailService.js
│   └── paymentService.js
└── utils/
    ├── logger.js
    └── helpers.js
```

---

## 4. Data Flow

### 4.1 User Authentication Flow

```
User → Login Form → POST /api/auth/login
                          ↓
                    Validate Credentials
                          ↓
                    Generate JWT Token
                          ↓
                    Return Token + User Data
                          ↓
                    Store in localStorage
                          ↓
                    Redirect to Dashboard
```

### 4.2 AI Tool Usage Flow

```
User → Select Tool → Input Data
              ↓
        Validate JWT Token
              ↓
        Check Usage Limits
              ↓
        Call AI Service API
              ↓
        Process Response
              ↓
        Save to Usage History
              ↓
        Return Result to User
              ↓
        Display + Option to Export
```

---

## 5. Security Architecture

### 5.1 Authentication & Authorization
- JWT-based authentication
- Token expiration: 24 hours
- Refresh token mechanism
- Role-based access control (User, Admin)

### 5.2 Data Protection
- Password hashing with bcrypt (salt rounds: 10)
- HTTPS encryption
- Input validation and sanitization
- SQL injection prevention
- XSS protection

### 5.3 Rate Limiting
- Free users: 10 requests/day per tool
- Pro users: 100 requests/day per tool
- API rate limiting: 100 requests/15 minutes

---

## 6. Database Schema

### Users Collection/Table
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, indexed),
  password: String (hashed),
  role: String (enum: ['user', 'admin']),
  plan_type: String (enum: ['free', 'pro', 'enterprise']),
  usage_count: Number,
  created_at: Date,
  updated_at: Date
}
```

### Tools Collection/Table
```javascript
{
  _id: ObjectId,
  tool_name: String,
  description: String,
  category: String,
  icon: String,
  is_active: Boolean,
  created_at: Date
}
```

### Usage History Collection/Table
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref: Users),
  tool_id: ObjectId (ref: Tools),
  input: String,
  output: String/Object,
  tokens_used: Number,
  created_at: Date
}
```

### Subscriptions Collection/Table
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref: Users),
  plan_type: String,
  start_date: Date,
  end_date: Date,
  payment_status: String,
  amount: Number,
  created_at: Date
}
```

---

## 7. API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### AI Tools
- `POST /api/ai/chat` - AI Chat Assistant
- `POST /api/ai/image` - AI Image Generator
- `POST /api/ai/resume` - AI Resume Builder
- `POST /api/ai/code` - AI Code Generator
- `POST /api/ai/study` - AI Study Assistant
- `POST /api/ai/content` - AI Content Generator

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/history` - Get usage history
- `DELETE /api/user/history/:id` - Delete history item

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/analytics` - Get platform analytics
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

---

## 8. Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CDN (Cloudflare)                      │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Frontend (Vercel/Netlify)                   │
│                   React Application                      │
└─────────────────────────────────────────────────────────┘
                          ↓ HTTPS
┌─────────────────────────────────────────────────────────┐
│            Backend API (Railway/Render)                  │
│              Node.js + Express Server                    │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│         Database (MongoDB Atlas / PlanetScale)           │
└─────────────────────────────────────────────────────────┘
```

---

## 9. Scalability Considerations

1. **Horizontal Scaling**: Load balancer for multiple backend instances
2. **Caching**: Redis for frequently accessed data
3. **CDN**: Static assets delivery
4. **Database Indexing**: Optimize query performance
5. **Microservices**: Future migration to service-oriented architecture

---

## 10. Monitoring & Logging

- **Error Tracking**: Sentry
- **Performance Monitoring**: New Relic / DataDog
- **Logging**: Winston (Node.js)
- **Analytics**: Google Analytics / Mixpanel
