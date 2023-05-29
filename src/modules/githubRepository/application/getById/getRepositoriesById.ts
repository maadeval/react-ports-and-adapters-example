import { GithubRepositoryId } from '../../domain/GithubRepository.types'
import { GithubRepositoryRepository } from '../../domain/GithubRepositoryRepository.types'

export const getRepositoriesById = (
  repository: GithubRepositoryRepository,
  {
    id,
  }: {
    id: GithubRepositoryId
  }
) => {
  return repository.searchById(id)
}
