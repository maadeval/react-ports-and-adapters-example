import { LocalStorageWidgetRepository } from '../../../modules/widget/infrastructure/LocalStorageWidgetRepository'
import { GithubRepositoryCreateForm } from './GithubRepositoryCreateForm'

const localStorageWidgetRepository = LocalStorageWidgetRepository()

export const GithubRepositoryCreateFormFactory = {
  create: () => (
    <GithubRepositoryCreateForm repository={localStorageWidgetRepository} />
  ),
}
