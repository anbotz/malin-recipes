"use client";
import * as React from "react";
import { AppBar, Box, Typography, Tab, Tabs } from "@mui/material";
import { Add, Kitchen, Microwave } from "@mui/icons-material";
import { usePathname } from "next/navigation";

import Link from "next/link";
import UserMenu from "./user-menu";
import { useAuthSession } from "@/hooks/use-auth-session";

const getTabIndexFromPath = (path: string) => {
  switch (path) {
    case "/create":
      return 3;
    case "/batch":
      return 2;
    case "/recipe":
      return 1;
    case "/":
      return 0;
    default:
      return false;
  }
};
export default function AppBarComponent() {
  const pathname = usePathname();
  const { permissions } = useAuthSession();

  const [selected, setSelected] = React.useState<number | boolean>(false);

  React.useEffect(() => {
    setSelected(getTabIndexFromPath(pathname));
  }, [pathname]);

  return (
    <>
      <AppBar position="fixed">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          marginRight="10px"
        >
          <Tabs value={selected} onChange={(_e, v) => setSelected(v)}>
            <Tab
              component={Link}
              href="/"
              label={
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  MALIN RECIPE
                </Typography>
              }
            />
            <Tab
              component={Link}
              href="/recipe"
              label="Recettes"
              icon={<Kitchen />}
              iconPosition="start"
            />
            <Tab
              component={Link}
              href="/batch"
              label="Batch"
              icon={<Microwave />}
              iconPosition="start"
            />
            {permissions.includes("RECIPE.CREATE") && (
              <Tab component={Link} href="/create" icon={<Add />} />
            )}
          </Tabs>
          <Box sx={{ flexGrow: 1 }} />
          <UserMenu />
        </Box>
      </AppBar>
      <Box height="75px" />
    </>
  );
}
