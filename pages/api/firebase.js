import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBWeC28PjJqvk-BofR5yFQuYfOfL57YaZI",
  authDomain: "assignment14-saqlain.firebaseapp.com",
  databaseURL: "https://assignment14-saqlain.firebaseio.com",
  projectId: "assignment14-saqlain",
  storageBucket: "assignment14-saqlain.appspot.com",
  messagingSenderId: "98777653400",
  appId: "1:98777653400:web:81340f75c9a0fd9b29b0ed",
};
console.log("firebase init");

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export var storage = firebase.storage().ref();
export var auth = firebase.auth();
export var firestore = firebase.firestore();
export var serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();
export var functions = firebase.functions();

//Enable these lines to use with emulator

// functions.useEmulator("localhost", 5001);
// firestore.useEmulator("localhost", 8080);
// auth.useEmulator('http://localhost:9099/');

export default firebase;
