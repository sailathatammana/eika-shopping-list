import firebase from '@firebase/app'
import '@firebase/storage'

// Replace these with your own :)
const firebaseConfig = {
  apiKey: "AIzaSyDW3BecfroLuv8NfK_Gv1K7tTyRVQjcoqA",
  authDomain: "shopping-cart-70c46.firebaseapp.com",
  projectId: "shopping-cart-70c46",
  storageBucket: "shopping-cart-70c46.appspot.com",
  messagingSenderId: "149008997452",
  appId: "1:149008997452:web:bd1118fa727d3ac72028e9"
  }

// Make sure it hasn't already been initialized
if (!firebase.apps?.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase