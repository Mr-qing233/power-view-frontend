'use client';

import { Button } from 'antd';

// import style from './page.module.scss';

import useUserStore from '@/store/user';

const Dashboard = () => {
  const { userInfo, token, updateUserInfo, updateAge, updateToken } = useUserStore();

  return (
    <div className="App">
      <div>
        姓名: {userInfo.name} 年龄: {userInfo.age}
      </div>
      <div>token: {token}</div>
      <button onClick={() => updateUserInfo({ name: 'lisi', age: 24 })}>更新用户</button>
      <button onClick={() => updateAge(userInfo.age + 1)}>更新年龄</button>
      <button onClick={() => updateToken('23652')}>更新token</button>
      <div className="App">
        <Button type="primary">Button</Button>
      </div>
    </div>
  );
};

export default Dashboard;
