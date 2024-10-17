import test, { expect, Locator, Page } from '@playwright/test';
import BasePage from './basePage';

export default class HomePage extends BasePage {
  protected readonly isMobile: boolean;

  protected readonly homePageLocators: {
    globalMessageDemoText: Locator;
    signInLink: Locator;
    createAnAccountLink: Locator;
    hamburgerMenuButton: Locator;
  };

  constructor(page: Page, isMobile: boolean) {
    super(page);
    this.isMobile = isMobile;
    //locators section
    this.homePageLocators = {
      globalMessageDemoText: this.page.locator('div.message.global.demo'),
      hamburgerMenuButton: this.page.locator('span[class="action nav-toggle"]'),
      signInLink: this.page.locator('header ul[class="header links"] li>a', { hasText: 'Sign In' }),
      createAnAccountLink: this.page.locator('header ul[class="header links"] li>a', { hasText: 'Create an Account' }),
    };
  }

  // Actions
  async load() {
    await test.step(`Wait until home page DOM content loaded`, async () => {
      await this.goTo('');
      await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    });
  }

  async clickOnSignInLink() {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Click on "Sign in" link.`, async () => {
      await this.homePageLocators.signInLink.click();
    });
  }

  async clickOnCreateAnAccountLink() {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Click on "Create an account" link.`, async () => {
      await this.homePageLocators.createAnAccountLink.click();
      await this.verifyPageURL('customer/account/create/');
    });
  }

  // Verify methods

  async verifyGlobalMessageDemo(expectedMessage: string) {
    await test.step('Verify global message on Home Page', async () => {
      await expect(this.homePageLocators.globalMessageDemoText).toBeVisible();
      await expect(this.homePageLocators.globalMessageDemoText).toHaveText(expectedMessage);
    });
  }
}
