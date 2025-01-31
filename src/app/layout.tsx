import { ThemeProvider } from 'next-themes';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // 等待参数
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-mode" defaultTheme="system" enableSystem={true}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
