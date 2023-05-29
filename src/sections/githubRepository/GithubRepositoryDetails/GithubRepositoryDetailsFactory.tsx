import { GithubApiGithubRepositoryRepository } from '../../../modules/githubRepository/infrastructure/GithubApiGithubRepositoryRepository'
import { GithubRepositoryDetails } from './GithubRepositoryDetails'

const githubRepository = GithubApiGithubRepositoryRepository()

export const GithubRepositoryDetailsFactory = {
  create: () => <GithubRepositoryDetails repository={githubRepository} />,
}
