import firebase from "firebase";

// Initialize Firebase
// const config = {
//   apiKey: 'AIzaSyCYaTKjfam_qMXDnGfcdnBxScEq89VQtLk',
//   authDomain: 'curious-sandbox-196209.firebaseapp.com',
//   databaseURL: 'https://curious-sandbox-196209.firebaseio.com',
//   projectId: 'curious-sandbox-196209',
//   storageBucket: '',
//   messagingSenderId: '1034032747860'
// };

const firebaseConfig = {
  apiKey: "AIzaSyAc2LKCKtLgip_NLXr3YiFaz7f3fyl_dKo",
  authDomain: "flicker-rave.firebaseapp.com",
  projectId: "flicker-rave",
  storageBucket: "flicker-rave.appspot.com",
  messagingSenderId: "1078999172694",
  appId: "1:1078999172694:web:40e79a6f7e915037b65df7"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

const database = firebase.database();
export {
  auth,
  database,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider
};
