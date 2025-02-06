'use client';

import Footer from '@/sectors/Footer';
import HeaderBar from '@/sectors/Header';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen ">
      <div className="h-full ">
        <HeaderBar />
        <div className="h-[calc(100vh-64px)] overflow-auto flex flex-col">
          <main className="flex-1 flex-shrink-0">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
