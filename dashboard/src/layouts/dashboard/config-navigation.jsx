import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'order',
  //   path: '/admin/order',
  //   icon: icon('ic_order'),
  // },
  {
    title: 'lessons',
    path: '/lessons',
    icon: icon('ic_cart'),
  },
  {
    title: 'topic',
    path: 'topics',
    icon: icon('ic_tag'),
  },
];

export default navConfig;
