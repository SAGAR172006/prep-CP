import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d);
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }
  return `${secs}s`;
}

export function formatPoints(points: number): string {
  if (points >= 1000) {
    return `${(points / 1000).toFixed(1)}k`;
  }
  return points.toString();
}

export function calculateLeague(points: number): {
  league: string;
  subLeague: string;
  min: number;
  max: number;
} {
  const leagues = [
    { name: 'Bronze', min: 0, max: 200 },
    { name: 'Silver', min: 201, max: 400 },
    { name: 'Gold', min: 401, max: 600 },
    { name: 'Diamond', min: 601, max: 800 },
    { name: 'Master', min: 801, max: 1000 },
  ];

  // Find league
  const league = leagues.find((l) => points >= l.min && points <= l.max);
  
  if (!league) {
    // Conqueror league (1000+)
    const tier = Math.floor((points - 1000) / 100) + 1;
    return {
      league: 'Conqueror',
      subLeague: toRoman(tier),
      min: 1000 + (tier - 1) * 100,
      max: 1000 + tier * 100,
    };
  }

  // Calculate sub-league (V, IV, III, II, I)
  const range = league.max - league.min;
  const subRange = range / 5;
  const relativePoints = points - league.min;
  const subTier = 5 - Math.floor(relativePoints / subRange);
  
  return {
    league: league.name,
    subLeague: toRoman(Math.max(1, subTier)),
    min: league.min + Math.floor(relativePoints / subRange) * subRange,
    max: league.min + (Math.floor(relativePoints / subRange) + 1) * subRange,
  };
}

function toRoman(num: number): string {
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  return romanNumerals[num - 1] || 'I';
}

export function calculatePoints(
  basePoints: number,
  attempts: number,
  isFast: boolean
): number {
  let points = basePoints;
  
  if (isFast) {
    points -= 2;
  }
  
  if (attempts > 1) {
    points -= (attempts - 1);
  }
  
  return Math.max(5, points);
}

export function getRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return formatDate(d);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
