"use client";
import { signIn } from "next-auth/react";

const SignInButton = () => (
  <button className="btn btn-primary btn-lg" onClick={() => signIn()}>
    Connexion
  </button>
);

export default SignInButton;
