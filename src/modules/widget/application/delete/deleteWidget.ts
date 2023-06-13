import { Widget } from '../../domain/Widget.types'
import { WidgetRepository } from '../../domain/WidgetRepository.types'

export const deleteWidget = async (
  repository: WidgetRepository,
  {
    widget,
  }: {
    widget: Widget
  }
) => {
  return await repository.delete(widget.id)
}
