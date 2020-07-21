import React from 'react'
import Navigation from '../Componenet/Nav'
import { Redirect } from 'react-router-dom'
import app from '../firebase'
import { Button } from '@material-ui/core'
import './css/ControlCenter.css'

export default class ControlCenter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoging: true,
      user: '',
      img: [''],
      imgName: [''],
    }
  }

  componentDidMount() {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState(
          {
            isLoging: true,
            user: user.email,
          },
          () => {
            this.getImage()
          }
        )
      } else {
        this.setState(
          {
            isLoging: false,
          },
          () => {
            console.log('UserState :' + ' ' + Boolean(user))
          }
        )
      }
    })
  }

  getImage() {
    const { user, img, item } = this.state
    const storage = app.storage()
    const path = storage.ref(user).child('image')
    const imgUrl = []
    const imageN = []
    console.log('dasdsa' + user)
    path
      .listAll()
      .then((res) => {
        res.prefixes.forEach(
          (folderRef) => {
            console.log('folderRef' + folderRef)
          },
          res.items.forEach((itemsRef) => {
            console.log('folderRef' + itemsRef.name)
            imageN.push(itemsRef.name)
            this.setState(
              {
                imgName: imageN,
              },
              () => {
                // console.table(img)
              }
            )
            itemsRef.getDownloadURL().then((url) => {
              imgUrl.push(url)
              this.setState(
                {
                  img: imgUrl,
                },
                () => {
                  // console.table(img)
                }
              )
              //    console.table(imgList)
            })
          })
        )
      })
      .catch((erro) => {
        console.table('erro' + erro)
      })
  }
  deleteImg(item) {
    const { user, img } = this.state
    console.log(item)
    app
      .storage()
      .ref(user)
      .child('image')
      .child(item)
      .delete()
      .then((ref) => {
        this.getImage()
      })
      .catch((erro) => console.log(erro))
  }
  downloadImg(imgName) {
    const { user, img, item } = this.state
    const storage = app.storage()
    const path = storage.ref(user).child('image').child(imgName)

    path
      .getDownloadURL()
      .then((res) => {
        console.table(res)
        const xhr = new XMLHttpRequest()
        xhr.responseType = 'blob'
        xhr.onload = function (event) {
          var blob = xhr.response
        }
        xhr.open('GET', res)
        xhr.send()
      })
      .catch((erro) => {
        console.log(erro)
      })
  }
  render() {
    const { isLoging, img, imgName } = this.state

    console.table(img)
    if (!isLoging) {
      return <Redirect to="/"></Redirect>
    }
    return (
      <div>
        <Navigation></Navigation>

        <div className="Control-container">
          <div className="contro-main">
            {' '}
            {img.map((item) => (
              <div className="Control-Img-container">
                <div>
                  <p
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    {img.indexOf(item)}
                  </p>
                  <div
                    style={{
                      backgroundImage: `url(${item})`,
                      backgroundSize: 'cover',
                      height: 200,
                      width: 200,
                      margin: 5,
                      borderRadius: 10,
                      border: 1,
                      boxShadow: '1px,-5px,black',
                    }}
                    className="img"
                  ></div>
                  <div>
                    <div className="btn">
                      <Button
                        color="primary"
                        onClick={() =>
                          this.deleteImg(imgName[img.indexOf(item)])
                        }
                      >
                        刪除
                      </Button>
                      <Button
                        color="secondary"
                        onClick={() =>
                          this.downloadImg(imgName[img.indexOf(item)])
                        }
                      >
                        <a href={item} target={'_blank'} download={'ds'}>
                          下載
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
