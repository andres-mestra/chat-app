import { Route, Redirect } from "react-router-dom"


export const PrivateRouter = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (
    <Route {...rest}
      component={(props) => (
        (isAuthenticated)
          ? <Component {...props} />
          : <Redirect to="/auth" />
      )}
    />
  )
}