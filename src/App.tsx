import { Router } from './Routers'
import { LocalStorageWidgetRepository } from './modules/widget/infrastructure/LocalStorageWidgetRepository'
import { WidgetContextProvider } from './sections/githubRepository/WidgetContextProvider/WidgetContextProvider'

const localStorageWidgetRepository = LocalStorageWidgetRepository()

function App() {
  return (
    <WidgetContextProvider repository={localStorageWidgetRepository}>
      <Router />
    </WidgetContextProvider>
  )
}

export default App
