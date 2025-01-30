'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { NextIntlClientProvider } from 'next-intl';

import StyledComponentsRegistry from '@/lib/registry';
import { useThemeStore } from '@/store/theme';
import { darkTheme, lightTheme } from '@/theme/token';

export interface ProvidersProps {
  locale: string;
  messages: any;
  children: React.ReactNode;
}

// 使用export声明
export function Providers({ locale, messages, children }: ProvidersProps) {
  const { isDarkMode } = useThemeStore();

  return (
    <StyledComponentsRegistry>
      <AntdRegistry>
        <NextIntlClientProvider messages={messages} locale={locale} timeZone="Asia/Shanghai">
          <ConfigProvider theme={isDarkMode ? darkTheme : lightTheme}>{children}</ConfigProvider>
        </NextIntlClientProvider>
      </AntdRegistry>
    </StyledComponentsRegistry>
  );
}
