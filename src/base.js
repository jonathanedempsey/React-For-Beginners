import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC7KyIqqbmwF5zqiW_Rp5zalJDEykftmOQ",
    authDomain: "catch-of-the-day-jd-299a7.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-jd-299a7.firebaseio.com",
    // projectId: "catch-of-the-day-jd-299a7",
    // storageBucket: "catch-of-the-day-jd-299a7.appspot.com",
    // messagingSenderId: "259842723987",
    // appId: "1:259842723987:web:6f2572b228cf97f106bd66"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;