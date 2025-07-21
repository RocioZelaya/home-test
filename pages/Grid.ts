import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class GridPage extends BasePage {
  readonly menuContainer: Locator;
  readonly menuItem: Locator;
  readonly menuItemPosition: Locator;
  readonly menuItemName: Locator;
  readonly menuItemPrice: Locator;
  readonly menuItemImage: Locator;
  readonly menuItemAddToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.menuContainer = page.locator('#menu, .grid-container');
    this.menuItem = page.locator('.item');
    this.menuItemPosition = this.menuItem.locator('[data-test-id="card-number"]');
    this.menuItemName = this.menuItem.locator('[data-test-id="item-name"]');
    this.menuItemPrice = this.menuItem.locator('#item-price');
    this.menuItemImage = this.menuItem.locator('img');
    this.menuItemAddToCartButton = this.menuItem.getByRole('button', { name: 'Add to Cart' });
  }

  /**
   * Navigate to the grid page
   * @throws {Error} When navigation fails
   */
  async goto(): Promise<void> {
    try {
      await super.goto('/grid');
      await this.waitForPageLoad();
    } catch (error) {
      throw new Error(`Failed to navigate to grid page: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get a specific menu item by position
   * @param {number} position - The position number of the menu item
   * @returns {Locator} The locator for the menu item at the specified position
   * @throws {Error} When position is invalid
   */
  getMenuItemByPosition(position: number): Locator {
    try {
      if (position <= 0) {
        throw new Error('Position must be greater than 0');
      }
      return this.page.locator(`.item:has([data-test-id="card-number"]:text("${position}"))`);
    } catch (error) {
      throw new Error(`Failed to get menu item at position ${position}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get the name of a specific menu item
   * @param {number} position - The position number of the menu item
   * @returns {Promise<string | null>} The name of the menu item or null if not found
   * @throws {Error} When unable to retrieve menu item name
   */
  async getMenuItemName(position: number): Promise<string | null> {
    try {
      const item = this.getMenuItemByPosition(position);
      const nameElement = item.locator('[data-test-id="item-name"]');
      return this.getText(nameElement);
    } catch (error) {
      throw new Error(`Failed to get menu item name at position ${position}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get the price of a specific menu item
   * @param {number} position - The position number of the menu item
   * @returns {Promise<string | null>} The price of the menu item or null if not found
   * @throws {Error} When unable to retrieve menu item price
   */
  async getMenuItemPrice(position: number): Promise<string | null> {
    try {
      const item = this.getMenuItemByPosition(position);
      const priceElement = item.locator('#item-price');
      return this.getText(priceElement);
    } catch (error) {
      throw new Error(`Failed to get menu item price at position ${position}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get all menu items
   * @returns {Promise<Locator[]>} Array of all menu item locators
   * @throws {Error} When unable to retrieve menu items
   */
  async getAllMenuItems(): Promise<Locator[]> {
    try {
      return this.menuItem.all();
    } catch (error) {
      throw new Error(`Failed to get all menu items: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Validate that all menu items have required properties
   * @returns {Promise<boolean>} True if all items have required properties, false otherwise
   * @throws {Error} When validation fails
   */
  async validateAllItemsHaveRequiredProperties(): Promise<boolean> {
    try {
      const items = await this.getAllMenuItems();
      
      for (const item of items) {
        const name = await this.getText(item.locator('[data-test-id="item-name"]'));
        const price = await this.getText(item.locator('#item-price'));
        const image = await item.locator('img').getAttribute('src');
        const button = await this.isVisible(item.getByRole('button'));

        if (!name?.trim() || !price?.trim() || !image?.trim() || !button) {
          return false;
        }
      }
      
      return true;
    } catch (error) {
      throw new Error(`Failed to validate menu items: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}