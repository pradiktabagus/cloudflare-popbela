import * as firebase from 'firebase/app';

if (typeof window !== 'undefined' && !firebase.getApps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyC-QM9gpgKr7hbRZPkHIvmyF83aLKq2tWo',
    authDomain: 'popbela-4f357.firebaseapp.com',
    projectId: 'popbela-4f357',
    storageBucket: 'popbela-4f357.appspot.com',
    messagingSenderId: '870774788708',
    appId: '1:870774788708:web:f2be8dc9beed4667d0c571',
  });
}

export { firebase };
