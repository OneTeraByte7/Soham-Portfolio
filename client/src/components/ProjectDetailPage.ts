import type { Project } from '../types';
import { Router } from '../utils/router';

export class ProjectDetailPage {
  private container: HTMLElement | null;
  private router: Router;

  constructor(containerId: string) {
    this.container = document.getElementById(containerId);
    this.router = Router.getInstance();
  }

  render(project: Project): void {
    if (!this.container) return;

    const html = `
      <div class="fixed inset-0 z-50 overflow-y-auto bg-light-bg dark:bg-dark-bg animate-fade-in">
        <!-- Animated Background -->
        <div class="fixed inset-0 opacity-30 dark:opacity-20 pointer-events-none">
          <div class="absolute top-0 right-0 w-96 h-96 bg-cyber-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-glow-pulse"></div>
          <div class="absolute bottom-0 left-0 w-96 h-96 bg-cyber-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-glow-pulse animation-delay-2000"></div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-glow-pulse animation-delay-4000"></div>
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

          <!-- Project Content -->
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Project Hero -->
            <div class="mb-12 animate-slide-in">
              <!-- Category Badge -->
              <div class="mb-6">
                <span class="inline-block px-6 py-2 rounded-full bg-gradient-to-r ${this.getCategoryGradient(project.category)} text-white font-semibold text-sm uppercase tracking-wider shadow-cyber">
                  ${project.category}
                </span>
              </div>

              <!-- Title -->
              <h1 class="text-5xl md:text-7xl font-bold mb-6">
                <span class="bg-gradient-cyber bg-clip-text text-transparent animate-gradient-x">
                  ${project.title}
                </span>
              </h1>

              <!-- Description -->
              <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl">
                ${project.longDescription}
              </p>
            </div>

            <!-- Project Image -->
            <div class="mb-12 animate-scale-in rounded-3xl overflow-hidden shadow-cyber-lg border border-light-border dark:border-dark-border">
              <img src="${project.image}" alt="${project.title}" class="w-full h-auto object-cover" />
            </div>

            <!-- Two Column Layout -->
            <div class="grid lg:grid-cols-3 gap-8 mb-12">
              <!-- Left Column - Technologies & Features -->
              <div class="lg:col-span-2 space-y-8">
                <!-- Technologies -->
                <div class="backdrop-blur-xl bg-white/70 dark:bg-dark-elevated/70 rounded-2xl p-8 border border-light-border dark:border-dark-border animate-slide-in">
                  <h2 class="text-3xl font-bold mb-6 flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyber-blue-500 to-cyber-purple-500 flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                      </svg>
                    </div>
                    <span class="bg-gradient-to-r from-cyber-blue-600 to-cyber-purple-600 dark:from-cyber-blue-400 dark:to-cyber-purple-400 bg-clip-text text-transparent">
                      Technologies Used
                    </span>
                  </h2>
                  <div class="flex flex-wrap gap-3">
                    ${project.technologies.map(tech => `
                      <span class="px-4 py-2 rounded-xl bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg border border-cyber-blue-200 dark:border-cyber-blue-800 text-gray-800 dark:text-gray-200 font-medium transition-all duration-300 hover:scale-105 hover:border-cyber-blue-500">
                        ${tech}
                      </span>
                    `).join('')}
                  </div>
                </div>

                <!-- Key Features -->
                <div class="backdrop-blur-xl bg-white/70 dark:bg-dark-elevated/70 rounded-2xl p-8 border border-light-border dark:border-dark-border animate-slide-in animation-delay-200">
                  <h2 class="text-3xl font-bold mb-6 flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyber-green-500 to-cyber-blue-500 flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                    </div>
                    <span class="bg-gradient-to-r from-cyber-green-600 to-cyber-blue-600 dark:from-cyber-green-400 dark:to-cyber-blue-400 bg-clip-text text-transparent">
                      Key Features
                    </span>
                  </h2>
                  <ul class="space-y-4">
                    ${project.features.map(feature => `
                      <li class="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg transition-all duration-300 hover:scale-102">
                        <svg class="w-6 h-6 text-cyber-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        <span class="text-gray-700 dark:text-gray-300 leading-relaxed">${feature}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>
              </div>

              <!-- Right Column - Achievements & Links -->
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
                    ${project.achievements.map(achievement => `
                      <li class="flex items-start gap-2 p-4 rounded-xl bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg">
                        <span class="text-cyber-orange-500 font-bold">•</span>
                        <span class="text-gray-700 dark:text-gray-300">${achievement}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>

                <!-- Action Buttons -->
                <div class="space-y-4">
                  ${project.githubUrl ? `
                    <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer"
                       class="group block w-full px-6 py-4 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white font-semibold text-center transition-all duration-300 hover:scale-105 hover:shadow-cyber-lg">
                      <span class="flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        View on GitHub
                        <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                      </span>
                    </a>
                  ` : ''}

                  ${project.liveUrl && project.liveUrl !== '#' ? `
                    <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer"
                       class="group block w-full px-6 py-4 rounded-xl bg-gradient-to-r from-cyber-blue-500 to-cyber-purple-500 text-white font-semibold text-center transition-all duration-300 hover:scale-105 hover:shadow-neon-blue">
                      <span class="flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                        Live Demo
                        <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                      </span>
                    </a>
                  ` : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML = html;
    this.attachEventListeners();
  }

  private getCategoryGradient(category: string): string {
    const gradients: Record<string, string> = {
      ai: 'from-cyber-purple-500 to-cyber-blue-500',
      web: 'from-cyber-orange-500 to-cyber-green-500',
      fullstack: 'from-cyber-blue-500 to-cyber-green-500'
    };
    return gradients[category] || 'from-cyber-blue-500 to-cyber-purple-500';
  }

  private attachEventListeners(): void {
    const backButton = document.getElementById('back-button');
    backButton?.addEventListener('click', () => {
      this.router.navigate('/');
    });
  }

  hide(): void {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}
