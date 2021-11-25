// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Label from '../../components/Label';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      {
        title: 'app',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard
      },
      { title: 'Companies', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.booking },
      { title: 'Subscriptions', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      { title: 'Orders', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      { title: 'Go to Market Place', path: PATH_DASHBOARD.general.booking, icon: ICONS.banking },
    ]
  },

  // MANAGEMENT
  // --------------------------------------------------------------------

  // APP
  // ----------------------------------------------------------------------

];

export default sidebarConfig;
