"use client";
import React from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { Button } from "@/components/ui/button";
import { auth } from "@/config";

function Login() {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("user", user);
    }
  });

  return (
    <div>
      Login page
      <Button onClick={googleSignIn}>Google</Button>
    </div>
  );
}

export default Login;
