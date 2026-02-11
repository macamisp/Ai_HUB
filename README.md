# All-in-One AI Platform 🤖

> A comprehensive SaaS web application providing multiple AI-powered tools in a unified platform.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-green.svg)](https://www.mongodb.com/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Development Roadmap](#development-roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

The **All-in-One AI Platform** is a modern web-based SaaS application that integrates multiple AI tools into a single, unified dashboard. Users can access various AI-powered services including chat assistance, image generation, resume building, code generation, study assistance, and content creation.

### Key Highlights

- 🤖 **6 AI-Powered Tools** - Chat, Image, Resume, Code, Study, Content
- 🔐 **Secure Authentication** - JWT-based user authentication
- 💳 **Subscription Plans** - Free, Pro, and Enterprise tiers
- 📊 **Usage Tracking** - Monitor and manage AI tool usage
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Modern UI/UX** - Beautiful, intuitive interface with dark mode
- 👨‍💼 **Admin Panel** - Complete platform management

---

## ✨ Features

### For Users

- **AI Chat Assistant** 💬
  - Natural language conversations
  - Context-aware responses
  - Chat history management

- **AI Image Generator** 🎨
  - Text-to-image generation
  - Multiple art styles
  - High-resolution downloads

- **AI Resume Builder** 📄
  - Professional resume templates
  - ATS-friendly formats
  - PDF export

- **AI Code Generator** 💻
  - Multi-language support
  - Code explanation
  - Syntax highlighting

- **AI Study Assistant** 📚
  - Q&A functionality
  - Flashcard generation
  - Quiz creation

- **AI Content Generator** ✍️
  - Blog posts
  - Social media captions
  - Email templates

### Platform Features

- User authentication & authorization
- Usage limits & tracking
- Subscription management
- Payment integration (Stripe)
- History & analytics
- Dark/Light mode
- Export functionality (PDF, Image, Text)

### For Admins

- User management
- Platform analytics
- Tool management
- Subscription oversight
- Usage statistics

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js 18+
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: Context API
- **HTTP Client**: Axios
- **Charts**: Chart.js
- **Icons**: React Icons

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcrypt, helmet, express-rate-limit
- **Validation**: express-validator
- **Logging**: Winston

### AI Services
- **OpenAI API** (GPT-4, DALL-E)
- **Custom AI integrations**

### DevOps
- **Version Control**: Git + GitHub
- **Frontend Hosting**: Vercel / Netlify
- **Backend Hosting**: Railway / Render
- **Database**: MongoDB Atlas
- **CI/CD**: GitHub Actions

---

## 📁 Project Structure

```
Ai-HUB/
├── frontend/                 # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   ├── tools/
│   │   │   ├── common/
│   │   │   └── admin/
│   │   ├── pages/           # Page components
│   │   ├── context/         # Context providers
│   │   ├── services/        # API services
│   │   ├── utils/           # Utility functions
│   │   ├── styles/          # Global styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # Node.js backend application
│   ├── config/              # Configuration files
│   ├── models/              # Database models
│   ├── controllers/         # Route controllers
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── services/            # Business logic
│   ├── utils/               # Utility functions
│   ├── server.js            # Entry point
│   └── package.json
│
├── docs/                     # Documentation
│   ├── SRS.md               # Software Requirements Specification
│   ├── ARCHITECTURE.md      # System architecture
│   ├── DATABASE_DESIGN.md   # Database schema
│   └── DEVELOPMENT_ROADMAP.md
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB installed locally or MongoDB Atlas account
- OpenAI API key
- Git installed

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/macamisp/Ai_HUB.git
   cd Ai-HUB
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

   Create `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ai-hub
   JWT_SECRET=your_jwt_secret_key
   OPENAI_API_KEY=your_openai_api_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NODE_ENV=development
   ```

   Start backend server:
   ```bash
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   ```

   Create `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

   Start frontend:
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

---

## 📚 Documentation

Comprehensive documentation is available in the `/docs` folder:

- **[SRS.md](./docs/SRS.md)** - Complete Software Requirements Specification
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - System architecture and design
- **[DATABASE_DESIGN.md](./docs/DATABASE_DESIGN.md)** - Database schema and design
- **[DEVELOPMENT_ROADMAP.md](./docs/DEVELOPMENT_ROADMAP.md)** - 10-week development plan

---

## 🗓️ Development Roadmap

The project follows a **10-week development timeline**:

- **Week 1**: Project setup & foundation
- **Week 2**: Authentication system
- **Week 3**: Dashboard & core UI
- **Week 4**: AI Tools - Part 1 (Chat, Image)
- **Week 5**: AI Tools - Part 2 (Resume, Code)
- **Week 6**: AI Tools - Part 3 (Study, Content)
- **Week 7**: Usage tracking & history
- **Week 8**: Subscription & payment
- **Week 9**: Admin panel
- **Week 10**: Testing, optimization & deployment

See [DEVELOPMENT_ROADMAP.md](./docs/DEVELOPMENT_ROADMAP.md) for detailed tasks.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@macamisp](https://github.com/macamisp)

---

## 🙏 Acknowledgments

- OpenAI for AI APIs
- React team for the amazing framework
- MongoDB for the database
- All contributors and supporters

---

## 📞 Support

For support, email support@aihub.com or open an issue on GitHub.

---

**Built with ❤️ using React, Node.js, and AI**
