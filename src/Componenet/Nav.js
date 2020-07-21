import React from 'react'
import './Nav.css'
import im from '../img/logo.png'
import icon from '../img/icon.png'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { Button, Divider } from '@material-ui/core'
import { NavLink, Redirect } from 'react-router-dom'
import Upload from '../utils/Upload'
import app from '../firebase'
export default class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      icon: null,
      anchorEl: null,
      open: false,
      email: null,
      avatar: null,
      isLoging: false,
    }
    this.menuItenHandle = this.menuItenHandle.bind(this)
  }
  async componentDidMount() {
    const storage = app.storage()

    await app.auth().onAuthStateChanged((user) => {
      if (user) {
        const path = storage
          .ref(user.emal)
          .child(user.email)
          .child('avatar')
          .child('avatar.png')
        console.log('path' + '  ' + path)
        const DownloadURL = path.getDownloadURL().then((url) => {
          this.setState(
            {
              avatar: url,
            },
            () => console.log(url)
          )
        })
        this.setState({
          email: user.email,
          isLoging: true,
        })
      } else {
        this.setState({
          email: '未登入',
          isLoging: false,
        })
      }
    })
  }
  handleClick = (event) => {
    this.setState({
      anchorEl: event,
    })
  }

  menuItenHandle() {
    this.setState(
      {
        anchorEl: null,
      },
      () => console.log('')
    )
  }
  logOut() {
    app
      .auth()
      .signOut()
      .then(function () {
        alert('登出!')
      })
      .catch(function (error) {
        alert(error)
      })
    this.setState(
      {
        avatar: null,
      },
      () => console.log('logout')
    )
  }
  check() {
    if (!!this.state.isLoging) {
      alert('請先登入')
    }
    this.setState(
      {
        anchorEl: null,
      },
      () => console.log('')
    )
  }
  render() {
    const { anchorEl, open, email, avatar, isLoging } = this.state
    return (
      <div className="nav">
        <div className="nav-icon">
          <a href="/">
            <img alt="logo" src={im} />
          </a>
        </div>
        <div className="nav-container">
          <div className="nav-menu">
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={(event) => this.handleClick(event.currentTarget)}
            >
              菜單
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              onBlur={this.menuItenHandle}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem disabled={true}>上傳照片</MenuItem>
              <MenuItem>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => Upload(e.target.files[0])}
                />
              </MenuItem>
              <Divider variant="middle" />
              <MenuItem
                onClick={() => this.check}
                disabled={isLoging ? false : true}
              >
                {isLoging === true ? (
                  <NavLink
                    to="/ContorCenter"
                    activeClassName="hurray"
                    className="Nav_link"
                  >
                    控制台
                  </NavLink>
                ) : (
                  <NavLink to="/" activeClassName="hurray" className="Nav_link">
                    控制台
                  </NavLink>
                )}
              </MenuItem>
              <MenuItem
                onClick={() => this.check}
                disabled={isLoging ? false : true}
              >
                {isLoging === true ? (
                  <NavLink
                    to="/Account"
                    activeClassName="hurray"
                    className="Nav_link"
                  >
                    我的帳號
                  </NavLink>
                ) : (
                  <NavLink to="/" activeClassName="hurray" className="Nav_link">
                    我的帳號(請先登入)
                  </NavLink>
                )}
              </MenuItem>
              <MenuItem
                disabled={isLoging ? false : true}
                onClick={() => this.logOut()}
              >
                登出
              </MenuItem>
            </Menu>
          </div>
          <div className="userName">{email}</div>
          <div className="nav-avatar">
            <Avatar alt={email} src={avatar} />
          </div>
        </div>
      </div>
    )
  }
}
