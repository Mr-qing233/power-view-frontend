import '@/styles/globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      {/* 使用suppressHydrationWarning={true} 抑制水合报错 */}
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
