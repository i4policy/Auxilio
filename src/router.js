import Vue from 'vue';
import Router from 'vue-router';
import AuthContent from '@/components/AuthContent.vue';
import Login from '@/components/Login.vue';
import Agendas from '@/components/Agendas.vue';
import AgendaDetail from '@/components/AgendaDetail.vue';
import NotFoundPage from '@/components/404.vue';
import AuthService from './services/auth.service';

Vue.use(Router);

const router = new Router({
  mode: 'history',
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

router.beforeEach((to, from, next) => {
  const authenticated = AuthService.isAuthenticated();
  if (authenticated && to.name === 'login') {
    next({ name: 'agendas' });
  } else if (!authenticated && to.name === 'login') {
    next();
  } else if (!authenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
