import { useEffect, useState } from 'react'
import {
  GithubRepository,
  GithubRepositoryId,
} from '../../modules/githubRepository/domain/GithubRepository.types'
import { GithubRepositoryRepository } from '../../modules/githubRepository/domain/GithubRepositoryRepository.types'
import { getRepositoriesById } from '../../modules/githubRepository/application/getById/getRepositoriesById'
import { UnexistedRepository } from '../../modules/githubRepository/domain/UnexistedRepository'

interface GithubRepositoriesState {
  repository: GithubRepository | null
  loading: boolean
  error: null | string
}

export const useGithubRepository = (
  repository: GithubRepositoryRepository,
  githubRepositoryId: GithubRepositoryId
) => {
  const [
    { error, loading, repository: githubRepository },
    setGithubRepository,
  ] = useState<GithubRepositoriesState>({
    repository: null,
    error: null,
    loading: true,
  })

  const handleSetRepository = (repository: GithubRepository) =>
    setGithubRepository({
      repository,
      error: null,
      loading: false,
    })

  const handleSetError = (message: string) =>
    setGithubRepository({
      repository: null,
      error: message,
      loading: false,
    })

  useEffect(() => {
    getRepositoriesById(repository, { id: githubRepositoryId })
      .then(handleSetRepository)
      .catch((err) => {
        if (err instanceof UnexistedRepository)
          return handleSetError(err.message)
      })
  }, [githubRepositoryId, repository])

  return {
    githubRepository,
    error,
    loading,
  }
}
