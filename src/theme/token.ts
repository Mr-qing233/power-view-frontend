import { ThemeConfig } from 'antd';

export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: '#3f89f1',
    colorInfo: '#3f89f1',
    wireframe: false,
    colorBgBase: '#ffffff',
    colorWarning: '#f6c20a',
    colorSuccess: '#0ac907',
    colorError: '#ff0000',
    borderRadius: 9,
    fontFamily: 'MiSans',
    // 其他自定义 token
  },
  components: {
    Layout: {
      algorithm: true,
      siderBg: '#ffffff',
      headerBg: '#f1f1f1',
      headerPadding: '0',
    },
  },
};

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: '#3f89f1',
    colorInfo: '#3f89f1',
    wireframe: false,
    colorBgBase: '#1f1f25',
    colorBgLayout: '#262630',
  },
  components: {
    Layout: {
      algorithm: true,
      headerPadding: '0',
    },
  },
};
