import { projects } from '../data/projects';
import { Router } from '../utils/router';
import { Tilt3D } from '../utils/tilt';
import { MagneticEffect } from '../utils/magnetic';
import type { Project } from '../types';

export class ProjectsSection {
  private router: Router;
  private tiltInstances: Tilt3D[] = [];
  private magneticInstances: MagneticEffect[] = [];

  constructor() {
    this.router = Router.getInstance();
  }

  render(): void {
    const projectsContainer = document.querySelector('#projects .grid');
    if (!projectsContainer) {
      console.error('Projects container not found');
      return;
    }

    // Clean up previous instances
    this.cleanup();

    projectsContainer.innerHTML = projects.map((project, index) => this.renderProjectCard(project, index)).join('');
    this.attachEventListeners();
    this.initializeEffects();
  }

  renderTo(container: HTMLElement): void {
    // Clean up previous instances
    this.cleanup();

    container.innerHTML = projects.map((project, index) => this.renderProjectCard(project, index)).join('');
    this.attachEventListeners();
    this.initializeEffects();
  }

  private cleanup(): void {
    this.tiltInstances.forEach(instance => instance.destroy());
    this.magneticInstances.forEach(instance => instance.destroy());
    this.tiltInstances = [];
    this.magneticInstances = [];
  }

  private renderProjectCard(project: Project, index: number): string {
    const categoryGradients: Record<string, string> = {
      ai: 'from-violet-500 via-purple-500 to-fuchsia-500',
      web: 'from-orange-500 via-rose-500 to-pink-500',
      fullstack: 'from-cyan-500 via-blue-500 to-indigo-500'
    };

    const categoryColors: Record<string, string> = {
      ai: 'text-violet-400',
      web: 'text-orange-400',
      fullstack: 'text-cyan-400'
    };

    const categoryBg: Record<string, string> = {
      ai: 'bg-violet-500/10',
      web: 'bg-orange-500/10',
      fullstack: 'bg-cyan-500/10'
    };

    // Bento Grid patterns - balanced sizing for visual interest
    // Pattern: normal, wide, normal, tall, normal, wide (repeats every 6)
    const bentoPatterns = ['', 'bento-item-wide', '', 'bento-item-tall', '', 'bento-item-wide'];
    const bentoClass = bentoPatterns[index % bentoPatterns.length];

    // Staggered animation delays
    const staggerClass = `stagger-delay-${(index % 6) + 1}`;
    const darkGradientClasses = categoryGradients[project.category].split(' ').map(c => `dark:${c}`).join(' ');

    return `
      <div class="project-card group relative backdrop-blur-2xl bg-white/90 dark:bg-gray-900/90 border-2 border-gray-200/30 dark:border-gray-800/50 rounded-3xl overflow-hidden cursor-pointer animate-stagger ${staggerClass} ${bentoClass} hover-lift hover:border-${project.category === 'ai' ? 'violet' : project.category === 'web' ? 'orange' : 'cyan'}-500/50 transition-all duration-500" data-project-id="${project.id}" style="opacity: 0; transform-style: preserve-3d;">

        <!-- Animated Gradient Background (dark only) -->
        <div class="absolute inset-0 bg-transparent dark:bg-gradient-to-br ${darkGradientClasses} opacity-0 dark:opacity-0 dark:group-hover:opacity-10 transition-all duration-700"></div>

        <!-- Shimmer Effect -->
        <div class="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <!-- Morphing Border Glow (dark only) -->
        <div class="absolute -inset-1 bg-transparent dark:bg-gradient-to-r ${darkGradientClasses} rounded-3xl blur-xl opacity-0 dark:group-hover:opacity-40 transition-all duration-700 -z-10"></div>

        <!-- Project Image with Clip-path Reveal -->
        <div class="relative h-56 overflow-hidden bg-white/80 dark:bg-gray-950">
          <div class="absolute inset-0 bg-transparent dark:bg-gradient-to-br ${darkGradientClasses} opacity-0 dark:opacity-20 dark:group-hover:opacity-30 group-hover:opacity-0 transition-all duration-700"></div>
          <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-2" />

          <!-- Liquid Overlay on Hover -->
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center">
            <div class="text-center transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 delay-100">
              <div class="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 text-white font-bold magnetic-btn hover-glow">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                View Project
              </div>
            </div>
          </div>

          <!-- Floating Category Badge -->
          <div class="absolute top-5 left-5 px-5 py-2 rounded-full bg-gradient-to-r ${categoryGradients[project.category]} text-white text-xs font-black uppercase tracking-widest shadow-2xl">
            ${project.category}
          </div>

          <!-- Decorative Corner Element -->
          <div class="absolute top-0 right-0 w-32 h-32 bg-transparent dark:bg-gradient-to-br ${darkGradientClasses} opacity-6 dark:opacity-20 blur-3xl"></div>
        </div>

        <!-- Card Content -->
        <div class="relative p-8">
          <!-- Title with Gradient -->
          <h3 class="text-2xl md:text-3xl font-black bg-gradient-to-r ${categoryGradients[project.category]} bg-clip-text text-transparent mb-4 line-clamp-2 group-hover:scale-105 transition-transform duration-500">
            ${project.title}
          </h3>

          <!-- Description -->
          <p class="text-gray-700 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed">
            ${project.description}
          </p>

          <!-- Technologies with Micro-interactions -->
          <div class="flex flex-wrap gap-2 mb-6">
            ${project.technologies.slice(0, 5).map((tech, i) => `
              <span class="px-4 py-2 rounded-xl ${categoryBg[project.category]} backdrop-blur-xl text-sm font-bold text-gray-800 dark:text-gray-200 border border-white/30 dark:border-gray-700/30 hover:scale-110 hover-glow transition-all duration-300 animate-elastic-scale" style="animation-delay: ${i * 100}ms;">
                ${tech}
              </span>
            `).join('')}
            ${project.technologies.length > 5 ? `
              <span class="px-4 py-2 rounded-xl backdrop-blur-xl text-sm font-bold ${categoryColors[project.category]} hover:scale-110 transition-all duration-300">
                +${project.technologies.length - 5}
              </span>
            ` : ''}
          </div>

          <!-- Achievements Preview with Icons -->
          <ul class="space-y-3 mb-6">
            ${project.achievements.slice(0, 2).map(achievement => `
              <li class="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 group-hover:translate-x-2 transition-transform duration-500">
                <div class="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${categoryGradients[project.category]} flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="leading-relaxed">${achievement}</span>
              </li>
            `).join('')}
          </ul>

          <!-- Animated CTA -->
          <div class="flex items-center justify-between pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
            <span class="${categoryColors[project.category]} font-black text-lg flex items-center gap-3 group-hover:gap-5 transition-all duration-500">
              Explore
              <svg class="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </span>
          </div>
        </div>

        <!-- Corner Accent (dark only) -->
        <div class="absolute bottom-0 left-0 w-24 h-24 bg-transparent dark:bg-gradient-to-tr ${darkGradientClasses} dark:opacity-10 opacity-0 blur-2xl"></div>
      </div>
    `;
  }

  private attachEventListeners(): void {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const projectId = (card as HTMLElement).dataset.projectId;
        if (projectId) {
          this.router.navigate(`/project/${projectId}`, { from: 'projects' });
        }
      });
    });
  }

  private initializeEffects(): void {
    // Initialize 3D tilt effect on all project cards
    const projectCards = document.querySelectorAll<HTMLElement>('.project-card');
    projectCards.forEach(card => {
      const tilt = new Tilt3D(card, {
        max: 10,
        perspective: 1500,
        scale: 1.02,
        speed: 400,
        glare: true,
        maxGlare: 0.3
      });
      this.tiltInstances.push(tilt);
    });

    // Initialize magnetic effect on buttons
    const magneticBtns = document.querySelectorAll<HTMLElement>('.magnetic-btn');
    magneticBtns.forEach(btn => {
      const magnetic = new MagneticEffect(btn, {
        strength: 0.4,
        radius: 120,
        smoothness: 0.2
      });
      this.magneticInstances.push(magnetic);
    });
  }
}
