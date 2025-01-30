'use client';

import { Button } from 'antd';

// import style from './page.module.scss';

import useUserStore from '@/store/user';

const Dashboard = () => {
  const { userInfo, token, updateUserInfo, updateAge, updateToken } = useUserStore();

  if (!userInfo?.state) {
    return (
      <Button
        type="primary"
        onClick={() => {
          updateUserInfo({ name: 'test', age: 11, state: true });
          updateToken('123');
        }}
      >
        Button
      </Button>
    );
  }

  return (
    <div className="App">
      <div>
        姓名: {userInfo?.name} 年龄: {userInfo?.age}
      </div>
      <div>token: {token}</div>
      <button onClick={() => updateUserInfo({ name: 'lisi', age: 24, state: true })}>更新用户</button>
      <button onClick={() => updateAge(20)}>更新年龄</button>
      <button onClick={() => updateToken('23652')}>更新token</button>
    </div>
  );
};

export default Dashboard;
