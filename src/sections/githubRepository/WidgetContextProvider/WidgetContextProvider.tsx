import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Widget } from '../../../modules/widget/domain/Widget.types'
import { searchWidgets } from '../../../modules/widget/application/search/searchWidgets'
import { WidgetRepository } from '../../../modules/widget/domain/WidgetRepository.types'

type Props = PropsWithChildren & {
  repository: WidgetRepository
}

const WidgetContext = createContext({
  widgets: [] as Widget[],
  handlers: {
    delete: () => Promise.resolve(),
    update: () => Promise.resolve(),
  } as {
    delete: WidgetRepository['delete']
    update: WidgetRepository['update']
  },
})

export const WidgetContextProvider: FC<Props> = ({ children, repository }) => {
  const [widgets, setWidgets] = useState<Widget[]>([])

  useEffect(() => {
    searchWidgets(repository).then(setWidgets)
  }, [repository])

  useEffect(() => {
    const updateWidgets = () => {
      repository.search().then(setWidgets)
    }

    document.addEventListener('widgetCreated', updateWidgets)

    return () => {
      document.removeEventListener('widgetCreated', updateWidgets)
    }
  })

  return (
    <WidgetContext.Provider
      value={{
        widgets,
        handlers: {
          delete: repository.delete,
          update: repository.update,
        },
      }}
    >
      {children}
    </WidgetContext.Provider>
  )
}

export const useWidgetContext = () => useContext(WidgetContext)
