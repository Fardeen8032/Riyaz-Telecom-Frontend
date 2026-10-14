import {signInWithPopup,signOut} from "firebase/auth";
import {auth,googleAuthProvider,} from "../Utils/config/firebase.js";

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(
      auth,
      googleAuthProvider
    );

    const idToken = await result?.user.getIdToken();

    return {
      idToken,
      user: result?.user,
    };
  } catch (error) {
    console.error("Google sign-in failed:", error);

    throw error;
  }
};

const signOutFromGoogle = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Google sign-out failed:", error);

    throw error;
  }
};

export {
  signInWithGoogle,
  signOutFromGoogle,
};
