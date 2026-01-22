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
      <section class="relative py-32 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
        <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Header -->
          <div class="text-center mb-20">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 mb-6">
              <svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/>
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
              </svg>
              <span class="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Professional Journey</span>
            </div>
            <h2 class="text-4xl md:text-5xl font-bold mb-4">
              <span class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Experience Timeline
              </span>
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Professional evolution and impactful contributions
            </p>
          </div>

          <!-- Timeline -->
          <div class="relative">
            <!-- Timeline Line (Left Side - Desktop) -->
            <div class="hidden md:block absolute left-3 top-0 w-0.5 h-full bg-gradient-to-b from-blue-300 via-indigo-300 to-purple-300 dark:from-blue-600 dark:via-indigo-600 dark:to-purple-600"></div>

            <!-- Timeline Line (Left Side - Mobile) -->
            <div class="md:hidden absolute left-2.5 top-0 w-0.5 h-full bg-gradient-to-b from-blue-300 via-indigo-300 to-purple-300 dark:from-blue-600 dark:via-indigo-600 dark:to-purple-600"></div>

            <!-- Experience Items -->
            ${experiences.map((exp, index) => this.renderTimelineItem(exp, index)).join('')}
          </div>
        </div>
      </section>
    `;

    container.innerHTML = html;
    this.attachEventListeners();
  }

  private renderTimelineItem(experience: Experience, index: number): string {
    const gradients = [
      'from-blue-600 to-indigo-600',
      'from-indigo-600 to-purple-600',
      'from-purple-600 to-pink-600',
      'from-cyan-600 to-teal-600'
    ];

    const gradient = gradients[index % gradients.length];

    return `
      <div class="relative mb-12 md:mb-16">
        <!-- Desktop Layout (Timeline Left, Content Right) -->
        <div class="hidden md:flex items-start gap-8">
          <!-- Timeline Milestone Marker (Left Side) -->
          <div class="flex-shrink-0 pt-2">
            <div class="relative">
              <!-- Static Outer Ring -->
              <div class="w-6 h-6 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center">
                <!-- Inner Circle -->
                <div class="w-3 h-3 rounded-full bg-white dark:bg-gray-900"></div>
              </div>
            </div>
          </div>

          <!-- Content Card (Right Side) -->
          <div class="flex-1">
            <div class="experience-card cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg" data-experience-id="${experience.id}">
              <div class="flex items-start gap-4">
                <!-- Company Logo -->
                ${experience.logo ? `
                  <div class="flex-shrink-0">
                    <div class="w-16 h-16 rounded-xl bg-gradient-to-r ${gradient} p-0.5 shadow-lg">
                      <div class="w-full h-full rounded-xl bg-white dark:bg-gray-900 flex items-center justify-center p-2">
                        <img src="${experience.logo}" alt="${experience.company}" class="w-full h-full object-contain" onerror="this.style.display='none'"/>
                      </div>
                    </div>
                  </div>
                ` : ''}
                
                <div class="flex-1 min-w-0">
                  <!-- Type Badge -->
                  <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${gradient} text-white text-xs font-semibold mb-3">
                    ${experience.type}
                  </div>

                  <!-- Role -->
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    ${experience.role}
                  </h3>

                  <!-- Company -->
                  <p class="text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">${experience.company}</p>

                  <!-- Duration & Location -->
                  <div class="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <span class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                      </svg>
                      ${experience.duration}
                    </span>
                    <span class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                      </svg>
                      ${experience.location}
                    </span>
                  </div>

                  <!-- Responsibilities -->
                  <div class="mb-4">
                    <ul class="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                      ${experience.responsibilities.slice(0, 2).map(resp => `
                        <li class="flex items-start gap-2">
                          <div class="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center mt-0.5">
                            <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                            </svg>
                          </div>
                          <span class="leading-relaxed">${resp}</span>
                        </li>
                      `).join('')}
                      ${experience.responsibilities.length > 2 ? `
                        <li class="text-xs font-semibold text-gray-500 dark:text-gray-500 ml-7">
                          +${experience.responsibilities.length - 2} more highlights
                        </li>
                      ` : ''}
                    </ul>
                  </div>

                  <!-- Skills -->
                  <div class="flex flex-wrap gap-2">
                    ${experience.skills.slice(0, 6).map(skill => `
                      <span class="px-2 py-1 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                        ${skill}
                      </span>
                    `).join('')}
                    ${experience.skills.length > 6 ? `
                      <span class="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-500">
                        +${experience.skills.length - 6}
                      </span>
                    ` : ''}
                  </div>
                </div>
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
              <div class="w-5 h-5 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center">
                <!-- Inner Circle -->
                <div class="w-2.5 h-2.5 rounded-full bg-white dark:bg-gray-900"></div>
              </div>
            </div>
          </div>

          <!-- Content Card -->
          <div class="flex-1 pb-8">
            <div class="experience-card cursor-pointer bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg" data-experience-id="${experience.id}">
              <div class="flex items-start gap-3 mb-3">
                <!-- Company Logo -->
                ${experience.logo ? `
                  <div class="flex-shrink-0">
                    <div class="w-12 h-12 rounded-lg bg-gradient-to-r ${gradient} p-0.5 shadow-md">
                      <div class="w-full h-full rounded-lg bg-white dark:bg-gray-900 flex items-center justify-center p-1.5">
                        <img src="${experience.logo}" alt="${experience.company}" class="w-full h-full object-contain" onerror="this.style.display='none'"/>
                      </div>
                    </div>
                  </div>
                ` : ''}
                
                <div class="flex-1 min-w-0">
                  <!-- Type Badge -->
                  <div class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r ${gradient} text-white text-xs font-semibold mb-2">
                    ${experience.type}
                  </div>

                  <!-- Role -->
                  <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">
                    ${experience.role}
                  </h3>

                  <!-- Company -->
                  <p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">${experience.company}</p>
                </div>
              </div>

              <!-- Duration & Location -->
              <div class="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400 mb-3">
                <span class="flex items-center gap-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                  </svg>
                  ${experience.duration}
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                  </svg>
                  ${experience.location}
                </span>
              </div>

              <!-- Responsibilities -->
              <div class="mb-3">
                <ul class="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                  ${experience.responsibilities.slice(0, 2).map(resp => `
                    <li class="flex items-start gap-2">
                      <div class="flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center mt-0.5">
                        <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      <span class="leading-relaxed text-xs">${resp}</span>
                    </li>
                  `).join('')}
                  ${experience.responsibilities.length > 2 ? `
                    <li class="text-xs font-semibold text-gray-500 dark:text-gray-500 ml-6">
                      +${experience.responsibilities.length - 2} more
                    </li>
                  ` : ''}
                </ul>
              </div>

              <!-- Skills -->
              <div class="flex flex-wrap gap-1.5">
                ${experience.skills.slice(0, 6).map(skill => `
                  <span class="px-2 py-1 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                    ${skill}
                  </span>
                `).join('')}
                ${experience.skills.length > 6 ? `
                  <span class="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-500">
                    +${experience.skills.length - 6}
                  </span>
                ` : ''}
              </div>
            </div>
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
          this.router.navigate(`/experience/${experienceId}`, { from: 'experience' });
        }
      });
    });
  }

}
