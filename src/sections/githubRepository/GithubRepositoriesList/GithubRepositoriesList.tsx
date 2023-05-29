import { FC } from 'react'
import { GithubRepositoryRepository } from '../../../modules/githubRepository/domain/GithubRepositoryRepository.types'
import { GithubRepositoriesRows } from '../GithubRepositoriesRows/GithubRepositoriesRows'
import { NavLink } from 'react-router-dom'
import { useGithubRepositories } from '../useGithubRepositories'

interface Props {
  repository: GithubRepositoryRepository
}

const repositoriesList = [
  'https://github.com/maadeval/madeval',
  'https://github.com/maadeval/users-list',
]

export const GithubRepositoriesList: FC<Props> = ({ repository }) => {
  const { error, loading, repositories } = useGithubRepositories(repository, {
    repositoriesList: repositoriesList,
  })

  return (
    <>
      <header className='pt-4 border-b border-b-stone-200'>
        <div className='flex items-center justify-between'>
          <h1 className='text-lg text-stone-400'>
            List of{' '}
            <span className='block text-2xl text-stone-600'>Repositories</span>
          </h1>
          <span className='text-stone-600'>
            Total repositories: {repositories.length}
          </span>
        </div>
        <nav className='flex items-center gap-2 py-4'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `px-2 py-1 rounded text-stone-600 hover:bg-stone-100 ${
                isActive ? 'bg-stone-200 hover:bg-stone-300' : ''
              }`
            }
          >
            Dashboard
          </NavLink>
        </nav>
      </header>
      <GithubRepositoriesRows
        loading={loading}
        repositories={repositories}
        error={error}
      />
    </>
  )
}
