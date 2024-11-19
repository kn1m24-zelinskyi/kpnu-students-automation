import { test } from '@testExtenter';
import { fakerDataGenerator } from '@utils/helpers/generatedData';

test(`Create new user with valid credentials`, async ({ homePage, registrationPage, headerComponent }) => {
  
  //З базової сторінки здійснити реєстрацію у додаток.
  const registrationData = fakerDataGenerator.generateNewUserData();
  registrationData.firstname = 'Yurii';
  registrationData.lastname = 'Medvid';
  await homePage.load();

  //Перехід на форму реєстрації
  await homePage.clickOnCreateAnAccountLink();

  //Заповнення форми реєстрації
  await registrationPage.fillAndSubmitRegistrationForm(registrationData);

  //Перевірити наявність власного імені у лівій верхній секції сторінки
  await headerComponent.verifyLoggedInMessage(registrationData.firstname + ' ' + registrationData.lastname);
});