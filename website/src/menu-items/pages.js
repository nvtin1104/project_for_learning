// assets
import { IconDashboard, IconHome, IconSchool, IconInfoSquareRounded } from '@tabler/icons-react';

// constant
const icons = {
  IconDashboard,
  IconHome,
  IconSchool,
  IconInfoSquareRounded
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'home',
      title: 'Home',
      type: 'item',
      url: '/',
      icon: icons.IconHome,
      breadcrumbs: false
    },
    {
      id: 'topic',
      title: 'Topic',
      type: 'item',
      url: '/topic',
      icon: icons.IconSchool,
      breadcrumbs: false
    },
    {
      id: 'about',
      title: 'About',
      type: 'item',
      url: '/about',
      icon: icons.IconInfoSquareRounded,
      breadcrumbs: true
    }
  ]
};

export default pages;
