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
    <html lang={locale} className="overflow-y-hidden">
      <body>{children}</body>
    </html>
  );
}
