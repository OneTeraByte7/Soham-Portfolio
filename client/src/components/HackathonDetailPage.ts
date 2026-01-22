import type { Hackathon } from '../types';
import { Router } from '../utils/router';

export class HackathonDetailPage {
  private containerId: string;
  private router: Router;

  constructor(containerId: string) {
    this.containerId = containerId;
    this.router = Router.getInstance();
  }

  render(hackathon: Hackathon): void {
    const container = document.getElementById(this.containerId);
    if (!container) {
      console.error(`Hackathon detail container #${this.containerId} not found`);
      return;
    }

    const colorClasses: Record<string, { gradient: string; badge: string }> = {
      'cyber-blue': {
        gradient: 'from-cyber-blue-500 to-cyber-blue-700',
        badge: 'bg-cyber-blue-500'
      },
      'cyber-green': {
        gradient: 'from-cyber-green-500 to-cyber-green-700',
        badge: 'bg-cyber-green-500'
      },
      'cyber-purple': {
        gradient: 'from-cyber-purple-500 to-cyber-purple-700',
        badge: 'bg-cyber-purple-500'
      },
      'cyber-orange': {
        gradient: 'from-cyber-orange-500 to-cyber-orange-700',
        badge: 'bg-cyber-orange-500'
      }
    };

    const colors = colorClasses[hackathon.color] || colorClasses['cyber-blue'];

    const certificateSection = hackathon.gallery && hackathon.gallery.length > 0
      ? `
            <div class="mb-12 animate-fade-in">
              <h2 class="text-3xl font-bold mb-6 flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent">
                  Certificates
                </span>
              </h2>
              <div class="grid md:grid-cols-2 gap-6">
                ${hackathon.gallery.map((image, index) => `
                  <div class="backdrop-blur-xl bg-white/70 dark:bg-dark-elevated/70 rounded-3xl p-6 border border-light-border dark:border-dark-border hover:scale-105 transition-transform duration-300">
                    <div class="relative rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src="${image}"
                        alt="${hackathon.name} certificate ${index + 1}"
                        class="w-full h-auto object-contain bg-white"
                        onerror="this.style.display='none'"
                      />
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
      `
      : '';

    const html = `
      <div class="fixed inset-0 z-50 overflow-y-auto bg-light-bg dark:bg-dark-bg animate-fade-in">
        <!-- Animated Background -->
        <div class="fixed inset-0 opacity-30 dark:opacity-20 pointer-events-none">
          <div class="absolute top-0 right-0 w-96 h-96 bg-${hackathon.color} rounded-full mix-blend-multiply filter blur-3xl animate-glow-pulse"></div>
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
                class="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${colors.gradient} text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-neon-blue"
              >
                <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                Back to Portfolio
              </button>
            </div>
          </div>

          <!-- Hackathon Content -->
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Hackathon Hero -->
            <div class="mb-12 animate-slide-in">
              <!-- Achievement Badge -->
              <div class="mb-6 flex items-center gap-4">
                <span class="inline-block px-6 py-2 rounded-full ${colors.badge} text-white font-semibold text-sm uppercase tracking-wider shadow-cyber">
                  ${hackathon.achievement}
                </span>
                <span class="text-gray-600 dark:text-gray-400 text-lg">${hackathon.date}</span>
              </div>

              <!-- Title -->
              <h1 class="text-5xl md:text-7xl font-bold mb-6">
                <span class="bg-gradient-cyber bg-clip-text text-transparent animate-gradient-x">
                  ${hackathon.name}
                </span>
              </h1>

              <!-- Position -->
              <div class="flex items-center gap-4 text-2xl mb-6">
                <div class="flex items-center gap-2 text-${hackathon.color}">
                  <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span class="font-bold">${hackathon.position}</span>
                </div>
              </div>

              <!-- Description -->
              <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl">
                ${hackathon.description}
              </p>
            </div>

            <!-- Certificate Display -->
            <!-- Project Details -->
            <div class="grid md:grid-cols-2 gap-8">
              <!-- Project Card -->
              <div class="backdrop-blur-xl bg-white/70 dark:bg-dark-elevated/70 rounded-2xl p-8 border border-light-border dark:border-dark-border animate-slide-in">
                <h2 class="text-3xl font-bold mb-6 flex items-center gap-3">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <span class="bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent">
                    Project Built
                  </span>
                </h2>
                <div class="p-6 rounded-xl bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg border border-${hackathon.color}/20">
                  <p class="text-2xl font-bold text-gray-900 dark:text-white">${hackathon.project}</p>
                  <p class="text-gray-600 dark:text-gray-400 mt-2">${hackathon.description}</p>
                </div>
              </div>

              <!-- Key Highlights -->
              <div class="backdrop-blur-xl bg-white/70 dark:bg-dark-elevated/70 rounded-2xl p-8 border border-light-border dark:border-dark-border animate-slide-in animation-delay-200">
                <h2 class="text-3xl font-bold mb-6 flex items-center gap-3">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyber-orange-500 to-cyber-purple-500 flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <span class="bg-gradient-to-r from-cyber-orange-600 to-cyber-purple-600 dark:from-cyber-orange-400 dark:to-cyber-purple-400 bg-clip-text text-transparent">
                    Key Highlights
                  </span>
                </h2>
                <ul class="space-y-4">
                  <li class="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg">
                    <svg class="w-6 h-6 text-cyber-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <div>
                      <p class="font-semibold text-gray-900 dark:text-white">Achievement</p>
                      <p class="text-gray-600 dark:text-gray-400">${hackathon.achievement} out of all participants</p>
                    </div>
                  </li>
                  <li class="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg">
                    <svg class="w-6 h-6 text-cyber-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <div>
                      <p class="font-semibold text-gray-900 dark:text-white">Role</p>
                      <p class="text-gray-600 dark:text-gray-400">${hackathon.position} - Led project development and implementation</p>
                    </div>
                  </li>
                  <li class="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg">
                    <svg class="w-6 h-6 text-cyber-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <div>
                      <p class="font-semibold text-gray-900 dark:text-white">Innovation</p>
                      <p class="text-gray-600 dark:text-gray-400">Applied cutting-edge technologies to solve real-world problems</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            ${certificateSection}
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
