import { test, expect, Page } from '@playwright/test';
import { SearchPage } from '../pages/Search';

const SEARCH_TERM = 'automation';
const EMPTY_SEARCH_TERM = '';
const SUCCESS_MESSAGE_PATTERN = 'Found one result for';
const ERROR_MESSAGE = 'Please provide a search word.';

test.describe('Search Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();
  });

  test('Test Case 1: Search Success', async ({ page }) => {
    const searchPage = new SearchPage(page);

    await searchPage.search(SEARCH_TERM);
    
    const searchResults = await searchPage.getSearchResultsText();
    expect(searchResults).toContain(`${SUCCESS_MESSAGE_PATTERN} ${SEARCH_TERM}`);
  });

  test('Test Case 2: Search Empty', async ({ page }) => {
    const searchPage = new SearchPage(page);

    await searchPage.search(EMPTY_SEARCH_TERM);
    
    const searchResults = await searchPage.getSearchResultsText();
    expect(searchResults).toContain(ERROR_MESSAGE);
  });

  test.afterEach(async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.cleanup();
  });
}); 