# 🚨 IMPORTANT: Multiple Pull Requests Open

**If you're here to merge pull requests, please read [PR_ANALYSIS_README.md](./PR_ANALYSIS_README.md) FIRST!**

You have 4 open PRs that **cannot be merged together**. Each is a complete implementation. **Choose only ONE to merge.**

**Quick recommendation:** Merge [PR #6](https://github.com/SAGAR172006/prep-CP/pull/6) and close the others.

📚 **Documentation:**
- 🚀 [SIMPLE_PR_GUIDE.md](./SIMPLE_PR_GUIDE.md) - Beginner-friendly guide
- 📋 [PR_MERGE_GUIDE.md](./PR_MERGE_GUIDE.md) - Complete guide
- 📊 [PR_SUMMARY_DASHBOARD.md](./PR_SUMMARY_DASHBOARD.md) - Quick overview
- 🔧 [TECHNICAL_CONFLICT_ANALYSIS.md](./TECHNICAL_CONFLICT_ANALYSIS.md) - Technical details

---

## Project Overview
Build a gamified coding practice platform similar to HackerRank, focused on interview preparation with advanced league systems, competitive programming, social features, daily challenges, and AI-powered assistance. The platform must deliver a **smooth, fluid, and visually stunning experience at 60-144 FPS**.

---

## 1. AUTHENTICATION & LANDING PAGE

### Landing Page (Main/Info Tab)
**Layout:**
- **Top Bar:** Logo (left) + Sign Up/Login buttons (top-right)
- **Hero Section:** App name with modern design and visuals
- **Description Section:** Brief app description explaining the platform's purpose
- **CTA:** Prominent "Get Started" button redirecting to authentication

**Visual Requirements:**
- Smooth parallax scrolling effects
- Animated gradient backgrounds
- Micro-interactions on hover (button lifts, glows)
- Loading animations with skeleton screens

### Authentication Page
**Login/Signup Options:**
- Google OAuth login
- GitHub OAuth login  
- Email/Password registration and login
- Form validation and error handling
- Password strength indicator for signup
- "Forgot Password" flow

**Post-Authentication:**
- Redirect to Home Page after successful login
- Store user session/token
- Welcome message with username
- Smooth fade-in transition

---

## 2. HOME PAGE STRUCTURE

### Header/Top Bar (Persistent across all pages)
**Left Side:** App Logo

**Center:** Navigation options:
- My Courses
- Rankings
- Bugs
- Community
- Puzzle
- Pro (subscription page - highlighted with golden gradient/glow)

**Right Side:** 
- **Bell Icon** (Notifications) - Shows red dot if unread notifications
- **Account button** with dropdown

**Account Dropdown Menu (appears on hover with smooth slide-down animation):**
- Account Settings
- Friends
- Streak (visual streak counter with fire animation)
- History (solved problems history)
- Settings
- Logout

**Notifications (Bell Icon Dropdown):**
- Friend requests received
- Bug report status updates
- Points earned from bug reports
- Media unlocked (banners, badges, avatars)
- Ranking badges earned (top 100)
- Challenge invites
- League change notifications
- Season end/start notifications
- Dropdown appears with smooth animation
- Unread count badge on bell icon

**Top Right Corner (Additional):**
- **Season Display:** "Season [Number]" with animated badge
- **Current League Badge:** Small icon showing user's league

### Main Content - "Courses We Offer"
**Display:** Card-based grid layout showing trending topics

**Access Levels:**
- **Free Tier:** Beginner, Intermediate, Advanced
- **Pro Tier:** All above + Interview Prep (highlighted with Pro badge)

**Visual Design:**
- Glassmorphism cards with backdrop blur
- Hover effect: lift, glow, scale with smooth CSS transitions
- Click animation: press-down effect
- Progress ring/bar if user has started the category
- "New" or "Trending" badges with pulse animation
- Smooth card flip animation on hover showing stats

**Topics within each category:**
- Java
- DSA (Data Structures & Algorithms)
- Python
- C
- C++
- Cloud
- DevOps
- (Expandable list)

**Subtopics within topics:**
- Loops
- Arrays
- Strings
- Trees
- Graphs
- Hash Maps
- Dynamic Programming
- Recursion
- etc.

### Search Functionality
**Location:** Top of home page (below header)
**Features:**
- Real-time search with instant results
- Auto-suggestions dropdown with fuzzy matching
- Filter by difficulty, category, topic
- Recent searches history with quick access
- Search results with animated transitions
- Keyboard shortcuts (Ctrl+K to open search)

---

## 3. PROBLEM STATEMENT PAGE

### Layout Structure
**Left Sidebar (Vertical tabs - rotated 90° clockwise to save horizontal space):**
1. **Overview** (default active)
2. **Community**
3. **Bots**

**Visual:** Tabs have smooth color transition on active state, slide animation when switching

### Overview Tab
**Problem Section (Left Half of Screen):**
- Problem title with difficulty badge (Easy/Medium/Hard) - animated color pulse
- Tags (topic, subtopic) with chip design
- Problem description with syntax-highlighted code examples
- Optimal output explanation
- **Example Input/Output:**
  - "For input like this: `[1, 2, 3]`"
  - "Expected output: `6`"
  - Multiple test cases shown in collapsible sections
- Constraints with icon indicators
- Time/Space complexity hints (optional reveal with smooth accordion)

**Code Editor Section (Right Half of Screen):**
- **Language Selector:** Dropdown at top
  - Options: Python, Java, C++, C, JavaScript, etc.
  - Smooth dropdown animation
  - Default to user's preferred language (from settings)

- **Code Editor (Monaco Editor - VS Code Engine):**
  - Syntax highlighting with theme matching
  - Line numbers
  - Auto-indentation and bracket matching
  - Pre-filled boilerplate code (function signature, imports)
  - **Partial solution:** Framework code provided, core logic blank
  - Code hints button (shows skeleton/pseudocode)
  - **CRITICAL SECURITY:** Disable paste (Ctrl+V, right-click paste, all paste methods blocked)
  - **Anti-cheat:** Track typing speed and time spent
  - Minimap on the right side (like VS Code)
  - Smooth cursor animations

**Action Buttons (Below Code Editor):**
All buttons with smooth hover animations, ripple effects on click

1. **Run Against Dummy Inputs:**
   - Uses example inputs from problem statement
   - Checks if output matches expected with 95%+ accuracy
   - Returns "Correct ✓" with green animation or shows failed test cases with red highlighting
   - Execution time displayed

2. **Run:**
   - Executes against random/hidden test cases
   - Shows loading animation during execution
   - Provides detailed feedback on pass/fail
   - **Counts as an attempt**
   - Shows which test cases passed/failed with animations

3. **Submit:**
   - **Anti-cheat Check:** Calculate minimum human-solvable time for the problem
   - If submission time < minimum time:
     - Display modal: "You are faster than most humans, try taking more time."
     - Close button to dismiss
     - **Deduct 2 points from final score** if answer is correct
   - Final submission runs against all test cases
   - **Scoring System:**
     - Base points: **10 points**
     - **-1 point** for each attempt after the first
     - **Minimum 5 points** for correct answer
     - **-3 points** for aborting problem
   - Updates history with:
     - Number of tries taken
     - Time spent on problem
     - Points earned
   - Displays "Solved in 'n' tries" on problem card
   - **Score Change Notification (Sidebar Animation):**
     - Appears on top left corner
     - Shows: Current league badge, Score: Current/Max (for sub-league), +/- points
     - Animated progress bar showing score increasing/decreasing
     - Smooth slide-in from left, stays for 3 seconds, slides out
     - If league changes, triggers league change screen (see League System section)

**Additional Options:**
- **Abort Problem:** Button with warning color
  - Confirmation dialog: "Are you sure? You'll lose 3 points"
  - **Deducts 3 points** on confirmation
  - Returns to topic list with transition
  
- **Report Bug:** Opens bug ticket form
  - User describes the issue
  - **API analyzes the bug report**
  - If bug is confirmed and fixed, user gets **+5 points**
  - Related bug reports are also credited
  - Notification sent when bug is processed

### Community Tab
**Features:**
- Discussion thread for specific problem
- Clean forum layout with smooth scrolling
- Users can post:
  - Hints without spoilers (spoiler tags with reveal animation)
  - Alternative approaches
  - Explanations of concepts
  - Questions for help
- Upvote/downvote system with number animations
- Sort by: Most helpful, Recent, Top rated
- User reputation badges based on helpful comments
- Reply threads with indentation
- Code blocks with syntax highlighting
- Emoji reactions

### Bots Tab
**AI Chatbot Interface:**
**Free Tier:** 20 queries per day
**Pro Tier:** 100 queries per day

**4 Pre-defined Options (Buttons):**
1. **"Explain this problem in simple terms"**
   - AI breaks down the problem for beginners
   
2. **"What concept should I use?"**
   - Suggests the right algorithm/data structure
   
3. **"Help me debug my code"**
   - **Automatically takes code from user's textbox**
   - AI analyzes code and points out errors
   - Shows line numbers with issues
   - Suggests fixes
   
4. **"Give me a hint"**
   - Provides pseudocode/algorithm
   - Step-by-step approach without full solution

**Visual Design:**
- Chat interface with message bubbles
- AI responses with typing animation
- Code blocks with copy button
- Remaining queries counter: "15/20 queries left today"
- Smooth scroll to latest message
- Emoji support in responses

**API Integration:**
- **Custom API required** for chatbot functionality
- Context-aware responses based on:
  - Current problem
  - User's code (for debugging)
  - User's skill level
  - Previous interactions

---

## 4. LEAGUE SYSTEM (MAJOR FEATURE)

### Two League Types

#### 1. Local League
**How it works:**
- Standard single-player mode
- Earn points by solving problems normally
- Compete on leaderboards
- No real-time competition

#### 2. Competitive Programming (CP) League
**How it works:**
- Real-time PvP (Player vs Player)
- Matchmaking system finds opponents from same league with similar points
- Both players solve the same problem(s) simultaneously
- Faster and more accurate solver wins
- **Matchmaking Rules:**
  - Search for real players in same league (±50 points range)
  - If matchmaking takes longer than **50 seconds**:
    - Match user against **AI bot**
    - Bot solves like average human but **10% slower**
    - Gives real player better chance to win
  - Show "Searching for opponent..." with animated loading

**Visual Design:**
- Split-screen during match
- Real-time opponent progress indicator (problems solved, not code visibility)
- Live timer countdown
- Animations when opponent completes a problem
- Victory/defeat screen with confetti/animations

### League Tiers and Scoring

**League Structure:**

| League | Points Range | Badge Visual | Special Effects |
|--------|--------------|--------------|-----------------|
| **Bronze** | 0 - 200 | Bronze medal | - |
| **Silver** | 201 - 400 | Silver medal | Slight shimmer |
| **Gold** | 401 - 600 | Gold medal | Gold shimmer |
| **Diamond** | 601 - 800 | Diamond gem | Sparkle effect |
| **Master** | 801 - 1000 | Crown | **Golden glow animation** |
| **Conqueror** | 1000+ | Crown | **Red glow animation** |

**Sub-Leagues (for Bronze to Master):**
Each league has 5 sub-tiers: V, IV, III, II, I

**Point Ranges per Sub-League (within 200-point league range):**
- **Sub-V:** 1-40 points (e.g., Bronze: 0-40, Silver: 201-240)
- **Sub-IV:** 41-80 points
- **Sub-III:** 81-120 points
- **Sub-II:** 121-160 points
- **Sub-I:** 161-200 points

**Badge Display:**
- Show league badge with roman numeral (e.g., "Silver-III", "Gold-I")
- Badge appears in profile, leaderboards, everywhere username shown
- Animated badge (subtle pulse/glow)

**Conqueror League (1000+ points):**
- **Conqueror-I:** 1000-1100 points
- **Conqueror-II:** 1101-1200 points
- **Conqueror-III:** 1201-1300 points
- ...and so on (increases roman numeral every 100 points)
- No upper limit

**League Change Animation:**
- When user reaches new league/sub-league:
  - Full-screen overlay appears with **partial blur** background
  - New badge appears in center with entrance animation
  - "You've reached [League Name]!" text
  - Confetti/particle effects
  - Sound effect (optional, with mute option)
  - **"Click anywhere to continue"** text at bottom
  - Clicking outside badge dismisses overlay
  - Smooth fade-out transition

### Score Change Notification Sidebar
**Trigger:** After every submission or abortion

**Design:**
- **Position:** Top left corner
- **Size:** Compact horizontal bar
- **Animation:** Slides in from left, stays 3 seconds, slides out

**Content:**
```
[League Badge Icon] | Score: 245/280 | +8 points
```

**Details:**
- League Badge Icon: Current league/sub-league badge (small)
- Score: `Current/Max` where Max is the upper limit of current sub-league
  - Example: In Silver-III (201-240 range), if user has 235 points: `235/240`
  - For Conqueror: `1523/1600` (next 100 milestone)
- Points change: `+8` (green) or `-3` (red)

**Animation:**
- Progress bar fills/depletes to show score change
- Smooth color transition (green for increase, red for decrease)
- Badge icon pulses if league changed

---

## 5. RANKING SYSTEM

### Ranking Criteria (Priority Order)
1. **Points** (highest priority)
2. **Time taken** (faster = better)
3. **Accuracy** (fewer tries = better)
4. **Streaks** (consistency)

### Leaderboard Types
**Three Categories:**

1. **Global Ranking**
   - All users worldwide
   
2. **Course-wise Ranking**
   - Separate leaderboard per topic (DSA, Java, Python, etc.)
   
3. **Local Ranking**
   - **Requires location access permission**
   - Shows players from same city/region
   - Privacy-friendly (only city-level, not exact location)

### Display Format

**Top 100 Players:**
- Show exact rank number: #1, #2, #3, etc.
- **Special Badge:** `#[Rank] [Ranking Criteria]`
  - Example: `#5 Global`, `#12 DSA`, `#3 Local`
  - Badge displayed next to username
  - Badge lasts for **entire season** (3 months)
  - Highly visible with special styling (gold border, glow)

**Below Top 100:**
- Use **percentile system**
  - Top 1%, Top 5%, Top 10%, Top 25%, Top 50%, etc.
  - Example: "Top 7% Global"
  - Less prominent styling than top 100

**Leaderboard UI:**
- Table/card view with user avatars
- Smooth scrolling with infinite scroll
- "Jump to my rank" button
- Filter options (by league, by time period)
- Animated rank changes (arrows ↑↓)
- Highlight current user's row

---

## 6. SEASON SYSTEM

### Season Duration
- **Length:** 3 months per season
- **Start Dates:** January 1, April 1, July 1, October 1
- **End Dates:** March 31, June 30, September 30, December 31

### Season Numbering
- Sequential: Season 1, Season 2, Season 3, etc.
- Display on home page: "Season 15" with badge/icon
- Season history archive (past season stats)

### Season Transitions
**End of Season:**
- Leaderboards freeze
- Top 100 players locked in with their rank badges
- Users can view stats from completed season
- Notification to all users: "Season [N] has ended!"

**Start of New Season:**
- Points reset to 0 (or partial carry-over - define later)
- New leaderboards start fresh
- Badges from previous season become "legacy badges"
- New season announcement with celebration screen

### Season Rewards (Media)
**Temporary Media:**
- Profile banners for top performers
- Exclusive avatars
- Special badges
- **Visible timer showing remaining time until season end**
- Example: "48 days remaining" on media item
- Auto-reverts to basic media when season ends

**Permanent Media (Pro Users):**
- Collected in profile's Collection Page
- Can be used anytime
- Includes Pro-exclusive banners and avatars

---

## 7. PROFILE & COLLECTION SYSTEM

### Profile Display (Public View)
**Visible to anyone searching by UID:**

**Header:**
- **Profile Banner** (animated, if Pro or seasonal reward)
- **Avatar/Profile Picture**
- **Username** with **V-Badge** (if Pro)
  - V-Badge: Verification checkmark with **golden animation** (subtle glow pulse)
  - Positioned immediately after username

**Stats Section:**
- Total points
- Current league (both Local and CP leagues with badges)
- Global rank / Percentile
- Course-wise ranks (top 3 courses)
- Streak count with fire emoji
- Problems solved (total)
- Accuracy percentage
- Time spent (total hours)

**League Badges Display:**
- **Local League Badge:** Prominently displayed
- **CP League Badge:** Below local league
- Both badges visible with their sub-tier roman numerals
- Animated (subtle glow/pulse)

**Friend List (if friended):**
- Mutual friends count
- Recent activity feed

### Collection Page (User's Own View)
**Purpose:** Store and manage all media items

**Categories:**
1. **Profile Banners**
   - Grid view of all unlocked banners
   - Animated previews on hover
   - Mark current banner with checkmark
   - Click to equip
   
2. **Avatars**
   - Grid of avatar options
   - Upload custom avatar (Pro only)
   - Basic avatars for free users
   
3. **Badges**
   - All earned badges
   - League badges (current and past seasons)
   - Ranking badges (top 100)
   - Achievement badges
   - Special event badges

**Media Types:**
- **Permanent:** No expiry, always available
  - Pro subscription core items (base banners, avatars)
  - Achievement rewards
  - Purchased items
  
- **Temporary:** Seasonal rewards with complex expiry logic
  - **Timer Display:** Shows remaining time
  - Example: "Valid until Mar 31, 2026" or "15 days left"
  - Visual indicator (hourglass icon, countdown)
  - Reverts to **basic default media** when expired
  
**Pro Subscription Seasonal Media Expiry Rules:**

**For Monthly Pro Subscription:**
- Media expires on **whichever comes first:**
  - Pro subscription end date, OR
  - Season end date
- **Special Case:** If Pro activated in the **last month of season** (e.g., March for Jan-Mar season):
  - Media lasts until **end of Pro subscription month**
  - Example: Activated Pro on March 15 (last month of season ending March 31)
    - Media lasts until April 15 (end of Pro subscription month)
    - Allows user to enjoy media for full month paid for

**For Annual Pro Subscription:**
- Media lasts **only until end of current season**
- When new season starts (if Pro still active):
  - New seasonal Pro media is automatically awarded
  - Old seasonal media expires
  - User receives notification: "New seasonal media unlocked!"
- Example: Annual Pro activated Feb 2026 (Season 1: Jan-Mar)
  - Season 1 media: Valid until March 31, 2026
  - Season 2 starts April 1: New media awarded automatically
  - Season 3 starts July 1: New media awarded automatically
  - And so on for duration of annual subscription

**Implementation:**
- Database tracks: `mediaExpiryDate`, `linkedToProSubscription`, `seasonId`
- Cron job checks daily for expired media
- Auto-award new seasonal media when season changes for active Pro users
- Notification sent when media changes

**Default Basic Media (All Users):**
- 5 basic avatars to choose from
- 3 basic banners (no animation)
- Standard league badges (no special effects)

---

## 8. PRO SUBSCRIPTION

### Free Tier Features
- 20 problems per day
- Access to Beginner, Intermediate, Advanced topics
- Community access
- Basic AI bot (20 queries/day, 4 options)
- Friend limit: **20 friends**
- Basic profile media (5 avatars, 3 banners)
- Local and CP leagues
- Ads displayed (subtle, non-intrusive)

### Pro Tier Features
- **Unlimited daily problems**
- Access to **Interview Prep** category
- AI bot: **100 queries/day**
- Friend limit: **100 friends**
- **Profile V-Badge** (golden animated checkmark)
- **Exclusive animated profile banners** (permanent collection)
- **Custom avatar upload**
- **Priority matchmaking** (faster queues in CP)
- Advanced analytics and insights
- Unlimited friends
- Custom challenge creation
- **Ad-free experience**
- Exclusive monthly contests
- Download problem sets as PDFs
- **Pro-only seasonal rewards**
- Early access to new features
- **Price:** ₹199/month or ₹1999/year (save ₹389)

### Pro Unlock Experience
**When user subscribes to Pro:**
1. **Full-screen overlay appears:**
   - **Partial blur** on background (active screen still slightly visible)
   - Center modal showing all Pro benefits unlocked
   - Animated entrance (scale-in with ease-out)
   - Icons/visuals for each benefit
   - Confetti animation
   - **Text at bottom:** "Click anywhere to continue"
2. **Click anywhere outside modal:**
   - Modal dismisses with fade-out
   - Returns to previous screen
   - Smooth transition

**UI/UX:**
- Feature comparison table (Free vs Pro)
- Testimonials from Pro users
- "Upgrade Now" CTA with gradient button
- Payment integration (Stripe)
- Monthly/yearly toggle with savings badge

---

## 9. FRIENDS & SOCIAL FEATURES

### Friends Tab Layout
**Sections:**
1. **Search Bar:** "Look for a friend" by User ID (UID)
2. **Friend Requests:** Pending incoming requests
3. **Friend Circle:** List of connected friends

**Friend Limits:**
- Free Tier: **20 friends maximum**
- Pro Tier: **100 friends maximum**

### Search & Add Friends
- Search by unique User ID (UID)
- Real-time search results
- View public profile before sending request
- Send friend request button with animation

### Friend Requests Section
**Incoming Requests:**
- User profile picture (circular)
- Username with league badge
- User stats preview (points, rank, league)
- **✓ Accept button** (green with checkmark icon)
- **✗ Reject button** (red with X icon)
- Smooth card animations when accepting/rejecting

### Friend Circle (Friends List)
**Sorting:**
- **Online friends first** (alphabetical order)
  - Green dot indicator for online status
- **Offline friends** sorted by last active time
  - Gray dot or timestamp (e.g., "2h ago")

**Friend Card Display:**
- Profile picture with online status indicator
- Username with V-badge if Pro
- League badges (Local and CP)
- Quick stats:
  - Points
  - Global rank/percentile
  - Time spent today
  - Current streak
- **Challenge button** (only for online friends)
  - Glowing effect to attract attention
  - Disabled for offline friends

**Friend Profile View (Expanded):**
- Detailed stats
- Shared solved problems
- Activity feed (recent submissions)
- Message option (future feature)
- Remove friend button

---

## 10. CHALLENGE SYSTEM

### Initiating a Challenge
**When Host Clicks "Challenge" on Online Friend:**

1. **Modal appears on Host's screen:**
   - "Waiting for [Friend's Name] to accept challenge"
   - Friend's profile picture in center
   - **Animated scanning/pulsing visual** around picture (circular wave effect)
   - Countdown timer: "Expires in 60s"
   - **Cancel button** at top-right (X icon)

2. **Modal appears on Receiver's screen:**
   - "[Host's Name] has challenged you!"
   - Challenge preview (topic, difficulty if pre-set)
   - Host's profile picture with animation
   - **Accept button** (large, green, prominent)
   - **Decline button** (smaller, red)
   - Countdown timer: "Expires in 60s"
   - Auto-decline if no response in 60 seconds

### If Challenge Accepted

**Receiver's Screen:**
- "Waiting for host to start..."
- "Challenge will begin soon"
- Animated loading spinner
- **Abort Challenge button** (returns both users to normal state)

**Host's Screen - Challenge Configuration:**
- **Close button** (X) at top-right corner
- Modal/panel with configuration options:

**Options:**
1. **Topic Selection:** Dropdown
   - Arrays, Strings, Trees, Graphs, DP, etc.
   - Shows number of problems available in each topic
   - **Note:** Problems repeat after 20 in a topic

2. **Difficulty:** Radio buttons
   - Easy / Medium / Hard
   - Visual indicators (color-coded)

3. **Time Limit:** Dropdown
   - 10 min / 20 min / 30 min / 60 min
   - Total time for all problems combined

4. **Number of Problems:** Slider or dropdown
   - 1 / 3 / 5 / 10
   - Shows estimated time per problem

5. **Start Challenge Button:**
   - Large, centered, gradient background
   - Disabled until all options selected
   - Click starts countdown (3, 2, 1, Go!)

**Challenge Limits:**
- **No limit** on number of challenges per day
- But repeated invites can be blocked by receiver

**Block Invites Feature (Receiver):**
- **"Block invites for 5 minutes"** option
- Prevents spam from same friend
- Timer shown to both users
- Automatically unblocks after 5 minutes
- Can manually unblock earlier

### During Challenge
**Shared Features:**
- Both users see the same problem(s)
- **Split-screen layout** (optional view)
  - Left: Your workspace
  - Right: Opponent's progress indicator
- Live timer countdown (large, center-top)
- Real-time score display
- **Opponent's progress visible:**
  - Problems solved (not their code)
  - Current problem they're on
  - Time spent
- Animated indicators when opponent completes a problem

**Win Conditions:**
- Most problems solved correctly
- If tied on number solved:
  - Faster total completion time wins
- Points awarded to winner
- Both get participation points

**Post-Challenge Screen:**
- **Victory/Defeat announcement** with animation
  - Winner: Confetti, trophy icon, victory sound
  - Loser: Motivational message, "Better luck next time!"
- **Stats Comparison:**
  - Problems solved by each
  - Time taken
  - Accuracy
  - Points earned
- **Challenge Again button** (quick rematch)
- **Return to Home button**
- **Share Results** (social media, copy link)

---

## 11. GAMIFICATION & SCORING SYSTEM (UPDATED)

### Points System (Revised)
**Earning Points:**

**Per Problem:**
- Base points: **10 points**
- **-1 point** for each attempt after the first
- **Minimum 5 points** for correct answer
- Examples:
  - Solve on 1st try: 10 points
  - Solve on 2nd try: 9 points
  - Solve on 3rd try: 8 points
  - Solve on 6th try: 5 points (minimum)

**Deductions:**
- **-3 points** for aborting a problem
- **-2 points from base** if submission too fast (anti-cheat triggered)
  - Applied before attempt penalties
  - Example: 1st try but too fast = 10 - 2 = 8 points
  - Example: 2nd try but too fast = (10 - 2) - 1 = 7 points

**Bonuses:**
- **+5 points** for validated bug report
- Daily login streak bonus: 2 points per day
- Helpful community comment (upvoted 10+ times): 3 points
- Challenge win: 15 points
- Challenge participation: 3 points

### Daily Limit System
**Rules:**
- Each user can solve **20 problems per day**
- **Pro users:** Unlimited problems per day
- Counter resets daily at **00:30** (12:30 AM)

**When Limit Reached (Free Users):**
- Display message screen: **"Catch a break big guy, come back tomorrow"**
- Message appears as overlay on every page
- Close button to dismiss
- New problems are **locked/grayed out**
- Can still access:
  - Previously solved problems (view-only)
  - Community discussions
  - Bots (if queries remaining)
  - Friends
  - History
  - Rankings
- Visual counter: "0/20 problems remaining today"
- Timer showing "Resets in 5h 23m"

---

## 12. HISTORY TAB

### Display Information
**Layout:** Table or card grid view

**Each Problem Entry Shows:**
- Problem name (clickable to view problem)
- Topic/Subtopic tags
- Difficulty badge
- Date solved (timestamp)
- Number of tries taken
- Time spent (from opening to solving)
- Points earned
- Status: Solved / Attempted / Aborted
- **Revisit button** (re-open problem)

**Filters & Sorting:**
- By topic (dropdown)
- By difficulty (checkboxes)
- By date range (date picker)
- By points earned (slider)
- By status (solved/attempted/aborted)
- Sort by: Recent, Oldest, Most points, Least points

**Statistics Dashboard:**
- **Total problems solved** (large number)
- **Average tries per problem** (graph)
- **Total time spent** (hours/minutes)
- **Accuracy percentage** (circular progress)
- **Favorite topics** (bar chart - most solved)
- **Progress over time** (line chart - daily/weekly/monthly)
- **Heatmap calendar** (GitHub-style contribution graph)
- **League progression** (timeline of league changes)

---

## 13. BUGS PAGE

### Bug Reporting Interface
**Form Fields:**
- **Problem ID/Name** (auto-filled if reporting from problem page)
- **Bug Type** (dropdown):
  - Incorrect Test Case
  - Wrong Expected Output
  - Unclear Problem Statement
  - UI/UX Issue
  - Performance Issue
  - API Error
  - Other
- **Description** (rich text editor)
- **Steps to Reproduce** (optional, numbered list)
- **Screenshot Upload** (drag-and-drop or click)
- **Code Snippet** (if applicable, auto-filled from textbox)
- **Submit Button** (with animation)

### Bug Processing
**Custom API Integration:**
- **Automated Analysis:**
  - AI reads bug description
  - Checks for duplicate reports
  - Groups similar bugs
  - Severity classification
  - Auto-assigns to appropriate category

**Status Workflow:**
1. **Submitted** (blue)
2. **Under Review** (orange)
3. **Confirmed** (yellow)
4. **In Progress** (purple)
5. **Resolved** (green) - **User gets +5 points**
6. **Rejected** (red) - Notification with reason

### User's Bug Dashboard
**My Bugs Tab:**
- List of all submitted bugs
- Status indicator with color coding
- Last updated timestamp
- Click to view details
- Notifications when status changes
- **Points earned** from resolved bugs highlighted

**Notifications:**
- Bug status changed: "Your bug report #245 was marked as Resolved"
- Points credited: "+5 points for bug report #245"
- Toast notification + bell icon badge

---

## 14. COMMUNITY PAGE

### Features
**Forum Layout:**
- **Categories (Tabs):**
  - Problem Discussions (per problem)
  - Study Groups
  - Interview Experiences
  - Resource Sharing
  - Career Advice
  - General Chat
  - Announcements (admin-only posts)

**Post Display:**
- Card-based layout
- Upvote/downvote arrows (left side)
- User avatar, username, league badge, V-badge if Pro
- Post title (large, bold)
- Preview text (truncated)
- Tags (clickable filters)
- Comment count
- Time posted (relative: "2h ago")
- Hover effects (card lift, shadow)

**Creating Posts:**
- Rich text editor
- Code blocks with syntax highlighting
- Image/GIF embedding
- Polls
- Tags (auto-suggestions)
- Preview before posting

**Engagement:**
- Upvote/downvote with animated numbers
- Comment threads (nested replies)
- Emoji reactions
- Share post (copy link, social media)
- Bookmark/save post
- Report inappropriate content

**User Reputation System:**
- Karma points for helpful contributions
- Badges:
  - Helpful contributor
  - Top commenter
  - Problem solver
  - Community hero
- Displayed next to username

**Moderation:**
- Report button on posts/comments
- Automated spam detection
- Moderator dashboard (for admins)
- Ban system for rule violators

---

## 15. PUZZLE PAGE

### Daily Puzzle
**Concept:**
- **One unique puzzle per day** (resets at 00:30)
- Different from standard coding problems
- Logic puzzles, riddles, lateral thinking, coding challenges with twist

**Types:**
- Number patterns
- Word games
- Algorithmic riddles
- Chess puzzles (for programmers)
- Math problems
- System design thought experiments

**Rewards:**
- Solving daily puzzle: **30 bonus points**
- **Leaderboard for fastest solvers** (global, displayed for 24h)
- Top 10 get special badge for the day

**UI:**
- Large, centered puzzle display
- Timer (measures solve time)
- Submit answer input
- Hint button (reduces points by 5)
- **Puzzle Archive** (Pro users only)
  - Access to past puzzles
  - Solutions revealed
  - Stats on puzzle performance

---

## 16. STREAKS SYSTEM

### Tracking
**Streak Types:**
1. **Login Streak:** Days logged in consecutively
2. **Solve Streak:** Days with at least 1 problem solved

**Visual Display:**
- **Fire emoji 🔥** with number next to it
- Animated flame (flickers, grows with streak length)
- **Calendar Heatmap** (GitHub-style):
  - Green squares for active days
  - Darker green for more problems solved
  - Gray for inactive days
  - Hover shows exact count

**Streak Protection (Pro Only):**
- **Freeze:** Can skip 1 day without breaking streak
- 1 freeze per week
- Icon shows when freeze is active

### Streak Rewards
**Milestones:**
- **7-day streak:** 50 bonus points + Bronze Flame badge
- **30-day streak:** 200 bonus points + Silver Flame badge
- **100-day streak:** 1000 bonus points + Gold Flame badge
- **365-day streak:** 5000 bonus points + Diamond Flame badge (rare!)

**Visual Celebration:**
- Milestone screen with confetti
- Badge appears in profile
- Notification to friends
- Share on social media option

---

## 17. ANTI-CHEAT SYSTEM

### Security Measures

1. **Disable Paste in Code Editor:**
   - Block **Ctrl+V** (Windows/Linux)
   - Block **Cmd+V** (Mac)
   - Block **right-click → Paste**
   - Block **browser context menu paste**
   - Block **drag-and-drop** of text files
   - Only allow manual typing

2. **Time-Based Validation:**
   - Calculate **minimum human-solvable time** for each problem
     - Based on problem complexity
     - Reading time + thinking time + typing time
     - Example: Medium problem = min 5 minutes
   - Track time from problem open to submission
   - If submission time < minimum time:
     - **Display warning modal:**
       - "You are faster than most humans, try taking more time."
       - Message in friendly tone
       - Close button to dismiss
     - **Penalty:** If answer is correct, **deduct 2 points from the base points**
       - Example: Base points = 10, User gets 10 - 2 = **8 points**
       - This penalty is applied first, then other deductions (for attempts) are applied
       - Minimum 5 points still applies after all calculations
     - Flag for review (potential AI usage detection)

3. **Code Similarity Detection:**
   - Check submissions against known solutions
   - Detect copy-paste from internet
   - Flag suspicious patterns

4. **Typing Pattern Analysis (Advanced):**
   - Monitor typing speed
   - Detect unnatural patterns (too consistent, too fast)
   - ML model to identify automated input

5. **IP & Device Tracking:**
   - Prevent multiple accounts from same device
   - Rate limiting on submissions

---

## 18. CUSTOM APIs REQUIRED

### List of APIs to Develop

#### 1. **Problem Generation API**
**Purpose:** Generate coding problems dynamically

**Endpoints:**
- `POST /api/problems/generate`
  - Input: `{ difficulty: 'easy' | 'medium' | 'hard', topic: string, subtopic: string }`
  - Output: `{ problem: { title, description, examples, constraints, testCases, solution, hints } }`

**Features:**
- AI-powered problem creation using GPT-4 or custom fine-tuned model
- Difficulty scaling based on user level
- Topic-specific problem templates
- Automatic test case generation (visible + hidden)
- Solution generation with multiple approaches
- Time/space complexity analysis
- Uniqueness validation (check against existing problems)
- Problem quality scoring

**Implementation:**
- Use OpenAI/Anthropic API with custom prompts
- Template system for consistent problem structure
- Database of problem patterns
- Validation layer to ensure problem is solvable

---

#### 2. **Code Execution & Evaluation API**
**Purpose:** Execute and evaluate user-submitted code securely

**Endpoints:**
- `POST /api/code/execute`
  - Input: `{ code: string, language: string, testCases: array, problemId: string }`
  - Output: `{ results: array, passed: boolean, executionTime: number, memoryUsed: number, errors: array }`

**Features:**
- Secure sandboxed execution (Docker containers)
- Support multiple languages: Python, Java, C++, C, JavaScript, Go
- Run against visible test cases (dummy inputs)
- Run against hidden test cases (full evaluation)
- Timeout protection (5s max execution time)
- Memory limit enforcement (512MB)
- Output validation and comparison
- Error handling with descriptive messages
- Execution time tracking (for anti-cheat)

**Implementation:**
- **Option A:** Judge0 CE (open-source judging system)
- **Option B:** Custom Docker-based solution
  - Spin up container per execution
  - Isolated file system (no external access)
  - Network disabled
  - Auto-cleanup after execution
- Redis queue for handling concurrent executions
- Rate limiting per user

**Security Measures:**
- No file system write access
- No network access
- No system calls
- Resource limits (CPU, memory, time)
- Code scanning for malicious patterns

---

#### 3. **Chatbot API**
**Purpose:** AI-powered assistant for helping users with problems

**Endpoints:**
- `POST /api/chatbot/query`
  - Input: `{ userId: string, problemId: string, action: string, userCode?: string, queryCount: number }`
  - Output: `{ response: string, remainingQueries: number, conversationId: string }`

**4 Pre-defined Actions:**

**A) "Explain this problem in simple terms"**
- Input: Problem ID
- API Process:
  - Fetch problem description from database
  - Send to AI with prompt: "Explain this coding problem in simple, beginner-friendly terms"
  - Generate easy-to-understand explanation
  - Include analogies if helpful
- Output: Simplified explanation (2-3 paragraphs)

**B) "What concept should I use?"**
- Input: Problem ID
- API Process:
  - Analyze problem type and tags
  - AI identifies relevant data structures/algorithms
  - Provides concept names with brief explanations
  - Does NOT give full solution
- Output: List of 2-3 concepts (e.g., "Hash Map", "Two Pointers", "Binary Search")

**C) "Help me debug my code"**
- Input: Problem ID + **User's code from textbox** (auto-captured)
- API Process:
  - Send code + problem to AI
  - AI performs static code analysis
  - Identifies syntax errors, logic errors, edge case issues
  - Suggests fixes with line numbers
  - Provides debugging tips
- Output: 
  - List of issues with line numbers
  - Suggested fixes (without giving full solution)
  - Edge cases user might have missed

**D) "Give me a hint"**
- Input: Problem ID
- API Process:
  - AI generates step-by-step pseudocode
  - Provides algorithmic approach without actual code
  - Progressive hints (can request more detailed hints)
- Output: Pseudocode/algorithm steps

**Query Tracking:**
- Track query count per user per day
- Free tier: 20 queries/day
- Pro tier: 100 queries/day
- Reset at 00:30 daily
- Store query history for analytics

**Implementation:**
- **AI Model:** OpenAI GPT-4 or Anthropic Claude
- Custom system prompts for each action type
- Context management (include problem details, user level)
- Response caching for common queries (reduce API costs)
- Fallback responses if AI unavailable

**Prompt Examples:**

```javascript
// Action: Explain this problem
const systemPrompt = `You are a coding tutor. Explain this problem in simple, beginner-friendly terms. 
Use analogies and examples. Keep it under 150 words.`;

// Action: What concept should I use?
const systemPrompt = `Given this coding problem, suggest 2-3 relevant concepts/algorithms. 
Provide concept names only with 1-sentence explanation each. Do not give solution.`;

// Action: Help me debug
const systemPrompt = `You are a code reviewer. Analyze this code for bugs and issues. 
Provide line numbers, describe the issue, and suggest fixes. Do not rewrite the entire code.`;

// Action: Give me a hint
const systemPrompt = `Provide a pseudocode/algorithmic approach for this problem. 
Use step-by-step format. Do not write actual code. Be clear but not too obvious.`;
```

---

#### 4. **Bug Analysis API**
**Purpose:** Automated bug report processing and validation

**Endpoints:**
- `POST /api/bugs/submit`
  - Input: `{ userId, problemId, bugType, description, screenshots?, code? }`
  - Output: `{ bugId, status: 'submitted', estimatedReviewTime }`

- `GET /api/bugs/status/:bugId`
  - Output: `{ bugId, status, resolution, pointsAwarded }`

**Features:**
- **Automated Analysis:**
  - NLP model analyzes bug description
  - Classifies bug type automatically
  - Checks for duplicate reports (similarity detection)
  - Severity scoring (critical, high, medium, low)
  - Auto-assigns to appropriate category

- **Duplicate Detection:**
  - Vector embeddings of bug descriptions
  - Cosine similarity check against existing bugs
  - Group similar bugs together
  - Credit first reporter, notify others

- **Status Workflow:**
  1. Submitted → Auto-analysis
  2. Under Review → Human/AI review
  3. Confirmed → Bug validated, fix scheduled
  4. In Progress → Being fixed
  5. Resolved → Fixed, **user gets +5 points**, notification sent
  6. Rejected → Not a bug, notification with reason

- **Points Distribution:**
  - Original reporter: +5 points
  - Related bug reporters: +2 points (for helping confirm)
  - Notification sent when points awarded

**Implementation:**
- AI model for text classification (BERT, GPT-4)
- Database: bugs table with status tracking
- Queue system for processing (Bull/Redis)
- Admin dashboard for manual review
- Automated test case updates if bug confirmed

---

#### 5. **Cross-Verification API**
**Purpose:** Validate user submissions against expected outputs

**Endpoints:**
- `POST /api/verify/solution`
  - Input: `{ code, language, problemId, testType: 'dummy' | 'full' }`
  - Output: `{ passed: boolean, testResults: array, accuracy: number }`

**Features:**
- Run code against test cases
- Compare output with expected output
- Handle different output formats (whitespace, trailing newlines)
- Floating-point comparison (tolerance for decimals)
- Large output handling
- Edge case validation
- Partial credit calculation (if some test cases pass)

**Test Types:**
- **Dummy Inputs:** Example test cases shown in problem
  - Must match 95%+ accuracy to pass
  - Shows which test cases failed
  
- **Full Evaluation:** All test cases (visible + hidden)
  - Must pass all to get full points
  - Partial credit if 70%+ pass

**Implementation:**
- Integrates with Code Execution API
- Smart comparison algorithms
- Test case database with expected outputs
- Result aggregation and reporting

---

#### 6. **Gamification API**
**Purpose:** Handle all points, leagues, streaks, badges, rankings

**Endpoints:**

**Points Management:**
- `POST /api/gamification/award-points`
  - Input: `{ userId, points, reason, metadata }`
  - Output: `{ newTotal, leagueChange?, badge? }`

- `GET /api/gamification/user-stats/:userId`
  - Output: `{ points, league, rank, streak, badges, history }`

**League Management:**
- `POST /api/gamification/update-league`
  - Auto-triggered when points change
  - Calculate new league tier and sub-tier
  - Return league change animation data if changed

- `GET /api/gamification/leaderboard`
  - Input: `{ type: 'global' | 'course' | 'local', limit, offset }`
  - Output: `{ rankings: array, userPosition }`

**Streak Tracking:**
- `POST /api/gamification/log-activity`
  - Input: `{ userId, activityType: 'login' | 'solve' }`
  - Updates streak counters
  - Checks for streak milestones
  - Awards streak bonuses

**Badge Awards:**
- `POST /api/gamification/check-achievements`
  - Input: `{ userId, action }`
  - Checks if action triggers any achievements
  - Awards badges if criteria met
  - Sends notification

**Features:**
- Real-time points calculation
- League tier calculation based on points
- Ranking algorithms (global, course-wise, local)
- Percentile calculations for non-top-100
- Streak management (daily reset at 00:30)
- Badge/achievement system
- Notification triggers
- Seasonal data management

**Implementation:**
- PostgreSQL for user stats (indexed on points for fast ranking)
- Redis for real-time leaderboard caching
- Scheduled jobs (cron) for:
  - Daily streak resets (00:30)
  - Leaderboard updates (every hour)
  - Season transitions
- WebSocket events for live rank updates

---

#### 7. **Matchmaking API (Competitive Programming)**
**Purpose:** Match users for real-time competitive battles

**Endpoints:**
- `POST /api/matchmaking/find-match`
  - Input: `{ userId, league, points }`
  - Output: `{ matchId, opponentId?, opponentData?, status: 'searching' | 'matched' | 'vs-bot' }`

- `POST /api/matchmaking/cancel`
  - Input: `{ userId, matchId }`
  - Removes user from queue

**Features:**
- **Matchmaking Logic:**
  - Search for players in same league
  - Points range: ±50 points
  - Real-time queue management
  - **50-second timeout:** If no match found, match with AI bot

- **AI Bot Simulation:**
  - Bot mimics human solving patterns
  - **10% slower than average human** for that difficulty
  - Realistic typing speed
  - Random pauses (thinking time)
  - Occasional "mistakes" for realism
  - Bot difficulty scales with user league

- **Match Setup:**
  - Select problem from topic pool
  - Same problem for both players
  - Synchronized start timer
  - Real-time progress tracking

**Implementation:**
- Redis queue for active matchmaking requests
- WebSocket for real-time updates
- Bot AI with configurable difficulty
- Problem selection based on league level
- Match state management (in-progress, completed)

---

#### 8. **Anti-Cheat API**
**Purpose:** Detect and prevent cheating behaviors

**Endpoints:**
- `POST /api/anti-cheat/validate-submission`
  - Input: `{ userId, problemId, code, timeSpent, typingPattern }`
  - Output: `{ isValid: boolean, flags: array, penaltyApplied: boolean }`

**Detection Methods:**

**A) Time Validation:**
- Calculate minimum solve time per problem
- Track time from problem open to submit
- Flag if time < minimum
- Apply -2 points penalty from base if flagged

**B) Code Similarity Detection:**
- Compare against known solutions (database)
- Check against online sources (web scraping)
- Plagiarism detection algorithms (Levenshtein distance, AST comparison)
- Flag if >80% similar to existing solution

**C) Typing Pattern Analysis:**
- Monitor keystroke timing
- Detect unnatural patterns:
  - Too consistent (bot typing)
  - Extremely fast (copy-paste despite disabled paste)
  - No pauses (inhuman)
- ML model to identify anomalies

**D) Behavioral Analysis:**
- Sudden skill jumps (easy problems failed, hard problems perfect)
- Unusual solving patterns
- Account sharing detection (IP changes, device changes)

**Penalty System:**
- **Time too fast:** -2 from base points + warning
- **Code plagiarism:** 0 points + suspension warning
- **Repeat offenses:** Temporary ban (24h, 7d, permanent)

**Implementation:**
- Real-time analysis during submission
- ML models for pattern detection
- Database of flagged users
- Admin review queue for confirmed cheaters
- Automated ban system with appeal process

---

#### 9. **Notification API**
**Purpose:** Send notifications to users for all events

**Endpoints:**
- `POST /api/notifications/send`
  - Input: `{ userId, type, title, message, actionUrl?, metadata }`
  - Output: `{ notificationId, sent: boolean }`

- `GET /api/notifications/user/:userId`
  - Output: `{ notifications: array, unreadCount: number }`

- `POST /api/notifications/mark-read`
  - Input: `{ notificationId }`

**Notification Types:**
- Friend requests
- Bug report updates
- Points awarded
- Media unlocked (banners, badges)
- Ranking changes (top 100)
- Challenge invites
- League changes
- Season start/end
- Streak milestones
- Achievement unlocked

**Delivery Channels:**
- In-app (bell icon dropdown)
- Email (for important events)
- Push notifications (future: mobile app)

**Implementation:**
- Database table: notifications (userId, type, read status)
- Real-time via WebSocket (for instant in-app)
- Email queue (SendGrid, Resend)
- Redis pub/sub for live updates

---

#### 10. **Analytics API**
**Purpose:** Track user behavior and platform metrics

**Endpoints:**
- `POST /api/analytics/track-event`
  - Input: `{ userId, eventType, metadata, timestamp }`
  - Examples: problem_viewed, problem_solved, button_clicked, page_visited

- `GET /api/analytics/dashboard`
  - Admin only
  - Returns: DAU, MAU, retention, conversion, revenue

**Tracked Events:**
- Problem views
- Problem submissions (success/fail)
- Time spent per problem
- AI bot queries
- Friend interactions
- Challenge matches
- Page navigation
- Feature usage

**Implementation:**
- Log events to database + analytics service (Mixpanel, PostHog)
- Aggregated dashboards
- User cohort analysis
- A/B testing support

---

#### 11. **Payment API (Pro Subscription)**
**Purpose:** Handle Pro subscription payments

**Endpoints:**
- `POST /api/payment/create-checkout`
  - Input: `{ userId, plan: 'monthly' | 'annual' }`
  - Output: `{ checkoutUrl, sessionId }`

- `POST /api/payment/webhook` (Stripe webhooks)
  - Handles payment success/failure
  - Activates Pro features
  - Sends confirmation email

- `POST /api/payment/cancel-subscription`
  - Input: `{ userId }`
  - Cancels auto-renewal

**Pricing:**
- Monthly: ₹199/month
- Annual: ₹1999/year (save ₹389)

**Implementation:**
- Stripe integration (Razorpay for India-specific)
- Webhook handling for payment events
- Subscription status tracking
- Auto-renewal management
- Invoice generation

---

#### 12. **Media Management API**
**Purpose:** Handle profile banners, avatars, badges

**Endpoints:**
- `GET /api/media/collection/:userId`
  - Output: `{ banners: array, avatars: array, badges: array }`

- `POST /api/media/equip`
  - Input: `{ userId, mediaId, type: 'banner' | 'avatar' }`
  - Updates user's active media

- `POST /api/media/upload-avatar` (Pro only)
  - Input: `{ userId, imageFile }`
  - Output: `{ avatarUrl }`

**Features:**
- Track permanent vs temporary media
- Timer for temporary media (seasonal)
- Auto-revert to default when expired
- Award media based on achievements
- Pro-exclusive media library

**Implementation:**
- S3/Cloudinary for image storage
- Database: media table with user ownership
- Expiry checks (cron job)
- Image processing (resize, optimize)

---

### API Architecture Overview

```
┌─────────────────────────────────────────────┐
│           Frontend (Next.js)                │
│  (React components, UI, State management)   │
└─────────────────┬───────────────────────────┘
                  │
                  ├─── API Layer (Next.js API Routes / Express)
                  │
    ┌─────────────┼─────────────┐
    │             │             │
    ▼             ▼             ▼
┌────────┐  ┌────────────┐  ┌──────────┐
│Problem │  │ Chatbot    │  │ Code     │
│Gen API │  │ API        │  │ Exec API │
│(GPT-4) │  │ (Claude)   │  │ (Judge0) │
└────────┘  └────────────┘  └──────────┘
    │             │             │
    └─────────────┼─────────────┘
                  │
                  ▼
    ┌──────────────────────────┐
    │    PostgreSQL Database   │
    │  (Users, Problems, etc.) │
    └──────────────────────────┘
                  │
                  ▼
    ┌──────────────────────────┐
    │    Redis Cache           │
    │  (Leaderboards, Queue)   │
    └──────────────────────────┘
```

---

### API Rate Limiting

**Per User Limits:**
- Problem submissions: 100/hour
- AI bot queries: 20/day (free), 100/day (pro)
- Code executions: 200/day
- Friend requests: 20/day
- Bug reports: 10/day
- API calls: 1000/hour (general)

**Implementation:**
- Redis-based rate limiter
- Per-endpoint limits
- User tier awareness (free vs pro)
- Graceful error messages

---

### API Security

**All APIs:**
- JWT authentication required
- HTTPS only
- CORS configured
- Input validation (Zod schemas)
- SQL injection prevention
- XSS protection
- CSRF tokens
- Rate limiting
- Request logging
- Error handling (no stack traces to client)

**Sensitive APIs (Code Execution, Payment):**
- Extra validation layers
- Sandboxing
- Encryption for sensitive data
- Audit logging

---

## 19. TECHNICAL REQUIREMENTS

### Frontend
- **Framework:** Next.js 14+ with TypeScript
- **Styling:** Tailwind CSS + Framer Motion (for 60-144 FPS animations)
- **Code Editor:** Monaco Editor (VS Code engine)
- **State Management:** Zustand or Redux Toolkit
- **UI Components:** shadcn/ui + Radix UI
- **Real-time:** Socket.io for live features (challenges, notifications)
- **Charts:** Recharts for analytics
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js (Express) or Next.js API Routes
- **Database:** PostgreSQL (relational data) + Redis (caching)
- **ORM:** Prisma or Drizzle
- **Authentication:** NextAuth.js or Clerk (OAuth support)
- **Real-time:** WebSockets (Socket.io)
- **Queue System:** Bull (for background jobs like bug processing)

### Code Execution (Critical)
- **Sandboxed Environment:**
  - Docker containers for isolation
  - Judge0 API or custom solution
  - Timeout limits (5s for execution)
  - Memory limits
  - Network isolation
- **Supported Languages:** Python, Java, C++, C, JavaScript, Go

### AI Integration
- **Chatbot:** OpenAI GPT-4 or Claude API
- **Problem Generation:** Custom prompts + fine-tuned model
- **Bug Analysis:** NLP model for text classification
- **Code Debugging:** Static analysis tools + AI

### DevOps & Hosting
- **Hosting:** Vercel (frontend + API routes) or AWS
- **Database:** Supabase or Railway or AWS RDS
- **CDN:** Cloudflare (for static assets)
- **Monitoring:** Sentry (error tracking), DataDog (performance)
- **Analytics:** PostHog or Mixpanel (user behavior)
- **Payment:** Stripe (Pro subscriptions)

### Security
- **Authentication:** JWT tokens, secure HTTP-only cookies
- **Rate Limiting:** On all endpoints (prevent abuse)
- **Input Sanitization:** Prevent SQL injection, XSS
- **Code Execution Sandbox:** No file system access, network isolation
- **HTTPS:** Enforced on all connections
- **DDoS Protection:** Cloudflare

### Performance Optimization (60-144 FPS)
**Critical for smooth, fluid experience:**

1. **Frontend Optimizations:**
   - **Code Splitting:** Load only necessary components
   - **Lazy Loading:** Images, heavy components
   - **Memoization:** React.memo, useMemo, useCallback
   - **Virtual Scrolling:** For long lists (leaderboards, history)
   - **Web Workers:** Heavy computations off main thread
   - **Service Workers:** Offline support, caching

2. **Animation Performance:**
   - **Use GPU-accelerated properties:** transform, opacity (not left/top)
   - **requestAnimationFrame** for custom animations
   - **CSS transitions** over JavaScript animations when possible
   - **Framer Motion** with optimized settings:
     - `layoutId` for shared element transitions
     - `whileInView` for scroll-triggered animations
     - `initial={false}` to skip mount animations when needed
   - **60-144 FPS target:**
     - Maintain 16ms per frame (60 FPS) minimum
     - Support 120Hz/144Hz displays (high-refresh monitors)
     - Use `will-change` CSS property sparingly

3. **Database Optimization:**
   - **Indexing:** On frequently queried columns (user_id, problem_id, points)
   - **Caching:** Redis for hot data (leaderboards, user sessions)
   - **Connection Pooling:** Reuse database connections
   - **Pagination:** Limit results per page

4. **API Response Times:**
   - **< 100ms** for simple queries
   - **< 500ms** for complex queries (leaderboards)
   - **< 2s** for code execution

5. **Image & Asset Optimization:**
   - **Next.js Image** component (auto-optimization)
   - **WebP format** for images
   - **SVG** for icons and logos
   - **Compression:** Gzip/Brotli for text assets

---

## 20. VISUAL DESIGN REQUIREMENTS

### Design Principles
**Smooth, Fluid, Visually Stunning:**

1. **Color Scheme:**
   - **Primary:** Blue gradient (#3B82F6 → #6366F1)
   - **Secondary:** Purple (#8B5CF6)
   - **Accent:** Gold (#F59E0B) for Pro features
   - **Success:** Green (#10B981)
   - **Error:** Red (#EF4444)
   - **Warning:** Orange (#F97316)
   - **Neutral:** Grays (#94A3B8, #64748B, #334155)
   - **Background:** Dark mode (#0F172A, #1E293B) and Light mode (#F8FAFC, #FFFFFF)

2. **Typography:**
   - **Headings:** Poppins or Space Grotesk (Bold, 700-800 weight)
   - **Body:** Inter or DM Sans (Regular, 400 weight)
   - **Code:** JetBrains Mono or Fira Code (Monospace)
   - **Responsive font sizes** (clamp for fluid scaling)

3. **Animations:**
   - **Subtle and Purposeful:** Every animation serves UX purpose
   - **Timing Functions:** Ease-out for entrances, ease-in for exits
   - **Duration:** 150-300ms for micro-interactions, 500-700ms for page transitions
   - **No Jank:** Maintain 60 FPS minimum
   - **Examples:**
     - Button hover: Lift (translateY(-2px)) + shadow increase
     - Card hover: Scale(1.02) + glow
     - Modal entrance: Scale(0.9) → Scale(1) with fade
     - Notification: Slide-in from right + bounce
     - Score change: Number count-up animation
     - League badge: Rotate + scale with glow pulse

4. **Glassmorphism:**
   - Cards with `backdrop-filter: blur(10px)`
   - Semi-transparent backgrounds (rgba)
   - Subtle borders (1px solid with opacity)
   - Used for modals, cards, dropdowns

5. **Neumorphism (Selective):**
   - For buttons and interactive elements
   - Soft shadows (inset and outset)
   - Subtle depth

6. **Gradients:**
   - Linear gradients for backgrounds, buttons
   - Radial gradients for spotlight effects
   - Animated gradients for Pro features (subtle shift)

7. **Shadows:**
   - **Elevation system:** 
     - Level 1: `box-shadow: 0 1px 3px rgba(0,0,0,0.12)`
     - Level 2: `box-shadow: 0 4px 6px rgba(0,0,0,0.1)`
     - Level 3: `box-shadow: 0 10px 20px rgba(0,0,0,0.15)`
     - Level 4: `box-shadow: 0 20px 40px rgba(0,0,0,0.2)`
   - Colored shadows for brand elements (blue/purple glow)

8. **Icons:**
   - Consistent icon set (Lucide React)
   - Animated icons on hover (rotate, bounce, pulse)
   - Contextual colors

9. **Responsive Design:**
   - **Mobile-first approach**
   - Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl), 1536px (2xl)
   - Touch-friendly (44px minimum touch targets on mobile)
   - Hamburger menu for mobile navigation

10. **Loading States:**
    - Skeleton screens (no blank loading)
    - Animated placeholders (shimmer effect)
    - Progress bars for long operations
    - Spinners with brand colors

11. **Empty States:**
    - Illustrations or icons
    - Helpful messaging
    - CTA to take action
    - Example: "No problems solved yet. Start your journey!"

12. **Error States:**
    - Friendly error messages (no technical jargon)
    - Suggestions to fix
    - Retry buttons
    - Support contact link

---

## 21. ACCESSIBILITY

### WCAG 2.1 Level AA Compliance

1. **Keyboard Navigation:**
   - All interactive elements accessible via Tab
   - Focus indicators (visible outline)
   - Skip to main content link
   - Escape key to close modals

2. **Screen Reader Support:**
   - Semantic HTML (nav, main, article, section)
   - ARIA labels for interactive elements
   - Alt text for images
   - Live regions for dynamic content (notifications)

3. **Color Contrast:**
   - 4.5:1 for normal text
   - 3:1 for large text (18px+)
   - Test with tools (Stark, Axe)

4. **Responsive Text:**
   - Font size adjustable (browser zoom)
   - No fixed widths that break on zoom
   - Relative units (rem, em)

5. **Form Accessibility:**
   - Labels for all inputs
   - Error messages associated with fields
   - Fieldset and legend for groups

6. **Reduced Motion:**
   - Respect `prefers-reduced-motion` media query
   - Option to disable animations in settings

7. **High Contrast Mode:**
   - Support for Windows High Contrast
   - Custom high contrast theme option

---

## 22. USER ONBOARDING

### First-Time User Flow

**Step 1: Welcome Screen**
- App introduction
- Key features highlighted
- "Get Started" button

**Step 2: Sign Up**
- Choose OAuth or email/password
- Quick and easy (minimal fields)

**Step 3: Profile Setup**
- Choose avatar from default options
- Select username (unique)
- Optional: Add bio, location

**Step 4: Skill Assessment (Optional)**
- Quick 3-5 question quiz
- Determines starting difficulty
- Skippable

**Step 5: Interactive Tutorial**
- Walkthrough of main features:
  - How to browse problems
  - Code editor usage
  - Submitting solutions
  - Using AI bot
  - Checking history
- Skip option available
- Progress dots at bottom

**Step 6: First Problem**
- Guided problem solving
- Hints appear automatically
- Celebration on first solve
- Points awarded

**Step 7: Dashboard Overview**
- Show home page
- Highlight key sections
- Tooltips on hover
- "Got it" button to dismiss

### Re-engagement (Returning Users)
- Daily login bonus notification
- "Continue where you left off" widget
- New problems suggestion
- Friend activity feed

---

## 23. ADMIN DASHBOARD (Future Feature)

### Admin Panel Features
- User management (view, suspend, delete)
- Problem management (create, edit, delete, approve)
- Bug report management (review, resolve, reject)
- Content moderation (community posts, comments)
- Analytics dashboard:
  - Daily active users
  - Problems solved per day
  - Revenue (Pro subscriptions)
  - Churn rate
  - User retention
- Announcements (send to all users)
- Seasonal rewards management
- Pro subscription management

---

## 24. FUTURE FEATURES (Post-MVP)

### Phase 2 (3-6 months)
- Video solutions for problems
- Mock interview simulator (1-on-1 with AI interviewer)
- Company-specific problem sets (Google, Meta, Amazon prep)
- Resume builder integration
- Job board/referral system
- Code review feature (peer review)
- Team challenges (3v3, 5v5)
- Mobile app (React Native)

### Phase 3 (6-12 months)
- Coding tournaments/contests (weekly/monthly)
- VS Code extension (practice within IDE)
- Browser extension (track coding time)
- AI-powered personalized learning paths
- Integration with LinkedIn (showcase badges)
- White-label solution for universities/bootcamps
- API for third-party integrations

---

## 25. TIMELINE & MILESTONES

### Phase 1: MVP (Weeks 1-8)
- **Week 1-2:** Project setup, authentication, database schema
- **Week 3-4:** Problem display, code editor, basic submission
- **Week 5-6:** Gamification (points, leagues), history tracking
- **Week 7-8:** Friends system, basic challenges, polish

### Phase 2: Core Features (Weeks 9-14)
- **Week 9-10:** AI bot integration, bug reporting system
- **Week 11-12:** Competitive programming (matchmaking), bots
- **Week 13-14:** Pro subscription, payment integration, testing

### Phase 3: Launch Preparation (Weeks 15-16)
- Bug fixes, performance optimization
- Security audit
- Load testing
- Documentation
- Marketing materials
- Beta testing with users

### Post-Launch (Ongoing)
- User feedback iteration
- Feature additions
- Scaling infrastructure
- Community growth

---

## 26. SUCCESS METRICS & KPIs

### User Engagement
- **Daily Active Users (DAU)**
- **Monthly Active Users (MAU)**
- **Average session duration** (target: 30+ minutes)
- **Problems solved per user per day** (target: 5+)
- **Return rate** (7-day: 40%, 30-day: 60%)

### Retention
- **Day 1 retention:** 70%
- **Day 7 retention:** 40%
- **Day 30 retention:** 25%

### Monetization
- **Pro conversion rate:** 5-10%
- **ARPU (Average Revenue Per User):** $2-5/month
- **Churn rate:** <5% monthly

### Community
- **Friend connections per user:** 5+ on average
- **Community posts per week:** 100+
- **Challenge matches per day:** 500+

### Technical
- **Page load time:** <2s
- **API response time:** <500ms
- **Code execution time:** <5s
- **Uptime:** 99.9%

---

## FINAL NOTES FOR IMPLEMENTATION

1. **Performance is Critical:** 60-144 FPS, no compromises
2. **Start with MVP:** Get core features working perfectly before expanding
3. **User Feedback:** Beta test early, iterate based on real usage
4. **Scalability:** Design for millions of users from day 1
5. **Security:** Code execution is highest risk—invest heavily in sandboxing
6. **AI Quality:** Fine-tune prompts for chatbot, ensure helpful responses
7. **Visual Polish:** Every animation, transition, hover effect matters
8. **Mobile Experience:** 50%+ users will be on mobile, optimize for it
9. **Documentation:** Comprehensive docs for APIs, onboarding, troubleshooting
10. **Community:** Foster positive, helpful community culture from start

---

## DELIVERABLES

1. ✅ Fully functional web application (responsive)
2. ✅ User authentication (OAuth + email/password)
3. ✅ 100+ problems database (varied difficulty)
4. ✅ Secure code execution engine
5. ✅ AI chatbot (4 actions, query limits)
6. ✅ Gamification (points, leagues, streaks, badges)
7. ✅ Friends & challenge system
8. ✅ Competitive programming mode
9. ✅ Pro subscription with Stripe
10. ✅ Admin dashboard (content management)
11. ✅ Mobile-responsive design (works on all devices)
12. ✅ Documentation (user guide, API docs)
13. ✅ Deployment (live on web)

---

Use this comprehensive prompt with any AI assistant or development team to build this platform. All features, technical requirements, visual guidelines, and user flows are clearly defined and ready for implementation. The focus is on creating a smooth, fluid, visually stunning experience with high performance (60-144 FPS) and robust gamification to keep users engaged.
