import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDBPXb3rMMoKhK55JMLk-4WFBnpmCLqtew",
    authDomain: "interview-bbcf1.firebaseapp.com",
    projectId: "interview-bbcf1",
    storageBucket: "interview-bbcf1.appspot.com",
    messagingSenderId: "909179165512",
    appId: "1:909179165512:web:540dd556d490ee2471317d",
    measurementId: "G-SCRZVP4PMG"
  };

  const app = initializeApp(firebaseConfig);
  const auth=getAuth();
  const provider= new GoogleAuthProvider();
  const storage=getStorage();

  export {auth};
  export {provider};
  export{storage};
