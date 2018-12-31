import Vue from 'vue';
import Router from 'vue-router';
import AuthContent from '@/components/AuthContent.vue';
import Login from '@/components/Login.vue';
import ForgotPassword from '@/components/ForgotPassword.vue';
import PasswordReset from '@/components/PasswordReset.vue';
import Agendas from '@/components/Agendas.vue';
import AgendaDetail from '@/components/AgendaDetail.vue';
import NotFoundPage from '@/components/404.vue';
// import AuthService from './services/auth.service';

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword
    },
    {
      path: '/reset-password/:resetToken',
      name: 'reset-password',
      component: PasswordReset
    },
    {
      path: '/auxilio',
      component: AuthContent,
      children: [
        {
          path: '',
          name: 'agendas',
          component: Agendas
        },
        {
          path: 'detail/:id',
          name: 'agenda-detail',
          component: AgendaDetail
        }
      ]
    },
    {
      path: '*',
      name: '404',
      redirect: '/404'
    },
    {
      path: '/404',
      component: NotFoundPage
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   const authenticated = AuthService.isAuthenticated();
//   if (authenticated && to.name === 'login') {
//     next({ name: 'agendas' });
//   } else if (!authenticated && to.name === 'forgot-password') {
//     next({ name: 'forgot-password' });
//   } else if (!authenticated && to.name === 'login') {
//     next();
//   } else if (!authenticated) {
//     next({ name: 'login' });
//   } else {
//     next();
//   }
// });

export default router;
