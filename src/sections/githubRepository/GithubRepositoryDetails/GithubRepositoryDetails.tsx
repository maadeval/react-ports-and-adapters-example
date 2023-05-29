import { FC, useEffect, useState } from 'react'
import { GithubRepositoryRepository } from '../../../modules/githubRepository/domain/GithubRepositoryRepository.types'
import { useParams } from 'react-router-dom'
import {
  GithubRepository,
  GithubRepositoryId,
} from '../../../modules/githubRepository/domain/GithubRepository.types'
import { getRepositoriesById } from '../../../modules/githubRepository/application/getById/getRepositoriesById'
import { UnexistedRepository } from '../../../modules/githubRepository/domain/UnexistedRepository'

interface Props {
  repository: GithubRepositoryRepository
}

interface GithubRepositoriesState {
  repository: GithubRepository | null
  loading: boolean
  error: null | string
}

export const GithubRepositoryDetails: FC<Props> = ({
  repository: githubRepository,
}) => {
  const { name = '', organization = '' } =
    useParams<Partial<GithubRepositoryId>>()

  const [{ error, loading, repository }, setGithubRepository] =
    useState<GithubRepositoriesState>({
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
    getRepositoriesById(githubRepository, { id: { name, organization } })
      .then(handleSetRepository)
      .catch((err) => {
        if (err instanceof UnexistedRepository)
          return handleSetError(err.message)
      })
  }, [organization, name, repository, githubRepository])

  if (loading) return <p className='px-2 py-4 my-8 text-lg'>Loading...</p>
  if (error)
    return (
      <p className='px-2 py-4 my-8 rounded text-rose-600 bg-rose-200'>
        {error}
      </p>
    )

  if (!repository) return <p>Repository not found</p>

  return (
    <main>
      <h1>Github Repository Details</h1>
      <h3>{repository.id.name}</h3>
      <p>{repository.description}</p>
    </main>
  )
}
