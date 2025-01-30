'use client';

import { HomeOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import Avatar from '@/components/Avatar';
import NavigationComponent from '@/components/Navigation';

import { Language, useCurrentLocale, useLanguageStore } from '@/store/language';
import { useThemeStore } from '@/store/theme';
import styles from '@/styles/header.module.scss';

const HeaderBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const locale = useCurrentLocale();
  const { languageOptions, setLanguage } = useLanguageStore();

  const onLanguageChange = (value: Language) => {
    // 更新store
    setLanguage(value);
    // 更新URL
    router.push(`/${value}/${pathname.split('/').slice(2).join('/')}`);
  };

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
          <Button type="text" icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />} onClick={toggleTheme} />

          {/* Avatar */}
          {/* <div className=" bg-slate-500 rounded-full w-10 h-10" /> */}
          <Avatar />
        </div>
      </div>
    </Header>
  );
};

export default HeaderBar;
