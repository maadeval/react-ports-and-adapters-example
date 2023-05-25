import { GithubRepository } from './GithubRepository.types'

export interface GithubRepositoryRepository {
  search: (repositoriesUrl: string[]) => Promise<GithubRepository[]>
}
