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
      <section class="relative py-32 overflow-hidden bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-orange-900/20 dark:to-pink-900/20">
        <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Header -->
          <div class="text-center mb-20">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 mb-6">
              <svg class="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span class="text-sm font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider">The Journey</span>
            </div>
            <h2 class="text-4xl md:text-5xl font-bold mb-4">
              <span class="bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Hackathon Milestones
              </span>
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A journey of innovation, competition, and achievement across major hackathons
            </p>
          </div>

          <!-- Timeline Journey -->
          <div class="relative">
            <!-- Timeline Line (Left Side - Desktop) -->
            <div class="hidden md:block absolute left-3 top-0 w-0.5 h-full bg-gradient-to-b from-orange-300 via-pink-300 to-purple-300 dark:from-orange-600 dark:via-pink-600 dark:to-purple-600"></div>

            <!-- Timeline Line (Left Side - Mobile) -->
            <div class="md:hidden absolute left-2.5 top-0 w-0.5 h-full bg-gradient-to-b from-orange-300 via-pink-300 to-purple-300 dark:from-orange-600 dark:via-pink-600 dark:to-purple-600"></div>

            <!-- Hackathon Milestones -->
            ${hackathons.map((hackathon, index) => this.renderMilestone(hackathon, index)).join('')}
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
          this.router.navigate(`/hackathon/${hackathonId}`, { from: 'hackathons' });
        }
      });
    });
  }

  private renderMilestone(hackathon: Hackathon, index: number): string {
    const gradientColors = index % 2 === 0
      ? 'from-orange-600 to-pink-600'
      : 'from-pink-600 to-purple-600';

    return `
      <div class="relative mb-12 md:mb-16">
        <!-- Desktop Layout (Timeline Left, Content Right) -->
        <div class="hidden md:flex items-start gap-8">
          <!-- Timeline Milestone Marker (Left Side) -->
          <div class="flex-shrink-0 pt-2">
            <div class="relative">
              <!-- Static Outer Ring -->
              <div class="w-6 h-6 rounded-full bg-gradient-to-r ${gradientColors} flex items-center justify-center">
                <!-- Inner Circle -->
                <div class="w-3 h-3 rounded-full bg-white dark:bg-gray-900"></div>
              </div>
            </div>
          </div>

          <!-- Content Card (Right Side) -->
          <div class="flex-1">
            <div class="hackathon-card group cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300" data-hackathon-id="${hackathon.id}">
              <!-- Date Badge -->
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${gradientColors} text-white text-xs font-semibold mb-3">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
                ${hackathon.date}
              </div>

              <!-- Hackathon Name -->
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                ${hackathon.name}
              </h3>

              <!-- Achievement Badge -->
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold mb-3">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                ${hackathon.position}
              </div>

              <!-- Description -->
              <p class="text-gray-600 dark:text-gray-400 mb-3 leading-relaxed text-sm">
                ${hackathon.description}
              </p>

              <!-- Project Tag -->
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
                <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                </svg>
                <span class="text-xs font-medium text-gray-700 dark:text-gray-300">${hackathon.project}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Layout -->
        <div class="md:hidden flex items-start gap-4">
          <!-- Timeline Milestone Marker -->
          <div class="flex-shrink-0 pt-2">
            <div class="relative">
              <!-- Static Outer Ring -->
              <div class="w-5 h-5 rounded-full bg-gradient-to-r ${gradientColors} flex items-center justify-center">
                <!-- Inner Circle -->
                <div class="w-2.5 h-2.5 rounded-full bg-white dark:bg-gray-900"></div>
              </div>
            </div>
          </div>

          <!-- Content Card -->
          <div class="flex-1 pb-8">
            <div class="hackathon-card group cursor-pointer bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300" data-hackathon-id="${hackathon.id}">
              <!-- Date Badge -->
              <div class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r ${gradientColors} text-white text-xs font-semibold mb-2">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
                ${hackathon.date}
              </div>

              <!-- Hackathon Name -->
              <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">
                ${hackathon.name}
              </h3>

              <!-- Achievement Badge -->
              <div class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold mb-2">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                ${hackathon.position}
              </div>

              <!-- Description -->
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed">
                ${hackathon.description}
              </p>

              <!-- Project Tag -->
              <div class="inline-flex items-center gap-2 px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
                <svg class="w-3 h-3 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                </svg>
                <span class="text-xs font-medium text-gray-700 dark:text-gray-300">${hackathon.project}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
