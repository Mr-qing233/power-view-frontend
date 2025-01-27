'use client';

import { Layout } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';

import HeaderBar from '@/sectors/Header';
import SiderBar from '@/sectors/SiderBar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
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
      <Layout className="min-h-100">
        <HeaderBar />
        <Layout
          style={{
            height: 'calc(100vh - 64px)',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Content style={{ flex: '1 0 auto' }}>{children}</Content>
          <Footer className="text-center" style={{ flexShrink: 0 }}>
            GinWine Studio ©2025
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
