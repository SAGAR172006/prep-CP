# Prep-CP API Routes Documentation

This document provides an overview of all API routes available in the Prep-CP platform.

## Authentication

All authenticated routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## API Routes

### Authentication APIs (`/api/auth`)

#### 1. **POST /api/auth/signup**
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "name": "John Doe" // optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": { ... },
  "token": "jwt-token"
}
```

#### 2. **POST /api/auth/login**
Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": { ... },
  "token": "jwt-token"
}
```

#### 3. **GET/POST /api/auth/[...nextauth]**
NextAuth.js endpoints for OAuth (Google, GitHub) and credentials authentication.

---

### Problems APIs (`/api/problems`)

#### 4. **GET /api/problems**
Get paginated list of problems with filters.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `difficulty`: Filter by difficulty (Easy, Medium, Hard)
- `category`: Filter by category
- `topic`: Filter by topic
- `search`: Search in title and description

**Response:**
```json
{
  "success": true,
  "problems": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

#### 5. **GET /api/problems/[id]**
Get single problem details by ID.

**Response:**
```json
{
  "success": true,
  "problem": { ... },
  "userSubmissions": [...],
  "isSolved": false,
  "bestSubmission": { ... }
}
```

---

### Code Execution APIs (`/api/code`)

#### 6. **POST /api/code/execute** 🔒
Execute code against test cases (authenticated, rate-limited: 30/min).

**Request Body:**
```json
{
  "code": "function solution() { ... }",
  "language": "javascript",
  "testCases": [
    {
      "input": "test input",
      "expectedOutput": "expected output"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "results": [...],
  "summary": {
    "total": 5,
    "passed": 4,
    "failed": 1,
    "allPassed": false
  }
}
```

#### 7. **POST /api/code/verify** 🔒
Verify submission against all test cases (authenticated, rate-limited: 10/min).

**Request Body:**
```json
{
  "code": "function solution() { ... }",
  "language": "javascript",
  "problemId": "problem-id",
  "timeSpent": 300 // seconds
}
```

**Response:**
```json
{
  "success": true,
  "submission": {
    "id": "...",
    "status": "Accepted",
    "passed": true,
    "testsPassed": 10,
    "testsTotal": 10,
    "pointsEarned": 20,
    "attemptNumber": 1
  },
  "results": [...],
  "totalTests": 10
}
```

---

### Chatbot API (`/api/chatbot`)

#### 8. **POST /api/chatbot** 🔒
Get AI assistance (authenticated, daily limit: 20 free / unlimited pro).

**Request Body:**
```json
{
  "action": "explain", // explain, concept, debug, hint
  "problemDescription": "Problem description here...",
  "userCode": "code here..." // required for debug action
}
```

**Response:**
```json
{
  "success": true,
  "response": "AI-generated response...",
  "action": "explain",
  "remaining": 15,
  "limit": 20
}
```

---

### Gamification APIs (`/api/gamification`)

#### 9. **POST /api/gamification/points** 🔒
Award or deduct points (authenticated).

**Request Body:**
```json
{
  "points": 10, // positive or negative
  "reason": "Completed daily challenge"
}
```

**Response:**
```json
{
  "success": true,
  "user": { ... },
  "pointsChange": 10,
  "league": {
    "name": "Gold",
    "subLeague": "III",
    "progress": 65.5
  }
}
```

#### 10. **GET /api/gamification/league** 🔒
Get user's league information (authenticated).

**Response:**
```json
{
  "success": true,
  "league": {
    "name": "Gold",
    "subLeague": "III",
    "points": 550,
    "progress": 65.5,
    "rank": 12,
    "totalUsers": 150,
    "pointsToNext": 50
  },
  "topUsers": [...]
}
```

#### 11. **GET /api/gamification/leaderboard**
Get leaderboard data (public, cached in Redis).

**Query Parameters:**
- `type`: Type of leaderboard (global, course, local)
- `league`: Filter by league (optional)

**Response:**
```json
{
  "success": true,
  "type": "global",
  "leaderboard": [
    {
      "rank": 1,
      "username": "user123",
      "points": 1200,
      "league": "Diamond",
      "problemsSolved": 150
    }
  ],
  "userPosition": { ... },
  "total": 100
}
```

---

### Bugs API (`/api/bugs`)

#### 12. **POST /api/bugs** 🔒
Submit a bug report (authenticated).

**Request Body:**
```json
{
  "problemId": "problem-id", // optional
  "type": "Incorrect Test Case",
  "title": "Bug title",
  "description": "Detailed description...",
  "stepsToReproduce": "Steps...", // optional
  "code": "code snippet...", // optional
  "screenshots": ["url1", "url2"] // optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Bug report submitted successfully",
  "bug": { ... },
  "analysis": {
    "category": "Incorrect Test Case",
    "severity": "medium"
  }
}
```

#### 13. **GET /api/bugs** 🔒
List user's bug reports (authenticated).

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `status`: Filter by status (optional)

**Response:**
```json
{
  "success": true,
  "bugs": [...],
  "pagination": { ... }
}
```

---

### Notifications API (`/api/notifications`)

#### 14. **GET /api/notifications** 🔒
Get user's notifications (authenticated).

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `unreadOnly`: Only unread notifications (default: false)

**Response:**
```json
{
  "success": true,
  "notifications": [...],
  "unreadCount": 5,
  "pagination": { ... }
}
```

#### 15. **POST /api/notifications** 🔒
Mark notifications as read (authenticated).

**Request Body:**
```json
{
  "notificationIds": ["id1", "id2", "id3"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "3 notification(s) marked as read",
  "count": 3
}
```

#### 16. **DELETE /api/notifications** 🔒
Delete a notification (authenticated).

**Query Parameters:**
- `id`: Notification ID

**Response:**
```json
{
  "success": true,
  "message": "Notification deleted successfully"
}
```

---

## Error Responses

All API routes follow a consistent error response format:

```json
{
  "error": "Error message",
  "details": [] // Optional validation errors
}
```

### Common HTTP Status Codes

- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid input or validation error
- `401 Unauthorized`: Authentication required or invalid token
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource already exists
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

---

## Rate Limits

- **Code Execution**: 30 requests per minute per user
- **Code Verification**: 10 requests per minute per user
- **Chatbot**: 20 queries per day (free), unlimited (pro)

---

## Environment Variables Required

```env
# Database
DATABASE_URL=postgresql://...

# Redis
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...

# JWT
JWT_SECRET=your-secret-key
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# OAuth
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

# AI (Optional)
OPENAI_API_KEY=...
HUGGINGFACE_API_KEY=...

# Code Execution
PISTON_API_URL=https://emkc.org/api/v2/piston
```

---

## Notes

- 🔒 indicates authentication required
- All timestamps are in ISO 8601 format
- Pagination starts at page 1
- All responses include a `success` boolean field
- Rate limiting uses Redis for distributed rate limiting
- Leaderboards are cached in Redis for performance
