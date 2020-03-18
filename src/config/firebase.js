import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: process.env.FB_apiKey,
  authDomain =  process.env.FB_authDomain,
  databaseURL = process.env.FB_databaseURL,
  projectId =  process.env.FB_projectId,
  storageBucket =  process.env.FB_storageBucket,
  messagingSenderId =  process.env.FB_messagingSenderId,
  appId =  process.env.FB_appId,
  measurementId =  process.env.FB_measurementId
}
firebase.initializeApp(config); 
firebase.firestore().settings({timestampsInSnapshots: true})

export default firebase;