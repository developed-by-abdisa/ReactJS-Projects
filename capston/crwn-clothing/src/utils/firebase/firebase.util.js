import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5gqmEuxTL0WvZ50Lm6aoetWTyCLkE_hg",
  authDomain: "crwn-clothing-web-app-1634f.firebaseapp.com",
  projectId: "crwn-clothing-web-app-1634f",
  storageBucket: "crwn-clothing-web-app-1634f.appspot.com",
  messagingSenderId: "752744256779",
  appId: "1:752744256779:web:dca5ac9c2bc227d506fe0e",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = async () =>
  signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userAuth);
  console.log({ firstDoc: userSnapshot.data() });

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (err) {
      console.log(err);
    }
  }
  await updateDoc(userDocRef, { isUpdated: "Yes" });
};