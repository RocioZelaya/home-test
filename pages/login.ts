import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly welcomeMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[id="signin-button"]');
    this.welcomeMessage = page.locator('#welcome-message');
    this.errorMessage = page.locator('#message');
  }

  /**
   * Navigate to the login page
   * @throws {Error} When navigation fails
   */
  async goto(): Promise<void> {
    try {
      await super.goto('/login');
      await this.waitForPageLoad();
    } catch (error) {
      throw new Error(`Failed to navigate to login page: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Perform login with username and optional password
   * @param {string} username - The username to login with
   * @param {string} [password] - The password to login with (optional)
   * @throws {Error} When login fails
   */
  async login(username: string, password?: string): Promise<void> {
    try {
      if (!username || username.trim() === '') {
        throw new Error('Username is required');
      }

      await this.fillInput(this.usernameInput, username);
      
      if (password) {
        await this.fillInput(this.passwordInput, password);
      }
      
      await this.clickElement(this.loginButton);
    } catch (error) {
      throw new Error(`Login failed for user "${username}": ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get the welcome message text
   * @returns {Promise<string | null>} The welcome message text or null if not found
   * @throws {Error} When unable to retrieve welcome message
   */
  async getWelcomeMessage(): Promise<string | null> {
    try {
      return await this.getText(this.welcomeMessage);
    } catch (error) {
      throw new Error(`Failed to get welcome message: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get the error message text
   * @returns {Promise<string | null>} The error message text or null if not found
   * @throws {Error} When unable to retrieve error message
   */
  async getErrorMessage(): Promise<string | null> {
    try {
      return await this.getText(this.errorMessage);
    } catch (error) {
      throw new Error(`Failed to get error message: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

}
