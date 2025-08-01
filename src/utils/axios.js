// src/utils/axios.js

import axios from 'axios';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.site.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    signIn: '/api/auth/sign-in',
    signUp: '/api/auth/sign-up',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },

  diagnostics: {
    list: '/api/diagnostics/list',
    details: '/api/diagnostics/details',
    create: '/api/diagnostics/create',
    update: '/api/diagnostics/update',
    delete: '/api/diagnostics/delete',
  },
  diagnostics_test: {
    list: '/api/diagnostics/test/list',
    details: '/api/diagnostics/test/details',
    create: '/api/diagnostics/test/create',
    update: '/api/diagnostics/test/update',
    delete: '/api/diagnostics/test/delete',
  },
  pharmacy: {
    list: '/api/pharmacy/list',
    details: '/api/pharmacy/details',
    create: '/api/pharmacy/create',
    update: '/api/pharmacy/update',
    delete: '/api/pharmacy/delete',
  },

  medications: {
    list: '/api/medications/list',
    details: '/api/medications/details',
    create: '/api/medications/create',
    update: '/api/medications/update',
    delete: '/api/medications/delete',
  },
}
