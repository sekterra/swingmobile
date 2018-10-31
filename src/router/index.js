import Vue from 'vue';
import Router from 'vue-router';
import paths from './paths';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import jwt from '@/js/jwtToken'

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
  NProgress.start();
  next();
});

router.afterEach((to, from) => {
  // ...
  NProgress.done();
});

export default router;
