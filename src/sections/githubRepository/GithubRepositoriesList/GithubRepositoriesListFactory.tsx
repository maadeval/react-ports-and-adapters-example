import { GithubApiGithubRepositoryRepository } from '../../../modules/githubRepository/infrastructure/GithubApiGithubRepositoryRepository'
import { GithubRepositoriesList } from './GithubRepositoriesList'

const githubApiGithubRepositoryRepository =
  GithubApiGithubRepositoryRepository()

export const GithubRepositoriesListFactory = {
  create: () => (
    <GithubRepositoriesList repository={githubApiGithubRepositoryRepository} />
  ),
}
