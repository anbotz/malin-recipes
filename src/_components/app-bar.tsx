"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Add, Kitchen, Microwave } from "@mui/icons-material";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { Tab, Tabs } from "@mui/material";
import UserMenu from "./user-menu";

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
  const [selected, setSelected] = React.useState<number | boolean>(false);

  React.useEffect(() => {
    setSelected(getTabIndexFromPath(pathname));
  }, [pathname]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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
              label="Recipe"
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
            <Tab component={Link} href="/create" icon={<Add />} />
          </Tabs>
          <Box sx={{ flexGrow: 1 }} />
          <UserMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
