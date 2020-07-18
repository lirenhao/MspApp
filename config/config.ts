import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/
import slash from 'slash2';
// import themePluginConfig from './themePluginConfig';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;

const plugins: IPlugin[] = [
  ['umi-plugin-antd-icon-config', {}],
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
          workboxPluginMode: 'InjectManifest',
          workboxOptions: {
            importWorkboxFrom: 'local',
          },
        }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
  // ['umi-plugin-antd-theme', themePluginConfig],
];

export default {
  plugins,
  hash: false,
  targets: {
    ie: 11,
  },
  history: 'hash',
  publicPath: process.env.PUBLIC_PATH || '/',
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/login',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/login',
          component: './login',
        },
      ],
    },
    {
      path: '/pre',
      component: '../layouts/PreLayout',
      routes: [
        {
          name: 'init',
          path: '/pre/init',
          component: './initPwd',
        },
        {
          name: 'policy',
          path: '/pre/policy',
          component: './policy',
        },
        {
          name: 'reset',
          path: '/pre/reset',
          component: './resetPwd',
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
          routes: [
            {
              path: '/',
              redirect: '/analysis',
            },
            {
              name: 'analysis',
              icon: 'home',
              path: '/analysis',
              component: './analysis',
              hideInMenu: true,
            },
            {
              path: '/merInfo',
              name: 'merInfo',
              icon: 'user',
              component: './merInfo',
            },
            {
              path: '/trans',
              name: 'trans',
              icon: 'dollarCircle',
              component: './trans',
            },
            {
              path: '/settle',
              name: 'settle',
              icon: 'fileDone',
              component: './settle',
            },
            {
              path: '/eState',
              name: 'eState',
              icon: 'mail',
              component: './eState',
            },
            {
              name: 'modifyPwd',
              path: '/modifyPwd',
              component: './modifyPwd',
              hideInMenu: true,
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
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: '',
    // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
    'process.env.SERVICE_CONTEXT': process.env.SERVICE_CONTEXT,
    'process.env.GOOGLE_SITE_KEY': process.env.GOOGLE_SITE_KEY,
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  }, // chainWebpack: webpackPlugin,
  proxy: {
    '/svc/user': {
      target: 'http://localhost:3001/',
      changeOrigin: true,
      pathRewrite: {
        '^/svc': '',
      },
      logLevel: 'debug',
    },
    '/svc/msp': {
      target: 'http://localhost:3012/',
      changeOrigin: true,
      pathRewrite: {
        '^/svc': '',
      },
      logLevel: 'debug',
    },
  },
} as IConfig;
