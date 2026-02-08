# System Architecture - Prep-CP Platform

## Overview

Prep-CP is a full-stack gamified coding practice platform built with modern web technologies. The system follows a client-server architecture with clear separation of concerns.

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Code Editor**: Monaco Editor (VS Code engine)
- **Authentication**: NextAuth.js
- **State Management**: React Context (future: Redux/Zustand if needed)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + OAuth 2.0
- **Real-time**: Socket.io (for competitive mode)

### External Services
- **Payment**: Stripe
- **AI Assistant**: OpenAI API
- **Code Execution**: Sandboxed execution environment (Judge0 or custom)
- **Storage**: AWS S3 (for media assets)
- **Email**: SMTP service

## System Components

### 1. Frontend Application (Next.js)

```
/pages
├── index.tsx              # Landing page
├── auth/
│   ├── login.tsx         # Login page
│   └── signup.tsx        # Signup page
├── home.tsx              # Main dashboard
├── course/[id].tsx       # Course detail page
├── problem/[id].tsx      # Problem page with editor
├── rankings.tsx          # Leaderboard
├── community.tsx         # Community forum
└── api/                  # API routes (NextAuth, etc.)

/components
├── layout/
│   ├── Header.tsx        # Navigation header
│   └── Footer.tsx        # Footer
├── home/
│   └── CourseCard.tsx    # Course display card
├── problem/
│   ├── CodeEditor.tsx    # Monaco editor wrapper
│   ├── ProblemDescription.tsx
│   └── TestResults.tsx
└── common/
    ├── Button.tsx
    └── Modal.tsx
```

### 2. Backend API (Express)

```
/backend
├── server.js             # Entry point
├── models/
│   ├── User.js          # User schema
│   ├── Problem.js       # Problem schema
│   ├── Submission.js    # Submission schema
│   └── Challenge.js     # Challenge schema
├── routes/
│   ├── auth.js          # Authentication routes
│   ├── users.js         # User management
│   ├── problems.js      # Problem CRUD
│   └── submissions.js   # Submission handling
├── middleware/
│   ├── auth.js          # JWT verification
│   └── validation.js    # Input validation
└── utils/
    ├── codeExecutor.js  # Code execution wrapper
    └── pointsCalculator.js
```

### 3. Database Schema (MongoDB)

#### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  oauthProvider: String,
  points: Number,
  league: String,
  streak: {
    current: Number,
    longest: Number,
    lastSolvedDate: Date
  },
  stats: {
    problemsSolved: Number,
    totalSubmissions: Number,
    successfulSubmissions: Number
  },
  isPro: Boolean,
  friends: [ObjectId],
  achievements: [String],
  createdAt: Date,
  updatedAt: Date
}
```

#### Problem Collection
```javascript
{
  _id: ObjectId,
  title: String,
  slug: String (unique),
  description: String,
  difficulty: String,
  category: String,
  tags: [String],
  testCases: [{
    input: String,
    output: String,
    isHidden: Boolean
  }],
  codeTemplates: {
    python: String,
    java: String,
    cpp: String
  },
  points: Number,
  tier: String (free/pro),
  createdAt: Date,
  updatedAt: Date
}
```

## Data Flow

### 1. User Authentication Flow
```
Client → NextAuth → Backend API → MongoDB
  ↓
JWT Token → Stored in httpOnly cookie
  ↓
Subsequent requests include JWT
```

### 2. Problem Submission Flow
```
User writes code → Submit button
  ↓
Frontend → POST /api/submissions
  ↓
Backend validates JWT
  ↓
Anti-cheat checks (time, typing speed)
  ↓
Code Execution Service
  ↓
Run test cases
  ↓
Calculate points
  ↓
Update user stats in MongoDB
  ↓
Return results to frontend
```

### 3. Real-time Features (Socket.io)
```
User A challenges User B
  ↓
Socket.io emits challenge event
  ↓
User B receives notification
  ↓
Both connected to same room
  ↓
Real-time code execution updates
  ↓
First to solve wins
```

## Security Measures

### Frontend
- HTTPS only in production
- CSP headers
- XSS protection
- Paste disabled in code editor
- Rate limiting on API calls

### Backend
- Password hashing (bcrypt)
- JWT with short expiration
- Input validation and sanitization
- SQL injection prevention (using Mongoose)
- Code execution in sandboxed environment
- Rate limiting
- CORS configuration

### Code Execution
- Sandboxed Docker containers
- Resource limits (CPU, memory, time)
- Network isolation
- Input/output size limits

## Performance Optimizations

### Frontend
- Code splitting
- Lazy loading
- Image optimization
- Static generation where possible
- CDN for assets

### Backend
- Database indexing
- Caching (Redis for sessions)
- Connection pooling
- Pagination for large datasets

## Scalability Considerations

### Horizontal Scaling
- Stateless API servers
- Load balancer (Nginx/AWS ALB)
- Database replication
- Distributed caching

### Vertical Scaling
- Optimize database queries
- Code execution queue
- Background jobs for heavy tasks

## Monitoring and Logging

- Application logs (Winston)
- Error tracking (Sentry)
- Performance monitoring (New Relic)
- Database monitoring
- User analytics

## Future Enhancements

1. **Microservices**: Split into smaller services
2. **GraphQL**: Replace REST with GraphQL
3. **PWA**: Progressive Web App features
4. **Mobile App**: React Native app
5. **AI Features**: Advanced code suggestions, personalized learning paths

---

This architecture is designed to be modular, scalable, and maintainable as the platform grows.
