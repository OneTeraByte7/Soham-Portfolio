/**
 * Simple hash-based router for project navigation
 */

export class Router {
  private static instance: Router;
  private currentRoute: string = '';
  private listeners: Array<(route: string) => void> = [];

  private constructor() {
    this.init();
  }

  static getInstance(): Router {
    if (!Router.instance) {
      Router.instance = new Router();
    }
    return Router.instance;
  }

  private init(): void {
    window.addEventListener('hashchange', () => this.handleRouteChange());
    window.addEventListener('load', () => this.handleRouteChange());
  }

  private handleRouteChange(): void {
    const hash = window.location.hash.slice(1); // Remove #
    this.currentRoute = hash || '/';
    this.notifyListeners();
  }

  public navigate(path: string): void {
    window.location.hash = path;
  }

  public onRouteChange(callback: (route: string) => void): void {
    this.listeners.push(callback);
  }

  public getCurrentRoute(): string {
    return this.currentRoute;
  }

  public getParams(): Record<string, string> {
    const route = this.currentRoute;
    const params: Record<string, string> = {};

    // Parse route like /project/my-project-id
    const parts = route.split('/').filter(p => p);
    if (parts.length >= 2) {
      params.type = parts[0];
      params.id = parts[1];
    }

    return params;
  }

  private notifyListeners(): void {
    this.listeners.forEach(callback => callback(this.currentRoute));
  }

  public goBack(): void {
    window.history.back();
  }
}
