import { FC, useEffect, useState } from 'react'
import { GithubRepositoryRepository } from '../../../modules/githubRepository/domain/GithubRepositoryRepository.types'
import { GithubRepositoriesRows } from '../GithubRepositoriesRows/GithubRepositoriesRows'
import { GithubRepository } from '../../../modules/githubRepository/domain/GithubRepository.types'
import { getRepositories } from '../../../modules/githubRepository/application/get/getRepositories'
import { InvalidRepositoryUrl } from '../../../modules/githubRepository/domain/InvalidRepositoryUrl'
import { NavLink } from 'react-router-dom'

interface Props {
  repository: GithubRepositoryRepository
}

interface StateProps {
  loading: boolean
  error: null | string
  data: GithubRepository[]
}

export const GithubRepositoriesList: FC<Props> = ({ repository }) => {
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
      repositoriesUrl: [
        'https://github.com/maadeval/madeval',
        'https://github.com/maadeval/users-list',
      ],
    })
      .then(handleRepositoryData)
      .catch((err) => {
        if (err instanceof InvalidRepositoryUrl)
          return handleRepositoryError(err.message)
      })
  }, [repository])

  return (
    <>
      <header className='pt-4 border-b border-b-stone-200'>
        <div className='flex items-center justify-between'>
          <h1 className='text-lg text-stone-400'>
            List of{' '}
            <span className='block text-2xl text-stone-600'>Repositories</span>
          </h1>
          <span className='text-stone-600'>
            Total repositories: {data.length}
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
        repositories={data}
        error={error}
      />
    </>
  )
}
