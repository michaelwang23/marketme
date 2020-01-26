import firebase from 'firebase';

const config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyB4S2OZV8nLXAGzfDttrMX1IUylRBPUIis",
    authDomain: "publicizeme-6f946.firebaseapp.com",
    databaseURL: "https://publicizeme-6f946.firebaseio.com",
    projectId: "publicizeme-6f946",
    storageBucket: "publicizeme-6f946.appspot.com",
    messagingSenderId: "520820580666",
    appId: "1:520820580666:web:182a77b446c514a3b37003",
    measurementId: "G-XBL339W1WZ"
};
const fire = firebase.initializeApp(config);
export default fire;