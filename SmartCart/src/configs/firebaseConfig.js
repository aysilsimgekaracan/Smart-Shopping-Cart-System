// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"
import * as firebase from 'firebase'
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUDGET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID } from 'react-native-dotenv'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUDGET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID
}

// Initialize Firebase

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase }

// const analytics = getAnalytics(app)