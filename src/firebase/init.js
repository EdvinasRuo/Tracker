import firebase from 'firebase'; 


//const firebaseConfig = {};

const firebaseApp = firebase.initializeApp(firebaseConfig); 

export default firebaseApp.firestore(); 

