import { FC, useEffect, useState } from 'react'
import { GithubRepositoryRepository } from '../../../modules/githubRepository/domain/GithubRepositoryRepository.types'
import { GithubRepositoriesRows } from '../GithubRepositoriesRows/GithubRepositoriesRows'
import { GithubRepository } from '../../../modules/githubRepository/domain/GithubRepository.types'
import { getRepositories } from '../../../modules/githubRepository/application/get/getRepositories'
import { InvalidRepositoryUrl } from '../../../modules/githubRepository/domain/InvalidRepositoryUrl'

interface Props {
  repository: GithubRepositoryRepository
}

export const GithubRepositoriesList: FC<Props> = ({ repository }) => {
  const [githubRepositories, setGithubRepositories] = useState<
    GithubRepository[]
  >([])
  const [githubRepositoryError, setGithubRepositoryError] = useState<
    undefined | string
  >()

  useEffect(() => {
    getRepositories(repository, {
      repositoriesUrl: ['https://github.com/maadeval/madeval'],
    })
      .then(setGithubRepositories)
      .catch((err) => {
        if (err instanceof InvalidRepositoryUrl)
          return setGithubRepositoryError(err.message)
      })
  }, [repository])

  return (
    <>
      <header>
        <h1>
          list of
          <span>Repositories</span>
        </h1>
        <span>Total repositories: {0}</span>
      </header>
      <GithubRepositoriesRows
        loading={false}
        repositories={githubRepositories}
        error={githubRepositoryError ?? null}
      />
    </>
  )
}
