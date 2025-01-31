'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { NextIntlClientProvider } from 'next-intl';

import StyledComponentsRegistry from '@/lib/registry';

export interface ProvidersProps {
  locale: string;
  messages: any;
  children: React.ReactNode;
}

// 使用export声明
export function Providers({ locale, messages, children }: ProvidersProps) {
  return (
    <StyledComponentsRegistry>
      <AntdRegistry>
        <NextIntlClientProvider messages={messages} locale={locale} timeZone="Asia/Shanghai">
          <ConfigProvider>{children}</ConfigProvider>
        </NextIntlClientProvider>
      </AntdRegistry>
    </StyledComponentsRegistry>
  );
}
