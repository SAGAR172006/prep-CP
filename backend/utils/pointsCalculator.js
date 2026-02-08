/**
 * Calculate points earned for a problem submission
 * @param {Object} params - Submission parameters
 * @param {number} params.basePoints - Base points for the problem (default 10)
 * @param {number} params.attempts - Number of attempts made
 * @param {number} params.timeSpent - Time spent in seconds
 * @param {number} params.minSolveTime - Minimum expected solve time
 * @param {boolean} params.isCorrect - Whether the solution is correct
 * @returns {number} Points earned
 */
function calculatePoints({ basePoints = 10, attempts = 1, timeSpent, minSolveTime, isCorrect }) {
  if (!isCorrect) {
    return 0;
  }

  // Start with base points
  let points = basePoints;

  // Deduct 1 point for each attempt after the first
  points -= (attempts - 1);

  // Anti-cheat: Deduct 2 points if solved too quickly
  if (timeSpent < minSolveTime) {
    points -= 2;
  }

  // Ensure minimum of 5 points for correct answer
  return Math.max(points, 5);
}

/**
 * Calculate bonus points for streaks
 * @param {number} currentStreak - Current solving streak in days
 * @returns {number} Bonus points
 */
function calculateStreakBonus(currentStreak) {
  if (currentStreak >= 30) return 50;
  if (currentStreak >= 14) return 25;
  if (currentStreak >= 7) return 10;
  if (currentStreak >= 3) return 5;
  return 0;
}

/**
 * Determine user's league based on points
 * @param {number} points - Total points
 * @returns {string} League name
 */
function determineLeague(points) {
  if (points >= 10000) return 'Grandmaster';
  if (points >= 5000) return 'Master';
  if (points >= 2500) return 'Diamond';
  if (points >= 1000) return 'Platinum';
  if (points >= 500) return 'Gold';
  if (points >= 200) return 'Silver';
  return 'Bronze';
}

/**
 * Calculate time penalty for aborting a problem
 * @returns {number} Points deducted
 */
function abortPenalty() {
  return -3;
}

module.exports = {
  calculatePoints,
  calculateStreakBonus,
  determineLeague,
  abortPenalty,
};
