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
      <div className="bg-[#1677ff]">
        <SiderBar />
      </div>
      <Layout className="ml-0 lg:ml-20 h-100vh ">
        <div className="bg-[#4096ff]">
          <HeaderBar />
        </div>
        <Layout>
          <Content className="bg-slate-600">{children}</Content>
          <Footer className="text-center !bg-slate-400">XuBei Studio ©2025</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
