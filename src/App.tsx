import { Route, Switch } from 'react-router-dom'
import { Footer } from 'components/Footer'
import { AppProviders } from 'context'
import { Home } from 'pages/Home'
import { Board } from 'pages/Board'
import { Alert } from 'components/Alert'
import { Navigation } from 'components/Navigation'

/* TODO 
   Get user.
   If no user return Home.
   If user return Board
*/

const App = () => (
  <AppProviders>
    <>
      <Alert />
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/board" component={Board} />
      </Switch>
      <Footer />
    </>
  </AppProviders>
)

export default App
