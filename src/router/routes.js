const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',name:"home", component: () => import('pages/IndexPage.vue') },
      // { path: 'services', component: () => import('pages/ServicesPage.vue') },
      // { path: 'contact', component: () => import('pages/ContactPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
