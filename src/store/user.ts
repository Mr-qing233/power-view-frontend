import { produce } from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserInfo {
  name: string;
  age: number;
  state: boolean;
}

interface UserState {
  userInfo: UserInfo | null;
  token: string | null;
  updateUserInfo: (params: UserInfo) => void;
  updateAge: (params: number) => void;
  updateToken: (params: string) => void;
  clearUser: () => void;
}

// 创建状态存储
const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userInfo: null,
      token: null,
      //更新整个对象
      updateUserInfo: (userInfo) => set({ userInfo }), //合并userInfo
      //更新对象中某个属性
      updateAge: (age) =>
        set(
          //  使用immer库，可以避免直接修改state
          produce((state) => {
            state.userInfo.age = age;
          }),
        ),
      //更新原始数据类型
      updateToken: (token) => set({ token }),
      clearUser: () => {
        set({ userInfo: null, token: null });
        localStorage.removeItem('user-storage');
      },
    }),
    {
      // localStorage中的存储键名
      name: 'user-storage',
    },
  ),
);

export default useUserStore;
