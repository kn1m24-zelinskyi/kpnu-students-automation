import test, { Locator, Page, expect } from '@playwright/test';
import BasePage from '../basePage';

export default class HeaderComponent extends BasePage {
  protected readonly welcomeMessageText: Locator;
  protected readonly isMobile: boolean;

  constructor(page: Page, isMobile: boolean) {
    super(page);
    this.isMobile = isMobile;
    this.welcomeMessageText = this.page.locator('.page-header .logged-in');
  }

  async verifyLoggedInMessage(fullUsername) {
    await test.step(`Verify logged in Welcome text for user ${fullUsername}`, async () =>
      expect(this.welcomeMessageText).toHaveText(new RegExp(`^Welcome, ${fullUsername}!$`)));
  }
}
