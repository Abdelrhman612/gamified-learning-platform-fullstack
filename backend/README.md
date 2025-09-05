# Gamified Learning Platform - Backend

A robust NestJS backend for a gamified learning platform featuring user authentication, challenges, AI-powered chat, and participation tracking.

## 🚀 Features

- **User Authentication**: JWT-based auth with GitHub OAuth2 integration
- **Challenge System**: Create and manage learning challenges with points
- **AI Integration**: Gemini AI-powered chat assistant with session management
- **Participation Tracking**: Users can join challenges and track progress
- **Email Notifications**: Welcome emails using Nodemailer
- **Role-based Access**: Admin/user roles with protected routes
- **PostgreSQL Database**: Prisma ORM for type-safe database operations

## 🛠 Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT, Passport, GitHub OAuth2
- **AI**: Google Gemini API
- **Email**: Nodemailer with Pug templates
- **Validation**: Class-validator
- **Testing**: Jest

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Set up database
npx prisma generate
npx prisma migrate dev

# Start development server
npm run start:dev
```

## ⚙️ Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/gamified_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES="7d"

# OAuth
GITHUB_CLIENT_ID="your-github-app-client-id"
GITHUB_CLIENT_SECRET="your-github-app-client-secret"
GITHUB_CALLBACK_URL="http://localhost:3000/api/v1/auth/github/callback"

# AI
GEMINI_API_KEY="your-google-gemini-api-key"

# Email
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Application
PORT="3000"
CORS_ORIGIN="http://localhost:5173"
```

## 🗄 Database Schema

The application uses PostgreSQL with the following main models:

- **Users**: User accounts with roles and points
- **Challenges**: Learning challenges with start/end dates and point values
- **Participations**: Track user participation in challenges
- **ChatHistory**: Store AI chat session histories

## 🔌 API Endpoints

### Authentication

- `POST /auth/sign-up` - User registration
- `POST /auth/sign-in` - User login
- `GET /auth/me` - Get current user info
- `GET /auth/github/sign-in` - GitHub OAuth initiation
- `GET /auth/github/callback` - GitHub OAuth callback

### Users

- `GET /user` - Get all users (admin only)
- `GET /user/:id` - Get user by ID (admin only)
- `PATCH /user/:id` - Update user (admin only)
- `DELETE /user/:id` - Delete user (admin only)

### Challenges

- `GET /challenges` - Get all challenges
- `GET /challenges/:id` - Get challenge by ID
- `POST /challenges` - Create challenge (admin only)
- `PATCH /challenges/:id` - Update challenge (admin only)
- `DELETE /challenges/:id` - Delete challenge (admin only)

### Participations

- `POST /challenges-participations/:id/participate` - Join a challenge
- `GET /challenges-participations/:id/participations` - Get challenge participations (admin only)
- `GET /challenges-participations/users/:id/participations` - Get user participations

### AI Chat

- `POST /gemini` - Get AI response (maintains session history)

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🚀 Deployment

The application is ready for deployment with support for:

```bash
# Production build
npm run build

# Start production server
npm run start:prod
```

For easy deployment to AWS, use the official NestJS Mau platform:

```bash
npm install -g @nestjs/mau
mau deploy
```

## 📝 License

This project is [UNLICENSED](LICENSE).

## 🤝 Support

For support and questions:

- Check the [NestJS Documentation](https://docs.nestjs.com)
- Join our [Discord channel](https://discord.gg/G7Qnnhy)
- Explore [NestJS courses](https://courses.nestjs.com/)
- Use [NestJS Devtools](https://devtools.nestjs.com) for debugging

## 📞 Contact

- Author - [Your Name]
- Website - [Your Website]
- Twitter - [@YourTwitter]

---

Built with ❤️ using NestJS
