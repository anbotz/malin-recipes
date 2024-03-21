"use client";
import * as React from "react";
import { signIn, useSession } from "next-auth/react";

const ProtectedContentContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex flex-col items-center grow justify-center">
        Il faut se connecter pour accéder à ce contenu
        <button className="btn btn-primary btn-lg" onClick={() => signIn()}>
          Connexion
        </button>
      </div>
    );
  }

  return children;
};
export default ProtectedContentContainer;
