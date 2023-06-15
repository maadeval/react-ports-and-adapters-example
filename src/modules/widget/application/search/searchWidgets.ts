import { WidgetRepository } from '../../domain/WidgetRepository.types'

export const searchWidgets = async (repository: WidgetRepository) => {
  return repository.search()
}
