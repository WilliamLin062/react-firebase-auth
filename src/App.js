import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './screen/Home'
import Loging from './screen/Loging'
import SignUp from './screen/SignUp'
import { AuthProvider } from './Auth'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/Loging" component={Loging} />
          <Route exact path="/SignUp" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
