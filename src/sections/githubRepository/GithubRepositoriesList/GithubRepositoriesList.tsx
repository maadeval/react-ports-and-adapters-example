import { FC, useEffect, useMemo } from 'react'
import { GithubRepositoryRepository } from '../../../modules/githubRepository/domain/GithubRepositoryRepository.types'
import { GithubRepositoriesRows } from '../GithubRepositoriesRows/GithubRepositoriesRows'
import { useGithubRepositories } from '../useGithubRepositories'
import { topbarProgress } from '../../shared/TopBarProgressByLocation/topbarProgress'
import { Widget } from '../../../modules/widget/domain/Widget.types'

interface Props {
  repository: GithubRepositoryRepository
  listOfWidgets: Widget[]
}

export const GithubRepositoriesList: FC<Props> = ({
  repository,
  listOfWidgets,
}) => {
  const repositoriesList = useMemo(
    () => listOfWidgets.map((widget) => widget.url),
    [listOfWidgets]
  )

  const { error, loading, repositories } = useGithubRepositories(repository, {
    repositoriesList,
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
