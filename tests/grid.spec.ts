import { test, expect, Page } from '@playwright/test';
import { GridPage } from '../pages/Grid';

const EXPECTED_POSITION = 7;
const EXPECTED_PRODUCT_NAME = 'Super Pepperoni';
const EXPECTED_PRICE = '$10';

test.describe('Grid Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    const gridPage = new GridPage(page);
    await gridPage.goto();
  });

  test('Test Case 1: Grid Item Test', async ({ page }) => {
    const gridPage = new GridPage(page);

    const itemName = await gridPage.getMenuItemName(EXPECTED_POSITION);
    expect(itemName).toContain(EXPECTED_PRODUCT_NAME);

    const itemPrice = await gridPage.getMenuItemPrice(EXPECTED_POSITION);
    expect(itemPrice).toBe(EXPECTED_PRICE);
  });

  test('Test Case 2: Grid All Items Test', async ({ page }) => {
    const gridPage = new GridPage(page);

    const allItemsValid = await gridPage.validateAllItemsHaveRequiredProperties();
    expect(allItemsValid).toBe(true);
  });

  test.afterEach(async ({ page }) => {
    const gridPage = new GridPage(page);
    await gridPage.cleanup();
  });
}); 