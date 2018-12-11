/**
 * TODO : AppDrawer.vue에서 참조하여 Left Menu 생성
 * paths.js 와 연동해서 page route 설정
 * Rule : name과 vue파일명은 동일해야 하며, paths.js에서도 name은 동일해야 함
 */
const Menu =  [
  {
    title: 'Main',
    menuPk: 99,
    group: 'apps',
    icon: 'dashboard',
    name: 'Dashboard',
    display:  true
  },
  { 
    header: 'WO',
    group: 'wo',
    display:  true
  },
  {
    title: 'WO 요청',
    menuPk: 1,
    group: 'wo',
    icon: 'description',
    name: 'woRequest',
    display:  true,
    relatePath: '/wo/request/create'
  },
  {
    title: 'WO 작성',
    menuPk: 2,
    group: 'wo',
    icon: 'description',
    name: 'woCreate',
    display:  true,
    relatePath: '/wo/master/create'
  },
  {
    title: 'WO 요청목록',
    menuPk: 3,
    group: 'wo',
    icon: 'list',
    name: 'woList',
    display:  true
  },
  {
    title: 'WO 완료목록',
    menuPk: 4,
    group: 'wo',
    icon: 'done',
    name: 'woCompleteList',
    display:  true,
    relatePath: '/wo/complete'
  },
  { 
    header: 'Inspection',
    group: 'inspection',
    display:  true
  },
  {
    title: '점검목록',
    menuPk: 5,
    group: 'inspection',
    icon: 'list_alt',
    name: 'inspectionList',
    display:  true,
    relatePath: '/inspection/schedule/list'
  },
  {
    title: '점검일정',
    menuPk: 6,
    group: 'inspection',
    icon: 'event',
    name: 'inspectionCalendar',
    display:  true,
    relatePath: '/inspection/schedule/calendar'
  },
  { 
    header: 'Statistics',
    group: 'report',
    display:  true
   },
  {
    title: '설비 통계',
    menuPk: 7,
    group: 'report',
    icon: 'pie_chart',
    name: 'equipmentStatistics',
    display:  true,
    relatePath: '/equipment/report'
  },
  {
    title: 'WO',
    menuPk: 8,
    group: 'report',
    icon: 'bar_chart',
    name: 'woStatistics',
    display:  true,
    relatePath: '/wo/report'
  },
  {
    title: 'PM',
    menuPk: 9,
    group: 'report',
    icon: 'bubble_chart',
    name: 'pmStatistics',
    display:  true,
    relatePath: '/pm/report'
  },
  {
    title: '점검',
    menuPk: 10,
    group: 'report',
    icon: 'bubble_chart',
    name: 'inspectionStatistics',
    display:  true,
    relatePath: '/inspection/report'
  },
  // { header: 'Apps' },
  // {
  //   title: 'Dashboard',
  //   group: 'apps',
  //   icon: 'dashboard',
  //   name: 'Dashboard',
  // },
  // {
  //   title: 'Chat',
  //   group: 'apps',
  //   icon: 'chat_bubble',
  //   target: '_blank',
  //   name: 'Chat',
  // },
  // {
  //   title: 'Inbox',
  //   group: 'apps',
  //   name: 'Mail',
  //   target: '_blank',  
  //   icon: 'email',
  // },
  // {
  //   title: 'Media',
  //   group: 'apps',
  //   name: 'Media',
  //   icon: 'perm_media',
  // },
  // {
  //   title: 'Widgets',
  //   group: 'widgets',
  //   component: 'widgets',
  //   icon: 'widgets',
  //   items: [
  //     { name: 'social', title: 'Social', component: 'components/social' },
  //     { name: 'statistic', title: 'Statistic', badge: 'new', component: 'components/statistic' },
  //     { name: 'chart', title: 'Chart', component: 'components/chart' },
  //     { name: 'list', title: 'List', component: 'components/widget-list' },
  //     // { name: 'post', title: 'Post', component: 'components/widget-post' },
  //   ]
  // },  
  // { header: 'UI Elements' },
  // {
  //   title: 'General',
  //   group: 'components',
  //   component: 'components',
  //   icon: 'tune',
  //   items: [
  //     { name: 'alerts', title: 'Alerts', component: 'components/alerts' },
  //     { name: 'avatars', title: 'Avatars', component: 'components/avatars' },
  //     { name: 'badges', title: 'Badges', component: 'components/badges' },
  //     { name: 'buttons', title: 'Buttons', component: 'components/buttons' },
  //     { name: 'cards', title: 'Cards', component: 'components/cards' },
  //     { name: 'carousels', title: 'Carousels', component: 'components/carousels' },
  //     { name: 'chips', title: 'Chips', component: 'components/chips' },
  //     { name: 'dialogs', title: 'Dialogs', component: 'components/dialogs' },
  //     { name: 'icons', title: 'Icons', component: 'components/icons' },
  //     { name: 'tables', title: 'Data Tables', component: 'components/tables' },
  //     { name: 'parallax', title: 'Parallax  image', component: 'components/parallax' },
  //     { name: 'snackbar', title: 'Snackbar', component: 'components/snackbar' },
  //     { name: 'progress', title: 'Progress', component: 'components/progress' },      
  //     { name: 'slider', title: 'Slider', component: 'components/sliders' },      
  //     { name: 'tooltip', title: 'Tooltip', component: 'components/tooltips' },      
  //     { name: 'pagination', title: 'Pagination', component: 'components/paginations' },      
  //     { name: 'typography', title: 'Typography', component: 'components/typography' },      
  //     { name: 'color', title: 'Color', component: 'components/color' },      

  //   ]
  // },
  // {
  //   title: 'Pickers',
  //   group: 'pickers',
  //   component: 'picker',
  //   icon: 'filter_vintage',
  //   items: [
  //     { name: 'timepicker', title: 'Timepicker', component: 'pickers/timepicker' },     
  //     { name: 'datepicker', title: 'Datepicker', component: 'pickers/datepicker' },      

  //   ]
  // },
  // {
  //   title: 'Layout',
  //   group: 'layout',
  //   component: 'layout',
  //   icon: 'view_compact',
  //   items: [
  //     { name: 'bottom-sheets', title: 'Bottom panels', component: 'components/bottom-sheets' },
  //     { name: 'expansion-panels', title: 'Expansion panels', component: 'components/expansion-panels' },
  //     { name: 'footer', title: 'Footer', component: 'components/footer' },
  //     { name: 'lists', title: 'Lists', component: 'components/lists' },
  //     { name: 'jumbotrons', title: 'Jumbotrons', badge: 'new', component: 'components/jumbotrons' },
  //     { name: 'menus', title: 'Menus', component: 'components/menus' },
  //     // { name: 'navigation-drawers', title: 'Navigation drawers', component: 'components/navigation-drawers' },
  //     { name: 'tabs', title: 'Tabs', component: 'components/tabs' },
  //     { name: 'toolbar', title: 'Toolbars', component: 'components/toolbar' },
  //     { name: 'timeline', title: 'Timeline', component: 'components/timeline' },
  //   ]
  // },  
  // {
  //   title: 'Forms & Controls',
  //   group: 'forms',
  //   component: 'forms',
  //   icon: 'edit',
  //   items: [
  //     { name: 'basic', title: 'General', component: 'components/basic-forms' },
  //     { name: 'selects', title: 'Selects', badge: 'new', component: 'components/selects' },
  //     { name: 'selection-controls', title: 'Selection Controls', component: 'components/selection-controls' },
  //     { name: 'text-fields', title: 'Text Fields', component: 'components/text-fields' },
  //     { name: 'steppers', title: 'Steppers', component: 'components/steppers' },
  //     { name: 'editors', title: 'Editors', component: 'components/editors' },
  //   ]
  // },
  // { divider: true },
  // { header: 'Extras' },
  // {
  //   title: 'Pages',
  //   group: 'extra',
  //   icon: 'list',
  //   items: [
  //     { name: 'Login', title: 'Login', component: 'Login' },
  //     { name: '404', title: '404', component: 'NotFound' },
  //     { name: '403', title: '403', component: 'AccessDenied' },
  //     { name: '500', title: '500', component: 'ServerError' },
  //   ]
  // },
];
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

export default Menu;
