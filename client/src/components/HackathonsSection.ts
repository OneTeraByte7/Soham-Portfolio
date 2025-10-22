import { hackathons } from '../data/hackathons';
import type { Hackathon } from '../types';

export class HackathonsSection {
  renderTo(container: HTMLElement): void {
    const html = `
      <section class="relative py-20 overflow-hidden">
        <!-- Animated background blobs -->
        <div class="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none">
          <div class="absolute top-0 right-1/4 w-96 h-96 bg-cyber-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-glow-pulse"></div>
          <div class="absolute bottom-0 left-1/4 w-96 h-96 bg-cyber-green-500 rounded-full mix-blend-multiply filter blur-3xl animate-glow-pulse animation-delay-2000"></div>
        </div>

        <!-- Content -->
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Header -->
          <div class="text-center mb-16 animate-fade-in">
            <h2 class="text-5xl md:text-6xl font-bold mb-4">
              <span class="bg-gradient-cyber bg-clip-text text-transparent animate-gradient-x">
                Hackathon Experience
              </span>
            </h2>
            <div class="h-1 w-32 mx-auto bg-gradient-ocean rounded-full"></div>
            <p class="mt-6 text-lg text-gray-600 dark:text-gray-400">
              Achievements and innovations from competitive hackathons
            </p>
          </div>

          <!-- Hackathon Cards -->
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${hackathons.map((hackathon, index) => this.renderCard(hackathon, index)).join('')}
          </div>
        </div>
      </section>
    `;

    container.innerHTML = html;
  }

  private renderCard(hackathon: Hackathon, index: number): string {
    const colorClasses: Record<string, { gradient: string; shadow: string; border: string }> = {
      'cyber-blue': {
        gradient: 'from-cyber-blue-500 to-cyber-blue-700',
        shadow: 'shadow-neon-blue',
        border: 'border-cyber-blue-500/20'
      },
      'cyber-green': {
        gradient: 'from-cyber-green-500 to-cyber-green-700',
        shadow: 'shadow-neon-green',
        border: 'border-cyber-green-500/20'
      },
      'cyber-purple': {
        gradient: 'from-cyber-purple-500 to-cyber-purple-700',
        shadow: 'shadow-neon-purple',
        border: 'border-cyber-purple-500/20'
      },
      'cyber-orange': {
        gradient: 'from-cyber-orange-500 to-cyber-orange-700',
        shadow: 'shadow-neon-orange',
        border: 'border-cyber-orange-500/20'
      }
    };

    const colors = colorClasses[hackathon.color] || colorClasses['cyber-blue'];

    return `
      <div class="group relative animate-slide-in" style="animation-delay: ${index * 150}ms">
        <!-- Card -->
        <div class="relative h-full backdrop-blur-xl bg-white/70 dark:bg-dark-elevated/70 rounded-2xl border border-light-border dark:border-dark-border overflow-hidden transition-all duration-500 hover:scale-105 hover:${colors.shadow}">
          <!-- Gradient overlay on hover -->
          <div class="absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

          <!-- Content -->
          <div class="relative p-8">
            <!-- Icon & Achievement Badge -->
            <div class="flex items-start justify-between mb-6">
              <div class="relative w-20 h-20 rounded-xl bg-gradient-to-br ${colors.gradient} p-0.5 ${colors.shadow}">
                <div class="w-full h-full rounded-xl bg-white dark:bg-dark-elevated flex items-center justify-center overflow-hidden p-2">
                  <img
                    src="${hackathon.icon}"
                    alt="${hackathon.name}"
                    class="w-full h-full object-contain"
                    onerror="this.style.display='none'; this.parentElement.innerHTML='<svg class=\\'w-10 h-10 text-${hackathon.color}\\' fill=\\'none\\' stroke=\\'currentColor\\' viewBox=\\'0 0 24 24\\'><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' stroke-width=\\'2\\' d=\\'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z\\'></path></svg>'"
                  />
                </div>
              </div>

              <div class="px-4 py-2 rounded-full bg-gradient-to-r ${colors.gradient} text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                ${hackathon.achievement}
              </div>
            </div>

            <!-- Hackathon Name -->
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              ${hackathon.name}
            </h3>

            <!-- Position & Date -->
            <div class="flex items-center gap-2 mb-4">
              <span class="text-${hackathon.color} font-semibold">${hackathon.position}</span>
              <span class="text-gray-400">•</span>
              <span class="text-gray-600 dark:text-gray-400">${hackathon.date}</span>
            </div>

            <!-- Description -->
            <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              ${hackathon.description}
            </p>

            <!-- Project -->
            <div class="p-4 rounded-xl bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg ${colors.border}">
              <div class="flex items-center gap-2 text-sm">
                <svg class="w-5 h-5 text-${hackathon.color}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <span class="font-semibold text-gray-700 dark:text-gray-300">Project:</span>
                <span class="text-gray-600 dark:text-gray-400">${hackathon.project}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
