import { GithubRepositoryRepository } from '../domain/GithubRepositoryRepository.types'
import { githubApiResponse } from '../../../githubApiResponse'
import { GithubRepository } from '../domain/GithubRepository.types'

export const InMemoryGithubRepositoryRepository =
  (): GithubRepositoryRepository => ({
    search,
    searchById,
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

const searchById: GithubRepositoryRepository['searchById'] = () => {
  const [firstRepository] = githubApiResponse

  return Promise.resolve({
    id: {
      name: firstRepository.repositoryData.name,
      organization: firstRepository.repositoryData.owner.login,
    },
    url: firstRepository.repositoryData.html_url,
    description: firstRepository.repositoryData.description,
    private: firstRepository.repositoryData.private,
    issuesLenght: firstRepository.issues.length,
    pullRequestsLenght: firstRepository.pullRequests.length,
  } as GithubRepository)
}
