import { type Locator, type Page } from '@playwright/test';

export class LoginPage {

  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly welcomeMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[id="signin-button"]');
    this.welcomeMessage = page.locator('#welcome-message');
    this.errorMessage = page.locator('#message');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(username: string, password?: string) {
    await this.usernameInput.fill(username);
    if (password) {
      await this.passwordInput.fill(password);
    }
    await this.loginButton.click();
  }
}