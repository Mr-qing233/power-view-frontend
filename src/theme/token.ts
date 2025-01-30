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
    Menu: {
      colorBgContainer: '#f1f1f1',
      itemMarginInline: 16,
    },
  },
};

export const darkTheme: ThemeConfig = {
  token: {},
  components: {
    Layout: {
      algorithm: true,
      headerPadding: '0',
    },
    Menu: {
      itemMarginInline: 16,
    },
  },
};
