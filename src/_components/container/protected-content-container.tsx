"use client";
import * as React from "react";
import { signIn, useSession } from "next-auth/react";
import { Button, Container } from "@mui/material";

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
        <Button onClick={() => signIn()} variant="contained" size="large">
          Connexion
        </Button>
      </Container>
    );
  }

  return children;
};
export default ProtectedContentContainer;
