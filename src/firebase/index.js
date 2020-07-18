import * as firebase from 'firebase/app'
import 'firebase/auth'

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'react-firebase-auth-ccfb1.firebaseapp.com',
  databaseURL: 'https://react-firebase-auth-ccfb1.firebaseio.com',
  projectId: 'react-firebase-auth-ccfb1',
  storageBucket: 'react-firebase-auth-ccfb1.appspot.com',
  messagingSenderId: '242701012483',
  appId: '1:242701012483:web:423d7e381fdedb56434836',
  measurementId: 'G-9KHXJ2YSN5',
})

export default app
