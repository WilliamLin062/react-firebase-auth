import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import './index.css'
import image from '../img/logo.png'
import { Link, NavLink } from 'react-router-dom'

export default class Home extends React.Component {
  render() {
    return (
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
    )
  }
}
