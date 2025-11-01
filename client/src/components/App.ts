import { AchievementsSection } from './AchievementsSection';
import { ProjectsSection } from './ProjectsSection';
import { ProjectDetailPage } from './ProjectDetailPage';
import { HackathonsSection } from './HackathonsSection';
import { HackathonDetailPage } from './HackathonDetailPage';
import { ExperienceSection } from './ExperienceSection';
import { ExperienceDetailPage } from './ExperienceDetailPage';
import { ThemeManager } from '../utils/theme';
import { Router } from '../utils/router';
import { projects } from '../data/projects';
import { hackathons } from '../data/hackathons';
import { experiences } from '../data/experiences';

export class App {
  private root: HTMLElement;
  private achievementsSection: AchievementsSection;
  private projectsSection: ProjectsSection;
  private projectDetailPage: ProjectDetailPage;
  private hackathonsSection: HackathonsSection;
  private hackathonDetailPage: HackathonDetailPage;
  private experienceSection: ExperienceSection;
  private experienceDetailPage: ExperienceDetailPage;
  private router: Router;

  constructor(rootId: string) {
    const root = document.getElementById(rootId);
    if (!root) throw new Error(`Root element #${rootId} not found`);
    this.root = root;
    this.achievementsSection = new AchievementsSection();
    this.projectsSection = new ProjectsSection();
    this.projectDetailPage = new ProjectDetailPage('project-detail-root');
    this.hackathonsSection = new HackathonsSection();
    this.hackathonDetailPage = new HackathonDetailPage('detail-root');
    this.experienceSection = new ExperienceSection();
    this.experienceDetailPage = new ExperienceDetailPage('detail-root');
    this.router = Router.getInstance();
  }

  init(): void {
    // Initialize theme
    ThemeManager.getInstance();

    // Render the app
    this.render();

    // Re-initialize detail page components after DOM is ready
    this.projectDetailPage = new ProjectDetailPage('project-detail-root');
    this.hackathonDetailPage = new HackathonDetailPage('detail-root');
    this.experienceDetailPage = new ExperienceDetailPage('detail-root');

    // Setup routing
    this.setupRouting();

    // Initialize smooth scroll for nav links
    this.initSmoothScroll();
  }

  private setupRouting(): void {
    this.router.onRouteChange(() => {
      const route = this.router.getCurrentRoute();
      const params = this.router.getParams();

      const mainContent = document.querySelector('.portfolio-main-content');

      // Check if we're on a detail page
      const isDetailPage = route.startsWith('/project/') ||
                          route.startsWith('/hackathon/') ||
                          route.startsWith('/experience/');

      // Show/hide main content
      if (mainContent) {
        if (isDetailPage) {
          (mainContent as HTMLElement).style.display = 'none';
        } else {
          (mainContent as HTMLElement).style.display = 'block';
        }
      }

      // Hide all detail pages first
      this.projectDetailPage.hide();
      this.hackathonDetailPage.hide();
      this.experienceDetailPage.hide();

      // Route to appropriate detail page
      if (route.startsWith('/project/') && params.id) {
        const project = projects.find(p => p.id === params.id);
        if (project) {
          this.projectDetailPage.render(project);
          window.scrollTo(0, 0);
        }
      } else if (route.startsWith('/hackathon/') && params.id) {
        const hackathon = hackathons.find(h => h.id === params.id);
        if (hackathon) {
          this.hackathonDetailPage.render(hackathon);
          window.scrollTo(0, 0);
        }
      } else if (route.startsWith('/experience/') && params.id) {
        const experience = experiences.find(e => e.id === params.id);
        if (experience) {
          this.experienceDetailPage.render(experience);
          window.scrollTo(0, 0);
        }
      }
    });

    // Trigger initial route
    this.router.onRouteChange(() => {});
  }

  private initSmoothScroll(): void {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  private render(): void {
    // Create full portfolio structure
    this.root.innerHTML = `
      <div class="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
        <div class="portfolio-main-content">
        <!-- Navigation -->
        <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/30 transition-all duration-300 shadow-lg">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
              <!-- Logo -->
              <div class="flex-shrink-0">
                <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Soham J Suryawanshi
                </h1>
              </div>

              <!-- Nav Links -->
              <div class="hidden md:flex items-center space-x-6">
                <a href="#hero" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-sm">Home</a>
                <a href="#about" class="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium text-sm">About</a>
                <a href="#experience" class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium text-sm">Experience</a>
                <a href="#hackathons" class="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium text-sm">Hackathons</a>
                <a href="#skills" class="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium text-sm">Skills</a>
                <a href="#projects" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-sm">Projects</a>
                <a href="#achievements" class="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium text-sm">Coding</a>
                <a href="#certifications" class="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors font-medium text-sm">Certifications</a>
                <a href="#contact" class="text-gray-700 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors font-medium text-sm">Contact</a>

                <!-- Theme Toggle -->
                <button id="theme-toggle" class="p-2 rounded-lg backdrop-blur-xl bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-700/80 border border-gray-200/50 dark:border-gray-600/50 transition-all hover:scale-110">
                  <svg class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path class="dark:hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                    <path class="hidden dark:block" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        <!-- Hero Section - Modern Dark Design -->
        <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 dark:from-black dark:via-blue-950 dark:to-purple-950">

          <!-- Animated Gradient Mesh Background -->
          <div class="absolute inset-0 opacity-30">
            <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-x"></div>
            <div class="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float"></div>
            <div class="absolute bottom-0 left-0 w-96 h-96 bg-violet-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float animation-delay-4000"></div>
          </div>

          <!-- Grid Pattern Overlay -->
          <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>

          <!-- Content Container -->
          <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div class="grid lg:grid-cols-2 gap-16 items-center">

              <!-- Left Side - Profile Image -->
              <div class="flex justify-center lg:justify-end order-2 lg:order-1">
                <div class="relative group">
                  <!-- Outer Glow Rings -->
                  <div class="absolute -inset-8 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 rounded-full opacity-0 group-hover:opacity-75 blur-2xl transition-all duration-1000 animate-pulse"></div>
                  <div class="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-30 blur-xl animate-spin-slow"></div>

                  <!-- Image Container -->
                  <div class="relative w-72 h-72 md:w-96 md:h-96">
                    <!-- Rotating Border -->
                    <div class="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 p-1 animate-spin-slow">
                      <div class="w-full h-full rounded-full bg-gray-950 dark:bg-black"></div>
                    </div>

                    <!-- Profile Image -->
                    <div class="absolute inset-2 rounded-full overflow-hidden border-4 border-gray-900 dark:border-black shadow-2xl">
                      <img
                        src="/images/profile/profile.jpg"
                        alt="Soham J Suryawanshi"
                        class="w-full h-full object-cover object-center scale-110 group-hover:scale-125 transition-transform duration-700"
                        style="object-position: center 35%;"
                        onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27%23a855f7%27%3E%3Cpath d=%27M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z%27/%3E%3C/svg%3E'"
                      />
                      <!-- Overlay Gradient -->
                      <div class="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    <!-- Floating Tech Icons -->
                    <div class="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce-glow group-hover:scale-110 transition-transform duration-300">
                      <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </div>
                    <div class="absolute -bottom-2 -left-6 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl animate-float animation-delay-2000 group-hover:scale-110 transition-transform duration-300">
                      <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Side - Text Content -->
              <div class="space-y-8 order-1 lg:order-2 text-center lg:text-left">

                <!-- Greeting -->
                <div class="animate-slide-up" style="opacity: 0;">
                  <span class="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 text-cyan-400 text-sm font-bold uppercase tracking-wider backdrop-blur-xl">
                    👋 Welcome to my portfolio
                  </span>
                </div>

                <!-- Main Heading -->
                <div class="space-y-4">
                  <h1 class="text-5xl md:text-6xl lg:text-7xl font-black leading-tight animate-clip-reveal" style="opacity: 0;">
                    <span class="block text-white">Soham J</span>
                    <span class="block bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Suryawanshi</span>
                  </h1>

                  <p class="text-2xl md:text-3xl font-bold text-gray-400 animate-slide-up animation-delay-200" style="opacity: 0;">
                    <span class="text-violet-400">@</span>OneTeraByte13
                  </p>
                </div>

                <!-- Role & Tagline -->
                <div class="space-y-4 animate-slide-up animation-delay-400" style="opacity: 0;">
                  <p class="text-xl md:text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                    AI/ML Engineer & Full-Stack Developer
                  </p>
                  <p class="text-lg text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Specializing in <span class="text-cyan-400 font-semibold">Deep Learning</span>, <span class="text-violet-400 font-semibold">Reinforcement Learning</span>, and <span class="text-fuchsia-400 font-semibold">LLMs</span>. Building intelligent systems with cutting-edge AI architectures.
                  </p>
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-3 gap-4 py-6 animate-slide-up animation-delay-600" style="opacity: 0;">
                  <div class="text-center">
                    <div class="text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">1250+</div>
                    <div class="text-sm text-gray-500 mt-1">Problems Solved</div>
                  </div>
                  <div class="text-center border-x border-gray-800">
                    <div class="text-3xl md:text-4xl font-black bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">15+</div>
                    <div class="text-sm text-gray-500 mt-1">Projects</div>
                  </div>
                  <div class="text-center">
                    <div class="text-3xl md:text-4xl font-black bg-gradient-to-r from-fuchsia-400 to-pink-500 bg-clip-text text-transparent">3+</div>
                    <div class="text-sm text-gray-500 mt-1">Years Exp</div>
                  </div>
                </div>

                <!-- CTA Buttons -->
                <div class="flex flex-wrap gap-4 justify-center lg:justify-start animate-slide-up animation-delay-800" style="opacity: 0;">
                  <a href="#projects" class="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-xl font-bold text-white shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 relative overflow-hidden">
                    <span class="relative z-10 flex items-center gap-2">
                      View Projects
                      <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                      </svg>
                    </span>
                    <div class="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>

                  <a href="#contact" class="px-8 py-4 bg-gray-900 border-2 border-violet-500/50 rounded-xl font-bold text-white hover:bg-violet-500/10 hover:border-violet-400 hover:scale-105 transition-all duration-300 shadow-xl">
                    Get in Touch
                  </a>
                </div>

                <!-- Social Links -->
                <div class="flex gap-4 justify-center lg:justify-start animate-slide-up animation-delay-900" style="opacity: 0;">
                  <a href="https://github.com/OneTeraByte7" target="_blank" class="group w-12 h-12 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-600 hover:border-transparent transition-all duration-300 hover:scale-110 hover:rotate-6">
                    <svg class="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                  <a href="https://linkedin.com/in/soham-suryawanshi" target="_blank" class="group w-12 h-12 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-violet-500 hover:to-purple-600 hover:border-transparent transition-all duration-300 hover:scale-110 hover:rotate-6">
                    <svg class="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href="mailto:soham@example.com" class="group w-12 h-12 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-fuchsia-500 hover:to-pink-600 hover:border-transparent transition-all duration-300 hover:scale-110 hover:rotate-6">
                    <svg class="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" class="group w-12 h-12 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-cyan-600 hover:border-transparent transition-all duration-300 hover:scale-110 hover:rotate-6">
                    <svg class="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                </div>
              </div>

            </div>
          </div>

          <!-- Scroll Indicator -->
          <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <a href="#about" class="flex flex-col items-center gap-2 text-gray-500 hover:text-violet-400 transition-colors">
              <span class="text-sm font-medium">Scroll Down</span>
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
              </svg>
            </a>
          </div>
        </section>

        <!-- About Section -->
        <section id="about" class="relative py-32 overflow-hidden backdrop-blur-xl bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 dark:from-gray-900/90 dark:via-purple-900/30 dark:to-blue-900/30">
          <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="mb-20">
              <h2 class="text-4xl md:text-5xl font-bold mb-6">
                <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  About Me
                </span>
              </h2>
            </div>

            <div class="space-y-16">
              <!-- Bio -->
              <div>
                <p class="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  I'm an AI & Machine Learning Engineer specializing in deep learning, reinforcement learning, and large language models. I build intelligent systems that solve real-world problems using PyTorch, TensorFlow, and modern ML architectures.
                </p>
                <p class="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  With experience in developing production-ready ML pipelines and a competitive programming background of 1250+ problems solved, I combine strong algorithmic thinking with practical engineering skills.
                </p>
              </div>

              <!-- Quick Facts -->
              <div class="grid md:grid-cols-3 gap-8">
                <div class="backdrop-blur-xl bg-white/50 dark:bg-gray-800/50 p-6 rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-lg hover:scale-105 transition-all duration-300">
                  <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Education</h3>
                  <p class="text-lg font-medium text-gray-900 dark:text-white">B.Tech in Computer Science</p>
                  <p class="text-gray-600 dark:text-gray-400">AI & ML Specialization</p>
                </div>
                <div class="backdrop-blur-xl bg-white/50 dark:bg-gray-800/50 p-6 rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-lg hover:scale-105 transition-all duration-300">
                  <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Experience</h3>
                  <p class="text-lg font-medium text-gray-900 dark:text-white">3+ Years</p>
                  <p class="text-gray-600 dark:text-gray-400">AI/ML & Full-Stack Development</p>
                </div>
                <div class="backdrop-blur-xl bg-white/50 dark:bg-gray-800/50 p-6 rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-lg hover:scale-105 transition-all duration-300">
                  <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Focus</h3>
                  <p class="text-lg font-medium text-gray-900 dark:text-white">LLMs, RL, Computer Vision</p>
                  <p class="text-gray-600 dark:text-gray-400">Production ML Systems</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Experience Section Container -->
        <div id="experience"></div>

        <!-- Hackathons Section Container -->
        <div id="hackathons"></div>

        <!-- Skills Section -->
        <section id="skills" class="relative py-32 overflow-hidden backdrop-blur-xl bg-gradient-to-br from-purple-50/80 via-blue-50/80 to-cyan-50/80 dark:from-gray-900/90 dark:via-blue-900/30 dark:to-cyan-900/30">
          <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="mb-20 animate-fade-in">
              <h2 class="text-4xl md:text-5xl font-bold mb-6">
                <span class="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Technical Skills
                </span>
              </h2>
            </div>

            <div class="grid md:grid-cols-2 gap-8">
              <!-- AI/ML -->
              <div class="backdrop-blur-xl bg-gradient-to-br from-blue-50/60 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/30 p-6 rounded-2xl border-2 border-blue-200/50 dark:border-blue-700/50 shadow-lg hover:scale-105 hover:shadow-blue-500/30 transition-all duration-300 animate-fade-in">
                <h3 class="text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">AI & Machine Learning</h3>
                <p class="text-gray-700 dark:text-gray-300">
                  PyTorch • TensorFlow • Scikit-learn • OpenCV • LangChain • Hugging Face
                </p>
              </div>

              <!-- Web Development -->
              <div class="backdrop-blur-xl bg-gradient-to-br from-purple-50/60 to-pink-50/60 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-2xl border-2 border-purple-200/50 dark:border-purple-700/50 shadow-lg hover:scale-105 hover:shadow-purple-500/30 transition-all duration-300 animate-fade-in animation-delay-200">
                <h3 class="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">Web Development</h3>
                <p class="text-gray-700 dark:text-gray-300">
                  React • TypeScript • Node.js • Express • MongoDB • Tailwind CSS
                </p>
              </div>

              <!-- Programming Languages -->
              <div class="backdrop-blur-xl bg-gradient-to-br from-green-50/60 to-teal-50/60 dark:from-green-900/30 dark:to-teal-900/30 p-6 rounded-2xl border-2 border-green-200/50 dark:border-green-700/50 shadow-lg hover:scale-105 hover:shadow-green-500/30 transition-all duration-300 animate-fade-in animation-delay-400">
                <h3 class="text-lg font-semibold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">Programming Languages</h3>
                <p class="text-gray-700 dark:text-gray-300">
                  Python • JavaScript • C++ • Java • SQL • Bash
                </p>
              </div>

              <!-- Cloud & DevOps -->
              <div class="backdrop-blur-xl bg-gradient-to-br from-orange-50/60 to-red-50/60 dark:from-orange-900/30 dark:to-red-900/30 p-6 rounded-2xl border-2 border-orange-200/50 dark:border-orange-700/50 shadow-lg hover:scale-105 hover:shadow-orange-500/30 transition-all duration-300 animate-fade-in animation-delay-600">
                <h3 class="text-lg font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">Cloud & DevOps</h3>
                <p class="text-gray-700 dark:text-gray-300">
                  AWS • Docker • Git • CI/CD • Linux • Kubernetes
                </p>
              </div>

              <!-- Data Analysis -->
              <div class="backdrop-blur-xl bg-gradient-to-br from-indigo-50/60 to-blue-50/60 dark:from-indigo-900/30 dark:to-blue-900/30 p-6 rounded-2xl border-2 border-indigo-200/50 dark:border-indigo-700/50 shadow-lg hover:scale-105 hover:shadow-indigo-500/30 transition-all duration-300 animate-fade-in animation-delay-800">
                <h3 class="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4">Data Analysis</h3>
                <p class="text-gray-700 dark:text-gray-300">
                  Pandas • NumPy • Matplotlib • Tableau • Power BI • Jupyter
                </p>
              </div>

              <!-- Tools & Others -->
              <div class="backdrop-blur-xl bg-gradient-to-br from-rose-50/60 to-pink-50/60 dark:from-rose-900/30 dark:to-pink-900/30 p-6 rounded-2xl border-2 border-rose-200/50 dark:border-rose-700/50 shadow-lg hover:scale-105 hover:shadow-rose-500/30 transition-all duration-300 animate-fade-in animation-delay-1000">
                <h3 class="text-lg font-semibold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">Tools & Others</h3>
                <p class="text-gray-700 dark:text-gray-300">
                  VS Code • Postman • Figma • Jira • Slack • Notion
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Projects Section -->
        <section id="projects" class="relative py-32 overflow-hidden backdrop-blur-xl bg-gradient-to-br from-cyan-50/80 via-blue-50/80 to-indigo-50/80 dark:from-gray-900/90 dark:via-indigo-900/30 dark:to-cyan-900/30">
          <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="mb-16 animate-fade-in">
              <h2 class="text-4xl md:text-5xl font-bold mb-4">
                <span class="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Featured Projects
                </span>
              </h2>
              <p class="text-lg text-gray-600 dark:text-gray-400">
                Selected work in AI/ML and full-stack development
              </p>
            </div>

            <div id="projects-grid" class="bento-grid"></div>
          </div>
        </section>

        <!-- Achievements Section Container -->
        <div id="achievements"></div>

        <!-- Certifications Section -->
        <section id="certifications" class="relative py-32 overflow-hidden backdrop-blur-xl bg-gradient-to-br from-pink-50/80 via-rose-50/80 to-purple-50/80 dark:from-gray-900/90 dark:via-pink-900/30 dark:to-purple-900/30">
          <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="mb-16 animate-fade-in">
              <h2 class="text-4xl md:text-5xl font-bold mb-4">
                <span class="bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 bg-clip-text text-transparent">
                  Certifications & Courses
                </span>
              </h2>
              <p class="text-lg text-gray-600 dark:text-gray-400">
                Continuous learning and professional development
              </p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <!-- Stanford Code in Place -->
              <div class="backdrop-blur-xl bg-gradient-to-br from-red-50/60 to-orange-50/60 dark:from-red-900/30 dark:to-orange-900/30 p-8 rounded-2xl border-2 border-red-200/50 dark:border-red-700/50 shadow-lg hover:scale-105 hover:shadow-red-500/30 transition-all duration-300 animate-fade-in">
                <div class="flex items-start gap-4 mb-4">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/></svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">CS106A Programming Methodologies</h3>
                    <p class="text-sm font-semibold text-red-600 dark:text-red-400 mb-3">Stanford University - Code in Place</p>
                  </div>
                </div>
                <p class="text-gray-600 dark:text-gray-400 text-sm">Fundamental programming concepts and methodologies</p>
              </div>

              <!-- Michigan Python -->
              <div class="backdrop-blur-xl bg-gradient-to-br from-blue-50/60 to-indigo-50/60 dark:from-blue-900/30 dark:to-indigo-900/30 p-8 rounded-2xl border-2 border-blue-200/50 dark:border-blue-700/50 shadow-lg hover:scale-105 hover:shadow-blue-500/30 transition-all duration-300 animate-fade-in animation-delay-200">
                <div class="flex items-start gap-4 mb-4">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/></svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Python Programming</h3>
                    <p class="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">University of Michigan</p>
                  </div>
                </div>
                <p class="text-gray-600 dark:text-gray-400 text-sm">Comprehensive Python programming and data structures</p>
              </div>

              <!-- ML Fundamentals -->
              <div class="backdrop-blur-xl bg-gradient-to-br from-purple-50/60 to-pink-50/60 dark:from-purple-900/30 dark:to-pink-900/30 p-8 rounded-2xl border-2 border-purple-200/50 dark:border-purple-700/50 shadow-lg hover:scale-105 hover:shadow-purple-500/30 transition-all duration-300 animate-fade-in animation-delay-400">
                <div class="flex items-start gap-4 mb-4">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/></svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Machine Learning Fundamentals</h3>
                    <p class="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-3">Coursera</p>
                  </div>
                </div>
                <p class="text-gray-600 dark:text-gray-400 text-sm">Core ML concepts, algorithms, and implementations</p>
              </div>

              <!-- AI Voice Agents -->
              <div class="backdrop-blur-xl bg-gradient-to-br from-green-50/60 to-teal-50/60 dark:from-green-900/30 dark:to-teal-900/30 p-8 rounded-2xl border-2 border-green-200/50 dark:border-green-700/50 shadow-lg hover:scale-105 hover:shadow-green-500/30 transition-all duration-300 animate-fade-in animation-delay-600">
                <div class="flex items-start gap-4 mb-4">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/></svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Building AI Voice Agents for Production</h3>
                    <p class="text-sm font-semibold text-green-600 dark:text-green-400 mb-3">DeepLearning.AI</p>
                  </div>
                </div>
                <p class="text-gray-600 dark:text-gray-400 text-sm">Production-ready AI voice agent development</p>
              </div>

              <!-- Stanford Ambassador -->
              <div class="backdrop-blur-xl bg-gradient-to-br from-yellow-50/60 to-amber-50/60 dark:from-yellow-900/30 dark:to-amber-900/30 p-8 rounded-2xl border-2 border-yellow-200/50 dark:border-yellow-700/50 shadow-lg hover:scale-105 hover:shadow-yellow-500/30 transition-all duration-300 animate-fade-in animation-delay-800">
                <div class="flex items-start gap-4 mb-4">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Global Ambassador</h3>
                    <p class="text-sm font-semibold text-yellow-600 dark:text-yellow-400 mb-3">Stanford Code in Place</p>
                  </div>
                </div>
                <p class="text-gray-600 dark:text-gray-400 text-sm">Representing Stanford's CS education initiative globally</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="relative py-20 overflow-hidden bg-gradient-to-br from-light-bg via-light-surface to-light-bg dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg">
          <div class="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none">
            <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-glow-pulse"></div>
            <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-glow-pulse animation-delay-2000"></div>
          </div>

          <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16 animate-fade-in">
              <h2 class="text-5xl md:text-6xl font-bold mb-4">
                <span class="bg-gradient-cyber bg-clip-text text-transparent animate-gradient-x">
                  Get In Touch
                </span>
              </h2>
              <div class="h-1 w-32 mx-auto bg-gradient-ocean rounded-full"></div>
              <p class="mt-6 text-lg text-gray-600 dark:text-gray-400">
                Let's collaborate on your next project
              </p>
            </div>

            <div class="max-w-2xl mx-auto backdrop-blur-xl bg-white/70 dark:bg-dark-elevated/70 rounded-2xl p-8 md:p-12 border border-light-border dark:border-dark-border animate-slide-in">
              <div class="space-y-6">
                <!-- Email -->
                <a href="mailto:soham@example.com" class="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg hover:scale-105 transition-all duration-300 group">
                  <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-cyber-blue-500 to-cyber-purple-500 flex items-center justify-center shadow-neon-blue">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-sm text-gray-600 dark:text-gray-400">Email</p>
                    <p class="text-lg font-semibold text-gray-900 dark:text-white">soham@example.com</p>
                  </div>
                  <svg class="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </a>

                <!-- LinkedIn -->
                <a href="https://linkedin.com/in/soham-suryawanshi" target="_blank" class="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg hover:scale-105 transition-all duration-300 group">
                  <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-cyber-blue-500 to-cyber-green-500 flex items-center justify-center shadow-neon-green">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-sm text-gray-600 dark:text-gray-400">LinkedIn</p>
                    <p class="text-lg font-semibold text-gray-900 dark:text-white">Connect with me</p>
                  </div>
                  <svg class="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>

                <!-- GitHub -->
                <a href="https://github.com/OneTeraByte7" target="_blank" class="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg hover:scale-105 transition-all duration-300 group">
                  <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-cyber-purple-500 to-cyber-orange-500 flex items-center justify-center shadow-neon-purple">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-sm text-gray-600 dark:text-gray-400">GitHub</p>
                    <p class="text-lg font-semibold text-gray-900 dark:text-white">@OneTeraByte7</p>
                  </div>
                  <svg class="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer class="relative py-8 border-t border-light-border dark:border-dark-border backdrop-blur-xl bg-white/80 dark:bg-dark-elevated/80">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
              <p class="text-gray-600 dark:text-gray-400">
                © 2025 Soham J Suryawanshi. Built with TypeScript & Tailwind CSS
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Designed with <span class="text-cyber-purple-500">♥</span> for innovation
              </p>
            </div>
          </div>
        </footer>
        </div>
        <!-- End of portfolio-main-content -->

        <!-- Detail Page Containers -->
        <div id="detail-root"></div>
        <div id="project-detail-root"></div>
      </div>
    `;

    // Render experience
    const experienceContainer = document.getElementById('experience');
    if (experienceContainer) {
      this.experienceSection.renderTo(experienceContainer);
    }

    // Render achievements
    const achievementsContainer = document.getElementById('achievements');
    if (achievementsContainer) {
      this.achievementsSection.renderTo(achievementsContainer);
    }

    // Render hackathons
    const hackathonsContainer = document.getElementById('hackathons');
    if (hackathonsContainer) {
      this.hackathonsSection.renderTo(hackathonsContainer);
    }

    // Render projects
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) {
      this.projectsSection.renderTo(projectsGrid);
    }

    // Setup theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        ThemeManager.getInstance().toggle();
      });
    }
  }
}
