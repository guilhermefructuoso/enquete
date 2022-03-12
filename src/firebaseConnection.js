import firebase from 'firebase/app'
import 'firebase/firestore'

let firebaseConfig = {
    apiKey: 'AIzaSyD_cQopDL70xVk28I7HH2gERE185KLCl9A',
    authDomain: 'enquete-dae11.firebaseapp.com',
    projectId: 'enquete-dae11',
    storageBucket: 'enquete-dae11.appspot.com',
    messagingSenderId: '76841985068',
    appId: '1:76841985068:web:59e88fa7173133a94e5d89',
    measurementId: 'G-YT50CC1BW5',
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export default firebase
