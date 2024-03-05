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
        Must be logged in to access this content
        <Button onClick={() => signIn()} variant="contained" size="large">
          Log In
        </Button>
      </Container>
    );
  }

  return children;
};
export default ProtectedContentContainer;
