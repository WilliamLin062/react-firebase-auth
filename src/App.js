import React, { useContext } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './screen/Home'
import Loging from './screen/Loging'
import SignUp from './screen/SignUp'
import { AuthProvider, AuthContext } from './Auth'
import PriviteRoute from './router/PriviteRoute'
import Account from './screen/Account'
import ControlCenter from './screen/ControlCenter'

function App() {
  return (
    <AuthProvider>
      <Router>
        <PriviteRoute>
          <Route exact path="/" render={(props) => <Home {...props}></Home>} />
          <Route exact path="/Loging" component={Loging} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/Account" component={Account}></Route>
          <Route exact path="/ContorCenter" component={ControlCenter}></Route>
        </PriviteRoute>
      </Router>
    </AuthProvider>
  )
}

export default App
