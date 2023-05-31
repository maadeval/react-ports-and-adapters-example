import { FC, useEffect, useMemo } from 'react'
import { GithubRepositoryRepository } from '../../../modules/githubRepository/domain/GithubRepositoryRepository.types'
import { useParams } from 'react-router-dom'
import { GithubRepositoryId } from '../../../modules/githubRepository/domain/GithubRepository.types'
import { useGithubRepository } from '../useGithubRepository'
import { topbarProgress } from '../../shared/TopBarProgressByLocation/topbarProgress'

interface Props {
  repository: GithubRepositoryRepository
}

export const GithubRepositoryDetails: FC<Props> = ({
  repository: githubRepository,
}) => {
  const { name = '', organization = '' } =
    useParams<Partial<GithubRepositoryId>>()

  const repositoryId = useMemo(
    () => ({ name, organization }),
    [name, organization]
  )

  const {
    error,
    githubRepository: repository,
    loading,
  } = useGithubRepository(githubRepository, repositoryId)

  useEffect(() => {
    if (loading) return
    topbarProgress.cancelProgress()
  }, [loading])

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
