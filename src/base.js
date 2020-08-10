import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC7KyIqqbmwF5zqiW_Rp5zalJDEykftmOQ",
    authDomain: "catch-of-the-day-jd-299a7.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-jd-299a7.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;