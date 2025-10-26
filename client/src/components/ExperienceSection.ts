import { experiences } from '../data/experiences';
import { Router } from '../utils/router';
import { Tilt3D } from '../utils/tilt';
import { MagneticEffect } from '../utils/magnetic';
import type { Experience } from '../types';

export class ExperienceSection {
  private router: Router;
  private tiltInstances: Tilt3D[] = [];
  private magneticInstances: MagneticEffect[] = [];

  constructor() {
    this.router = Router.getInstance();
  }

  renderTo(container: HTMLElement): void {
    // Clean up previous instances
    this.cleanup();

    const html = `
      <section class="relative py-32 overflow-hidden backdrop-blur-xl bg-gradient-to-br from-slate-50/80 via-blue-50/80 to-indigo-50/80 dark:from-gray-950/90 dark:via-blue-950/30 dark:to-indigo-950/30">
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Header -->
          <div class="mb-20 text-center animate-fade-in">
            <h2 class="text-5xl md:text-6xl font-black mb-6">
              <span class="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent animate-neon-pulse">
                Journey Timeline
              </span>
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Professional evolution and impactful contributions
            </p>
          </div>

          <!-- Interactive Timeline -->
          <div class="relative">
            <!-- Animated Central Line -->
            <div class="timeline-line hidden md:block"></div>

            <!-- Experience Items -->
            <div class="space-y-16 md:space-y-24">
              ${experiences.map((exp, index) => this.renderTimelineItem(exp, index)).join('')}
            </div>
          </div>
        </div>

        <!-- Floating Decorative Elements -->
        <div class="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-10 blur-3xl animate-particle"></div>
        <div class="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-teal-500 to-green-500 rounded-full opacity-10 blur-3xl animate-particle" style="animation-delay: 2s;"></div>
      </section>
    `;

    container.innerHTML = html;
    this.attachEventListeners();
    this.initializeEffects();
  }

  private cleanup(): void {
    this.tiltInstances.forEach(instance => instance.destroy());
    this.magneticInstances.forEach(instance => instance.destroy());
    this.tiltInstances = [];
    this.magneticInstances = [];
  }

  private renderTimelineItem(experience: Experience, index: number): string {
    const gradients = [
      'from-blue-500 via-cyan-500 to-teal-500',
      'from-purple-500 via-pink-500 to-rose-500',
      'from-orange-500 via-amber-500 to-yellow-500',
      'from-green-500 via-emerald-500 to-teal-500'
    ];

    const gradient = gradients[index % gradients.length];
    const isLeft = index % 2 === 0;
    const staggerClass = `stagger-delay-${(index % 6) + 1}`;

    return `
      <div class="relative animate-stagger ${staggerClass}" style="opacity: 0;">
        <!-- Timeline Node (Center) -->
        <div class="absolute left-1/2 top-8 -translate-x-1/2 z-10 hidden md:block">
          <div class="timeline-node"></div>
        </div>

        <!-- Content Card -->
        <div class="md:grid md:grid-cols-2 md:gap-16 items-center">
          ${isLeft ? `
            <!-- Left Side: Content -->
            <div class="md:text-right animate-clip-reveal">
              <div class="experience-card inline-block text-left max-w-2xl w-full backdrop-blur-2xl bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-800/70 rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 shadow-2xl cursor-pointer group hover-lift" data-experience-id="${experience.id}" style="transform-style: preserve-3d;">
                <!-- Animated Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-all duration-700"></div>

                <!-- Glow Effect -->
                <div class="absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-700 -z-10"></div>

                <div class="relative">
                  <!-- Header -->
                  <div class="mb-6">
                    <div class="inline-block px-4 py-2 rounded-full bg-gradient-to-r ${gradient} text-white text-xs font-black uppercase tracking-widest mb-4 animate-magnetic-glow">
                      ${experience.type}
                    </div>
                    <h3 class="text-3xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform duration-500">
                      ${experience.role}
                    </h3>
                    <p class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">${experience.company}</p>
                    <div class="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <span class="flex items-center gap-2 bg-gradient-to-r ${gradient} text-white px-3 py-1 rounded-lg font-semibold">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/></svg>
                        ${experience.duration}
                      </span>
                      <span class="flex items-center gap-2">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/></svg>
                        ${experience.location}
                      </span>
                    </div>
                  </div>

                  <!-- Responsibilities -->
                  <div class="mb-6">
                    <ul class="space-y-3 text-gray-700 dark:text-gray-300">
                      ${experience.responsibilities.slice(0, 2).map((resp, i) => `
                        <li class="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-500 animate-elastic-scale" style="animation-delay: ${i * 150}ms;">
                          <div class="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center mt-0.5">
                            <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                          </div>
                          <span class="leading-relaxed">${resp}</span>
                        </li>
                      `).join('')}
                      ${experience.responsibilities.length > 2 ? `
                        <li class="text-sm font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent ml-9">
                          +${experience.responsibilities.length - 2} more highlights →
                        </li>
                      ` : ''}
                    </ul>
                  </div>

                  <!-- Skills -->
                  <div class="flex flex-wrap gap-2">
                    ${experience.skills.slice(0, 6).map((skill, i) => `
                      <span class="px-3 py-2 text-xs font-bold rounded-xl backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 border border-white/40 dark:border-gray-700/40 text-gray-800 dark:text-gray-200 hover:scale-110 hover-glow transition-all duration-300 animate-elastic-scale" style="animation-delay: ${i * 80}ms;">
                        ${skill}
                      </span>
                    `).join('')}
                    ${experience.skills.length > 6 ? `
                      <span class="px-3 py-2 text-xs font-bold rounded-xl bg-gradient-to-r ${gradient} bg-clip-text text-transparent">
                        +${experience.skills.length - 6}
                      </span>
                    ` : ''}
                  </div>

                  <!-- Hover CTA -->
                  <div class="absolute -bottom-4 -right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 magnetic-btn">
                    <div class="w-16 h-16 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center shadow-2xl hover-glow">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Right Side: Empty -->
            <div class="hidden md:block"></div>
          ` : `
            <!-- Left Side: Empty -->
            <div class="hidden md:block"></div>
            <!-- Right Side: Content -->
            <div class="animate-clip-reveal">
              <div class="experience-card inline-block max-w-2xl w-full backdrop-blur-2xl bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-800/70 rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 shadow-2xl cursor-pointer group hover-lift" data-experience-id="${experience.id}" style="transform-style: preserve-3d;">
                <!-- Animated Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-all duration-700"></div>

                <!-- Glow Effect -->
                <div class="absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-700 -z-10"></div>

                <div class="relative">
                  <!-- Header -->
                  <div class="mb-6">
                    <div class="inline-block px-4 py-2 rounded-full bg-gradient-to-r ${gradient} text-white text-xs font-black uppercase tracking-widest mb-4 animate-magnetic-glow">
                      ${experience.type}
                    </div>
                    <h3 class="text-3xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform duration-500">
                      ${experience.role}
                    </h3>
                    <p class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">${experience.company}</p>
                    <div class="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <span class="flex items-center gap-2 bg-gradient-to-r ${gradient} text-white px-3 py-1 rounded-lg font-semibold">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/></svg>
                        ${experience.duration}
                      </span>
                      <span class="flex items-center gap-2">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/></svg>
                        ${experience.location}
                      </span>
                    </div>
                  </div>

                  <!-- Responsibilities -->
                  <div class="mb-6">
                    <ul class="space-y-3 text-gray-700 dark:text-gray-300">
                      ${experience.responsibilities.slice(0, 2).map((resp, i) => `
                        <li class="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-500 animate-elastic-scale" style="animation-delay: ${i * 150}ms;">
                          <div class="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center mt-0.5">
                            <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                          </div>
                          <span class="leading-relaxed">${resp}</span>
                        </li>
                      `).join('')}
                      ${experience.responsibilities.length > 2 ? `
                        <li class="text-sm font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent ml-9">
                          +${experience.responsibilities.length - 2} more highlights →
                        </li>
                      ` : ''}
                    </ul>
                  </div>

                  <!-- Skills -->
                  <div class="flex flex-wrap gap-2">
                    ${experience.skills.slice(0, 6).map((skill, i) => `
                      <span class="px-3 py-2 text-xs font-bold rounded-xl backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 border border-white/40 dark:border-gray-700/40 text-gray-800 dark:text-gray-200 hover:scale-110 hover-glow transition-all duration-300 animate-elastic-scale" style="animation-delay: ${i * 80}ms;">
                        ${skill}
                      </span>
                    `).join('')}
                    ${experience.skills.length > 6 ? `
                      <span class="px-3 py-2 text-xs font-bold rounded-xl bg-gradient-to-r ${gradient} bg-clip-text text-transparent">
                        +${experience.skills.length - 6}
                      </span>
                    ` : ''}
                  </div>

                  <!-- Hover CTA -->
                  <div class="absolute -bottom-4 -right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 magnetic-btn">
                    <div class="w-16 h-16 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center shadow-2xl hover-glow">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `}
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

  private initializeEffects(): void {
    // Initialize 3D tilt effect on all experience cards
    const experienceCards = document.querySelectorAll<HTMLElement>('.experience-card');
    experienceCards.forEach(card => {
      const tilt = new Tilt3D(card, {
        max: 8,
        perspective: 1500,
        scale: 1.02,
        speed: 400,
        glare: true,
        maxGlare: 0.2
      });
      this.tiltInstances.push(tilt);
    });

    // Initialize magnetic effect on CTA buttons
    const magneticBtns = document.querySelectorAll<HTMLElement>('.magnetic-btn');
    magneticBtns.forEach(btn => {
      const magnetic = new MagneticEffect(btn, {
        strength: 0.5,
        radius: 100,
        smoothness: 0.15
      });
      this.magneticInstances.push(magnetic);
    });
  }
}
