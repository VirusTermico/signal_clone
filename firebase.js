import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAkK___GnaLJnPnpWgdjeBN3HXzcUHLwAI",
  authDomain: "ajuda-3e6c7.firebaseapp.com",
  projectId: "ajuda-3e6c7",
  storageBucket: "ajuda-3e6c7.appspot.com",
  messagingSenderId: "586840413704",
  appId: "1:586840413704:web:9f7a58f1f2847ad412e3bd",
  measurementId: "G-YHJH41Q0CS"
};



!firebase.apps.length ? firebase.initializeApp(firebaseConfig): firebase.app();
// Initialize Firebase


const auth=firebase.auth()
const db=firebase.firestore()

export  {firebase,db,auth};
