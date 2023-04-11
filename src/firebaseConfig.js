import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyAnSh9IukNr3SoLoaWEp40ObSE1eG6Ur6E',
    authDomain: 'minus-game.firebaseapp.com',
    databaseURL: 'https://minus-game-default-rtdb.firebaseio.com',
    projectId: 'minus-game',
    storageBucket: 'minus-game.appspot.com',
    messagingSenderId: '31973790943',
    appId: '1:31973790943:web:2d7857ee2371a804e0c56a'
}

export const app = initializeApp(firebaseConfig)
export const database = getFirestore(app)
