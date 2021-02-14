import { useContext, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { ChatPage } from '../pages/ChatPage';
import { AuthRouter } from './AuthRouter';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';

export const AppRouter = () => {

  const { auth, verificaToken } = useContext(AuthContext)

  useEffect(() => {
    verificaToken();
  }, [verificaToken])

  if (auth.checking) {
    return <h1>Espere  por favor ...</h1>
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRouter
            isAuthenticated={auth.logged}
            path="/auth"
            component={AuthRouter}
          />
          <PrivateRouter
            isAuthenticated={auth.logged}
            exact
            path="/"
            component={ChatPage}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}
