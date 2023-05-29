import { FC } from 'react'
import { GithubRepository } from '../../../modules/githubRepository/domain/GithubRepository.types'
import { LockClosedIcon } from '../../shared/icons/LockClosedIcon'
import { LockOpenIcon } from '../../shared/icons/LockOpenIcon'

interface Props {
  repository: GithubRepository
}

export const GithubRepositoryWidget: FC<Props> = ({ repository }) => {
  return (
    <article
      className='flex flex-col w-full max-w-xs border rounded-md shadow-xl bg-stone-50 border-stone-100 shadow-stone-200'
      key={repository.uuid}
    >
      <header className='flex items-center justify-between px-4 py-2 border-b border-b-stone-200'>
        <div>
          <p className='text-sm'>Total issues: {repository.issuesLenght}</p>
          <p className='text-sm'>
            Total Pulls: {repository.pullRequestsLenght}
          </p>
        </div>
        <p className='flex items-center gap-4'>
          Status:{' '}
          {repository.private ? (
            <LockClosedIcon height={16} />
          ) : (
            <LockOpenIcon height={16} />
          )}
        </p>
      </header>
      <main className='flex-1 px-4 py-2'>
        <h3 className='text-xl'>{repository.id.name}</h3>
        <p className='py-2 text-stone-600'>{repository.description}</p>
      </main>
      <footer className='px-4 py-2 bg-stone-100'>
        <a
          className='text-sm hover:underline text-stone-600 hover:text-stone-700 hover:decoration-dotted'
          href={repository.url}
          target='_blank'
        >
          Go to repository
        </a>
      </footer>
    </article>
  )
}
