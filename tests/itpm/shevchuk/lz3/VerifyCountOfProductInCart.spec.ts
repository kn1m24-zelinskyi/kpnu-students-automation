import { test } from '@testExtenter';
import { userInstance } from '@utils/api/users/users';
import { getUserApiPayload } from '@utils/data/userApiPayloads';

test.describe(`Add items to cart related scenarios`, async () => {
    const createdCustomerPayload = getUserApiPayload();
    const product = {
        productName: 'Strive Shoulder Pack',
        ProductQuantity: 2,
        ProductCountInCart: '2'
    };
    let customerId: string;
    test.beforeEach(async ({ homePage }) => {
        customerId = (await userInstance.createUser(createdCustomerPayload)).data.id;
        await homePage.load();
    });
    test.afterEach(async () => {
        await userInstance.deleteUser(customerId);
    });
    test(`Verify counter for products in cart visible for logged in user.`, async ({ homePage, loginPage, productPage }) => {
        await homePage.clickOnSignInLink();
        await loginPage.fillLoginForm({ email: createdCustomerPayload.customer.email, password: createdCustomerPayload.password });
        await loginPage.clickOnSignInButton();
        await homePage.searchItem(product.productName);
        await homePage.verifySearchedProductName(product.productName);
        await homePage.clickOnSearchedProductImage(product.productName);
        await productPage.selectProductQuantity(product.ProductQuantity);
        await productPage.clickOnAddToCartButton();
        await productPage.verifyProductCountInCart(product.ProductCountInCart);
    });
});