'use client';

import { Button } from 'antd';
import Sider from 'antd/es/layout/Sider';

const SiderBar: React.FC = () => {
  return (
    <Sider
      trigger={null}
      collapsible
      // collapsed={props.collapsed}
      // onCollapse={(value) => props.setCollapsed(value)}
      className="overflow-y-hidden top-0 left-0 bottom-0 flex flex-col text-center text-white !bg-[#1677ff]"
      style={{
        position: 'fixed',
        transition: 'min-width 0.2s,max-width 0.2s,background 0.3s',
        zIndex: '100',
      }}
    >
      <div className="h-10" />
      <Button
        type="text"
        // icon={props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        // onClick={() => props.setCollapsed(!props.collapsed)}
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
