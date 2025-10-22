import { projects } from '../data/projects';
import { Router } from '../utils/router';
import type { Project } from '../types';

export class ProjectsSection {
  private router: Router;

  constructor() {
    this.router = Router.getInstance();
  }

  render(): void {
    const projectsContainer = document.querySelector('#projects .grid');
    if (!projectsContainer) {
      console.error('Projects container not found');
      return;
    }

    projectsContainer.innerHTML = projects.map(project => this.renderProjectCard(project)).join('');
    this.attachEventListeners();
  }

  renderTo(container: HTMLElement): void {
    container.innerHTML = projects.map(project => this.renderProjectCard(project)).join('');
    this.attachEventListeners();
  }

  private renderProjectCard(project: Project): string {
    const categoryGradients: Record<string, string> = {
      ai: 'from-cyber-purple-500 to-cyber-blue-500',
      web: 'from-cyber-orange-500 to-cyber-green-500',
      fullstack: 'from-cyber-blue-500 to-cyber-green-500'
    };

    const categoryColors: Record<string, string> = {
      ai: 'cyber-purple-500',
      web: 'cyber-orange-500',
      fullstack: 'cyber-blue-500'
    };

    return `
      <div class="project-card group relative backdrop-blur-xl bg-white/70 dark:bg-dark-elevated/70 rounded-2xl overflow-hidden border border-light-border dark:border-dark-border transition-all duration-500 hover:scale-105 hover:shadow-cyber-lg cursor-pointer" data-project-id="${project.id}">
        <!-- Gradient Border Animation -->
        <div class="absolute inset-0 bg-gradient-to-br ${categoryGradients[project.category]} opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

        <!-- Project Image -->
        <div class="relative h-48 overflow-hidden">
          <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

          <!-- Overlay on Hover -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
            <div class="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                View Details
              </div>
            </div>
          </div>

          <!-- Category Badge -->
          <div class="absolute top-4 left-4 px-4 py-1 rounded-full bg-gradient-to-r ${categoryGradients[project.category]} text-white text-xs font-bold uppercase tracking-wider shadow-lg">
            ${project.category}
          </div>
        </div>

        <!-- Card Content -->
        <div class="relative p-6">
          <!-- Title -->
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
            ${project.title}
          </h3>

          <!-- Description -->
          <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            ${project.description}
          </p>

          <!-- Technologies -->
          <div class="flex flex-wrap gap-2 mb-4">
            ${project.technologies.slice(0, 4).map(tech => `
              <span class="px-3 py-1 rounded-lg bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg text-sm font-medium text-gray-700 dark:text-gray-300 border border-${categoryColors[project.category]}/20">
                ${tech}
              </span>
            `).join('')}
            ${project.technologies.length > 4 ? `
              <span class="px-3 py-1 rounded-lg bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg text-sm font-medium text-${categoryColors[project.category]}">
                +${project.technologies.length - 4} more
              </span>
            ` : ''}
          </div>

          <!-- Achievements Preview -->
          <ul class="space-y-2 mb-4">
            ${project.achievements.slice(0, 2).map(achievement => `
              <li class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <svg class="w-4 h-4 text-${categoryColors[project.category]} flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>${achievement}</span>
              </li>
            `).join('')}
          </ul>

          <!-- Learn More Button -->
          <div class="flex items-center justify-between pt-4 border-t border-light-border dark:border-dark-border">
            <span class="text-${categoryColors[project.category]} font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
              Learn More
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    `;
  }

  private attachEventListeners(): void {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const projectId = (card as HTMLElement).dataset.projectId;
        if (projectId) {
          this.router.navigate(`/project/${projectId}`);
        }
      });
    });
  }
}
