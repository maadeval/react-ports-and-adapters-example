import { Widget } from '../../domain/Widget.types'
import { WidgetRepository } from '../../domain/WidgetRepository.types'

export const updateWidget = async (
  repository: WidgetRepository,
  {
    widget,
  }: {
    widget: Widget
  }
) => {
  return await repository.update(widget)
}
