'use client';

import { useEffect, useState } from 'react';

import { HomeOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

import Avatar from '@/components/Avatar';
import NavigationComponent from '@/components/Navigation';

import { Language, useCurrentLocale, useLanguageStore } from '@/store/language';
import styles from '@/styles/components/header.module.scss';

const HeaderBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useCurrentLocale();
  const { languageOptions, setLanguage } = useLanguageStore();

  const onLanguageChange = (value: Language) => {
    // 更新store
    setLanguage(value);
    // 更新URL
    router.push(`/${value}/${pathname.split('/').slice(2).join('/')}`);
  };

  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  // 等待客户端挂载后再渲染主题相关内容
  useEffect(() => {
    setMounted(true);
  }, []);

  // 避免SSR渲染不匹配
  const renderThemeChanger = () => {
    if (!mounted) {
      return null; // 在客户端挂载前不渲染主题切换按钮
    }

    return (
      <Button onClick={() => setTheme(isDark ? 'light' : 'dark')}>{isDark ? <SunOutlined /> : <MoonOutlined />}</Button>
    );
  };

  // 替换原来的isDarkMode判断
  const isDark = theme === 'dark';

  return (
    <Header className={styles.header}>
      <div className="flex justify-between items-center w-full h-full">
        {/* Left section */}
        <div className="flex items-center gap-4  h-full mx-6">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center h-full ">
            <HomeOutlined
              style={{
                fontSize: 24,
                color: '#616161',
              }}
            />
          </Link>

          {/* Navigation buttons */}
          <NavigationComponent />
        </div>
        <div className="grow"></div>
        {/* Right section */}
        <div className="flex items-center gap-4 mr-4 h-full">
          {/* Language selector */}
          <Select defaultValue={locale} style={{ width: 100 }} options={languageOptions} onSelect={onLanguageChange} />
          {/* Theme toggle */}
          {/* <Button type="text" icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />} onClick={toggleTheme} /> */}
          {renderThemeChanger()} {/* 使用新的渲染函数 */}
          {/* Avatar */}
          {/* <div className=" bg-slate-500 rounded-full w-10 h-10" /> */}
          <Avatar />
        </div>
      </div>
    </Header>
  );
};

export default HeaderBar;
