import React, { Component } from 'react';
import './index.css';
import firebase from 'firebase/app';
import 'firebase/database';
const firebaseConfig = {
  apiKey: "AIzaSyBvJwO2yQSGErN9NBZQnldxiKSwQSt1mkc",
  authDomain: "quarantine-pursuit.firebaseapp.com",
  databaseURL: "https://quarantine-pursuit.firebaseio.com",
  projectId: "quarantine-pursuit",
  storageBucket: "quarantine-pursuit.appspot.com",
  messagingSenderId: "800505781023",
  appId: "1:800505781023:web:445c432c49eb4bf083ae2a"
};
firebase.initializeApp(firebaseConfig);
export default firebase;

class App extends Component {
  render() {
    return (
      <div>
        <h1>Quarantine Pursuit</h1>
      </div>
    )
  }
}

export default App