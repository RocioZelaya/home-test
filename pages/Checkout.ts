import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipInput: Locator;
  readonly shippingAddressSameAsBillingAddressCheckbox: Locator;
  readonly nameOnCardInput: Locator;
  readonly cardNumberInput: Locator;
  readonly expMonthDropdown: Locator;
  readonly expYearInput: Locator;
  readonly cvvInput: Locator;
  readonly productInCart: Locator;
  readonly productPrice: Locator;
  readonly productQuantity: Locator;
  readonly productTotal: Locator;
  readonly continueToCheckoutButton: Locator;
  readonly orderConfirmationMessage: Locator;
  readonly orderConfirmationOrderNumber: Locator;
  readonly alertDialog: Locator;

  constructor(page: Page) {
    super(page);
    this.fullNameInput = page.locator('#fname');
    this.emailInput = page.locator('#email');
    this.addressInput = page.locator('#adr');
    this.cityInput = page.locator('#city');
    this.stateInput = page.locator('#state');
    this.zipInput = page.locator('#zip');
    this.shippingAddressSameAsBillingAddressCheckbox = page.getByRole('checkbox', {name: 'Shipping address same as billing'});
    this.nameOnCardInput = page.locator('#cname');
    this.cardNumberInput = page.locator('#ccnum');
    this.expMonthDropdown = page.locator('#expmonth');
    this.expYearInput = page.locator('#expyear');
    this.cvvInput = page.locator('#cvv');
    this.productInCart = page.getByRole('link', {name: /Product\d+/});
    this.productPrice = page.locator('.price');
    this.productQuantity = page.locator('h4:has-text("Cart") .price b');
    this.productTotal = page.locator('p:has-text("Total") .price');
    this.continueToCheckoutButton = page.getByRole('button', {name: 'Continue to checkout'});
    this.orderConfirmationMessage = page.locator('#order-confirmation');
    this.orderConfirmationOrderNumber = page.locator('[data-id="ordernumber"]');
    this.alertDialog = page.locator('dialog');
  }

  /**
   * Navigate to the checkout page
   * @throws {Error} When navigation fails
   */
  async goto(): Promise<void> {
    try {
      await super.goto('/checkout');
      await this.waitForPageLoad();
    } catch (error) {
      throw new Error(`Failed to navigate to checkout page: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Fill all checkout form fields with provided data
   * @param {Object} data - The checkout form data
   * @param {string} data.fullName - The full name for billing
   * @param {string} data.email - The email address
   * @param {string} data.address - The billing address
   * @param {string} data.city - The city
   * @param {string} data.state - The state
   * @param {string} data.zip - The zip code
   * @param {string} data.nameOnCard - The name on the credit card
   * @param {string} data.cardNumber - The credit card number
   * @param {string} data.expMonth - The expiration month
   * @param {string} data.expYear - The expiration year
   * @param {string} data.cvv - The CVV code
   * @throws {Error} When form filling fails
   */
  async fillCheckoutForm(data: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    nameOnCard: string;
    cardNumber: string;
    expMonth: string;
    expYear: string;
    cvv: string;
  }): Promise<void> {
    try {
      if (!data.fullName?.trim() || !data.email?.trim() || !data.address?.trim() || 
          !data.city?.trim() || !data.state?.trim() || !data.zip?.trim() ||
          !data.nameOnCard?.trim() || !data.cardNumber?.trim() || 
          !data.expMonth?.trim() || !data.expYear?.trim() || !data.cvv?.trim()) {
        throw new Error('All form fields are required');
      }

      await this.fillInput(this.fullNameInput, data.fullName);
      await this.fillInput(this.emailInput, data.email);
      await this.fillInput(this.addressInput, data.address);
      await this.fillInput(this.cityInput, data.city);
      await this.fillInput(this.stateInput, data.state);
      await this.fillInput(this.zipInput, data.zip);
      await this.fillInput(this.nameOnCardInput, data.nameOnCard);
      await this.fillInput(this.cardNumberInput, data.cardNumber);
      await this.expMonthDropdown.selectOption(data.expMonth);
      await this.fillInput(this.expYearInput, data.expYear);
      await this.fillInput(this.cvvInput, data.cvv);
    } catch (error) {
      throw new Error(`Failed to fill checkout form: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Set shipping address checkbox to the specified state
   * @param {boolean} shouldBeChecked - Whether the checkbox should be checked or unchecked
   * @throws {Error} When checkbox operation fails
   */
  async setShippingAddressCheckbox(shouldBeChecked: boolean): Promise<void> {
    try {
      const isChecked = await this.shippingAddressSameAsBillingAddressCheckbox.isChecked();
      if (shouldBeChecked && !isChecked) {
        await this.shippingAddressSameAsBillingAddressCheckbox.check();
      } else if (!shouldBeChecked && isChecked) {
        await this.shippingAddressSameAsBillingAddressCheckbox.uncheck();
      }
    } catch (error) {
      throw new Error(`Failed to set shipping address checkbox: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Submit the checkout form
   * @throws {Error} When form submission fails
   */
  async submitCheckoutForm(): Promise<void> {
    try {
      await this.clickElement(this.continueToCheckoutButton);
    } catch (error) {
      throw new Error(`Failed to submit checkout form: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get the order confirmation number
   * @returns {Promise<string | null>} The order confirmation number or null if not found
   * @throws {Error} When unable to retrieve order confirmation number
   */
  async getOrderConfirmationNumber(): Promise<string | null> {
    try {
      await this.waitForElement(this.orderConfirmationOrderNumber);
      return this.getText(this.orderConfirmationOrderNumber);
    } catch (error) {
      throw new Error(`Failed to get order confirmation number: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Wait for order confirmation message to be visible
   * @throws {Error} When order confirmation message is not found
   */
  async waitForOrderConfirmation(): Promise<void> {
    try {
      await this.waitForElement(this.orderConfirmationMessage);
    } catch (error) {
      throw new Error(`Failed to wait for order confirmation: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Handle alert dialog (accept/confirm)
   * @throws {Error} When alert handling fails
   */
  async handleAlert(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.page.on('dialog', async (dialog) => {
        try {
          await dialog.accept();
          resolve();
        } catch (error) {
          reject(new Error(`Failed to accept alert: ${error instanceof Error ? error.message : 'Unknown error'}`));
        }
      });
    });
  }

  /**
   * Check if alert dialog is visible
   * @returns {Promise<boolean>} True if alert dialog is visible, false otherwise
   * @throws {Error} When unable to check if alert dialog is visible
   */
  async isAlertVisible(): Promise<boolean> {
    try {
      return this.alertDialog.isVisible();
    } catch (error) {
      throw new Error(`Failed to check if alert dialog is visible: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get the number of items in cart
   * @returns {Promise<number>} The number of items in the cart
   * @throws {Error} When unable to retrieve number of items
   */
  async getNumberOfItems(): Promise<number> {
    try {
      const quantityText = await this.getText(this.productQuantity);
      const quantity = quantityText ? parseInt(quantityText, 10) : 0;
      
      if (isNaN(quantity)) {
        throw new Error('Invalid quantity format');
      }
      
      return quantity;
    } catch (error) {
      throw new Error(`Failed to get number of items: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get the sum of items present in cart
   * @returns {Promise<number>} The total number of items in the cart
   * @throws {Error} When unable to retrieve sum of items
   */
  async getSumOfItemsPresentInCart(): Promise<number> {
    try {
      const productsInCart = await this.productInCart.all();
      return productsInCart.length;
    } catch (error) {
      throw new Error(`Failed to get sum of items in cart: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get all individual product prices and sum them
   * @returns {Promise<number>} The sum of all product prices
   * @throws {Error} When unable to calculate sum of product prices
   */
  async getSumOfProductPrices(): Promise<number> {
    try {
      const priceElements = await this.productPrice.all();
      let totalSum = 0;
      
      // Exclude the last element which is the Total, and only process elements with $ sign
      for (let i = 0; i < priceElements.length - 1; i++) {
        const element = priceElements[i];
        const priceText = await this.getText(element);
        
        if (priceText && priceText.includes('$')) {
          // Extract numeric value from price text (e.g., "$281" -> 281)
          const priceMatch = priceText.match(/[\d,]+\.?\d*/);
          if (priceMatch) {
            totalSum += parseFloat(priceMatch[0].replace(',', ''));
          }
        }
      }
      
      return totalSum;
    } catch (error) {
      throw new Error(`Failed to get sum of product prices: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get the total price as a number
   * @returns {Promise<number>} The total price as a number
   * @throws {Error} When unable to retrieve total price
   */
  async getTotalPrice(): Promise<number> {
    try {
      const totalText = await this.getText(this.productTotal);
      if (!totalText) return 0;
      
      // Extract numeric value from total text (e.g., "$453" -> 453)
      const totalMatch = totalText.match(/[\d,]+\.?\d*/);
      const total = totalMatch ? parseFloat(totalMatch[0].replace(',', '')) : 0;
      
      if (isNaN(total)) {
        throw new Error('Invalid total price format');
      }
      
      return total;
    } catch (error) {
      throw new Error(`Failed to get total price: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}