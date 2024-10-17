import { test } from '@testExtenter';
import { uiConst } from '@utils/constants/uiConst';

test.describe('Verify website home page.', async () => {
  const { globalMessageDemo } = uiConst;
  test.beforeEach(async ({ homePage }) => {
    await homePage.load();
  });
  test('Verify home page global message.', async ({ homePage }) => {
    //Actions
    // action for this case is decribed in beforeAll block

    //Assert
    await homePage.verifyGlobalMessageDemo(globalMessageDemo);
  });
  test(`Verify "Sign in" link navigate to correct url`, async ({ homePage }) => {
    await homePage.clickOnSignInLink();
  });
  test(`Verify "Create an account" link navigate to correct url`, async ({ homePage }) => {
    await homePage.clickOnCreateAnAccountLink();
  });
});
