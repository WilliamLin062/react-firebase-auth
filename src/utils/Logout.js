import { Redirect } from 'react-router-dom'

const { default: app } = require('../firebase')

const logOut = () => {
  app
    .auth()
    .signOut()
    .then(function () {
      alert('登出!')
    })
    .catch(function (error) {
      // An error happened.
    })
}
export default logOut
