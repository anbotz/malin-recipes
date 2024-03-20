"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { signIn, signOut, useSession } from "next-auth/react";

const settings = [{ title: "Déconnexion", onClick: () => signOut() }];

const UserMenu = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { data: session } = useSession();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (!session) {
    return (
      <Tooltip title="Connexion">
        <button className="btn btn-primary" onClick={() => signIn()}>
          Connexion
        </button>
      </Tooltip>
    );
  }

  const { user } = session;
  const name = user?.name || undefined;
  const image = user?.image || undefined;

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Ouvrir le menu">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={name} src={image} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting: { title: string; onClick: () => void }) => (
          <MenuItem
            key={setting.title}
            onClick={() => {
              handleCloseUserMenu();
              setting.onClick();
            }}
          >
            <Typography textAlign="center">{setting.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
export default UserMenu;
