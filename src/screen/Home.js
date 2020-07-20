import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import './index.css'
import image from '../img/logo.png'
import { Link, NavLink } from 'react-router-dom'
import Navigation from '../Componenet/Nav'
import icon from '../img/icon.png'
import { AuthContext } from '../Auth'
import app from '../firebase'
import { CircularProgress } from '@material-ui/core'

export default class Home extends React.Component {
  static contextType = AuthContext
  constructor(props) {
    super(props)

    this.state = { email: null, isLoading: false }
  }

  render() {
    const { email, isLoading } = this.state
    if (isLoading) {
      return (
        <div className="container">
          <div className="">
            <CircularProgress></CircularProgress>
          </div>
        </div>
      )
    } else
      return (
        <div className="center">
          <Navigation />
          <div className="container">
            <div className="main">
              <div
                className="title
        "
              >
                <img className="home-img" src={image}></img>
              </div>
              <h3>立即馬上開始使用</h3>
              <div className="btn-group">
                <Button variant="outlined">
                  <NavLink
                    to="/Loging"
                    activeClassName="hurray"
                    className="Nav_link"
                  >
                    登入
                  </NavLink>
                </Button>
                <Button variant="outlined" color="primary">
                  <NavLink
                    to="/SignUp"
                    activeClassName="hurray"
                    className="Nav_link_log"
                  >
                    註冊
                  </NavLink>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
  }
}
