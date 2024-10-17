import { expect, test } from '@testExtenter';
import { userInstance } from '@utils/api/users/users';
import { getUserApiPayload } from '@utils/data/userApiPayloads';
import { CreateUserPayload } from 'src/interfaces/userPayload';

test.describe('Customer related API tests', async () => {
  let createdCustomerPayload: CreateUserPayload;
  let expectedCustomerResponse: Record<string, unknown>;

  test.beforeEach(async () => {
    createdCustomerPayload = getUserApiPayload();
    expectedCustomerResponse = {
      id: expect.any(Number) || expect.any(String),
      email: createdCustomerPayload.customer.email,
      firstname: createdCustomerPayload.customer.firstname,
      lastname: createdCustomerPayload.customer.lastname,
    };
  });

  test('CRUD customer operations test', async () => {
    const customer = await userInstance.createUser(createdCustomerPayload);
    const customerId = await customer.data.id;
    const response = await userInstance.getUserById(customerId);
    expect(await response.data).toEqual(expect.objectContaining(expectedCustomerResponse));
    await userInstance.deleteUser(customerId);
  });
});
