// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    moment: 'moment',
    lodash: '_',
    antd: 'antd',
  },
  scripts:
    process.env.NODE_ENV === 'development'
      ? [
          'https://cdn.jsdelivr.net/npm/react@16.8.6/umd/react.development.js',
          'https://cdn.jsdelivr.net/npm/react-dom@16.8.6/umd/react-dom.development.js',
          'https://cdn.jsdelivr.net/npm/moment@2.25.3/moment.js',
          'https://cdn.jsdelivr.net/npm/lodash@4.17.11/lodash.js',
          'https://cdn.jsdelivr.net/npm/antd@4.6.3/dist/antd.js',
        ]
      : [
          'https://cdn.jsdelivr.net/npm/react@16.8.6/umd/react.production.min.js',
          'https://cdn.jsdelivr.net/npm/react-dom@16.8.6/umd/react-dom.production.min.js',
          'https://cdn.jsdelivr.net/npm/moment@2.25.3/moment.min.js',
          'https://cdn.jsdelivr.net/npm/lodash@4.17.11/lodash.min.js',
          'https://cdn.jsdelivr.net/npm/antd@4.6.3/dist/antd.min.js',
        ],
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },
            // {
            //   name: 'list.table-list',
            //   icon: 'table',
            //   path: '/list',
            //   component: './ListTableList',
            // },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
