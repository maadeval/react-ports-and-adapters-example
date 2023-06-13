import { WidgetRepository } from './../domain/WidgetRepository.types'
import { AlreadyExistWidgetError } from '../domain/AlreadyExistWidgetError'
import { NotExistWidgetError } from '../domain/NotExistWidgetError'
import { Widget } from '../domain/Widget.types'

export const LocalStorageWidgetRepository = (): WidgetRepository => ({
  create,
  delete: widgetDelete,
  update,
  search,
})

const LOCAL_STORAGE_WIDGET_KEY = 'widgets'

const create: WidgetRepository['create'] = async ({ url }) => {
  const widgets = await search()

  const isWidgetExist = existWidget(widgets, url)
  if (isWidgetExist)
    throw new AlreadyExistWidgetError(`Widget with url ${url} already exist`)

  saveWidgets([{ url }, ...widgets])
}

const widgetDelete: WidgetRepository['delete'] = async (url) => {
  const widgets = await search()

  const isWidgetExist = existWidget(widgets, url)
  if (!isWidgetExist)
    throw new NotExistWidgetError(`Widget with url ${url} not exist`)

  const newWidgets = widgets.filter((widget) => widget.url !== url)

  saveWidgets(newWidgets)
}

const update: WidgetRepository['update'] = async ({ url }) => {
  const widgets = await search()

  const isWidgetExist = existWidget(widgets, url)

  if (!isWidgetExist)
    throw new NotExistWidgetError(`Widget with url ${url} not exist`)

  const newWidgets = widgets.map((widget) =>
    widget.url === url ? { url } : widget
  )

  saveWidgets(newWidgets)
}

const search: WidgetRepository['search'] = async () => {
  const widgets = localStorage.getItem(LOCAL_STORAGE_WIDGET_KEY)

  if (!widgets) return []

  return JSON.parse(widgets) as Widget[]
}

const saveWidgets = (newWidgets: Widget[]) => {
  localStorage.setItem(LOCAL_STORAGE_WIDGET_KEY, JSON.stringify(newWidgets))
}

const existWidget = (widgets: Widget[], url: Widget['url']) => {
  return [...widgets].some((widget) => widget.url === url)
}
