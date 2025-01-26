import { Header } from 'antd/es/layout/layout';

const HeaderBar: React.FC = () => {
  return (
    <Header className="h-16 fixed top-0 right-0 left-0 z-10">
      <div className="flex">
        <div className="w-14 flex-none ">01</div>
        <div className="w-64 flex-1 ">02</div>
        <div className="w-32 flex-1 ">03</div>
      </div>
    </Header>
  );
};

export default HeaderBar;
