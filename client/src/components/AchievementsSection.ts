import { codingAchievements } from '../data/achievements';
import { Tilt3D } from '../utils/tilt';
import { MagneticEffect } from '../utils/magnetic';
import type { Achievement } from '../types';

export class AchievementsSection {
  private tiltInstances: Tilt3D[] = [];
  private magneticInstances: MagneticEffect[] = [];

  renderTo(container: HTMLElement): void {
    // Cleanup previous instances
    this.cleanup();

    const html = `
      <section class="relative py-32 overflow-hidden bg-gradient-to-br from-gray-950 via-emerald-950 to-teal-950">
        <!-- Animated Background -->
        <div class="absolute inset-0">
          <div class="absolute top-[20%] right-[15%] w-[400px] h-[400px] bg-gradient-to-br from-emerald-500/20 to-teal-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div class="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-gradient-to-tl from-green-500/20 to-cyan-500/10 rounded-full filter blur-3xl animate-pulse-slower"></div>
        </div>

        <!-- Content -->
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Header -->
          <div class="text-center mb-20 animate-fade-in">
            <h2 class="text-5xl md:text-6xl font-black mb-6">
              <span class="bg-gradient-to-r from-emerald-300 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Coding Achievements
              </span>
            </h2>
            <div class="flex items-center justify-center gap-2 mb-6">
              <div class="h-1 w-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
              <div class="h-1 w-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
              <div class="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
            </div>
            <p class="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
              <span class="font-bold text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text">1250+ problems solved</span> across competitive programming platforms
            </p>
          </div>

          <!-- Achievement Cards -->
          <div class="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            ${codingAchievements.map((achievement, index) => this.renderCard(achievement, index)).join('')}
          </div>
        </div>
      </section>
    `;

    container.innerHTML = html;
    this.initializeEffects();
  }

  private cleanup(): void {
    this.tiltInstances.forEach(instance => instance.destroy());
    this.magneticInstances.forEach(instance => instance.destroy());
    this.tiltInstances = [];
    this.magneticInstances = [];
  }

  private renderCard(achievement: Achievement, index: number): string {
    const gradients: Record<string, string> = {
      gfg: 'from-green-500 via-emerald-500 to-teal-500',
      leetcode: 'from-orange-500 via-amber-500 to-yellow-500',
      codeforces: 'from-blue-500 via-cyan-500 to-teal-500'
    };

    const bgColors: Record<string, string> = {
      gfg: 'bg-green-500/10',
      leetcode: 'bg-orange-500/10',
      codeforces: 'bg-blue-500/10'
    };

    const names: Record<string, string> = {
      gfg: 'GeeksforGeeks',
      leetcode: 'LeetCode',
      codeforces: 'Codeforces'
    };

    const staggerClass = `stagger-delay-${(index % 3) + 1}`;

    return `
      <a
        href="${achievement.profileUrl}"
        target="_blank"
        rel="noopener noreferrer"
        class="achievement-card group relative block animate-stagger ${staggerClass}"
        style="opacity: 0; transform-style: preserve-3d;"
      >
        <!-- Card -->
        <div class="relative h-full backdrop-blur-2xl bg-gray-900/90 border-2 border-gray-800/50 rounded-3xl overflow-hidden shadow-2xl hover-lift hover:border-${achievement.platform === 'gfg' ? 'emerald' : achievement.platform === 'leetcode' ? 'orange' : 'cyan'}-500/50 transition-all duration-500">
          <!-- Animated Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-br ${gradients[achievement.platform]} opacity-0 group-hover:opacity-10 transition-all duration-700"></div>

          <!-- Shimmer Effect -->
          <div class="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <!-- Glow Border -->
          <div class="absolute -inset-1 bg-gradient-to-r ${gradients[achievement.platform]} rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-700 -z-10"></div>

          <!-- Content -->
          <div class="relative p-8">
            <!-- Logo Section -->
            <div class="mb-8">
              <div class="relative inline-block">
                <!-- Glow Ring -->
                <div class="absolute -inset-4 bg-gradient-to-r ${gradients[achievement.platform]} rounded-2xl opacity-0 group-hover:opacity-40 blur-xl transition-all duration-500"></div>

                <!-- Logo Container -->
                <div class="relative w-24 h-24 rounded-2xl bg-gradient-to-br ${gradients[achievement.platform]} p-1 shadow-2xl magnetic-btn">
                  <div class="w-full h-full rounded-2xl bg-gray-950 flex items-center justify-center overflow-hidden p-3">
                    <img
                      src="${achievement.icon}"
                      alt="${names[achievement.platform]}"
                      class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      onerror="this.style.display='none'"
                    />
                  </div>
                </div>

                <!-- External Link Icon -->
                <div class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r ${gradients[achievement.platform]} flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Platform Name -->
            <h3 class="text-3xl font-black bg-gradient-to-r ${gradients[achievement.platform]} bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-500">
              ${names[achievement.platform]}
            </h3>
            <p class="text-lg font-bold text-gray-300 mb-8">@${achievement.username}</p>

            <!-- Stats Grid -->
            <div class="space-y-4">
              ${this.renderStats(achievement, gradients[achievement.platform], bgColors[achievement.platform])}
            </div>

            <!-- Visit CTA -->
            <div class="mt-8 text-center">
              <div class="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r ${gradients[achievement.platform]} text-white font-bold group-hover:gap-5 transition-all duration-500 shadow-lg hover-glow magnetic-btn">
                View Profile
                <svg class="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </a>
    `;
  }

  private renderStats(achievement: Achievement, gradient: string, bgColor: string): string {
    const stats = [];

    if (achievement.stats.problemsSolved) {
      stats.push(`
        <div class="flex items-center justify-between p-4 rounded-2xl ${bgColor} backdrop-blur-xl border border-gray-700/30 hover:scale-105 transition-transform duration-300">
          <span class="text-gray-300 font-bold flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            Problems
          </span>
          <span class="text-2xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent">${achievement.stats.problemsSolved}</span>
        </div>
      `);
    }

    if (achievement.stats.score) {
      stats.push(`
        <div class="flex items-center justify-between p-4 rounded-2xl ${bgColor} backdrop-blur-xl border border-gray-700/30 hover:scale-105 transition-transform duration-300">
          <span class="text-gray-300 font-bold flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            Score
          </span>
          <span class="text-2xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent">${achievement.stats.score}</span>
        </div>
      `);
    }

    if (achievement.stats.rating) {
      stats.push(`
        <div class="flex items-center justify-between p-4 rounded-2xl ${bgColor} backdrop-blur-xl border border-gray-700/30 hover:scale-105 transition-transform duration-300">
          <span class="text-gray-300 font-bold flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
            </div>
            Rating
          </span>
          <span class="text-2xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent">${achievement.stats.rating}</span>
        </div>
      `);
    }

    if (achievement.stats.streak) {
      stats.push(`
        <div class="flex items-center justify-between p-4 rounded-2xl ${bgColor} backdrop-blur-xl border border-gray-700/30 hover:scale-105 transition-transform duration-300">
          <span class="text-gray-300 font-bold flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/>
              </svg>
            </div>
            Streak
          </span>
          <span class="text-2xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">${achievement.stats.streak} days</span>
        </div>
      `);
    }

    if (achievement.stats.badges) {
      stats.push(`
        <div class="flex items-center justify-between p-4 rounded-2xl ${bgColor} backdrop-blur-xl border border-white/20 dark:border-gray-700/20 hover:scale-105 transition-transform duration-300">
          <span class="text-gray-700 dark:text-gray-300 font-bold flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
              </svg>
            </div>
            Badges
          </span>
          <span class="text-2xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent">${achievement.stats.badges}</span>
        </div>
      `);
    }

    return stats.join('');
  }

  private initializeEffects(): void {
    // Initialize 3D tilt on achievement cards
    const achievementCards = document.querySelectorAll<HTMLElement>('.achievement-card');
    achievementCards.forEach(card => {
      const tilt = new Tilt3D(card, {
        max: 12,
        perspective: 1500,
        scale: 1.03,
        speed: 400,
        glare: true,
        maxGlare: 0.4
      });
      this.tiltInstances.push(tilt);
    });

    // Initialize magnetic effect on buttons
    const magneticBtns = document.querySelectorAll<HTMLElement>('.magnetic-btn');
    magneticBtns.forEach(btn => {
      const magnetic = new MagneticEffect(btn, {
        strength: 0.3,
        radius: 100,
        smoothness: 0.18
      });
      this.magneticInstances.push(magnetic);
    });
  }
}
