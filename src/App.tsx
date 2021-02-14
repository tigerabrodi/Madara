import { Route, Switch } from 'react-router-dom'
import { Footer } from 'components/Footer'
import { AppProviders } from 'context'
import { Home } from 'pages/Home'

const App = () => (
  <AppProviders>
    <>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
      <Footer />
    </>
  </AppProviders>
)

export default App
