import React from 'react'
import app from '../firebase'
import Navigation from '../Componenet/Nav'
import { Redirect } from 'react-router-dom'
import { Divider, Avatar } from '@material-ui/core'
import './index.css'
export default class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      avatar: '',
      creatTime: '',
      lastSignInTime: '',
      phoneNumber: '',
    }
  }

  async componentDidMount() {
    console.log('didmount')
    await app.auth().onAuthStateChanged((user) => {
      if (user) {
        const path = app
          .storage()
          .ref(user.email)
          .child('avatar')
          .child('avatar.png')
          .getDownloadURL()
          .then((url) => {
            this.setState(
              {
                avatar: url,
              },
              () => {}
            )
          })
        console.log(user)
        this.setState({
          creatTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
          phoneNumber: user.phoneNumber,
        })
      }
    })
  }

  async upLoadAvatar(image) {
    const storage = app.storage()
    var imageUrl = ''
    console.log(image.name)
    console.log('start of upload')
    await app.auth().onAuthStateChanged((user) => {
      if (user) {
        if (image === null) {
          console.error(`not an image, the image file is a ${typeof image}`)
        } else if (image.name !== 'undefined' || image === null) {
          const uploadTask = storage
            .ref(`/${user.email}/avatar/avatar.png`)
            .put(image)
          uploadTask.on(
            'state_changed',
            (e) => {
              console.log(e)
            },
            (err) => {
              console.log(err)
            },
            () => {
              storage
                .ref(user.email)
                .child('avatar')
                .child('avatar.png')
                .getDownloadURL()
                .then((firebaseUrl) => {
                  console.log(firebaseUrl)
                  imageUrl = firebaseUrl
                })
                .then(
                  this.setState(
                    { avatar: imageUrl },
                    console.log('上傳成功 ' + ' ' + imageUrl)
                  )
                )
            }
          )
        }
      } else {
        alert('請先登入')
      }
    })
  }

  render() {
    const { avatar, creatTime, lastSignInTime, phoneNumber } = this.state

    console.log(avatar)
    return (
      <div>
        <Navigation></Navigation>
        <div className="account-container">
          <div className="account-from">
            <h2>上傳大頭貼</h2>
            <div className="">
              <img
                alt="圖片"
                src={avatar}
                width="100"
                className="account-img"
              ></img>
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => this.upLoadAvatar(e.target.files[0])}
            ></input>
            <h2>使用者資訊</h2>
            <Divider />
            <h4>創建時間</h4>
            <p>{creatTime}</p>
            <h4>最後創建時間</h4>
            <p>{lastSignInTime}</p>
          </div>
        </div>
      </div>
    )
  }
}
