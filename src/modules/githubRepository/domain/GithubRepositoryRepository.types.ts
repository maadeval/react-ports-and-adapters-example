import { GithubRepository, GithubRepositoryId } from './GithubRepository.types'

export interface GithubRepositoryRepository {
  search: (repositoriesUrl: string[]) => Promise<GithubRepository[]>
  searchById: (id: GithubRepositoryId) => Promise<GithubRepository>
}
