import { test } from '@testExtenter';
import { fakerDataGenerator } from '@helpers/generatedData';
test(`Create new user with valid credentials`, async ({ homePage, registrationPage, headerComponent }) => {
    const registrationData = fakerDataGenerator.generateNewUserData();
    registrationData.firstname = 'Dmytro';
    registrationData.lastname = 'Zelinskyi';
    await homePage.load();
    await homePage.clickOnCreateAnAccountLink();
    await registrationPage.fillAndSubmitRegistrationForm(registrationData);
    await headerComponent.verifyLoggedInMessage(registrationData.firstname + ' ' + registrationData.lastname);
});