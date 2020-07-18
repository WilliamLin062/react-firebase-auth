import * as React from 'react'
import Button from '@material-ui/core/Button'
import { TextField } from '@material-ui/core'
import image from '../img/logo.png'
import Input from '@material-ui/core/Input'

import { findByLabelText } from '@testing-library/react'
import app from '../firebase'
import { Redirect } from 'react-router-dom'

export default class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      checkEmail: '',
      password: '',
    }
  }
  async handleSignup() {
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
      this.props.history.push('/')
    } catch (error) {
      alert(error)
    }
    alert('感謝使用')
  }
  handleChange(id, value) {
    const { email, password } = this.state
    if (id === 'email') {
      this.setState(
        {
          email: value,
        },
        () => {
          console.log(id + '    ' + value)
        }
      )
    } else if (id === 'checkEmail') {
      this.setState(
        {
          checkEmail: value,
        },
        () => {
          console.log(id + '    ' + value)
        }
      )
    } else if (id === 'password') {
      this.setState(
        {
          password: value,
        },
        () => {
          console.log(id + '    ' + value)
        }
      )
    }
  }
  render() {
    const { email, password, checkEmail } = this.state
    const rePassword = /^(?=.*\d)(?=.*[a-zA-Z]).{6,30}$/
    const reEmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
    if (password === '' && email !== checkEmail) {
      return (
        <div className="signup-container">
          <div className="log-main">
            <div className="logo">
              <a href="/">
                <img className="signUp-img" src={image}></img>
              </a>
              <h2> 免費註冊即可使用</h2>
            </div>

            <div className="google-btn">
              <Button variant="contained" color="primary" disableElevation>
                使用Google登入
              </Button>
            </div>

            <div className="line-group">
              <div className="line">或</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3>以電子郵件註冊</h3>
            </div>

            <p>您的電子郵件</p>
            <TextField
              className="textField"
              id="email"
              label="電子郵件"
              variant="outlined"
              size="small"
              error={email === '' ? true : false}
              helperText={email === '' ? '不能為空' : ''}
              value={email}
              onChange={(e) => this.handleChange(e.target.id, e.target.value)}
            ></TextField>
            <p>確認電子郵件</p>
            <TextField
              className="textField"
              id="checkEmail"
              label="確認電子郵件"
              variant="outlined"
              size="small"
              error
              helperText={'兩次電子信箱不相同'}
              value={checkEmail}
              onChange={(e) => this.handleChange(e.target.id, e.target.value)}
            ></TextField>
            <p>建立密碼</p>
            <TextField
              className="textField"
              id="password"
              label="密碼"
              variant="outlined"
              size="small"
              error
              helperText={'密碼不能為空'}
              value={password}
              onChange={(e) => this.handleChange(e.target.id, e.target.value)}
            ></TextField>
            <div className="sign-btn">
              <Button
                variant="contained"
                color="primary"
                disableElevation
                disabled={true}
                onClick={() => {
                  this.handleSignup()
                }}
              >
                註冊
              </Button>
            </div>
          </div>
        </div>
      )
    }

    /*--------------------------------------- */
    if (email !== checkEmail || email === '' || password === '') {
      return (
        <div className="signup-container">
          <div className="log-main">
            <div className="logo">
              <a href="/">
                <img className="signUp-img" src={image}></img>
              </a>
              <h2> 免費註冊即可使用</h2>
            </div>

            <div className="google-btn">
              <Button variant="contained" color="primary" disableElevation>
                使用Google登入
              </Button>
            </div>

            <div className="line-group">
              <div className="line">或</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3>以電子郵件註冊</h3>
            </div>

            <p>您的電子郵件</p>
            <TextField
              className="textField"
              id="email"
              label="電子郵件"
              variant="outlined"
              size="small"
              error={email === '' ? true : false}
              helperText={email === null ? '電子郵件不能為空' : ''}
              value={email}
              onChange={(e) => this.handleChange(e.target.id, e.target.value)}
            ></TextField>
            <p>確認電子郵件</p>
            <TextField
              className="textField"
              id="checkEmail"
              label="確認電子郵件"
              variant="outlined"
              size="small"
              error={email === checkEmail ? false : true}
              helperText={
                email === checkEmail ? '' : '兩次輸入電子信箱不相同!!!'
              }
              value={checkEmail}
              onChange={(e) => this.handleChange(e.target.id, e.target.value)}
            ></TextField>
            <p>建立密碼</p>
            <TextField
              className="textField"
              id="password"
              label="密碼"
              variant="outlined"
              size="small"
              error
              helperText={password === '' ? '密碼不能為空' : ''}
              value={password}
              onChange={(e) => this.handleChange(e.target.id, e.target.value)}
            ></TextField>
            <div className="sign-btn">
              <Button
                variant="contained"
                color="primary"
                disableElevation
                disabled={true}
                onClick={() => {
                  this.handleSignup()
                }}
              >
                註冊
              </Button>
            </div>
          </div>
        </div>
      )
    }
    /*--------------------------------------- */
    if (password === '' || password.length < 6 || email === '') {
      return (
        <div className="signup-container">
          <div className="log-main">
            <div className="logo">
              <a href="/">
                <img className="signUp-img" src={image}></img>
              </a>
              <h2> 免費註冊即可使用</h2>
            </div>

            <div className="google-btn">
              <Button variant="contained" color="primary" disableElevation>
                使用Google登入
              </Button>
            </div>

            <div className="line-group">
              <div className="line">或</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3>以電子郵件註冊</h3>
            </div>

            <p>您的電子郵件</p>
            <TextField
              className="textField"
              id="email"
              label="電子郵件"
              variant="outlined"
              size="small"
              helperText={email === null ? '電子郵件不能為空' : ''}
              value={email}
              onChange={(e) => this.handleChange(e.target.id, e.target.value)}
            ></TextField>
            <p>確認電子郵件</p>
            <TextField
              className="textField"
              id="checkEmail"
              label="確認電子郵件"
              variant="outlined"
              size="small"
              value={checkEmail}
              onChange={(e) => this.handleChange(e.target.id, e.target.value)}
            ></TextField>
            <p>建立密碼</p>
            <TextField
              className="textField"
              id="password"
              label="密碼"
              variant="outlined"
              size="small"
              error
              helperText={
                password === null ? '密碼不能為空' : '密碼長度必須大於5個字元'
              }
              value={password}
              onChange={(e) => this.handleChange(e.target.id, e.target.value)}
            ></TextField>
            <div className="sign-btn">
              <Button
                variant="contained"
                color="primary"
                disabled={true}
                disableElevation
                onClick={() => {
                  this.handleSignup()
                }}
              >
                註冊
              </Button>
            </div>
          </div>
        </div>
      )
    }
    if (!email.match(reEmail) || !checkEmail.match(reEmail)) {
      return (
        <div className="signup-container">
          <div className="log-main">
            <div className="logo">
              <a href="/">
                <img className="signUp-img" src={image}></img>
              </a>
              <h2> 免費註冊即可使用</h2>
            </div>

            <div className="google-btn">
              <Button variant="contained" color="primary" disableElevation>
                使用Google登入
              </Button>
            </div>

            <div className="line-group">
              <div className="line">或</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3>以電子郵件註冊</h3>
            </div>

            <p>您的電子郵件</p>
            <TextField
              className="textField"
              id="email"
              label="電子郵件"
              variant="outlined"
              size="small"
              error
              helperText={email === null ? '電子郵件不能為空' : '格式錯誤'}
              value={email}
              onChange={(e) => this.handleChange(e.target.id, e.target.value)}
            ></TextField>
            <p>確認電子郵件</p>
            <TextField
              className="textField"
              id="checkEmail"
              label="確認電子郵件"
              variant="outlined"
              size="small"
              value={checkEmail}
              error
              helperText={'格式錯誤'}
              onChange={(e) => this.handleChange(e.target.id, e.target.value)}
            ></TextField>
            <p>建立密碼</p>
            <TextField
              className="textField"
              id="password"
              label="密碼"
              variant="outlined"
              size="small"
              value={password}
              onChange={(e) => this.handleChange(e.target.id, e.target.value)}
            ></TextField>
            <div className="sign-btn">
              <Button
                variant="contained"
                color="primary"
                disabled={true}
                disableElevation
                onClick={() => {
                  this.handleSignup()
                }}
              >
                註冊
              </Button>
            </div>
          </div>
        </div>
      )
    }
    if (!password.match(rePassword)) {
      return (
        <div className="signup-container">
          <div className="log-main">
            <div className="logo">
              <a href="/">
                <img className="signUp-img" src={image}></img>
              </a>
              <h2> 免費註冊即可使用</h2>
            </div>

            <div className="google-btn">
              <Button variant="contained" color="primary" disableElevation>
                使用Google登入
              </Button>
            </div>

            <div className="line-group">
              <div className="line">或</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3>以電子郵件註冊</h3>
            </div>

            <p>您的電子郵件</p>
            <TextField
              className="textField"
              id="email"
              label="電子郵件"
              variant="outlined"
              size="small"
              value={email}
              onChange={(e) => this.handleChange(e.target.id, e.target.value)}
            ></TextField>
            <p>確認電子郵件</p>
            <TextField
              className="textField"
              id="checkEmail"
              label="確認電子郵件"
              variant="outlined"
              size="small"
              value={checkEmail}
              onChange={(e) => this.handleChange(e.target.id, e.target.value)}
            ></TextField>
            <p>建立密碼</p>
            <TextField
              className="textField"
              id="password"
              label="密碼"
              variant="outlined"
              size="small"
              error
              helperText={'格式錯誤'}
              value={password}
              onChange={(e) => this.handleChange(e.target.id, e.target.value)}
            ></TextField>
            <div className="sign-btn">
              <Button
                variant="contained"
                color="primary"
                disabled={true}
                disableElevation
                onClick={() => {
                  this.handleSignup()
                }}
              >
                註冊
              </Button>
            </div>
          </div>
        </div>
      )
    }
    if (!password.match(rePassword) && !email.match(reEmail)) {
      return (
        <div className="signup-container">
          <div className="log-main">
            <div className="logo">
              <a href="/">
                <img className="signUp-img" src={image}></img>
              </a>
              <h2> 免費註冊即可使用</h2>
            </div>

            <div className="google-btn">
              <Button variant="contained" color="primary" disableElevation>
                使用Google登入
              </Button>
            </div>

            <div className="line-group">
              <div className="line">或</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3>以電子郵件註冊</h3>
            </div>

            <p>您的電子郵件</p>
            <TextField
              className="textField"
              id="email"
              label="電子郵件"
              variant="outlined"
              size="small"
              error
              helperText={email === null ? '電子郵件不能為空' : '格式錯誤'}
              value={email}
              onChange={(e) => this.handleChange(e.target.id, e.target.value)}
            ></TextField>
            <p>確認電子郵件</p>
            <TextField
              className="textField"
              id="checkEmail"
              label="確認電子郵件"
              variant="outlined"
              size="small"
              value={checkEmail}
              error
              helperText={'格式錯誤'}
              onChange={(e) => this.handleChange(e.target.id, e.target.value)}
            ></TextField>
            <p>建立密碼</p>
            <TextField
              className="textField"
              id="password"
              label="密碼"
              variant="outlined"
              size="small"
              error
              helperText={'格式錯誤'}
              value={password}
              onChange={(e) => this.handleChange(e.target.id, e.target.value)}
            ></TextField>
            <div className="sign-btn">
              <Button
                variant="contained"
                color="primary"
                disabled={true}
                disableElevation
                onClick={() => {
                  this.handleSignup()
                }}
              >
                註冊
              </Button>
            </div>
          </div>
        </div>
      )
    }

    /*--------------------------------------- */
    return (
      <div className="signup-container">
        <div className="log-main">
          <div className="logo">
            <a href="/">
              <img className="signUp-img" src={image}></img>
            </a>
            <h2> 免費註冊即可使用</h2>
          </div>

          <div className="google-btn">
            <Button variant="contained" color="primary" disableElevation>
              使用Google登入
            </Button>
          </div>

          <div className="line-group">
            <div className="line">或</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3>以電子郵件註冊</h3>
          </div>

          <p>您的電子郵件</p>
          <TextField
            className="textField"
            id="email"
            label="電子郵件"
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => this.handleChange(e.target.id, e.target.value)}
          ></TextField>
          <p>確認電子郵件</p>
          <TextField
            className="textField"
            id="checkEmail"
            label="確認電子郵件"
            variant="outlined"
            size="small"
            value={checkEmail}
            onChange={(e) => this.handleChange(e.target.id, e.target.value)}
          ></TextField>
          <p>建立密碼</p>
          <TextField
            className="textField"
            id="password"
            label="密碼"
            variant="outlined"
            size="small"
            value={password}
            onChange={(e) => this.handleChange(e.target.id, e.target.value)}
          ></TextField>
          <div className="sign-btn">
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => {
                this.handleSignup()
              }}
            >
              註冊
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
