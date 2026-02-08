// Utility Functions for the Platform

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { League, SubLeague, LeagueInfo } from '@/types';

/**
 * Merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format time duration in seconds to human-readable format
 */
export function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }
}

/**
 * Format points with K, M suffix
 */
export function formatPoints(points: number): string {
  if (points < 1000) {
    return points.toString();
  } else if (points < 1000000) {
    return `${(points / 1000).toFixed(1)}K`;
  } else {
    return `${(points / 1000000).toFixed(1)}M`;
  }
}

/**
 * Calculate league and sub-league based on points
 */
export function calculateLeague(points: number): { league: League; subLeague: SubLeague } {
  if (points < 200) {
    // Bronze: 0-200, 5 sub-tiers of 40 points each
    const subLeagueIndex = Math.floor(points / 40);
    const subLeagues: SubLeague[] = ['V', 'IV', 'III', 'II', 'I'];
    return { league: 'Bronze', subLeague: subLeagues[subLeagueIndex] || 'V' };
  } else if (points < 400) {
    // Silver: 201-400
    const subLeagueIndex = Math.floor((points - 200) / 40);
    const subLeagues: SubLeague[] = ['V', 'IV', 'III', 'II', 'I'];
    return { league: 'Silver', subLeague: subLeagues[subLeagueIndex] || 'V' };
  } else if (points < 600) {
    // Gold: 401-600
    const subLeagueIndex = Math.floor((points - 400) / 40);
    const subLeagues: SubLeague[] = ['V', 'IV', 'III', 'II', 'I'];
    return { league: 'Gold', subLeague: subLeagues[subLeagueIndex] || 'V' };
  } else if (points < 800) {
    // Diamond: 601-800
    const subLeagueIndex = Math.floor((points - 600) / 40);
    const subLeagues: SubLeague[] = ['V', 'IV', 'III', 'II', 'I'];
    return { league: 'Diamond', subLeague: subLeagues[subLeagueIndex] || 'V' };
  } else if (points < 1000) {
    // Master: 801-1000
    const subLeagueIndex = Math.floor((points - 800) / 40);
    const subLeagues: SubLeague[] = ['V', 'IV', 'III', 'II', 'I'];
    return { league: 'Master', subLeague: subLeagues[subLeagueIndex] || 'V' };
  } else {
    // Conqueror: 1000+, tiers of 100 points
    const tierNumber = Math.floor((points - 1000) / 100) + 1;
    // Convert to Roman numeral for display (I, II, III, IV, V, etc.)
    const subLeague = convertToRomanNumeral(tierNumber) as SubLeague;
    return { league: 'Conqueror', subLeague };
  }
}

/**
 * Convert number to Roman numeral
 */
function convertToRomanNumeral(num: number): string {
  if (num <= 5) {
    const romans = ['', 'I', 'II', 'III', 'IV', 'V'];
    return romans[num] || 'I';
  }
  return num.toString(); // For Conqueror, use numbers after V
}

/**
 * Get league color
 */
export function getLeagueColor(league: League): string {
  const colors: Record<League, string> = {
    Bronze: '#CD7F32',
    Silver: '#C0C0C0',
    Gold: '#FFD700',
    Diamond: '#B9F2FF',
    Master: '#9932CC',
    Conqueror: '#FF0000',
  };
  return colors[league];
}

/**
 * Get league info including points range
 */
export function getLeagueInfo(league: League, subLeague: SubLeague): LeagueInfo {
  const leagueRanges: Record<League, { min: number; max: number }> = {
    Bronze: { min: 0, max: 200 },
    Silver: { min: 200, max: 400 },
    Gold: { min: 400, max: 600 },
    Diamond: { min: 600, max: 800 },
    Master: { min: 800, max: 1000 },
    Conqueror: { min: 1000, max: Infinity },
  };

  const range = leagueRanges[league];
  const subLeagueValue = ['V', 'IV', 'III', 'II', 'I'].indexOf(subLeague);
  
  let minPoints = range.min;
  let maxPoints = range.max;
  
  if (league !== 'Conqueror') {
    const tierSize = (range.max - range.min) / 5;
    minPoints = range.min + subLeagueValue * tierSize;
    maxPoints = minPoints + tierSize;
  }

  return {
    league,
    subLeague,
    minPoints,
    maxPoints,
    color: getLeagueColor(league),
    icon: `league-${league.toLowerCase()}`,
  };
}

/**
 * Calculate points for a problem submission
 */
export function calculatePoints(
  attemptNumber: number,
  tooFast: boolean,
  aborted: boolean = false
): number {
  if (aborted) {
    return -3;
  }

  let points = 10; // Base points

  // Deduct points for too fast submission
  if (tooFast) {
    points -= 2;
  }

  // Deduct 1 point per attempt after first
  if (attemptNumber > 1) {
    points -= attemptNumber - 1;
  }

  // Minimum 5 points
  return Math.max(points, 5);
}

/**
 * Check if submission was too fast
 */
export function isTooFast(solveTime: number, minSolveTime: number): boolean {
  return solveTime < minSolveTime;
}

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(diffInSeconds / 31536000);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Generate random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Sleep/delay function
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Calculate password strength (0-4)
 */
export function calculatePasswordStrength(password: string): number {
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  
  return Math.min(strength, 4);
}

/**
 * Get difficulty color
 */
export function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    Easy: '#10B981',
    Medium: '#F97316',
    Hard: '#EF4444',
  };
  return colors[difficulty] || '#64748B';
}

/**
 * Truncate text
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Copy to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}

/**
 * Check if user is online (within last 5 minutes)
 */
export function isUserOnline(lastActive: Date | undefined): boolean {
  if (!lastActive) return false;
  const now = new Date();
  const diffInMinutes = (now.getTime() - lastActive.getTime()) / 60000;
  return diffInMinutes < 5;
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
  else return (bytes / 1073741824).toFixed(1) + ' GB';
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

/**
 * Sanitize HTML (basic XSS prevention)
 */
export function sanitizeHtml(html: string): string {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}
