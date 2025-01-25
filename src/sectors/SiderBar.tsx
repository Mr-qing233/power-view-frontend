'use client';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Sider from 'antd/es/layout/Sider';

import { useSiderStore } from '@/store/sider';

const SiderBar: React.FC = () => {
  const { isOpen, toggleSider } = useSiderStore();

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={isOpen}
      className="overflow-y-hidden top-0 left-0 bottom-0 flex flex-col text-center text-white h-100vh"
      style={{
        position: 'fixed',
        transition: 'min-width 0.2s,max-width 0.2s,background 0.3s',
        zIndex: '100',
      }}
    >
      <div className="h-10" />
      <Button
        type="text"
        icon={isOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => toggleSider()}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <div className="h-full flex flex-col items-center">Sider</div>
    </Sider>
  );
};

export default SiderBar;
