'use client';

import Footer from '@/sectors/Footer';
import HeaderBar from '@/sectors/Header';
import styles from '@/styles/sectors/home.module.scss';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen ">
      <div className="h-full ">
        <HeaderBar />
        <div className={styles.container}>
          <main className={styles.main}>{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
