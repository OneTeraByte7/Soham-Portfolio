import { experiences } from '../data/experiences';
import { Router } from '../utils/router';
import type { Experience } from '../types';

export class ExperienceSection {
  private router: Router;

  constructor() {
    this.router = Router.getInstance();
  }

  renderTo(container: HTMLElement): void {
    const html = `
      <section class="relative py-32 overflow-hidden backdrop-blur-xl bg-gradient-to-br from-indigo-50/80 via-purple-50/80 to-pink-50/80 dark:from-gray-900/90 dark:via-purple-900/30 dark:to-indigo-900/30">
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Header -->
          <div class="mb-16 animate-fade-in">
            <h2 class="text-4xl md:text-5xl font-bold mb-4">
              <span class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Work Experience
              </span>
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400">
              Professional journey and key contributions
            </p>
          </div>

          <!-- Experience Cards -->
          <div class="space-y-8">
            ${experiences.map((exp, index) => this.renderCard(exp, index)).join('')}
          </div>
        </div>
      </section>
    `;

    container.innerHTML = html;
    this.attachEventListeners();
  }

  private renderCard(experience: Experience, index: number): string {
    const gradientColors = [
      'from-blue-500/20 via-cyan-500/20 to-purple-500/20',
      'from-purple-500/20 via-pink-500/20 to-orange-500/20',
      'from-green-500/20 via-teal-500/20 to-blue-500/20',
      'from-pink-500/20 via-rose-500/20 to-red-500/20'
    ];

    const borderColors = [
      'hover:border-blue-500/50 hover:shadow-blue-500/30',
      'hover:border-purple-500/50 hover:shadow-purple-500/30',
      'hover:border-green-500/50 hover:shadow-green-500/30',
      'hover:border-pink-500/50 hover:shadow-pink-500/30'
    ];

    const gradient = gradientColors[index % gradientColors.length];
    const borderColor = borderColors[index % borderColors.length];
    const delay = `animation-delay-${index * 200}`;

    return `
      <div
        class="experience-card group p-8 backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 rounded-2xl border-2 border-white/40 dark:border-gray-700/40 ${borderColor} hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 cursor-pointer relative overflow-hidden animate-fade-in ${delay}"
        data-experience-id="${experience.id}"
      >
        <!-- Animated Gradient Background -->
        <div class="absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <!-- Glow Effect -->
        <div class="absolute -inset-1 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-500 -z-10"></div>

        <div class="relative">
          <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <!-- Left: Role & Company -->
            <div class="flex-1">
              <h3 class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
                ${experience.role}
              </h3>
              <p class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">${experience.company}</p>
              <div class="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/></svg>
                  ${experience.duration}
                </span>
                <span>•</span>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/></svg>
                  ${experience.location}
                </span>
                <span>•</span>
                <span class="px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold capitalize">
                  ${experience.type}
                </span>
              </div>
            </div>
          </div>

          <!-- Responsibilities Preview -->
          <div class="mb-6">
            <ul class="space-y-3 text-gray-700 dark:text-gray-300">
              ${experience.responsibilities.slice(0, 2).map(resp => `
                <li class="flex items-start gap-2 group-hover:translate-x-1 transition-transform duration-300">
                  <svg class="w-5 h-5 text-blue-500 dark:text-cyan-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                  <span>${resp}</span>
                </li>
              `).join('')}
              ${experience.responsibilities.length > 2 ? `
                <li class="text-sm text-blue-600 dark:text-cyan-400 font-medium ml-7">
                  +${experience.responsibilities.length - 2} more responsibilities →
                </li>
              ` : ''}
            </ul>
          </div>

          <!-- Skills -->
          <div class="flex flex-wrap gap-2 mt-4">
            ${experience.skills.slice(0, 6).map(skill => `
              <span class="px-3 py-1 text-xs font-medium rounded-lg backdrop-blur-xl bg-white/50 dark:bg-gray-700/50 border border-gray-300/50 dark:border-gray-600/50 text-gray-700 dark:text-gray-300 hover:scale-110 transition-transform duration-200">
                ${skill}
              </span>
            `).join('')}
            ${experience.skills.length > 6 ? `
              <span class="px-3 py-1 text-xs font-medium rounded-lg text-blue-600 dark:text-cyan-400">
                +${experience.skills.length - 6} more
              </span>
            ` : ''}
          </div>
        </div>

        <!-- Click Indicator -->
        <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            View Details
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </span>
        </div>
      </div>
    `;
  }

  private attachEventListeners(): void {
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach(card => {
      card.addEventListener('click', () => {
        const experienceId = (card as HTMLElement).dataset.experienceId;
        if (experienceId) {
          this.router.navigate(`/experience/${experienceId}`);
        }
      });
    });
  }
}
