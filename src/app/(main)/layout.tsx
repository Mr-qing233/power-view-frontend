'use client';

import { Layout } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';

import HeaderBar from '@/sectors/Header';
import SiderBar from '@/sectors/SiderBar';

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <div className="hidden lg:block">
        <SiderBar />
      </div>
      <Layout className="ml-0 lg:ml-20 min-h-100">
        <HeaderBar />
        <Layout>
          <Content className="h-100vh">{children}</Content>
          <Footer className="text-center">XuBei Studio ©2025</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
