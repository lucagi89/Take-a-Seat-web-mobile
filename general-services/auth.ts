// src/services/auth.ts
import { auth } from '../apps/web/lib/firebase.config';
import { User } from 'firebase/auth';
import { useRouter } from "expo-router";

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  signOut

} from 'firebase/auth';
// import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';


// WebBrowser.maybeCompleteAuthSession();

interface AccessResponse {
  user: User;
}

export async function handleUser(email: string, password: string): Promise<AccessResponse> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed up:', userCredential.user);
    return { user: userCredential.user };
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}






export async function signUp(email: string, password: string): Promise<AccessResponse> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user };
  }
  catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}


export const handleLogout = async () => {
  console.log("Logging out...");
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
