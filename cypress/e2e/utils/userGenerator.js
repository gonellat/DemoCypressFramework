import { faker } from '@faker-js/faker';

/**
 * Generates a random user object with name, email, and password.
 * @returns {{ name: string, email: string, password: string }}
 */
export function generateUser() {
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
