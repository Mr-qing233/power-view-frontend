import React from 'react';

import { produce } from 'immer';
import { useLocale } from 'next-intl';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { routing } from '@/i18n/routing';

// 使用路由配置中的locale类型
export type Language = (typeof routing.locales)[number];

// 语言选项列表
interface LanguageOption {
  value: Language;
  label: string;
}

// 主题状态接口定义
interface LanguageState {
  // 当前语言
  currentLang: Language;
  // 可用的语言选项
  languageOptions: LanguageOption[];
  // 设置语言的方法
  setLanguage: (lang: Language) => void;
  // 获取当前语言的方法
  getCurrentLang: () => Language;
}

// 创建主题状态管理store
export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      // 默认语言
      currentLang: routing.defaultLocale,
      // 可用语言列表
      languageOptions: [
        { value: 'en-US', label: 'English' },
        { value: 'zh-CN', label: '中文' },
      ],
      // 设置语言
      setLanguage: (lang: Language) =>
        set(
          produce((state) => {
            state.currentLang = lang;
          }),
        ),
      // 获取当前语言
      getCurrentLang: () => get().currentLang,
    }),
    {
      // localStorage中的存储键名
      name: 'language-storage',
    },
  ),
);

// 新增：创建hook来获取当前locale
export function useCurrentLocale() {
  const locale = useLocale();
  const { setLanguage } = useLanguageStore();

  // 同步next-intl的locale到store
  React.useEffect(() => {
    setLanguage(locale as Language);
  }, [locale, setLanguage]);

  return locale as Language;
}
