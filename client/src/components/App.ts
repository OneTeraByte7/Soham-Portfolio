import { AchievementsSection } from './AchievementsSection';
import { ProjectsSection } from './ProjectsSection';
import { ProjectDetailPage } from './ProjectDetailPage';
import { HackathonsSection } from './HackathonsSection';
import { ThemeManager } from '../utils/theme';
import { Router } from '../utils/router';
import { projects } from '../data/projects';

export class App {
  private root: HTMLElement;
  private achievementsSection: AchievementsSection;
  private projectsSection: ProjectsSection;
  private projectDetailPage: ProjectDetailPage;
  private hackathonsSection: HackathonsSection;
  private router: Router;

  constructor(rootId: string) {
    const root = document.getElementById(rootId);
    if (!root) throw new Error(`Root element #${rootId} not found`);
    this.root = root;
    this.achievementsSection = new AchievementsSection();
    this.projectsSection = new ProjectsSection();
    this.projectDetailPage = new ProjectDetailPage('project-detail-root');
    this.hackathonsSection = new HackathonsSection();
    this.router = Router.getInstance();
  }

  init(): void {
    // Initialize theme
    ThemeManager.getInstance();

    // Render the app
    this.render();

    // Setup routing
    this.setupRouting();

    // Initialize smooth scroll for nav links
    this.initSmoothScroll();
  }

  private setupRouting(): void {
    this.router.onRouteChange(() => {
      const route = this.router.getCurrentRoute();
      const params = this.router.getParams();

      if (route.startsWith('/project/') && params.id) {
        const project = projects.find(p => p.id === params.id);
        if (project) {
          this.projectDetailPage.render(project);
        }
      } else {
        this.projectDetailPage.hide();
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
        <!-- Navigation -->
        <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-dark-elevated/80 border-b border-light-border dark:border-dark-border transition-all duration-300">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
              <!-- Logo -->
              <div class="flex-shrink-0">
                <h1 class="text-2xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
                  Soham J Suryawanshi
                </h1>
              </div>

              <!-- Nav Links -->
              <div class="hidden md:flex items-center space-x-8">
                <a href="#hero" class="text-gray-700 dark:text-gray-300 hover:text-cyber-blue-500 dark:hover:text-cyber-blue-400 transition-colors font-medium">Home</a>
                <a href="#about" class="text-gray-700 dark:text-gray-300 hover:text-cyber-blue-500 dark:hover:text-cyber-blue-400 transition-colors font-medium">About</a>
                <a href="#skills" class="text-gray-700 dark:text-gray-300 hover:text-cyber-blue-500 dark:hover:text-cyber-blue-400 transition-colors font-medium">Skills</a>
                <a href="#projects" class="text-gray-700 dark:text-gray-300 hover:text-cyber-blue-500 dark:hover:text-cyber-blue-400 transition-colors font-medium">Projects</a>
                <a href="#achievements" class="text-gray-700 dark:text-gray-300 hover:text-cyber-blue-500 dark:hover:text-cyber-blue-400 transition-colors font-medium">Achievements</a>
                <a href="#hackathons" class="text-gray-700 dark:text-gray-300 hover:text-cyber-blue-500 dark:hover:text-cyber-blue-400 transition-colors font-medium">Hackathons</a>
                <a href="#contact" class="text-gray-700 dark:text-gray-300 hover:text-cyber-blue-500 dark:hover:text-cyber-blue-400 transition-colors font-medium">Contact</a>

                <!-- Theme Toggle -->
                <button id="theme-toggle" class="p-2 rounded-lg bg-light-surface dark:bg-dark-surface hover:bg-light-border dark:hover:bg-dark-border transition-colors">
                  <svg class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path class="dark:hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                    <path class="hidden dark:block" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        <!-- Hero Section -->
        <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
          <!-- Animated Background -->
          <div class="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none">
            <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-glow-pulse"></div>
            <div class="absolute top-1/2 right-1/4 w-96 h-96 bg-cyber-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-glow-pulse animation-delay-2000"></div>
            <div class="absolute bottom-1/4 left-1/2 w-96 h-96 bg-cyber-green-500 rounded-full mix-blend-multiply filter blur-3xl animate-glow-pulse animation-delay-4000"></div>
          </div>

          <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <!-- Profile Image -->
            <div class="mb-8 animate-fade-in">
              <div class="relative inline-block">
                <div class="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-cyber-blue-500 via-cyber-purple-500 to-cyber-green-500 p-1 shadow-neon-blue animate-glow-pulse">
                  <div class="w-full h-full rounded-full bg-white dark:bg-dark-elevated overflow-hidden">
                    <img src="/images/profile/profile.jpg" alt="Soham J Suryawanshi" class="w-full h-full object-cover" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27%2300a0ff%27%3E%3Cpath d=%27M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z%27/%3E%3C/svg%3E'" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Text Content -->
            <h1 class="text-5xl md:text-7xl font-bold mb-6 animate-slide-in">
              <span class="bg-gradient-cyber bg-clip-text text-transparent animate-gradient-x">
                Soham J Suryawanshi
              </span>
            </h1>

            <p class="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-4 animate-slide-in animation-delay-200">
              Software Developer & AI Engineer
            </p>

            <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 animate-slide-in animation-delay-400">
              Building intelligent systems with cutting-edge AI/ML technologies and modern web frameworks
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-wrap items-center justify-center gap-4 animate-slide-in animation-delay-600">
              <a href="#projects" class="px-8 py-4 rounded-xl bg-gradient-to-r from-cyber-blue-500 to-cyber-purple-500 text-white font-semibold shadow-neon-blue hover:shadow-neon-purple hover:scale-105 transition-all duration-300">
                View My Work
              </a>
              <a href="#contact" class="px-8 py-4 rounded-xl backdrop-blur-xl bg-white/70 dark:bg-dark-elevated/70 border border-light-border dark:border-dark-border text-gray-900 dark:text-white font-semibold hover:scale-105 transition-all duration-300">
                Get In Touch
              </a>
            </div>

            <!-- Social Links -->
            <div class="flex items-center justify-center gap-6 mt-12 animate-fade-in animation-delay-800">
              <a href="https://github.com/OneTeraByte7" target="_blank" class="p-3 rounded-lg bg-light-surface dark:bg-dark-surface hover:bg-cyber-blue-500 hover:text-white transition-all duration-300 hover:scale-110">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://linkedin.com/in/soham-suryawanshi" target="_blank" class="p-3 rounded-lg bg-light-surface dark:bg-dark-surface hover:bg-cyber-blue-500 hover:text-white transition-all duration-300 hover:scale-110">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="mailto:soham@example.com" class="p-3 rounded-lg bg-light-surface dark:bg-dark-surface hover:bg-cyber-blue-500 hover:text-white transition-all duration-300 hover:scale-110">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </a>
            </div>
          </div>

          <!-- Scroll Indicator -->
          <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg class="w-6 h-6 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
          </div>
        </section>

        <!-- About Section -->
        <section id="about" class="relative py-20 overflow-hidden">
          <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16 animate-fade-in">
              <h2 class="text-5xl md:text-6xl font-bold mb-4">
                <span class="bg-gradient-cyber bg-clip-text text-transparent animate-gradient-x">
                  About Me
                </span>
              </h2>
              <div class="h-1 w-32 mx-auto bg-gradient-ocean rounded-full"></div>
            </div>

            <div class="backdrop-blur-xl bg-white/70 dark:bg-dark-elevated/70 rounded-2xl p-8 md:p-12 border border-light-border dark:border-dark-border animate-slide-in">
              <div class="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Passionate About Innovation
                  </h3>
                  <p class="text-lg text-gray-600 dark:text-gray-400 mb-4">
                    I'm a software developer and AI engineer with a strong focus on building intelligent systems that solve real-world problems. My expertise spans across machine learning, deep learning, and full-stack development.
                  </p>
                  <p class="text-lg text-gray-600 dark:text-gray-400 mb-4">
                    With experience in competitive programming and numerous hackathon victories, I bring both theoretical knowledge and practical problem-solving skills to every project.
                  </p>
                  <p class="text-lg text-gray-600 dark:text-gray-400">
                    Currently exploring cutting-edge technologies in AI/ML, including Large Language Models, Reinforcement Learning, and Computer Vision.
                  </p>
                </div>
                <div class="space-y-4">
                  <div class="p-6 rounded-xl bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg border border-cyber-blue-500/20">
                    <h4 class="text-xl font-bold text-cyber-blue-500 mb-2">Education</h4>
                    <p class="text-gray-700 dark:text-gray-300">B.Tech in Computer Science</p>
                    <p class="text-gray-600 dark:text-gray-400 text-sm">Specialization in AI & ML</p>
                  </div>
                  <div class="p-6 rounded-xl bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg border border-cyber-green-500/20">
                    <h4 class="text-xl font-bold text-cyber-green-500 mb-2">Experience</h4>
                    <p class="text-gray-700 dark:text-gray-300">3+ Years</p>
                    <p class="text-gray-600 dark:text-gray-400 text-sm">In AI/ML & Web Development</p>
                  </div>
                  <div class="p-6 rounded-xl bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg border border-cyber-purple-500/20">
                    <h4 class="text-xl font-bold text-cyber-purple-500 mb-2">Focus Areas</h4>
                    <p class="text-gray-700 dark:text-gray-300">AI/ML, Full-Stack, Cloud</p>
                    <p class="text-gray-600 dark:text-gray-400 text-sm">Building scalable solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Skills Section -->
        <section id="skills" class="relative py-20 overflow-hidden bg-gradient-to-br from-light-bg via-light-surface to-light-bg dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg">
          <div class="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none">
            <div class="absolute top-0 right-1/4 w-96 h-96 bg-cyber-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-glow-pulse"></div>
            <div class="absolute bottom-0 left-1/4 w-96 h-96 bg-cyber-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-glow-pulse animation-delay-2000"></div>
          </div>

          <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16 animate-fade-in">
              <h2 class="text-5xl md:text-6xl font-bold mb-4">
                <span class="bg-gradient-cyber bg-clip-text text-transparent animate-gradient-x">
                  Technical Skills
                </span>
              </h2>
              <div class="h-1 w-32 mx-auto bg-gradient-ocean rounded-full"></div>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <!-- AI/ML -->
              <div class="backdrop-blur-xl bg-white/70 dark:bg-dark-elevated/70 rounded-2xl p-8 border border-light-border dark:border-dark-border hover:scale-105 transition-all duration-300 hover:shadow-neon-blue animate-slide-in">
                <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-cyber-blue-500 to-cyber-purple-500 flex items-center justify-center mb-6 shadow-neon-blue">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">AI & Machine Learning</h3>
                <div class="flex flex-wrap gap-2">
                  ${['PyTorch', 'TensorFlow', 'Scikit-learn', 'OpenCV', 'LangChain', 'Hugging Face'].map(skill => `
                    <span class="px-3 py-1 rounded-lg bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg text-sm font-medium text-gray-700 dark:text-gray-300 border border-cyber-blue-500/20">${skill}</span>
                  `).join('')}
                </div>
              </div>

              <!-- Web Development -->
              <div class="backdrop-blur-xl bg-white/70 dark:bg-dark-elevated/70 rounded-2xl p-8 border border-light-border dark:border-dark-border hover:scale-105 transition-all duration-300 hover:shadow-neon-green animate-slide-in animation-delay-200">
                <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-cyber-green-500 to-cyber-blue-500 flex items-center justify-center mb-6 shadow-neon-green">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Web Development</h3>
                <div class="flex flex-wrap gap-2">
                  ${['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'].map(skill => `
                    <span class="px-3 py-1 rounded-lg bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg text-sm font-medium text-gray-700 dark:text-gray-300 border border-cyber-green-500/20">${skill}</span>
                  `).join('')}
                </div>
              </div>

              <!-- Cloud & DevOps -->
              <div class="backdrop-blur-xl bg-white/70 dark:bg-dark-elevated/70 rounded-2xl p-8 border border-light-border dark:border-dark-border hover:scale-105 transition-all duration-300 hover:shadow-neon-orange animate-slide-in animation-delay-400">
                <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-cyber-orange-500 to-cyber-purple-500 flex items-center justify-center mb-6 shadow-neon-orange">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cloud & DevOps</h3>
                <div class="flex flex-wrap gap-2">
                  ${['AWS', 'Docker', 'Git', 'CI/CD', 'Linux', 'Kubernetes'].map(skill => `
                    <span class="px-3 py-1 rounded-lg bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg text-sm font-medium text-gray-700 dark:text-gray-300 border border-cyber-orange-500/20">${skill}</span>
                  `).join('')}
                </div>
              </div>

              <!-- Programming Languages -->
              <div class="backdrop-blur-xl bg-white/70 dark:bg-dark-elevated/70 rounded-2xl p-8 border border-light-border dark:border-dark-border hover:scale-105 transition-all duration-300 hover:shadow-neon-purple animate-slide-in animation-delay-600">
                <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-cyber-purple-500 to-cyber-blue-500 flex items-center justify-center mb-6 shadow-neon-purple">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Programming Languages</h3>
                <div class="flex flex-wrap gap-2">
                  ${['Python', 'JavaScript', 'C++', 'Java', 'SQL', 'Bash'].map(skill => `
                    <span class="px-3 py-1 rounded-lg bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg text-sm font-medium text-gray-700 dark:text-gray-300 border border-cyber-purple-500/20">${skill}</span>
                  `).join('')}
                </div>
              </div>

              <!-- Data Analysis -->
              <div class="backdrop-blur-xl bg-white/70 dark:bg-dark-elevated/70 rounded-2xl p-8 border border-light-border dark:border-dark-border hover:scale-105 transition-all duration-300 hover:shadow-neon-green animate-slide-in animation-delay-800">
                <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-cyber-green-500 to-cyber-orange-500 flex items-center justify-center mb-6 shadow-neon-green">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Analysis</h3>
                <div class="flex flex-wrap gap-2">
                  ${['Pandas', 'NumPy', 'Matplotlib', 'Tableau', 'Power BI', 'Jupyter'].map(skill => `
                    <span class="px-3 py-1 rounded-lg bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg text-sm font-medium text-gray-700 dark:text-gray-300 border border-cyber-green-500/20">${skill}</span>
                  `).join('')}
                </div>
              </div>

              <!-- Tools & Others -->
              <div class="backdrop-blur-xl bg-white/70 dark:bg-dark-elevated/70 rounded-2xl p-8 border border-light-border dark:border-dark-border hover:scale-105 transition-all duration-300 hover:shadow-neon-blue animate-slide-in animation-delay-1000">
                <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-cyber-blue-500 to-cyber-green-500 flex items-center justify-center mb-6 shadow-neon-blue">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tools & Others</h3>
                <div class="flex flex-wrap gap-2">
                  ${['VS Code', 'Postman', 'Figma', 'Jira', 'Slack', 'Notion'].map(skill => `
                    <span class="px-3 py-1 rounded-lg bg-gradient-to-r from-light-surface to-light-bg dark:from-dark-surface dark:to-dark-bg text-sm font-medium text-gray-700 dark:text-gray-300 border border-cyber-blue-500/20">${skill}</span>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Projects Section -->
        <section id="projects" class="relative py-20 overflow-hidden">
          <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16 animate-fade-in">
              <h2 class="text-5xl md:text-6xl font-bold mb-4">
                <span class="bg-gradient-cyber bg-clip-text text-transparent animate-gradient-x">
                  Featured Projects
                </span>
              </h2>
              <div class="h-1 w-32 mx-auto bg-gradient-ocean rounded-full"></div>
              <p class="mt-6 text-lg text-gray-600 dark:text-gray-400">
                Showcasing my latest work in AI/ML and full-stack development
              </p>
            </div>

            <div id="projects-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"></div>
          </div>
        </section>

        <!-- Achievements Section Container -->
        <div id="achievements"></div>

        <!-- Hackathons Section Container -->
        <div id="hackathons"></div>

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

        <!-- Project Detail Page Container -->
        <div id="project-detail-root"></div>
      </div>
    `;

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
