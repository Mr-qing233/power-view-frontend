import { produce } from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 主题状态接口定义
interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// 创建主题状态管理store
export const useThemeStore = create<ThemeState>()(
  // 使用持久化中间件，将主题状态持久化到本地存储
  persist(
    (set) => ({
      // 默认使用亮色主题
      isDarkMode: false,
      // 切换主题的具体实现
      toggleTheme: () =>
        set(
          produce((state) =>
            // { isDarkMode: !state.isDarkMode }
            {
              state.isDarkMode = !state.isDarkMode;
            },
          ),
        ),
    }),
    {
      // localStorage中的存储键名
      name: 'theme-storage',
    },
  ),
);
