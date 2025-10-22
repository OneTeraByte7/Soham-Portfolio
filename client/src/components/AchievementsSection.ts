import { codingAchievements } from '../data/achievements';
import type { Achievement } from '../types';

export class AchievementsSection {
  renderTo(container: HTMLElement): void {
    const html = `
      <section class="relative py-20 overflow-hidden bg-gradient-to-br from-light-bg via-light-surface to-light-bg dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg">
        <!-- Animated background blobs -->
        <div class="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none">
          <div class="absolute top-0 left-1/4 w-96 h-96 bg-cyber-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-glow-pulse"></div>
          <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-cyber-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-glow-pulse animation-delay-2000"></div>
          <div class="absolute bottom-0 left-1/2 w-96 h-96 bg-cyber-green-500 rounded-full mix-blend-multiply filter blur-3xl animate-glow-pulse animation-delay-4000"></div>
        </div>

        <!-- Content -->
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Header -->
          <div class="text-center mb-16 animate-fade-in">
            <h2 class="text-5xl md:text-6xl font-bold mb-4">
              <span class="bg-gradient-cyber bg-clip-text text-transparent animate-gradient-x">
                Coding Achievements
              </span>
            </h2>
            <div class="h-1 w-32 mx-auto bg-gradient-ocean rounded-full"></div>
            <p class="mt-6 text-lg text-gray-600 dark:text-gray-400">
              My competitive programming journey across multiple platforms
            </p>
          </div>

          <!-- Achievement Cards -->
          <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            ${codingAchievements.map((achievement, index) => this.renderCard(achievement, index)).join('')}
          </div>
        </div>
      </section>
    `;

    container.innerHTML = html;
  }

  private renderCard(achievement: Achievement, index: number): string {
    const gradients: Record<string, string> = {
      gfg: 'from-cyber-green-500 to-cyber-green-700',
      leetcode: 'from-cyber-orange-500 to-cyber-orange-700',
      codeforces: 'from-cyber-blue-500 to-cyber-blue-700'
    };

    const shadows: Record<string, string> = {
      gfg: 'shadow-neon-green',
      leetcode: 'shadow-neon-orange',
      codeforces: 'shadow-neon-blue'
    };

    const names: Record<string, string> = {
      gfg: 'GeeksforGeeks',
      leetcode: 'LeetCode',
      codeforces: 'Codeforces'
    };

    return `
      <a
        href="${achievement.profileUrl}"
        target="_blank"
        rel="noopener noreferrer"
        class="group relative block animate-slide-in"
        style="animation-delay: ${index * 150}ms"
      >
        <!-- Card -->
        <div class="relative h-full backdrop-blur-xl bg-white/70 dark:bg-dark-elevated/70 rounded-2xl border border-light-border dark:border-dark-border overflow-hidden transition-all duration-500 hover:scale-105 hover:${shadows[achievement.platform]}">
          <!-- Gradient overlay on hover -->
          <div class="absolute inset-0 bg-gradient-to-br ${gradients[achievement.platform]} opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

          <!-- Content -->
          <div class="relative p-8">
            <!-- Logo & External Link -->
            <div class="flex items-center justify-between mb-6">
              <div class="relative w-20 h-20 rounded-xl bg-gradient-to-br ${gradients[achievement.platform]} p-0.5 ${shadows[achievement.platform]}">
                <div class="w-full h-full rounded-xl bg-white dark:bg-dark-elevated flex items-center justify-center overflow-hidden p-2">
                  <img
                    src="${achievement.icon}"
                    alt="${names[achievement.platform]}"
                    class="w-full h-full object-contain"
                    onerror="this.style.display='none'"
                  />
                </div>
              </div>

              <svg class="w-6 h-6 text-gray-400 dark:text-gray-600 group-hover:text-cyber-blue-500 dark:group-hover:text-cyber-blue-400 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </div>

            <!-- Platform Name -->
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              ${names[achievement.platform]}
            </h3>
            <p class="text-cyber-blue-600 dark:text-cyber-blue-400 font-semibold mb-6">@${achievement.username}</p>

            <!-- Stats -->
            <div class="space-y-3">
              ${this.renderStats(achievement, gradients[achievement.platform])}
            </div>

            <!-- CTA -->
            <div class="mt-6 text-center">
              <span class="inline-flex items-center gap-2 text-cyber-blue-600 dark:text-cyber-blue-400 font-semibold group-hover:gap-3 transition-all duration-300">
                Visit Profile
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </a>
    `;
  }

  private renderStats(achievement: Achievement, gradient: string): string {
    const stats = [];

    if (achievement.stats.problemsSolved) {
      stats.push(`
        <div class="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg">
          <span class="text-gray-600 dark:text-gray-400 font-medium flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Problems
          </span>
          <span class="text-lg font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent">${achievement.stats.problemsSolved}</span>
        </div>
      `);
    }

    if (achievement.stats.score) {
      stats.push(`
        <div class="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg">
          <span class="text-gray-600 dark:text-gray-400 font-medium flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            Score
          </span>
          <span class="text-lg font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent">${achievement.stats.score}</span>
        </div>
      `);
    }

    if (achievement.stats.rating) {
      stats.push(`
        <div class="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg">
          <span class="text-gray-600 dark:text-gray-400 font-medium flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
            Rating
          </span>
          <span class="text-lg font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent">${achievement.stats.rating}</span>
        </div>
      `);
    }

    if (achievement.stats.rank) {
      stats.push(`
        <div class="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg">
          <span class="text-gray-600 dark:text-gray-400 font-medium flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
            Rank
          </span>
          <span class="text-lg font-bold text-gray-900 dark:text-white">${achievement.stats.rank}</span>
        </div>
      `);
    }

    if (achievement.stats.streak) {
      stats.push(`
        <div class="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg">
          <span class="text-gray-600 dark:text-gray-400 font-medium flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"/>
            </svg>
            Streak
          </span>
          <span class="text-lg font-bold text-cyber-orange-500 dark:text-cyber-orange-400">${achievement.stats.streak} days</span>
        </div>
      `);
    }

    if (achievement.stats.badges) {
      stats.push(`
        <div class="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg">
          <span class="text-gray-600 dark:text-gray-400 font-medium flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>
            Badges
          </span>
          <span class="text-lg font-bold text-gray-900 dark:text-white">${achievement.stats.badges}</span>
        </div>
      `);
    }

    return stats.join('');
  }
}
