import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/Login';

const VALID_USERNAME = 'johndoe19';
const VALID_PASSWORD = 'supersecret';
const INVALID_USERNAME = 'wronguser';
const INVALID_PASSWORD = 'wrongpass';
const WRONG_CREDENTIALS_MESSAGE = 'Wrong credentials';
const EMPTY_FIELDS_MESSAGE = 'Fields can not be empty';

test.describe('Login Scenarios', () => {

  test.beforeEach(async ({ page }) => {
   const loginPage = new LoginPage(page);
   await loginPage.goto();
  });

  test('Test Case 1: Login Success', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);

    await expect(loginPage.welcomeMessage).toBeVisible();
    await expect(loginPage.welcomeMessage).toContainText(VALID_USERNAME);
  });

  test('Test Case 2: Login Failure A', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(INVALID_USERNAME, INVALID_PASSWORD);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(WRONG_CREDENTIALS_MESSAGE);
  });

  test('Test Case 3: Login Failure B', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.loginButton.click();

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(EMPTY_FIELDS_MESSAGE);
  });

  test.afterEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.cleanup();
  });
});
