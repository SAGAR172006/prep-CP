# Database Schema for Supabase

This document describes the complete database schema for the Prep CP platform using Supabase (PostgreSQL).

## Tables

### 1. users

Stores user profile and gamification data.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  banner_url TEXT,
  bio TEXT,
  
  -- Gamification
  points INTEGER DEFAULT 0,
  league TEXT DEFAULT 'Bronze' CHECK (league IN ('Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster')),
  streak INTEGER DEFAULT 0,
  last_activity DATE,
  
  -- Subscription
  is_pro BOOLEAN DEFAULT FALSE,
  pro_expires_at TIMESTAMP,
  
  -- Social
  friends UUID[] DEFAULT '{}',
  friend_requests UUID[] DEFAULT '{}',
  
  -- Settings
  preferred_language TEXT DEFAULT 'python',
  theme TEXT DEFAULT 'dark',
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_points ON users(points DESC);
CREATE INDEX idx_users_league ON users(league);
```

### 2. problems

Stores coding problems.

```sql
CREATE TABLE problems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  category TEXT NOT NULL,
  
  -- Problem details
  constraints TEXT,
  examples JSONB, -- [{input, output, explanation}]
  test_cases JSONB, -- [{input, expectedOutput, hidden}]
  
  -- Code templates
  code_templates JSONB, -- {python: "...", java: "...", cpp: "..."}
  
  -- Metadata
  tags TEXT[],
  is_pro BOOLEAN DEFAULT FALSE,
  acceptance_rate DECIMAL(5,2),
  total_submissions INTEGER DEFAULT 0,
  total_accepted INTEGER DEFAULT 0,
  
  -- Author
  created_by UUID REFERENCES users(id),
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_problems_slug ON problems(slug);
CREATE INDEX idx_problems_difficulty ON problems(difficulty);
CREATE INDEX idx_problems_category ON problems(category);
CREATE INDEX idx_problems_is_pro ON problems(is_pro);
```

### 3. submissions

Stores code submissions.

```sql
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  problem_id UUID REFERENCES problems(id) ON DELETE CASCADE,
  
  -- Submission details
  language TEXT NOT NULL,
  code TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Pending', 'Running', 'Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error', 'Compilation Error')),
  
  -- Results
  test_results JSONB, -- [{passed, input, expectedOutput, actualOutput}]
  total_tests INTEGER,
  passed_tests INTEGER,
  
  -- Performance
  execution_time INTEGER, -- milliseconds
  memory_used INTEGER, -- KB
  
  -- Points
  points_earned INTEGER DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_submissions_user_id ON submissions(user_id);
CREATE INDEX idx_submissions_problem_id ON submissions(problem_id);
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_created_at ON submissions(created_at DESC);
```

### 4. daily_challenges

Stores daily challenges.

```sql
CREATE TABLE daily_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE UNIQUE NOT NULL,
  problem_id UUID REFERENCES problems(id),
  bonus_points INTEGER DEFAULT 50,
  participants INTEGER DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index
CREATE INDEX idx_daily_challenges_date ON daily_challenges(date DESC);
```

### 5. challenge_participations

Tracks who completed daily challenges.

```sql
CREATE TABLE challenge_participations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES daily_challenges(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  completion_time INTEGER, -- seconds
  
  created_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(user_id, challenge_id)
);

-- Indexes
CREATE INDEX idx_challenge_participations_user_id ON challenge_participations(user_id);
CREATE INDEX idx_challenge_participations_challenge_id ON challenge_participations(challenge_id);
```

### 6. notifications

Stores user notifications.

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  type TEXT NOT NULL CHECK (type IN ('friend_request', 'bug_report', 'points_earned', 'media_unlocked', 'badge_earned', 'challenge_invite', 'league_change', 'season_event')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  
  -- Data
  data JSONB, -- Extra data based on type
  
  -- Status
  read BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
```

### 7. bug_reports

Stores bug reports from users.

```sql
CREATE TABLE bug_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  problem_id UUID REFERENCES problems(id),
  
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('Low', 'Medium', 'High', 'Critical')),
  
  -- Status
  status TEXT DEFAULT 'Open' CHECK (status IN ('Open', 'In Progress', 'Resolved', 'Closed')),
  
  -- Reward
  points_awarded INTEGER DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_bug_reports_user_id ON bug_reports(user_id);
CREATE INDEX idx_bug_reports_status ON bug_reports(status);
```

### 8. badges

Stores available badges.

```sql
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT,
  
  -- Requirements
  requirement_type TEXT CHECK (requirement_type IN ('problems_solved', 'streak', 'points', 'league', 'special')),
  requirement_value INTEGER,
  
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 9. user_badges

Tracks badges earned by users.

```sql
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  
  earned_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(user_id, badge_id)
);

-- Indexes
CREATE INDEX idx_user_badges_user_id ON user_badges(user_id);
```

### 10. seasons

Stores competitive seasons.

```sql
CREATE TABLE seasons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  season_number INTEGER UNIQUE NOT NULL,
  name TEXT NOT NULL,
  
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  
  is_active BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index
CREATE INDEX idx_seasons_is_active ON seasons(is_active);
```

### 11. leaderboard

Stores leaderboard rankings per season.

```sql
CREATE TABLE leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id UUID REFERENCES seasons(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  rank INTEGER,
  points INTEGER,
  problems_solved INTEGER,
  
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(season_id, user_id)
);

-- Indexes
CREATE INDEX idx_leaderboard_season_id ON leaderboard(season_id);
CREATE INDEX idx_leaderboard_rank ON leaderboard(rank);
```

### 12. ai_chat_history

Stores AI chat conversations for context.

```sql
CREATE TABLE ai_chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  action TEXT NOT NULL CHECK (action IN ('explain', 'debug', 'optimize', 'generate')),
  code TEXT,
  response TEXT NOT NULL,
  provider TEXT NOT NULL CHECK (provider IN ('ollama', 'huggingface', 'gemini')),
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_ai_chat_user_id ON ai_chat_history(user_id);
CREATE INDEX idx_ai_chat_created_at ON ai_chat_history(created_at DESC);
```

---

## Row Level Security (RLS) Policies

Enable RLS for all tables and create appropriate policies.

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE bug_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chat_history ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Anyone can view problems (public data)
CREATE POLICY "Anyone can view problems"
  ON problems FOR SELECT
  USING (true);

-- Users can only view their own submissions
CREATE POLICY "Users can view own submissions"
  ON submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create submissions"
  ON submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only view their own notifications
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);
```

---

## Functions and Triggers

### Update points and league automatically

```sql
CREATE OR REPLACE FUNCTION update_user_league()
RETURNS TRIGGER AS $$
BEGIN
  NEW.league := CASE
    WHEN NEW.points < 200 THEN 'Bronze'
    WHEN NEW.points < 500 THEN 'Silver'
    WHEN NEW.points < 1000 THEN 'Gold'
    WHEN NEW.points < 2500 THEN 'Platinum'
    WHEN NEW.points < 5000 THEN 'Diamond'
    WHEN NEW.points < 10000 THEN 'Master'
    ELSE 'Grandmaster'
  END;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_league
  BEFORE UPDATE OF points ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_user_league();
```

### Update problem acceptance rate

```sql
CREATE OR REPLACE FUNCTION update_problem_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'Accepted' THEN
    UPDATE problems
    SET 
      total_accepted = total_accepted + 1,
      acceptance_rate = (total_accepted + 1) * 100.0 / NULLIF(total_submissions, 0)
    WHERE id = NEW.problem_id;
  END IF;
  
  UPDATE problems
  SET total_submissions = total_submissions + 1
  WHERE id = NEW.problem_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_problem_stats
  AFTER INSERT ON submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_problem_stats();
```

---

## Seed Data

Insert some initial data for testing:

```sql
-- Insert sample badges
INSERT INTO badges (name, description, requirement_type, requirement_value) VALUES
  ('First Solve', 'Solve your first problem', 'problems_solved', 1),
  ('Problem Solver', 'Solve 10 problems', 'problems_solved', 10),
  ('Streak Master', 'Maintain a 7-day streak', 'streak', 7),
  ('Point Hunter', 'Earn 1000 points', 'points', 1000),
  ('Gold League', 'Reach Gold league', 'league', 1000),
  ('Bug Hunter', 'Report a valid bug', 'special', 0);
```

---

## Migrations

To apply this schema to your Supabase project:

1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste each section above
3. Execute in order
4. Verify tables are created

Or use Supabase CLI:
```bash
supabase db push
```
