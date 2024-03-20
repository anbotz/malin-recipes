"use client";
import * as React from "react";
import { signIn, useSession } from "next-auth/react";
import { Container } from "@mui/material";

const ProtectedContentContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "0",
          flexGrow: 1,
        }}
      >
        Il faut se connecter pour accéder à ce contenu
        <button className="btn btn-primary btn-lg" onClick={() => signIn()}>
          Connexion
        </button>
      </Container>
    );
  }

  return children;
};
export default ProtectedContentContainer;
