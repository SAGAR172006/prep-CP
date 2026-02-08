const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function() {
        return !this.oauthProvider;
      },
    },
    oauthProvider: {
      type: String,
      enum: ['google', 'github', null],
      default: null,
    },
    oauthId: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    // Gamification
    points: {
      type: Number,
      default: 0,
    },
    league: {
      type: String,
      enum: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster'],
      default: 'Bronze',
    },
    streak: {
      current: { type: Number, default: 0 },
      longest: { type: Number, default: 0 },
      lastSolvedDate: { type: Date, default: null },
    },
    // Statistics
    stats: {
      problemsSolved: { type: Number, default: 0 },
      totalSubmissions: { type: Number, default: 0 },
      successfulSubmissions: { type: Number, default: 0 },
      easyProblems: { type: Number, default: 0 },
      mediumProblems: { type: Number, default: 0 },
      hardProblems: { type: Number, default: 0 },
    },
    // Preferences
    preferences: {
      preferredLanguage: {
        type: String,
        enum: ['python', 'java', 'cpp', 'c', 'javascript', 'go', 'rust'],
        default: 'python',
      },
      theme: {
        type: String,
        enum: ['dark', 'light'],
        default: 'dark',
      },
    },
    // Pro subscription
    isPro: {
      type: Boolean,
      default: false,
    },
    proExpiresAt: {
      type: Date,
      default: null,
    },
    // Friends
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    friendRequests: [
      {
        from: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    // Achievements
    achievements: [
      {
        type: String,
      },
    ],
    badges: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to update streak
userSchema.methods.updateStreak = function () {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!this.streak.lastSolvedDate) {
    this.streak.current = 1;
    this.streak.lastSolvedDate = today;
  } else {
    const lastSolved = new Date(this.streak.lastSolvedDate);
    lastSolved.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today - lastSolved) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Already solved today
      return;
    } else if (diffDays === 1) {
      // Consecutive day
      this.streak.current += 1;
      this.streak.lastSolvedDate = today;
    } else {
      // Streak broken
      this.streak.current = 1;
      this.streak.lastSolvedDate = today;
    }
  }

  if (this.streak.current > this.streak.longest) {
    this.streak.longest = this.streak.current;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
