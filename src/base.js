import Rebase from 're-base';

// This auto connects to Firebase and has an easy to use API (see Inventory.js)
const base = Rebase.createClass({
    apiKey: "AIzaSyBYS7DdW2lgdvsjxF6odA_k5DumzIxeY7c",
    authDomain: "catch-of-the-day-e59bf.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-e59bf.firebaseio.com",
    storageBucket: "catch-of-the-day-e59bf.appspot.com"
});

export default base;
