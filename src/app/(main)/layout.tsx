'use client';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Layout } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';

import HeaderBar from '@/components/Header';
import SiderBar from '@/components/SiderBar';

import StyledComponentsRegistry from '@/lib/registry';

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <StyledComponentsRegistry>
      <AntdRegistry>
        <Layout
          style={{
            minHeight: '100vh',
          }}
        >
          <div className="hidden lg:block">
            <SiderBar />
          </div>
          <Layout className="ml-0 lg:ml-20 h-100vh">
            <div className="">
              <HeaderBar />
            </div>
            <Layout>
              <Content className="bg-slate-600">{children}</Content>
              <Footer className="text-center !bg-slate-400">XuBei Studio ©2025</Footer>
            </Layout>
          </Layout>
        </Layout>
      </AntdRegistry>
    </StyledComponentsRegistry>
  );
};

export default RootLayout;
