const firebaseConfig = {
  apiKey: 'AIzaSyCxF44T7BJ9SX9pyjw-DJ_vK6y6AVxz-i0',
  authDomain: 'autotrander.firebaseapp.com',
  projectId: 'autotrander',
  storageBucket: 'autotrander.appspot.com',
  messagingSenderId: '752756829096',
  appId: '1:752756829096:web:2b53f1c997d74ef42f0b9d'
}
// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app')
const {
  collection,
  getFirestore,
  doc,
  updateDoc,
  onSnapshot,
  setDoc,
  getDoc
} = require('firebase/firestore')
const collectionName = 'autotrander'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const autotrander = collection(db, collectionName)
let docRef = doc(
  autotrander,
  new Date()
    .toLocaleDateString('en-US')
    .replace('/', '-')
    .replace('/', '-')
  // '4-3-2023'
)

module.exports = {
  getNSEOptionChain: () =>
    getDoc(docRef).then(docSnap => {
      if (docSnap.exists()) {
        return docSnap.data()
      } else {
        return null
      }
    }),
  updateNSEOptionChain: data =>
    updateDoc(docRef, data).catch(() => setDoc(docRef, data)),
  onNSEOptionChainUpdate: cb => onSnapshot(docRef, cb)
}
