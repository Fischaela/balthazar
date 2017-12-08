import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBv1iJYZ9oyPXq6jXQA-Gh0rtSZi-3V1Vg",
  authDomain: "balthazar-1f79c.firebaseapp.com",
  databaseURL: "https://balthazar-1f79c.firebaseio.com",
  projectId: "balthazar-1f79c",
  storageBucket: "balthazar-1f79c.appspot.com",
  messagingSenderId: "124156382426"};
const fire = firebase.initializeApp(config);

export default fire;
