// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import { dashboardItems, clientItems } from 'layout/menu-items';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const { pathname } = useLocation();
  const [menuItems, setMenuItems] = useState(clientItems);
  useEffect(() => {
    const paths = pathname.split('/');
    if (paths[1] === 'dashboard') {
      setMenuItems(dashboardItems);
    } else {
      setMenuItems(clientItems);
    }
  }, [pathname]);
  const navItems = menuItems.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
