import './App.css'
import { useAppSelector } from './hooks/useRedux'
import { UnauthedView } from './components/composite/UnauthedView'
import { AuthedView } from './components/composite/AuthedView'

function App() {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

  return isAuthenticated ? <AuthedView /> : <UnauthedView />
}

export default App
