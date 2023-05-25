import { GithubRepository } from '../domain/GithubRepository.types'
import { GithubRepositoryRepository } from '../domain/GithubRepositoryRepository.types'
import { InvalidRepositoryUrl } from '../domain/InvalidRepositoryUrl'

interface RepositoryId {
  name: string
  organization: string
}

const BASE_URL = 'https://api.github.com/repos'

const ENDPOINTS = [
  `${BASE_URL}/{organization}/{name}`,
  `${BASE_URL}/{organization}/{name}/issues`,
  `${BASE_URL}/{organization}/{name}/pulls?page=1&per_page=1`,
]

const PERSONAL_ACCESS_TOKEN = import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN

export const GithubApiGithubRepositoryRepository =
  (): GithubRepositoryRepository => ({
    search,
  })

const search: GithubRepositoryRepository['search'] = async (
  repositoriesUrl
) => {
  const responsePromises = repositoriesUrl.map(getRepositoryId).map(searchById)

  return Promise.all(responsePromises)
}

const getRepositoryId = (url: string): RepositoryId => {
  try {
    const currentURL = new URL(url)
    const splittedUrl = currentURL.pathname.split('/')

    return {
      name: splittedUrl.pop() as string,
      organization: splittedUrl.pop() as string,
    }
  } catch {
    throw new InvalidRepositoryUrl(`Invalid repository URL: ${url}`)
  }
}

const searchById = ({
  name,
  organization,
}: RepositoryId): Promise<GithubRepository> => {
  const promiseRepository = ENDPOINTS.map((endpoint) =>
    endpoint.replace('{organization}', organization).replace('{name}', name)
  ).map((endpointRepository) =>
    fetch(endpointRepository, {
      headers: {
        Authorization: `Bearer ${PERSONAL_ACCESS_TOKEN}`,
      },
    })
  )

  return Promise.all(promiseRepository).then((responses) =>
    Promise.all(responses.map((res) => res.json())).then(
      ([repositoryData, issues, pullRequests]) => ({
        issues,
        pullRequests,
        repositoryData,
      })
    )
  )
}
