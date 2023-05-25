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
  if (error) return <p>{error}</p>
  if (loading) return <p>Loading...</p>

  return (
    <>
      {repositories.map(({ issues, pullRequests, repositoryData }) => (
        <article key={repositoryData.id}>
          <header>
            {repositoryData.private ? (
              <LockClosedIcon height={16} />
            ) : (
              <LockOpenIcon height={16} />
            )}
            <p>Total issues: {issues.length}</p>
            <p>Total Pulls: {pullRequests.length}</p>
          </header>
          <main>
            <h3>{repositoryData.name}</h3>
            <p>{repositoryData.description}</p>
          </main>
          <footer></footer>
        </article>
      ))}
    </>
  )
}
