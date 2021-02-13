import { Route, Switch } from 'react-router-dom'
import { Footer } from 'components/Footer'
import { AppProviders } from 'context'
import { Home } from 'pages/Home'
import { Logo } from 'components/Logo'

const App = () => (
  <AppProviders>
    <>
      <Logo />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
      <Footer />
    </>
  </AppProviders>
)

export default App
