'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';

import StyledComponentsRegistry from '@/lib/registry';
import { useThemeStore } from '@/store/theme';
import { darkTheme, lightTheme } from '@/theme/token';

import '@/app/globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { isDarkMode } = useThemeStore();

  return (
    <html lang="en">
      {/* 使用suppressHydrationWarning={true} 抑制水合报错 */}
      <body>
        <StyledComponentsRegistry>
          <AntdRegistry>
            <ConfigProvider theme={isDarkMode ? darkTheme : lightTheme}>{children}</ConfigProvider>
          </AntdRegistry>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
