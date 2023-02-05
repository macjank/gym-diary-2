import { AppBar, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { NavLink } from "react-router-dom";
import { routes } from "../../static/routes";

const Navigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Drawer
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        anchor="right"
      >
        <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </Drawer>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to={routes.home}>Gym Diary</NavLink>
          </Typography>
          <IconButton
            onClick={() => setIsSidebarOpen(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navigation;
