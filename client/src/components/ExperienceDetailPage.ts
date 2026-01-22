import type { Experience } from '../types';
import { Router } from '../utils/router';

export class ExperienceDetailPage {
  private containerId: string;
  private router: Router;

  constructor(containerId: string) {
    this.containerId = containerId;
    this.router = Router.getInstance();
  }

  render(experience: Experience): void {
    const container = document.getElementById(this.containerId);
    if (!container) {
      console.error(`Experience detail container #${this.containerId} not found`);
      return;
    }

    const typeColors = {
      'internship': {
        gradient: 'from-cyber-blue-500 to-cyber-purple-500',
        badge: 'bg-cyber-blue-500'
      },
      'full-time': {
        gradient: 'from-cyber-green-500 to-cyber-blue-500',
        badge: 'bg-cyber-green-500'
      }
    };

    const colors = typeColors[experience.type];

    const html = `
      <div class="fixed inset-0 z-50 overflow-y-auto bg-light-bg dark:bg-dark-bg animate-fade-in">
        <!-- Animated Background -->
        <div class="fixed inset-0 opacity-30 dark:opacity-20 pointer-events-none">
          <div class="absolute top-0 right-0 w-96 h-96 bg-cyber-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-glow-pulse"></div>
          <div class="absolute bottom-0 left-0 w-96 h-96 bg-cyber-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-glow-pulse animation-delay-2000"></div>
        </div>

        <!-- Content -->
        <div class="relative min-h-screen">
          <!-- Header with Back Button -->
          <div class="sticky top-0 z-10 backdrop-blur-xl bg-white/80 dark:bg-dark-surface/80 border-b border-light-border dark:border-dark-border">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <button
                id="back-button"
                class="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyber-blue-500 to-cyber-purple-500 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-neon-blue"
              >
                <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                Back to Portfolio
              </button>
            </div>
          </div>

          <!-- Experience Content -->
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Experience Hero -->
            <div class="mb-12 animate-slide-in">
              <div class="flex items-start gap-6 mb-8">
                <!-- Company Logo -->
                ${experience.logo ? `
                  <div class="flex-shrink-0">
                    <div class="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-r ${colors.gradient} p-1 shadow-2xl">
                      <div class="w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center p-4">
                        <img src="${experience.logo}" alt="${experience.company}" class="w-full h-full object-contain" onerror="this.style.display='none'"/>
                      </div>
                    </div>
                  </div>
                ` : ''}
                
                <div class="flex-1">
                  <!-- Type Badge -->
                  <div class="mb-4">
                    <span class="inline-block px-6 py-2 rounded-full ${colors.badge} text-white font-semibold text-sm uppercase tracking-wider shadow-cyber">
                      ${experience.type}
                    </span>
                  </div>

                  <!-- Title -->
                  <h1 class="text-4xl md:text-6xl font-bold mb-4">
                    <span class="bg-gradient-cyber bg-clip-text text-transparent animate-gradient-x">
                      ${experience.role}
                    </span>
                  </h1>

                  <!-- Company -->
                  <h2 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                    ${experience.company}
                  </h2>
                </div>
              </div>

              <!-- Company & Details -->
              <div class="flex flex-wrap items-center gap-6 text-xl text-gray-700 dark:text-gray-300 mb-6">
                <div class="flex items-center gap-2">
                  <svg class="w-6 h-6 text-cyber-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                  <span class="font-semibold">${experience.company}</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-6 h-6 text-cyber-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span>${experience.duration}</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-6 h-6 text-cyber-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span>${experience.location}</span>
                </div>
              </div>
            </div>

            <!-- Two Column Layout -->
            <div class="grid lg:grid-cols-3 gap-8 mb-12">
              <!-- Left Column - Responsibilities & Skills -->
              <div class="lg:col-span-2 space-y-8">
                <!-- Responsibilities -->
                <div class="backdrop-blur-xl bg-white/70 dark:bg-dark-elevated/70 rounded-2xl p-8 border border-light-border dark:border-dark-border animate-slide-in">
                  <h2 class="text-3xl font-bold mb-6 flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                      </svg>
                    </div>
                    <span class="bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent">
                      Key Responsibilities
                    </span>
                  </h2>
                  <ul class="space-y-4">
                    ${experience.responsibilities.map(resp => `
                      <li class="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg transition-all duration-300 hover:scale-102">
                        <svg class="w-6 h-6 text-cyber-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        <span class="text-gray-700 dark:text-gray-300 leading-relaxed">${resp}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>

                <!-- Skills -->
                <div class="backdrop-blur-xl bg-white/70 dark:bg-dark-elevated/70 rounded-2xl p-8 border border-light-border dark:border-dark-border animate-slide-in animation-delay-200">
                  <h2 class="text-3xl font-bold mb-6 flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                      </svg>
                    </div>
                    <span class="bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent">
                      Technologies Used
                    </span>
                  </h2>
                  <div class="flex flex-wrap gap-3">
                    ${experience.skills.map(skill => `
                      <span class="px-4 py-2 rounded-xl bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg border border-cyber-blue-200 dark:border-cyber-blue-800 text-gray-800 dark:text-gray-200 font-medium transition-all duration-300 hover:scale-105 hover:border-cyber-blue-500">
                        ${skill}
                      </span>
                    `).join('')}
                  </div>
                </div>
              </div>

              <!-- Right Column - Achievements -->
              <div class="space-y-8">
                <!-- Achievements -->
                <div class="backdrop-blur-xl bg-white/70 dark:bg-dark-elevated/70 rounded-2xl p-8 border border-light-border dark:border-dark-border animate-slide-in animation-delay-400">
                  <h2 class="text-3xl font-bold mb-6 flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyber-orange-500 to-cyber-purple-500 flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    </div>
                    <span class="bg-gradient-to-r from-cyber-orange-600 to-cyber-purple-600 dark:from-cyber-orange-400 dark:to-cyber-purple-400 bg-clip-text text-transparent">
                      Impact
                    </span>
                  </h2>
                  <ul class="space-y-3">
                    ${experience.achievements.map(achievement => `
                      <li class="flex items-start gap-2 p-4 rounded-xl bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg">
                        <span class="text-cyber-orange-500 font-bold text-xl">•</span>
                        <span class="text-gray-700 dark:text-gray-300">${achievement}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    const backButton = document.getElementById('back-button');
    backButton?.addEventListener('click', () => {
      this.router.goBack();
    });
  }

  hide(): void {
    const container = document.getElementById(this.containerId);
    if (container) {
      container.innerHTML = '';
    }
  }
}
