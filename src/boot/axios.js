import { defineBoot } from '#q-app/wrappers';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api/rest',
  headers: {
    'x-hasura-admin-secret': 'ZXCV1qazSXX',
  },
});

export default defineBoot(({ app }) => {
  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;
});

export { api };
