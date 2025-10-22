/**
 * Elegant animation utilities for futuristic portfolio
 * No aggressive card tilts - only smooth, professional transitions
 */

export class AnimationManager {
  /**
   * Initialize smooth fade-in animations for sections
   */
  static initFadeInObserver(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach((el) => {
      observer.observe(el);
    });
  }

  /**
   * Subtle parallax effect for hero section
   */
  static initParallax(): void {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          // Very subtle parallax
          if (heroSection && scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${scrolled * 0.2}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * Smooth navbar scroll effect
   */
  static initNavbarScroll(): void {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            navbar.classList.add('backdrop-blur-xl', 'bg-white/80', 'dark:bg-dark-surface/80');
            navbar.classList.remove('bg-white', 'dark:bg-gray-900');
          } else {
            navbar.classList.remove('backdrop-blur-xl', 'bg-white/80', 'dark:bg-dark-surface/80');
            navbar.classList.add('bg-white', 'dark:bg-gray-900');
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * Smooth scroll for navigation links
   */
  static initSmoothScroll(): void {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e: Event) => {
        const href = (anchor as HTMLAnchorElement).getAttribute('href');
        if (!href || href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });

          // Close mobile menu if open
          const mobileMenu = document.getElementById('mobile-menu');
          mobileMenu?.classList.add('hidden');
        }
      });
    });
  }

  /**
   * Staggered animation for elements
   */
  static initStaggeredAnimations(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll('[data-stagger]');
          elements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('animate-slide-in');
            }, index * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-stagger-container]').forEach(container => {
      observer.observe(container);
    });
  }

  /**
   * Initialize all animations
   */
  static initAll(): void {
    this.initFadeInObserver();
    this.initParallax();
    this.initNavbarScroll();
    this.initSmoothScroll();
    this.initStaggeredAnimations();
  }
}
