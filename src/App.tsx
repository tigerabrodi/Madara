import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { Route, Switch } from 'react-router-dom'
import { Footer } from 'components/Footer'
import { AppProviders } from 'context'
import { Home } from 'pages/Home'
import { Board } from 'pages/Board'
import { Alert } from 'components/Alert'
import { Navigation } from 'components/Navigation'

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_API_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_API_PROJECT_ID,
  storageBucket: process.env.REACT_APP_API_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_API_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_API_APP_ID,
  measurementId: process.env.REACT_APP_API_MEASUREMENT_ID,
})

const auth = firebase.auth()
const firestore = firebase.firestore()

const App = () => {
  return (
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
}

export default App
