'use client';

import { Button } from 'antd';

import useUserStore from '@/store/user';
import styles from '@/styles/components/test.module.scss';

export default function TestPage() {
  const sections = Array.from({ length: 30 }, (_, index) => index);
  const { userInfo, token, updateUserInfo, updateAge, updateToken } = useUserStore();

  const login = () => {
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
        <Button onClick={() => updateUserInfo({ name: 'lisi', age: 24, state: true })}>更新用户</Button>
        <Button onClick={() => updateAge(20)}>更新年龄</Button>
        <Button onClick={() => updateToken('23652')}>更新token</Button>
      </div>
    );
  };

  return (
    <div className="p-4">
      {login()}
      <div className={styles.testP}></div>
      <div className="w-64 h-64  bg-slate-500 dark:bg-zinc-300"></div>
      <h1 className="text-2xl mb-4">Scroll Test Page</h1>
      {sections.map((index) => (
        <div key={index} className="mb-8 p-4 bg-gray-100 rounded">
          <h2 className="text-xl mb-2">Section {index + 1}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
        </div>
      ))}
    </div>
  );
}
