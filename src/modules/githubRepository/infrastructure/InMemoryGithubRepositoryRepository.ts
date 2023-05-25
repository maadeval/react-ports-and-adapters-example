import { GithubRepositoryRepository } from '../domain/GithubRepositoryRepository.types'
import { githubApiResponse } from '../../../githubApiResponse'
import { GithubRepository } from '../domain/GithubRepository.types'

export const InMemoryGithubRepositoryRepository =
  (): GithubRepositoryRepository => ({
    search,
  })

const search: GithubRepositoryRepository['search'] = () => {
  return Promise.resolve(
    githubApiResponse.map(({ issues, pullRequests, repositoryData }) => {
      return {
        uuid: repositoryData.id.toString(),
        id: {
          name: repositoryData.name,
          organization: repositoryData.owner.login,
        },
        url: repositoryData.html_url,
        description: repositoryData.description,
        private: repositoryData.private,
        issuesLenght: issues.length,
        pullRequestsLenght: pullRequests.length,
      } as GithubRepository
    })
  )
}

/* 
  id: GithubRepositoryId
  url: string
  description: string
  private: boolean
  issuesLenght: number
  pullRequestsLenght: number

*/
