/**
 * Navigation utilities
 */

export class NavigationManager {
  static initMobileMenu(): void {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn?.addEventListener('click', () => {
      mobileMenu?.classList.toggle('hidden');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (
        !mobileMenu?.contains(target) &&
        !mobileMenuBtn?.contains(target) &&
        !mobileMenu?.classList.contains('hidden')
      ) {
        mobileMenu?.classList.add('hidden');
      }
    });
  }
}
