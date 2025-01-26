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
      className="overflow-y-hidden top-0 left-0 bottom-0"
      style={{
        position: 'fixed',
        transition: 'min-width 0.2s,max-width 0.2s,background 0.3s',
        zIndex: '100',
      }}
    >
      <div className="flex flex-col h-100vh text-center">
        <div className="h-10 bg-slate-500 w-10" />
        <div className="">
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
        </div>
        <div className="grow"></div>
        <div className="h-10 flex flex-col items-center">
          <div className="">11</div>
          <div className="">11</div>
          <div className="">11</div>
          <div className="">11</div>
        </div>
        <div className="">Sider</div>
      </div>
    </Sider>
  );
};

export default SiderBar;
