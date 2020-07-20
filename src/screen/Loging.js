import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { Link, NavLink, Redirect } from 'react-router-dom'
import app from '../firebase/index'
import { Button, CircularProgress } from '@material-ui/core'
import Navigation from '../Componenet/Nav'
import icon from '../img/icon.png'
export default class Loging extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      isSingin: false,
    }
  }
  componentDidMount() {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState(
          {
            isSingin: true,
          },
          () => {
            console.log('已經登入了')

            alert('跳轉至首頁')
          }
        )
      }
    })
  }
  onChangehandle(id, value) {
    const { password, email } = this.state

    if (id === 'password') {
      this.setState(
        {
          password: value,
        },
        () => {
          console.log()
        }
      )
    }
    if (id === 'email') {
      this.setState(
        {
          email: value,
        },
        () => {
          console.log()
        }
      )
    }
  }
  async logInghandle() {
    this.setState(
      {
        isLoading: true,
      },
      () => console.log('isLoading')
    )
    try {
      await app
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then()
    } catch (error) {
      alert(error)
    }
    this.setState(
      {
        isLoading: false,
      },
      () => console.log('isLoaded')
    )
  }
  render() {
    const { password, email, isLoading, isSingin } = this.state
    const rePassword = /^(?=.*\d)(?=.*[a-zA-Z]).{6,30}$/
    const reEmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/

    if (isSingin) {
      return <Redirect to="/"></Redirect>
    }
    if (isLoading) {
      return (
        <div className="loging-container">
          <CircularProgress></CircularProgress>
        </div>
      )
    } else if (email.match(reEmail) && password.match(rePassword)) {
      console.log(true)
      return (
        <div className={'center'}>
          <Navigation icon={icon} user={this.context.name} />
          <div className="loging-container">
            <div className="log">
              <div>
                <h1>登入</h1>
              </div>

              <div className="input-group">
                <div>
                  <TextField
                    className="textField"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      this.onChangehandle(e.target.id, e.target.value)
                    }}
                    label="帳號"
                  />
                </div>
                <div>
                  <TextField
                    className="textField"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      this.onChangehandle(e.target.id, e.target.value)
                    }}
                    label="密碼"
                  />
                </div>
              </div>
              <div className="text-group">
                <div>
                  <NavLink
                    to="/SignUp"
                    activeClassName="hurray"
                    className="Nav_link"
                  ></NavLink>
                </div>
                <div>
                  <NavLink
                    to="/SignUp"
                    activeClassName="hurray"
                    className="Nav_link"
                  >
                    沒有帳號?註冊
                  </NavLink>
                </div>
                <div className="login-btn">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => this.logInghandle()}
                  >
                    登入
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (!email.match(reEmail) && !password.match(rePassword)) {
      return (
        <div className={'center'}>
          {' '}
          <Navigation icon={icon} user={this.context.name} />
          <div className="loging-container">
            <div className="log">
              <div>
                <h1>登入</h1>
              </div>

              <div className="input-group">
                <div>
                  <TextField
                    className="textField"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      this.onChangehandle(e.target.id, e.target.value)
                    }}
                    error
                    helperText={'格式錯誤'}
                    label="帳號"
                  />
                </div>
                <div>
                  <TextField
                    className="textField"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      this.onChangehandle(e.target.id, e.target.value)
                    }}
                    error
                    helperText={'格式錯誤'}
                    label="密碼"
                  />
                </div>
              </div>
              <div className="text-group">
                <div>
                  <NavLink
                    to="/SignUp"
                    activeClassName="hurray"
                    className="Nav_link"
                  ></NavLink>
                </div>
                <div>
                  <NavLink
                    to="/SignUp"
                    activeClassName="hurray"
                    className="Nav_link"
                  >
                    沒有帳號?註冊
                  </NavLink>
                </div>
                <div className="login-btn">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={true}
                    onClick={() => this.logInghandle()}
                  >
                    登入
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (!email.match(reEmail)) {
      console.log(false)
      return (
        <div className={'center'}>
          {' '}
          <Navigation icon={icon} user={this.context.name} />
          <div className="loging-container">
            <div className="log">
              <div>
                <h1>登入</h1>
              </div>

              <div className="input-group">
                <div>
                  <TextField
                    className="textField"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      this.onChangehandle(e.target.id, e.target.value)
                    }}
                    error
                    helperText={'格式錯誤'}
                    label="帳號"
                  />
                </div>
                <div>
                  <TextField
                    className="textField"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      this.onChangehandle(e.target.id, e.target.value)
                    }}
                    label="密碼"
                  />
                </div>
              </div>
              <div className="text-group">
                <div>
                  <NavLink
                    to="/SignUp"
                    activeClassName="hurray"
                    className="Nav_link"
                  ></NavLink>
                </div>
                <div>
                  <NavLink
                    to="/SignUp"
                    activeClassName="hurray"
                    className="Nav_link"
                  >
                    沒有帳號?註冊
                  </NavLink>
                </div>
                <div className="login-btn">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={true}
                    onClick={() => this.logInghandle()}
                  >
                    登入
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (!password.match(rePassword)) {
      return (
        <div className={'center'}>
          {' '}
          <Navigation icon={icon} user={this.context.name} />
          <div className="loging-container">
            {' '}
            <div className="log">
              <div>
                <h1>登入</h1>
              </div>

              <div className="input-group">
                <div>
                  <TextField
                    className="textField"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      this.onChangehandle(e.target.id, e.target.value)
                    }}
                    label="帳號"
                  />
                </div>
                <div>
                  <TextField
                    className="textField"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      this.onChangehandle(e.target.id, e.target.value)
                    }}
                    error
                    helperText={'格式錯誤'}
                    label="密碼"
                  />
                </div>
              </div>
              <div className="text-group">
                <div>
                  <NavLink
                    to="/SignUp"
                    activeClassName="hurray"
                    className="Nav_link"
                  ></NavLink>
                </div>
                <div>
                  <NavLink
                    to="/SignUp"
                    activeClassName="hurray"
                    className="Nav_link"
                  >
                    沒有帳號?註冊
                  </NavLink>
                </div>
                <div className="login-btn">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={true}
                    onClick={() => this.logInghandle()}
                  >
                    登入
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
