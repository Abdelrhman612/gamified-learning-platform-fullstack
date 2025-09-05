# Gamified Platform - Frontend

## Overview

Gamified Platform is a Next.js-based frontend application for an interactive educational challenge platform. It provides a gamified learning experience where users can participate in challenges, earn points, and compete on leaderboards.

## Features

- **User Authentication**: Sign up, login, and GitHub OAuth integration
- **Challenge Management**: Browse, participate in, and manage coding challenges
- **Gamification**: Points system, badges, and leaderboards
- **Admin Dashboard**: Full CRUD operations for users and challenges
- **AI Integration**: Gemini AI chatbot for assistance
- **Responsive Design**: Works on desktop and mobile devices
- **Arabic Language Support**: Right-to-left layout and Arabic content

## Tech Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Authentication**: JWT tokens with GitHub OAuth
- **AI Integration**: Google Gemini API

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── about/                 # About page
│   │   ├── auth/                  # Authentication callback
│   │   ├── challenges/            # Challenge listing and details
│   │   ├── components/            # Reusable components
│   │   │   ├── admin/             # Admin-specific components
│   │   │   └── shared/            # Shared components
│   │   ├── dashboard/             # User and admin dashboards
│   │   ├── gemini/                # AI chatbot interface
│   │   ├── leaderboard/           # Leaderboard display
│   │   ├── login/                 # Login page
│   │   ├── register/              # Registration page
│   │   ├── users/                 # User participation views
│   │   ├── globals.css            # Global styles
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Homepage
│   └── lib/
│       ├── api.ts                 # API endpoint configuration
│       ├── endpoints/             # API endpoint functions
│       └── interfaces/            # TypeScript interfaces
├── public/                        # Static assets
├── next.config.ts                 # Next.js configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Navigate to the frontend directory: `cd frontend`
3. Install dependencies: `npm install`
4. Set up environment variables (create a `.env.local` file):
   ```
   NEXT_PUBLIC_API_URL=your_backend_api_url
   ```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Key Features Explained

### Authentication System

- JWT-based authentication with secure token storage
- GitHub OAuth integration for social login
- Protected routes for authenticated users

### Challenge System

- Browse available coding challenges
- Submit solutions via text or URL
- Track participation and earned points

### Admin Dashboard

- Manage users (view, edit, delete)
- Create and manage challenges
- View participation statistics

### AI Integration

- Gemini AI chatbot for coding assistance
- Chat history persistence
- Session management

### Gamification Elements

- Points system for completed challenges
- Leaderboard with user rankings
- Badge system (planned)

## API Integration

The frontend communicates with a backend API through various endpoints:

- Authentication: `/auth/sign-in`, `/auth/sign-up`, `/auth/github/callback`
- Users: `/user`, `/user/:id`
- Challenges: `/challenges`, `/challenges/:id`
- Participations: `/challenges-participations`
- AI: `/gemini`

## Styling Approach

- Uses Tailwind CSS for utility-first styling
- Responsive design with mobile-first approach
- Dark theme as default with gradient backgrounds
- Arabic RTL support with proper text direction

## Build for Production

```bash
npm run build
npm start
```

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## License

This project is licensed under the MIT License.
