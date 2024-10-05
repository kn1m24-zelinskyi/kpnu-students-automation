import { faker } from '@faker-js/faker';
import { CreateUserData } from '../../types/userTypes';

class FakerData {
  generateNewUserData = (): CreateUserData => {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: 'user' + `${Date.now()}` + '@example.com',
      password: 'Test_12345',
    };
  };
}

export const fakerDataGenerator = new FakerData();
