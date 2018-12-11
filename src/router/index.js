import Vue from 'vue';
import Router from 'vue-router';
import paths from './paths';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import jwt from '@/js/jwtToken'
import menu from '@/api/menu'

Vue.use(Router);

const router =  new Router({
  base: '/',
  mode: 'hash',
  linkActiveClass: 'active',
  routes: paths,
  // TODO : route 변경시 화면 맨끝으로 이동
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

// router gards
router.beforeEach((to, from, next) => {
  // TODO : token이 없을 경우 발행 할 수 있도록 로그인 페이지로 이동
  if (to.path !== '/login' && !jwt.getJwtToken()) next({ path: '/login' })
  // var filter = menu.filter((_item) => {
  //   return _item.name === to.name
  // })

  // if (filter.length > 0 && filter[0].hasOwnProperty('editable')) to.query.editable = filter[0].editable;
  // console.log('beforeEach to:' + JSON.stringify(to))
  // console.log('filter:' + JSON.stringify(filter))
  NProgress.start();
  if (to.path !== from.path) next();
  else router.go(0)
});

router.afterEach((to, from) => {
  // ...
  NProgress.done();
});

export default router;
