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

const pagesDashboard = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'lessons',
      title: 'Lessons',
      type: 'item',
      url: '/dashboard/lessons',
      icon: icons.IconSchool,
      breadcrumbs: false
    }
  ]
};

export default pagesDashboard;
