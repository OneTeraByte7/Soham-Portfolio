import type { Project } from '../types';

export class ProjectModal {
  private modal: HTMLElement | null = null;
  private isOpen: boolean = false;

  constructor() {
    this.createModal();
    this.attachEventListeners();
  }

  private createModal(): void {
    const modalHTML = `
      <div id="project-modal" class="fixed inset-0 z-50 hidden items-center justify-center p-4 bg-white/60 dark:bg-black/60 backdrop-blur-sm">
        <div class="relative bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl modal-content">
          <!-- Close Button -->
          <button id="close-modal" class="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-all duration-300 group">
            <svg class="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- Modal Content -->
          <div id="modal-body" class="p-8">
            <!-- Content will be dynamically inserted -->
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modal = document.getElementById('project-modal');
  }

  private attachEventListeners(): void {
    const closeBtn = document.getElementById('close-modal');
    closeBtn?.addEventListener('click', () => this.close());

    this.modal?.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  open(project: Project): void {
    if (!this.modal) return;

    const modalBody = document.getElementById('modal-body');
    if (!modalBody) return;

    modalBody.innerHTML = this.renderProjectDetails(project);

    this.modal.classList.remove('hidden');
    this.modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    this.isOpen = true;

    // Animate modal entrance
    setTimeout(() => {
      const modalContent = this.modal?.querySelector('.modal-content');
      modalContent?.classList.add('animate-slide-up');
    }, 10);
  }

  close(): void {
    if (!this.modal) return;

    this.modal.classList.add('hidden');
    this.modal.classList.remove('flex');
    document.body.style.overflow = '';
    this.isOpen = false;
  }

  private renderProjectDetails(project: Project): string {
    return `
      <!-- Project Image -->
      <div class="mb-6 h-64 md:h-96 rounded-xl overflow-hidden">
        <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover" />
      </div>

      <!-- Project Title & Category -->
      <div class="mb-6">
        <div class="flex items-center gap-3 mb-3">
          <span class="px-4 py-1 bg-gradient-to-r from-primary/20 to-accent/20 dark:from-primary-dark/30 dark:to-accent-dark/30 text-primary dark:text-primary-dark rounded-full text-sm font-semibold uppercase">
            ${project.category}
          </span>
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          ${project.title}
        </h2>
        <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          ${project.longDescription}
        </p>
      </div>

      <!-- Technologies -->
      <div class="mb-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
          </svg>
          Technologies Used
        </h3>
        <div class="flex flex-wrap gap-2">
          ${project.technologies.map(tech => `
            <span class="skill-badge">${tech}</span>
          `).join('')}
        </div>
      </div>

      <!-- Key Features -->
      <div class="mb-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          Key Features
        </h3>
        <ul class="grid md:grid-cols-2 gap-3">
          ${project.features.map(feature => `
            <li class="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <svg class="w-5 h-5 text-primary dark:text-primary-dark flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span>${feature}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Achievements -->
      <div class="mb-8">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          Achievements & Impact
        </h3>
        <ul class="space-y-2">
          ${project.achievements.map(achievement => `
            <li class="flex items-start gap-2 text-gray-700 dark:text-gray-300 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <span class="text-primary dark:text-primary-dark font-bold">•</span>
              <span>${achievement}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-4">
        ${project.githubUrl ? `
          <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary flex items-center gap-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span class="relative z-10">View on GitHub</span>
          </a>
        ` : ''}

        ${project.liveUrl ? `
          <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
            <span class="relative z-10">Live Demo</span>
          </a>
        ` : ''}
      </div>
    `;
  }
}
