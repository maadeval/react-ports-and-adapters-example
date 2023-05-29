import { useEffect, useState } from 'react'
import { GithubRepository } from '../../modules/githubRepository/domain/GithubRepository.types'
import { GithubRepositoryRepository } from '../../modules/githubRepository/domain/GithubRepositoryRepository.types'
import { getRepositories } from '../../modules/githubRepository/application/get/getRepositories'
import { UnexistedRepository } from '../../modules/githubRepository/domain/UnexistedRepository'
import { InvalidRepositoryUrl } from '../../modules/githubRepository/domain/InvalidRepositoryUrl'

interface StateProps {
  loading: boolean
  error: null | string
  data: GithubRepository[]
}

export const useGithubRepository = (
  repository: GithubRepositoryRepository,
  {
    repositoriesList,
  }: {
    repositoriesList: string[]
  }
) => {
  const [{ data, error, loading }, setGithubRepositories] =
    useState<StateProps>({
      loading: true,
      error: null,
      data: [],
    })

  const handleRepositoryError = (error: string) =>
    setGithubRepositories({
      loading: false,
      error,
      data: [],
    })

  const handleRepositoryData = (repositories: GithubRepository[]) =>
    setGithubRepositories({
      loading: false,
      error: null,
      data: repositories,
    })

  useEffect(() => {
    getRepositories(repository, {
      repositoriesUrl: repositoriesList,
    })
      .then(handleRepositoryData)
      .catch((err) => {
        if (err instanceof UnexistedRepository)
          return handleRepositoryError(err.message)
        if (err instanceof InvalidRepositoryUrl)
          return handleRepositoryError(err.message)
      })
  }, [repository, repositoriesList])

  return {
    repositories: data,
    loading,
    error,
  }
}
