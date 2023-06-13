import { AlreadyExistWidgetError } from '../../domain/AlreadyExistWidgetError'
import { InvalidWidgetUrlError } from '../../domain/InvalidWidgetUrlError'
import { isValidWidgetUrl } from '../../domain/IsValidWidgetUrl'
import { Widget } from '../../domain/Widget.types'
import { WidgetRepository } from '../../domain/WidgetRepository.types'

export const createWidget = async (
  repository: WidgetRepository,
  {
    widget,
  }: {
    widget: Widget
  }
) => {
  const isValidUrl = isValidWidgetUrl(widget.url)
  if (!isValidUrl) throw new InvalidWidgetUrlError('Invalid URL format')

  const widgetsRepositories = await repository.search()
  const isAlreadyExist = widgetsRepositories.some(
    ({ url }) => url === widget.url
  )
  if (isAlreadyExist)
    throw new AlreadyExistWidgetError(
      `Widget with url ${widget.url} already exist`
    )

  return await repository.create(widget)
}
