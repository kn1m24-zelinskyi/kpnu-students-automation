import { test as base } from '@playwright/test';
import HomePage from './homePage';

type MyPages = {
  homePage: HomePage;
};

export const test = base.extend<MyPages>({
  homePage: async ({ page, isMobile }, use) => await use(new HomePage(page, isMobile)),
});

export { expect } from '@playwright/test';
