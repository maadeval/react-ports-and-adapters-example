import { GithubRepository } from '../domain/GithubRepository.types'
import { GithubRepositoryRepository } from '../domain/GithubRepositoryRepository.types'
import { githubApiResponse } from '../../../githubApiResponse'

export const InMemoryGithubRepositoryRepository =
  (): GithubRepositoryRepository => ({
    search,
  })

const search = (): Promise<GithubRepository[]> => {
  return Promise.resolve(githubApiResponse)
}
