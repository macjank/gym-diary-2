import { CloseOutlined } from "@mui/icons-material";
import { Box, IconButton, MenuItem, MenuList } from "@mui/material";
import { NavLink } from "react-router-dom";
import { routes } from "../../static/routes";

interface SidebarProps {
  closeSidebar: () => void;
}

const Sidebar = ({ closeSidebar }: SidebarProps) => {
  return (
    <Box>
      <IconButton
        onClick={closeSidebar}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <CloseOutlined />
      </IconButton>
      <MenuList>
        <NavLink to={routes.addTraining} onClick={closeSidebar}>
          <MenuItem sx={{ padding: "1rem 3rem" }}>Add training</MenuItem>
        </NavLink>
      </MenuList>
    </Box>
  );
};

export default Sidebar;
