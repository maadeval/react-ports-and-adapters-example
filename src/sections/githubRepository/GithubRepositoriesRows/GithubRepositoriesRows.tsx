import { FC } from 'react'
import { GithubRepository } from '../../../modules/githubRepository/domain/GithubRepository.types'
import { LockClosedIcon } from '../../shared/icons/LockClosedIcon'
import { LockOpenIcon } from '../../shared/icons/LockOpenIcon'

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
        <article
          className='flex flex-col w-full max-w-xs border rounded-md shadow-xl bg-stone-50 border-stone-100 shadow-stone-200'
          key={repo.uuid}
        >
          <header className='flex items-center justify-between px-4 py-2 border-b border-b-stone-200'>
            <div>
              <p className='text-sm'>Total issues: {repo.issuesLenght}</p>
              <p className='text-sm'>Total Pulls: {repo.pullRequestsLenght}</p>
            </div>
            <p className='flex items-center gap-4'>
              Status:{' '}
              {repo.private ? (
                <LockClosedIcon height={16} />
              ) : (
                <LockOpenIcon height={16} />
              )}
            </p>
          </header>
          <main className='flex-1 px-4 py-2'>
            <h3 className='text-xl'>{repo.id.name}</h3>
            <p className='py-2 text-stone-600'>{repo.description}</p>
          </main>
          <footer className='px-4 py-2 bg-stone-100'>
            <a
              className='text-sm hover:underline text-stone-600 hover:text-stone-700 hover:decoration-dotted'
              href={repo.url}
              target='_blank'
            >
              Go to repository
            </a>
          </footer>
        </article>
      ))}
    </section>
  )
}
