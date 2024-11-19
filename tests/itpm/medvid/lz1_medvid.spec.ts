import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';

// Завантажуємо змінні середовища з .env файлу
dotenv.config();

// Генерація фейкових даних для реєстрації
const generateNewUserData = () => {
  return {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

test.describe('User registration tests', () => {
  test('should register a new user and verify header', async ({ page }) => {
    // Генерація тестових даних
    const registrationData = generateNewUserData();
    registrationData.firstname = 'YOUR_NAME4'; // Реальні значення
    registrationData.lastname = 'YOUR_SURNAME1';
    registrationData.email = 'YOUR_EMAIL4@kpnu.edu.ua';
    registrationData.password = 'YOUR_PASSWORD123ab';

    // Відкриваємо базову сторінку
    await page.goto(`${process.env.BASE_URL}`); // Використовуємо BASE_URL із .env файлу

    // Перевіряємо, чи є кнопка реєстрації та натискаємо на неї
    await page.getByRole('link', { name: 'Create an Account' }).click();

    // Заповнюємо форму реєстрації
    await page.fill('#firstname', registrationData.firstname); // Реальний селектор
    await page.fill('#lastname', registrationData.lastname); // Реальний селектор
    await page.fill('#email_address', registrationData.email); // Реальний селектор
    await page.fill('#password', registrationData.password); // Реальний селектор
    await page.fill('#password-confirmation', registrationData.password); // Реальний селектор

    // Надсилаємо форму
    await page.click('.action.submit.primary'); // Реальний селектор кнопки

    // Перевірка повідомлення про успішну реєстрацію
    const successMessage = await page.innerText('[data-ui-id="message-success"]'); // Використовуємо атрибут
    expect(successMessage.trim()).toBe('Thank you for registering with Main Website Store.');

    // Перевірка привітання у верхній частині сторінки
    const contactInfo = page.locator('.box.box-information .box-content p');
    const contactText = await contactInfo.innerText();
    expect(contactText).toContain(`${registrationData.firstname} ${registrationData.lastname}`);
  });
});
