import { Header } from 'antd/es/layout/layout';

import '@/styles/header.module.scss';

const HeaderBar: React.FC = () => {
  return (
    <Header className="">
      <div className="flex ">
        <div className="w-14 flex-none ">01</div>
        <div className="w-64 flex-1 ">02</div>
        <div className="w-32 flex-1 ">03</div>
      </div>
    </Header>
  );
};

export default HeaderBar;
