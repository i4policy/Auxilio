import Vue from 'vue';
import Router from 'vue-router';
import AuthContent from '@/components/AuthContent.vue';
import Login from '@/components/Login.vue';
import ForgotPassword from '@/components/ForgotPassword.vue';
import PasswordReset from '@/components/PasswordReset.vue';
import MyProfile from '@/components/MyProfile.vue';
import Agendas from '@/components/Agendas.vue';
import AgendaDetail from '@/components/AgendaDetail.vue';
import NotFoundPage from '@/components/404.vue';
import NewAgenda from '@/components/NewAgenda.vue';
import EditAgenda from '@/components/EditAgenda.vue';
import { AuthService } from '@/services';

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
      path: '/auxilio',
      component: AuthContent,
      redirect: '/auxilio/agendas',
      children: [
        {
          path: 'agendas',
          name: 'agendas',
          component: Agendas
        },
        {
          path: 'create-agenda',
          name: 'create-agenda',
          component: NewAgenda
        },
        {
          path: 'update-agenda',
          name: 'update-agenda',
          component: EditAgenda
        },
        {
          path: 'detail/:id',
          name: 'agenda-detail',
          component: AgendaDetail
        },
        {
          path: 'profile',
          name: 'profile',
          component: MyProfile
        }
      ]
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
      path: '*',
      name: 'not-found',
      component: NotFoundPage
    }
  ]
});

router.beforeEach((to, from, next) => {
  const authenticated = AuthService.isAuthenticated();
  if (!authenticated && to.name !== 'login') {
    next({ name: 'login' });
  } else if (authenticated && to.name === 'login') {
    next({ name: 'agendas' });
  } else {
    next();
  }
});

export default router;
