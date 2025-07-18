import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';

test.describe('Login Scenarios', () => {

  // Test Case 1: Login Success

  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('johndoe19', 'supersecret');

    await expect(loginPage.welcomeMessage).toBeVisible();
    await expect(loginPage.welcomeMessage).toContainText('johndoe19');
  });

  // Test Case 2: Login Failure A

  test('should show an error with wrong credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('wronguser', 'wrongpass');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Wrong credentials');
  });

  // Test Case 3: Login Failure B

  test('should show an error with blank credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginButton.click();

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Fields can not be empty');
  });
});