import './style.css';

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
  // Dark mode toggle functionality
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');

    if (isDark) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  // Initialize theme
  initTheme();

  // Add theme toggle listeners (both desktop and mobile)
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  themeToggle?.addEventListener('click', toggleTheme);
  themeToggleMobile?.addEventListener('click', toggleTheme);

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
  });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e: Event) => {
      e.preventDefault();
      const target = document.querySelector(
        (anchor as HTMLAnchorElement).getAttribute('href')!
      );
      target?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      // Close mobile menu if open
      mobileMenu?.classList.add('hidden');
    });
  });

  // Enhanced Navbar with glassmorphism on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar?.classList.add('bg-white/80', 'dark:bg-gray-900/80', 'backdrop-blur-lg', 'shadow-lg');
      navbar?.classList.remove('bg-white', 'dark:bg-gray-900');
    } else {
      navbar?.classList.remove('bg-white/80', 'dark:bg-gray-900/80', 'backdrop-blur-lg', 'shadow-lg');
      navbar?.classList.add('bg-white', 'dark:bg-gray-900');
    }
  });

  // Intersection Observer for staggered fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-fade-in');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-section').forEach((el) => {
    observer.observe(el);
  });

  // Parallax effect for hero section
  const heroSection = document.getElementById('home');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (heroSection) {
      heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Add floating animation to profile picture
  const profileImg = document.getElementById('profile-img');
  if (profileImg) {
    profileImg.classList.add('animate-float');
  }

  // Staggered animation for skill badges
  const skillBadges = document.querySelectorAll('.skill-badge');
  skillBadges.forEach((badge, index) => {
    badge.classList.add('opacity-0');
    setTimeout(() => {
      badge.classList.remove('opacity-0');
      badge.classList.add('animate-slide-up');
    }, index * 50);
  });

  // Card hover tilt effect
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = (card as HTMLElement).getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left;
      const y = mouseEvent.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      (card as HTMLElement).style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      (card as HTMLElement).style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });

  // Cursor trail effect (optional futuristic touch)
  let cursorTrail: HTMLDivElement[] = [];
  const maxTrailLength = 20;

  document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: linear-gradient(to right, #3b82f6, #06b6d4);
      pointer-events: none;
      left: ${e.clientX - 4}px;
      top: ${e.clientY - 4}px;
      opacity: 0.5;
      z-index: 9999;
      animation: cursorFade 0.6s ease-out forwards;
    `;

    document.body.appendChild(trail);
    cursorTrail.push(trail);

    if (cursorTrail.length > maxTrailLength) {
      const oldTrail = cursorTrail.shift();
      oldTrail?.remove();
    }

    setTimeout(() => trail.remove(), 600);
  });

  // Add cursor fade animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes cursorFade {
      to {
        opacity: 0;
        transform: scale(0);
      }
    }
  `;
  document.head.appendChild(style);
});
