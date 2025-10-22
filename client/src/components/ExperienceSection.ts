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
      <section class="relative py-32 overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Header -->
          <div class="mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-4">
              <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Work Experience
              </span>
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400">
              Professional journey and key contributions
            </p>
          </div>

          <!-- Experience Cards -->
          <div class="space-y-6">
            ${experiences.map(exp => this.renderCard(exp)).join('')}
          </div>
        </div>
      </section>
    `;

    container.innerHTML = html;
    this.attachEventListeners();
  }

  private renderCard(experience: Experience): string {
    return `
      <div
        class="experience-card group p-8 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-transparent hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer relative overflow-hidden"
        data-experience-id="${experience.id}"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="relative">
        <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <!-- Left: Role & Company -->
          <div class="flex-1">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              ${experience.role}
            </h3>
            <p class="text-lg text-gray-600 dark:text-gray-400 mb-2">${experience.company}</p>
            <div class="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-500">
              <span>${experience.duration}</span>
              <span>•</span>
              <span>${experience.location}</span>
              <span>•</span>
              <span class="capitalize">${experience.type}</span>
            </div>
          </div>
        </div>

        <!-- Responsibilities Preview -->
        <div class="mb-6">
          <ul class="space-y-2 text-gray-600 dark:text-gray-400">
            ${experience.responsibilities.slice(0, 2).map(resp => `
              <li>• ${resp}</li>
            `).join('')}
            ${experience.responsibilities.length > 2 ? `
              <li class="text-sm text-gray-500">+${experience.responsibilities.length - 2} more</li>
            ` : ''}
          </ul>
        </div>

        <!-- Skills -->
        <div class="text-sm text-gray-500 dark:text-gray-500">
          ${experience.skills.join(' • ')}
        </div>
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
