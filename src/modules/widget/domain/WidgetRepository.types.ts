import { Widget } from './Widget.types'

export interface WidgetRepository {
  search: () => Promise<Widget[]>
  create: (widget: Widget) => Promise<void>
  delete: (widgetId: Widget['url']) => Promise<void>
  update: (widget: Widget) => Promise<void>
}
