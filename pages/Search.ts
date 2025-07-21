import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
  readonly searchBarInput: Locator;
  readonly searchButton: Locator;
  readonly searchResults: Locator;

  constructor(page: Page) {
    super(page);
    this.searchBarInput = page.locator('input[name="searchWord"]');
    this.searchButton = page.locator('button[type="submit"]');
    this.searchResults = page.locator('#result');
  }

  /**
   * Navigate to the search page
   * @throws {Error} When navigation fails
   */
  async goto(): Promise<void> {
    try {
      await super.goto('/search');
      await this.waitForPageLoad();
    } catch (error) {
      throw new Error(`Failed to navigate to search page: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Perform a search with the given search term
   * @param {string} searchTerm - The search term to look for
   * @throws {Error} When search fails
   */
  async search(searchTerm: string): Promise<void> {
    try {
      await this.fillInput(this.searchBarInput, searchTerm);
      await this.clickElement(this.searchButton);
    } catch (error) {
      throw new Error(`Search failed for term "${searchTerm}": ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get the search results text
   * @returns {Promise<string | null>} The search results text or null if not found
   * @throws {Error} When unable to retrieve search results
   */
  async getSearchResultsText(): Promise<string | null> {
    try {
      await this.waitForElement(this.searchResults);
      
      // Wait for the loading message to disappear and actual result to appear
      await this.page.waitForFunction(() => {
        const resultElement = document.querySelector('#result');
        if (!resultElement) return false;
        const text = resultElement.textContent || '';
        return text !== 'searching...' && text.trim() !== '';
      });
      
      return await this.getText(this.searchResults);
    } catch (error) {
      throw new Error(`Failed to get search results: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}