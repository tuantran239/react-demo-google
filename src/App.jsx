import { useState } from 'react'

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import './App.css'
import app from './firebase';

function App() {
  const provider = new GoogleAuthProvider();

  const auth = getAuth(app);

  const [user, setUser] = useState(undefined);

  const onSubmitHandler = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        setUser(user)

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }


  return (
    <>
      {user && <>{user.email} sigined</>}
      {!user && <button onClick={() => onSubmitHandler()}>Login with google</button>}
    </>
  )
}

export default App
