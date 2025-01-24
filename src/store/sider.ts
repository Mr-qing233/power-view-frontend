import { produce } from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 主题状态接口定义
interface SiderState {
  isOpen: boolean;
  toggleSider: () => void;
}

// 创建主题状态管理store
export const useSiderStore = create<SiderState>()(
  // 使用持久化中间件，将主题状态持久化到本地存储
  persist(
    (set) => ({
      // 默认收起
      isOpen: false,
      // 切换主题的具体实现
      toggleSider: () =>
        set(
          produce((state) => {
            state.isOpen = !state.isOpen;
          }),
        ),
    }),
    {
      // localStorage中的存储键名
      name: 'sider-storage',
    },
  ),
);
