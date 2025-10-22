import type { Achievement } from '../types';

export const codingAchievements: Achievement[] = [
  {
    platform: 'gfg',
    username: 'suryawansduut',
    stats: {
      problemsSolved: 575,
      score: 2220,
      rank: 'Newbie',
      streak: 658 ,
      
    },
    profileUrl: 'https://www.geeksforgeeks.org/user/suryawansduut/',
    icon: '/images/achieve/gfg-logo.png'
  },
  {
    platform: 'leetcode',
    username: 'OneTeraByte13',
    stats: {
      problemsSolved: 657,
      rank: 'Newbie',
      streak: 350,
      badges: 26
    },
    profileUrl: 'https://leetcode.com/u/OneTeraByte13/',
    icon: '/images/achieve/leetcode-logo.png'
  },
  {
    platform: 'codeforces',
    username: 'suryawanshisoham7',
    stats: {
      problemsSolved: 20,
      rating: 664,
      rank: 'Newbie'
    },
    profileUrl: 'https://codeforces.com/profile/suryawanshisoham7',
    icon: '/images/achieve/codeforces-logo.png'
  }
];
