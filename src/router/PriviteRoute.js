import React, { useEffect, useState, useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthProvider, AuthContext } from '../Auth'

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext)
  console.log(currentUser)

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? (
          <Redirect to={'/Loging'}></Redirect>
        ) : (
          <RouteComponent {...routeProps} {...currentUser}></RouteComponent>
        )
      }
    />
  )
}
export default PrivateRoute
