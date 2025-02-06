'use client';

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
      <NextIntlClientProvider messages={messages} locale={locale} timeZone="Asia/Shanghai">
        {children}
      </NextIntlClientProvider>
    </StyledComponentsRegistry>
  );
}
