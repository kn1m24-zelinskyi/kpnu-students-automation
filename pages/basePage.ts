import { expect, Page } from '@playwright/test';
import { test } from './testExtender';

export default class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goTo(endpoint: string) {
    await this.page.goto(`${process.env.BASE_URL}${endpoint}`);
  }

  async verifyPageURL(endpoint: string) {
    const expectedURL = `${process.env.BASE_URL}${endpoint}`;
    await test.step(`Verify page URL to have value: ${expectedURL}`, async () => {
      await expect(this.page).toHaveURL(expectedURL);
    });
  }
  async clearAllCookies() {
    await this.page.context().clearCookies();
  }

  async waitUntilLoad(pageState) {
    await this.page.waitForLoadState(pageState);
  }
}
