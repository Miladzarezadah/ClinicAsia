const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('pages/Authentication/LoginPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'signup',
        name: 'Register',
        component: () => import('pages/Authentication/SignUpPage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
