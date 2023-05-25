import { GithubRepository } from '../../modules/githubRepository/domain/GithubRepository.types'
import { faker } from '@faker-js/faker'

export const GithubRepositoryMother = (
  overridesProps: Partial<GithubRepository> = {}
): GithubRepository => ({
  id: {
    name: faker.company.name(),
    organization: faker.company.name(),
  },
  description: faker.lorem.paragraph(),
  issuesLenght: faker.number.int(),
  pullRequestsLenght: faker.number.int(),
  private: faker.datatype.boolean(),
  url: faker.internet.url(),
  uuid: faker.string.uuid(),
  ...overridesProps,
})
