# Tutorial: Understanding Pull Requests (PRs) and How to View/Merge Them

## What is a PR (Pull Request)?

A **Pull Request (PR)** is like a "proposal" to add new code/files to your repository. Think of it as:
- A **preview** of changes before they go live
- A way to **review** what's being added
- A **safe zone** where changes sit before merging into your main code

## Step-by-Step Guide: How to View and Merge a PR

### Step 1: Go to Your Repository
1. Open your browser
2. Go to: `https://github.com/SAGAR172006/prep-CP`

### Step 2: Click on "Pull Requests" Tab
- Look at the top menu bar of your repo
- You'll see tabs: `Code`, `Issues`, `Pull requests`, `Actions`, etc.
- Click on **"Pull requests"** tab
- You should see a new PR created by Copilot (might be titled something like "Build gamified coding practice platform")

### Step 3: View Files in the PR
1. **Click on the PR title** to open it
2. You'll see several tabs inside the PR:
   - **Conversation**: Overview and comments
   - **Commits**: List of code commits
   - **Files changed**: 👈 **CLICK THIS!**
3. In the **"Files changed"** tab you'll see:
   - All new files being added (in green)
   - File structure on the left
   - Code preview on the right
   - You can browse through every file!

### Step 4: Merge the PR (Add Files to Main Branch)
1. Go back to the **"Conversation"** tab of the PR
2. Scroll to the bottom
3. You'll see a big green button: **"Merge pull request"**
4. Click **"Merge pull request"**
5. Click **"Confirm merge"**
6. Done! 🎉 The files are now merged into your `main` branch

### Step 5: See Files in Your Codespace
Now that the PR is merged, get the files in your Codespace:

1. **Open your Codespace** (the one you're currently in)
2. **Open the terminal** (bottom panel or press `Ctrl + backtick`)
3. Run this command:
   ```bash
   git pull origin main
   ```
4. **All files will now appear!** You can see them in the file explorer on the left

## Visual Guide
```
┌─────────────────────────────────────────────────────────────────┐
│  GitHub Repository: SAGAR172006/prep-CP                         │
├─────────────────────────────────────────────────────────────────┤
│  Code   Issues   Pull requests ← CLICK HERE   Actions   ...     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  📋 Pull Requests (1)                                            │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ 🔄 Build gamified coding practice platform         #1     │ │
│  │    Created by github-actions[bot]                         │ │
│  │    ✅ All checks passed                                    │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                  │
│  CLICK ON PR TITLE TO OPEN ↑                                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

After clicking, you'll see:

┌─────────────────────────────────────────────────────────────────┐
│  Conversation   Commits   Files changed ← VIEW FILES HERE       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Files changed (10+)                                             │
│                                                                  │
│  ✅ package.json             +50 lines                           │
│  ✅ src/components/...       +200 lines                          │
│  ✅ src/pages/...            +150 lines                          │
│  ✅ ...                                                          │
│                                                                  │
│  [Preview all green additions here]                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

To Merge:

┌─────────────────────────────────────────────────────────────────┐
│  Conversation ← GO BACK HERE                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [Scroll to bottom]                                              │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  This branch has no conflicts with the base branch       │   │
│  │                                                           │   │
│  │  ┌─────────────────────────────────────────────────┐    │   │
│  │  │  Merge pull request                             │    │   │
│  │  └─────────────────────────────────────────────────┘    │   │
│  │                                                           │   │
│  │  ← CLICK THIS GREEN BUTTON                               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Quick Reference Commands for Codespace

After merging the PR, use these in your Codespace terminal:
```bash
# Check which branch you're on
git branch

# Switch to main branch (if not already on it)
git checkout main

# Pull the latest changes from GitHub (get merged PR files)
git pull origin main

# Verify files were downloaded
ls -la

# View git status
git status

# See recent commit history
git log --oneline -5

# If you want to see what changed in the last commit
git show HEAD
```

## Troubleshooting

**Q: I don't see any Pull Requests**
- A: Wait a few minutes, the Copilot agent is still creating it

**Q: The PR shows "Checks in progress"**
- A: Wait for checks to complete, or you can merge anyway

**Q: After merging, files still not in Codespace**
- A: Run `git pull origin main` in the terminal
- A: Make sure you're on the main branch: `git checkout main`

**Q: I want to see what's being added before merging**
- A: Click "Files changed" tab in the PR to preview everything

## Summary

1. **View PR**: GitHub → Your Repo → "Pull requests" tab → Click on PR → "Files changed" tab
2. **Merge PR**: In the PR → Scroll down → "Merge pull request" button → Confirm
3. **Get files in Codespace**: Open terminal → Run `git pull origin main`

That's it! Once you merge, all the files Copilot created will appear in your Codespace. 🚀
