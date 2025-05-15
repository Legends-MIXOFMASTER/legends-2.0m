export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  constructor() {
    this.init();
  }

  private init(): void {
    // Initialize any required auth state
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  public async login(email: string, password: string): Promise<string> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      this.setToken(data.token);
      return data.token;
    } catch (error) {
      throw new Error('Authentication failed');
    }
  }
}
