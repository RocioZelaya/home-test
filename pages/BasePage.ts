import { type Locator, type Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param {string} url - The URL to navigate to
   * @throws {Error} When navigation fails
   */
  async goto(url: string): Promise<void> {
    try {
      await this.page.goto(url);
    } catch (error) {
      throw new Error(`Failed to navigate to ${url}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Wait for page to be loaded
   * @throws {Error} When page load fails
   */
  async waitForPageLoad(): Promise<void> {
    try {
      await this.page.waitForLoadState('domcontentloaded');
    } catch (error) {
      throw new Error(`Failed to wait for page load: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Wait for a specific element to be visible
   * @param {Locator} locator - The locator for the element to wait for
   * @throws {Error} When element is not found or not visible
   */
  async waitForElement(locator: Locator): Promise<void> {
    try {
      await locator.waitFor({ state: 'visible' });
    } catch (error) {
      throw new Error(`Element not found or not visible: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Click on an element with retry logic
   * @param {Locator} locator - The locator for the element to click
   * @throws {Error} When element is not clickable
   */
  async clickElement(locator: Locator): Promise<void> {
    try {
      await locator.waitFor({ state: 'visible' });
      await locator.click();
    } catch (error) {
      throw new Error(`Failed to click element: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Fill an input field with text
   * @param {Locator} locator - The locator for the input field
   * @param {string} text - The text to fill in the input field
   * @throws {Error} When input field is not fillable
   */
  async fillInput(locator: Locator, text: string): Promise<void> {
    try {
      await locator.waitFor({ state: 'visible' });
      await locator.fill(text);
    } catch (error) {
      throw new Error(`Failed to fill input with text "${text}": ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get text content of an element
   * @param {Locator} locator - The locator for the element
   * @returns {Promise<string | null>} The text content or null if not found
   * @throws {Error} When element is not accessible
   */
  async getText(locator: Locator): Promise<string | null> {
    try {
      await locator.waitFor({ state: 'visible' });
      const text = await locator.textContent();
      return text || '';
    } catch (error) {
      throw new Error(`Failed to get text from element: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Check if an element is visible
   * @param {Locator} locator - The locator for the element
   * @returns {Promise<boolean>} True if the element is visible, false otherwise
   */
  async isVisible(locator: Locator): Promise<boolean> {
    try {
      return await locator.isVisible();
    } catch (error) {
      throw new Error(`Failed to check if element is visible: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Cleanup resources, such as closing the page
   */
  async cleanup(): Promise<void> {
    await this.page.close();
  }
} 