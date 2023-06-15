import { GithubApiGithubRepositoryRepository } from '../../../modules/githubRepository/infrastructure/GithubApiGithubRepositoryRepository'
import { useWidgetContext } from '../WidgetContextProvider/WidgetContextProvider'
import { GithubRepositoriesList } from './GithubRepositoriesList'

const githubApiGithubRepositoryRepository =
  GithubApiGithubRepositoryRepository()

export const GithubRepositoriesListFactory = {
  create: () => <WrapperGithubRepositoriesList />,
}

const WrapperGithubRepositoriesList = () => {
  const { widgets } = useWidgetContext()

  return (
    <GithubRepositoriesList
      listOfWidgets={widgets}
      repository={githubApiGithubRepositoryRepository}
    />
  )
}
