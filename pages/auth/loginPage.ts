import { Locator, Page } from '@playwright/test';
import BasePage from '../basePage';
import { test } from '../testExtender';
import { LoginData } from '../../types/userTypes';

export class LoginPage extends BasePage {
  private readonly PAGE_TITLE = 'Customer Login';

  isMobile: boolean;

  protected readonly loginPageLocators: {
    titleText: Locator;
    emailField: Locator;
    passwordField: Locator;
    signInButton: Locator;
    createAnAccountButton: Locator;
    forgotPasswordLink: Locator;
  };

  constructor(page: Page, isMobile: boolean) {
    super(page);
    this.isMobile = isMobile;

    this.loginPageLocators = {
      titleText: this.page.locator('h1'),
      emailField: this.page.locator('#email'),
      passwordField: this.page.locator('#pass'),
      signInButton: this.page.locator('fieldset #send2'),
      createAnAccountButton: this.page.locator('a[class="action create primary"]', { hasText: 'Create an Account' }),
      forgotPasswordLink: this.page.locator(' a[class="action remind"]', { hasText: 'Forgot Your Password?' }),
    };
  }

  //Actions

  async fillAndSubmitLoginForm(loginData: LoginData) {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Fill and submit login form.`, async () => {
      await this.fillLoginForm(loginData);
      await this.clickOnSignInButton();
    });
  }

  async fillPassword(password: string) {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Add password ${'*'.repeat(password.length)} in password field.`, async () => {
      await this.loginPageLocators.passwordField.fill(password);
    });
  }

  async fillEmail(email: string) {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Add ${email} email in email field.`, async () => {
      await this.loginPageLocators.emailField.fill(email);
    });
  }

  async clickOnSignInButton() {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Click on "Sign in" button.`, async () => {
      await this.loginPageLocators.signInButton.click();
    });
  }

  async clickOnCreateAnAccount() {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Click on "Create an account" button.`, async () => {
      await this.loginPageLocators.createAnAccountButton.click();
    });
  }

  async fillLoginForm(loginData: LoginData) {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Fill login form.`, async () => {
      await this.fillEmail(loginData.email);
      await this.fillPassword(loginData.password);
    });
  }

  async verifyTitle() {
    await this.verifyPageTitle(this.loginPageLocators.titleText, this.PAGE_TITLE);
  }
}
