import { faker } from '@faker-js/faker'

export const tenants = Array.from({ length: 20 }, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  return {
    id: faker.string.uuid(),
    name: `${firstName}.${lastName}`,
    displayName: `${firstName} ${lastName}`,
  }
})
