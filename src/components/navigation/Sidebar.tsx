import { CloseOutlined } from '@mui/icons-material';
import { Box, IconButton, MenuItem, MenuList } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import useLogout from '../../hooks/api/auth/useLogout';
import { routes } from '../../routes/routes';
import { CallbackDefault } from '../../types/commonTypes';

interface SidebarProps {
  closeSidebar: CallbackDefault;
}

const Sidebar = ({ closeSidebar }: SidebarProps) => {
  const { t } = useTranslation();

  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <Box position="relative">
      <IconButton
        onClick={closeSidebar}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ position: 'absolute', right: '0', top: '0' }}
      >
        <CloseOutlined />
      </IconButton>
      <MenuList sx={{ marginTop: '3rem' }}>
        <NavLink to={routes.addTraining} onClick={closeSidebar}>
          <MenuItem divider sx={{ padding: '1rem 3rem' }}>
            {t('navigation.addTraining')}
          </MenuItem>
        </NavLink>

        <NavLink to={routes.allTrainings} onClick={closeSidebar}>
          <MenuItem divider sx={{ padding: '1rem 3rem' }}>
            {t('navigation.allTrainings')}
          </MenuItem>
        </NavLink>

        <NavLink to={routes.allExercises} onClick={closeSidebar}>
          <MenuItem divider sx={{ padding: '1rem 3rem' }}>
            {t('navigation.allExercises')}
          </MenuItem>
        </NavLink>

        <NavLink
          to={routes.login}
          onClick={() => {
            closeSidebar();
            handleLogout();
          }}
        >
          <MenuItem divider sx={{ padding: '1rem 3rem' }}>
            {t('navigation.logout')}
          </MenuItem>
        </NavLink>
      </MenuList>
    </Box>
  );
};

export default Sidebar;
