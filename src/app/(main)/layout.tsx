'use client';

import { Layout } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';

import HeaderBar from '@/sectors/Header';
import SiderBar from '@/sectors/SiderBar';
import styles from '@/styles/index.module.scss';

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      {/* 隐藏sider, 当前阶段不考虑使用 */}
      {/* <div className="hidden lg:block"> */}
      <div className="hidden">
        <SiderBar />
      </div>
      {/* <Layout className="ml-0 lg:ml-20 min-h-100 "> */}
      <Layout className="min-h-100 ">
        <div className={styles.header}>
          <HeaderBar />
        </div>
        <Layout>
          <Content className="h-100vh">{children}</Content>
          <Footer className="text-center">XuBei Studio ©2025</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
