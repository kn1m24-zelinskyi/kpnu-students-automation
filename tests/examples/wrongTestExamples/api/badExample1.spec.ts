import { expect, test } from '@testExtenter';
import { userInstance } from '@utils/api/users/users';
import { getUserApiPayload } from '@utils/data/userApiPayloads';

/**
 * This is a bad example and a demonstration of how not to write tests.
 * Explanations are provided in the places where mistakes were made.
 *
 * General mistakes:
 * 1. The "test.describe" for grouping tests and the fixtures
 *    for setup and teardown conditions are missing(e.g beforeEach, afterAll).
 * 2. Defined unused variables.
 * 3. Missed assertions for responses from the server
 * 4. Tests not isolated. If you run this test file in results some of the tests will be failed.
 *    If the tests are run sequentially, each of them will execute successfully
 * 5. All of these tests focus on the one instance. It makes sense to create one test that checks all these operations on a single entity.
 *    Instead, it would be better to focus on the interactions between entities.
 */
let customerId: number | string;
let customer: any;
const createdCustomerPayload = getUserApiPayload();
const expectedCustomerResponse = {
  id: expect.any(Number) || expect.any(String),
  email: createdCustomerPayload.customer.email,
  firstname: createdCustomerPayload.customer.firstname,
  lastname: createdCustomerPayload.customer.lastname,
};

test('Create customer', async () => {
  customer = await userInstance.createUser(createdCustomerPayload);
  customerId = customer.data.id;
});

test('Get customer', async () => {
  const response = await userInstance.getUserById(customerId);
  expect(await response.data).toEqual(expect.objectContaining(expectedCustomerResponse));
});

test('Delete customer', async () => {
  await userInstance.deleteUser(customerId);
});
