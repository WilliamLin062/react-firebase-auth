import app from '../firebase'

export default function handleImageAsFile(image) {
  const storage = app.storage()
  var imageUrl = ''
  console.log('start of upload')
  app.auth().onAuthStateChanged((user) => {
    if (user) {
      if (image === null) {
        console.error(`not an image, the image file is a ${typeof image}`)
      } else if (image.name !== 'undefined' || image === null) {
        const uploadTask = storage
          .ref(`/${user.email}/image/${image.name}`)
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
              .child('image')
              .child(image.name)
              .getDownloadURL()
              .then((firebaseUrl) => {
                console.log(firebaseUrl)
                imageUrl = firebaseUrl
              })
              .then(console.log('上傳成功 ' + ' ' + imageUrl))
          }
        )
      }
    } else {
      alert('請先登入')
    }
  })
  return imageUrl
}
