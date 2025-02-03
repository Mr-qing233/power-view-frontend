'use client';

import { useEffect, useState } from 'react';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { NextIntlClientProvider } from 'next-intl';
import { useTheme } from 'next-themes';

import StyledComponentsRegistry from '@/lib/registry';
import { darkTheme, lightTheme } from '@/styles/theme/token';

export interface ProvidersProps {
  locale: string;
  messages: any;
  children: React.ReactNode;
}

// 使用export声明
export function Providers({ locale, messages, children }: ProvidersProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 等待客户端挂载后再渲染主题相关内容
  useEffect(() => {
    setMounted(true);
  }, []);

  // 避免SSR渲染不匹配
  const renderThemeChanger = () => {
    if (!mounted) {
      return null; // 在客户端挂载前不渲染主题切换按钮
    }

    return <ConfigProvider theme={theme === 'dark' ? darkTheme : lightTheme}>{children}</ConfigProvider>;
  };

  return (
    <StyledComponentsRegistry>
      <AntdRegistry>
        <NextIntlClientProvider messages={messages} locale={locale} timeZone="Asia/Shanghai">
          {renderThemeChanger()}
        </NextIntlClientProvider>
      </AntdRegistry>
    </StyledComponentsRegistry>
  );
}
