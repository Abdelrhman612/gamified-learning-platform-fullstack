# Gamified Learning Platform

A full-stack gamified learning platform that combines education with interactive challenges, points system, and AI-powered assistance.

## 🚀 Live Demo

[Click here to try the project](https://gamified-learning-platform-fullstac-black.vercel.app)

## 🌟 Features

### Backend (NestJS)

- **User Authentication**: JWT-based authentication with GitHub OAuth integration
- **Challenge Management**: Create, read, update, and delete educational challenges
- **Participation System**: Users can participate in challenges and earn points
- **AI Integration**: Gemini AI chatbot for educational assistance
- **Email Notifications**: Welcome emails for new users
- **Database**: PostgreSQL with Prisma ORM
- **Role-based Access**: Admin and user roles with different permissions

### Frontend (Next.js)

- **Responsive Design**: Modern UI with Tailwind CSS
- **User Dashboard**: Personal progress tracking and achievements
- **Admin Panel**: Full CRUD operations for users and challenges
- **Leaderboard**: Competitive ranking system
- **AI Chat Interface**: Interactive chat with Gemini AI
- **Challenge Participation**: Submit solutions and earn points
- **Arabic RTL Support**: Full Arabic language support

## 🏗️ Architecture

```
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── challenge/      # Challenge management
│   │   ├── gemini/         # AI integration
│   │   ├── participations/ # User participation system
│   │   ├── user/           # User management
│   │   └── mails/          # Email services
│   ├── prisma/            # Database schema and migrations
│   └── tests/             # Unit and integration tests
│
└── frontend/              # Next.js application
    ├── src/
    │   ├── app/
    │   │   ├── dashboard/  # User and admin dashboards
    │   │   ├── challenges/# Challenge browsing and participation
    │   │   ├── gemini/    # AI chat interface
    │   │   └── lib/       # API endpoints and utilities
    │   └── components/    # Reusable React components
    └── public/           # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Google Gemini API key
- GitHub OAuth credentials

### Environment Setup

1. **Backend Environment Variables** (`backend/.env`):

```env
DATABASE_URL="postgresql://username:password@localhost:5432/gamified_db"
JWT_SECRET="your-jwt-secret"
JWT_EXPIRES="7d"
GEMINI_API_KEY="your-gemini-api-key"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GITHUB_CALLBACK_URL="http://localhost:3001/auth/github/callback"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-email-password"
PORT="3001"
CORS_ORIGIN="http://localhost:3001"
```

2. **Frontend Environment Variables** (`frontend/.env.local`):

```env
NEXT_PUBLIC_API_URL="http://localhost:3001/api/v1"
```

### Installation & Running

1. **Backend Setup**:

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run start:dev
```

2. **Frontend Setup**:

```bash
cd frontend
npm install
npm run dev
```

3. **Access the Application**:

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 📊 Database Schema

The application uses PostgreSQL with the following main tables:

- **Users**: User accounts with roles and points
- **Challenges**: Educational challenges with points and deadlines
- **Participations**: User submissions for challenges
- **ChatHistory**: AI conversation history

## 🔧 API Endpoints

### Authentication

- `POST /auth/sign-up` - User registration
- `POST /auth/sign-in` - User login
- `GET /auth/me` - Get current user
- `GET /auth/github/sign-in` - GitHub OAuth
- `GET /auth/github/callback` - GitHub OAuth callback

### Challenges

- `GET /challenges` - Get all challenges
- `POST /challenges` - Create challenge (admin only)
- `GET /challenges/:id` - Get challenge by ID
- `PATCH /challenges/:id` - Update challenge (admin only)
- `DELETE /challenges/:id` - Delete challenge (admin only)

### Participations

- `POST /challenges-participations/:id/participate` - Participate in challenge
- `GET /challenges-participations/:id/participations` - Get challenge participations
- `GET /challenges-participations/users/:id/participations` - Get user participations

### AI Chat

- `POST /gemini` - Send message to Gemini AI

## 🎯 Key Features Explained

### Gamification System

- Users earn points by completing challenges
- Leaderboard shows top performers
- Badges and achievements system

### AI-Powered Assistance

- Integrated Gemini AI for educational support
- Session-based chat history
- Context-aware responses

### Admin Capabilities

- Full CRUD operations for users and challenges
- View user participation history
- Moderate content and submissions

## 🧪 Testing

Run tests for both backend and frontend:

```bash
# Backend tests
cd backend
npm run test

# Frontend tests (if configured)
cd frontend
npm run test
```

## 📦 Deployment

### Backend Deployment

1. Build the application: `npm run build`
2. Set production environment variables
3. Deploy to your preferred platform (AWS, Heroku, etc.)

### Frontend Deployment

1. Build: `npm run build`
2. Export: `npm run export`
3. Deploy to Vercel, Netlify, or similar platforms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team.

## 🗺️ Future Enhancements

- Mobile application
- Advanced analytics dashboard
- Social features (following, sharing)
- More gamification elements (quests, teams)
- Additional AI features (personalized learning paths)

---

**Note**: This is a comprehensive full-stack application designed for educational purposes. Ensure you have proper licenses for any third-party services used (Google Gemini, GitHub OAuth, etc.).
