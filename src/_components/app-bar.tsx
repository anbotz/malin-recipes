import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Add, Kitchen, Microwave } from "@mui/icons-material";

import Link from "next/link";
import { Tab, Tabs } from "@mui/material";
import { SearchBar } from "./search";

export default function AppBarComponent() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Tabs value={1}>
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
          </Tabs>
          <SearchBar />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" }, margin: "0px 10px" }}>
            <Link href="/create">
              <IconButton
                size="large"
                edge="end"
                aria-haspopup="true"
                color="inherit"
              >
                <Add />
              </IconButton>
            </Link>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, margin: "0px 10px" }}>
            <IconButton
              size="large"
              edge="end"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
