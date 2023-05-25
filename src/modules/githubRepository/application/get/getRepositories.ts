import { GithubRepositoryRepository } from '../../domain/GithubRepositoryRepository.types'

export const getRepositories = (
  repository: GithubRepositoryRepository,
  {
    repositoriesUrl,
  }: {
    repositoriesUrl: string[]
  }
) => {
  return repository.search(repositoriesUrl)
}
