import { FC, useEffect } from 'react'
import { GithubRepositoryRepository } from '../../../modules/githubRepository/domain/GithubRepositoryRepository.types'
import { GithubRepositoriesRows } from '../GithubRepositoriesRows/GithubRepositoriesRows'
import { useGithubRepositories } from '../useGithubRepositories'
import { topbarProgress } from '../../shared/TopBarProgressByLocation/topbarProgress'

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

  useEffect(() => {
    if (loading) return
    topbarProgress.cancelProgress()
  }, [loading])

  return (
    <>
      <GithubRepositoriesRows
        loading={loading}
        repositories={repositories}
        error={error}
      />
    </>
  )
}
