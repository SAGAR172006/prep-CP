const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    subtopic: {
      type: String,
      default: null,
    },
    tags: [
      {
        type: String,
      },
    ],
    // Problem details
    constraints: [
      {
        type: String,
      },
    ],
    examples: [
      {
        input: String,
        output: String,
        explanation: String,
      },
    ],
    hints: [
      {
        type: String,
      },
    ],
    // Test cases
    testCases: [
      {
        input: String,
        output: String,
        isHidden: {
          type: Boolean,
          default: false,
        },
      },
    ],
    // Code templates
    codeTemplates: {
      python: String,
      java: String,
      cpp: String,
      c: String,
      javascript: String,
      go: String,
      rust: String,
    },
    // Metadata
    points: {
      type: Number,
      default: 10,
    },
    minSolveTime: {
      type: Number, // in seconds
      default: 60,
    },
    acceptedSubmissions: {
      type: Number,
      default: 0,
    },
    totalSubmissions: {
      type: Number,
      default: 0,
    },
    tier: {
      type: String,
      enum: ['free', 'pro'],
      default: 'free',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // AI hints configuration
    aiHintsEnabled: {
      type: Boolean,
      default: true,
    },
    complexity: {
      time: String,
      space: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better search performance
problemSchema.index({ title: 'text', description: 'text', tags: 'text' });
problemSchema.index({ difficulty: 1, category: 1 });

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;
