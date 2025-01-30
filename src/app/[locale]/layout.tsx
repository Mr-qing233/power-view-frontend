import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';

import { routing } from '@/i18n/routing';
import { Providers } from '@/sectors/Providers';

import '@/styles/globals.css';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // 等待参数
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <Providers locale={locale} messages={messages}>
      {children}
    </Providers>
  );
}
