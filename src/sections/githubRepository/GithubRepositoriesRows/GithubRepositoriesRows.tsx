import { FC } from 'react'
import { GithubRepository } from '../../../modules/githubRepository/domain/GithubRepository.types'
import { GithubRepositoryWidget } from '../GithubRepositoryWidget/GithubRepositoryWidget'

interface Props {
  error: string | null
  repositories: GithubRepository[]
  loading: boolean
}

export const GithubRepositoriesRows: FC<Props> = ({
  error,
  repositories,
  loading,
}) => {
  if (error)
    return (
      <p className='px-4 py-2 my-8 rounded bg-rose-100 text-rose-600'>
        {error}
      </p>
    )
  if (loading) return <p className='mx-4 my-8 text-xl'>Loading...</p>

  if (repositories.length === 0)
    return (
      <p className='px-4 py-2 my-8 text-yellow-600 bg-yellow-100 rounded'>
        Not found repositories
      </p>
    )

  return (
    <section className='flex flex-wrap gap-4 my-8'>
      {repositories.map((repo) => (
        <GithubRepositoryWidget key={repo.uuid} repository={repo} />
      ))}
    </section>
  )
}
