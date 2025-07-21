import { test, expect, Page } from '@playwright/test';
import { CheckoutPage } from '../pages/Checkout';

const MIN_ORDER_NUMBER_LENGTH = 0;

const CHECKOUT_FORM_DATA = {
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  address: '123 Main Street',
  city: 'New York',
  state: 'NY',
  zip: '10001',
  nameOnCard: 'John Doe',
  cardNumber: '4111111111111111',
  expMonth: 'December',
  expYear: '2025',
  cvv: '123'
};

test.describe('Checkout Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.goto();
  });

  test('Test Case 1: Checkout Form Order Success', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillCheckoutForm(CHECKOUT_FORM_DATA);
    await checkoutPage.setShippingAddressCheckbox(true);
    await checkoutPage.submitCheckoutForm();
    await checkoutPage.waitForOrderConfirmation();

    const orderNumber = await checkoutPage.getOrderConfirmationNumber();

    expect(orderNumber).not.toBeNull();
    expect(orderNumber?.length).toBeGreaterThan(MIN_ORDER_NUMBER_LENGTH);
  });

  test('Test Case 2: Checkout Form Alert', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillCheckoutForm(CHECKOUT_FORM_DATA);
    await checkoutPage.setShippingAddressCheckbox(false);
    
    const alertPromise = checkoutPage.handleAlert();
    await checkoutPage.submitCheckoutForm();
    await alertPromise;
    
    await expect(checkoutPage.alertDialog).not.toBeVisible();
  });

  test('Test Case 3: Cart Total Test', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    const sumOfItems = await checkoutPage.getSumOfItemsPresentInCart();
    const displayedTotalItemsNumber = await checkoutPage.getNumberOfItems();
    
    expect(displayedTotalItemsNumber).toBe(sumOfItems);

    const sumOfProductPrices = await checkoutPage.getSumOfProductPrices();
    const displayedTotal = await checkoutPage.getTotalPrice();
    
    expect(displayedTotal).toBe(sumOfProductPrices);
  });

  test.afterEach(async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.cleanup();
  });
}); 