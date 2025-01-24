import { Header } from 'antd/es/layout/layout';

const HeaderBar: React.FC = () => {
  return (
    <Header className="w-full h-80 p-3 pt-8 relative  !bg-[#4096ff]">
      <div className="flex flex-row w-full lg:ml-5 lg:mr-12 items-center justify-center gap-5">header</div>
    </Header>
  );
};

export default HeaderBar;
