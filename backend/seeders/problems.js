const mongoose = require('mongoose');
require('dotenv').config();

const Problem = require('../models/Problem');

const sampleProblems = [
  {
    title: 'Two Sum',
    slug: 'two-sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    difficulty: 'Easy',
    category: 'Data Structures & Algorithms',
    topic: 'Arrays',
    subtopic: 'Hash Map',
    tags: ['arrays', 'hash-table', 'two-pointers'],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists',
    ],
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'nums[1] + nums[2] == 6, so we return [1, 2].',
      },
    ],
    hints: [
      'A hash table can help you find the complement efficiently',
      'Store each number and its index as you iterate',
      'Check if target - current number exists in the hash table',
    ],
    testCases: [
      {
        input: '[2,7,11,15]\n9',
        output: '[0,1]',
        isHidden: false,
      },
      {
        input: '[3,2,4]\n6',
        output: '[1,2]',
        isHidden: false,
      },
      {
        input: '[3,3]\n6',
        output: '[0,1]',
        isHidden: false,
      },
      {
        input: '[1,2,3,4,5]\n9',
        output: '[3,4]',
        isHidden: true,
      },
    ],
    codeTemplates: {
      python: `def two_sum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Write your solution here
    pass`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        return {};
    }
};`,
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your solution here
};`,
    },
    points: 10,
    minSolveTime: 120,
    tier: 'free',
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
    },
  },
  {
    title: 'Reverse String',
    slug: 'reverse-string',
    description: 'Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.',
    difficulty: 'Easy',
    category: 'Data Structures & Algorithms',
    topic: 'Strings',
    subtopic: 'Two Pointers',
    tags: ['string', 'two-pointers'],
    constraints: [
      '1 <= s.length <= 10^5',
      's[i] is a printable ascii character',
    ],
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
        explanation: 'The string is reversed in place.',
      },
    ],
    hints: [
      'Use two pointers, one at the start and one at the end',
      'Swap characters and move pointers towards each other',
    ],
    testCases: [
      {
        input: '["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
        isHidden: false,
      },
      {
        input: '["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
        isHidden: false,
      },
    ],
    codeTemplates: {
      python: `def reverse_string(s):
    """
    :type s: List[str]
    :rtype: None Do not return anything, modify s in-place instead.
    """
    # Write your solution here
    pass`,
      java: `class Solution {
    public void reverseString(char[] s) {
        // Write your solution here
    }
}`,
    },
    points: 8,
    minSolveTime: 60,
    tier: 'free',
  },
  {
    title: 'Binary Search',
    slug: 'binary-search',
    description: 'Given a sorted array of integers nums and an integer target, write a function to search target in nums. If target exists, return its index. Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity.',
    difficulty: 'Easy',
    category: 'Data Structures & Algorithms',
    topic: 'Arrays',
    subtopic: 'Binary Search',
    tags: ['array', 'binary-search'],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'All integers in nums are unique',
      'nums is sorted in ascending order',
    ],
    examples: [
      {
        input: 'nums = [-1,0,3,5,9,12], target = 9',
        output: '4',
        explanation: '9 exists in nums and its index is 4',
      },
    ],
    testCases: [
      {
        input: '[-1,0,3,5,9,12]\n9',
        output: '4',
        isHidden: false,
      },
      {
        input: '[-1,0,3,5,9,12]\n2',
        output: '-1',
        isHidden: false,
      },
    ],
    codeTemplates: {
      python: `def search(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: int
    """
    # Write your solution here
    pass`,
    },
    points: 10,
    minSolveTime: 90,
    tier: 'free',
  },
];

async function seedProblems() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/prep-cp');
    console.log('Connected to MongoDB');

    // Clear existing problems
    await Problem.deleteMany({});
    console.log('Cleared existing problems');

    // Insert sample problems
    const result = await Problem.insertMany(sampleProblems);
    console.log(`✅ Successfully seeded ${result.length} problems`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding problems:', error);
    process.exit(1);
  }
}

// Run seeder if called directly
if (require.main === module) {
  seedProblems();
}

module.exports = seedProblems;
