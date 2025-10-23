import { hackathons } from '../data/hackathons';
import { Router } from '../utils/router';
import type { Hackathon } from '../types';

export class HackathonsSection {
  private router: Router;

  constructor() {
    this.router = Router.getInstance();
  }

  renderTo(container: HTMLElement): void {
    const html = `
      <section class="relative py-32 overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 dark:from-gray-900 dark:via-rose-900/20 dark:to-orange-900/20">
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Header -->
          <div class="mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-4">
              <span class="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                Hackathon Experience
              </span>
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400">
              Achievements and innovations from competitive hackathons
            </p>
          </div>

          <!-- Hackathon Cards -->
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${hackathons.map(hackathon => this.renderCard(hackathon)).join('')}
          </div>
        </div>
      </section>
    `;

    container.innerHTML = html;
    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    const hackathonCards = document.querySelectorAll('.hackathon-card');
    hackathonCards.forEach(card => {
      card.addEventListener('click', () => {
        const hackathonId = (card as HTMLElement).dataset.hackathonId;
        if (hackathonId) {
          this.router.navigate(`/hackathon/${hackathonId}`);
        }
      });
    });
  }

  private renderCard(hackathon: Hackathon): string {
    return `
      <div class="hackathon-card group p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-transparent hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300 cursor-pointer relative overflow-hidden" data-hackathon-id="${hackathon.id}">
        <div class="absolute inset-0 bg-gradient-to-r from-pink-600/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="relative">
        <!-- Achievement Badge -->
        <div class="mb-4">
          <span class="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-pink-600 to-orange-600 text-white text-xs font-semibold uppercase tracking-wider shadow-lg">
            ${hackathon.achievement}
          </span>
        </div>

        <!-- Hackathon Name -->
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          ${hackathon.name}
        </h3>

        <!-- Position & Date -->
        <div class="flex items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <span class="font-semibold">${hackathon.position}</span>
          <span>•</span>
          <span>${hackathon.date}</span>
        </div>

        <!-- Description -->
        <p class="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2">
          ${hackathon.description}
        </p>

        <!-- Project -->
        <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p class="text-sm text-gray-500 dark:text-gray-500">
            <span class="font-semibold">Project:</span> ${hackathon.project}
          </p>
        </div>
        </div>
      </div>
    `;
  }
}
