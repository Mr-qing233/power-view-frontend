'use client';

import { MenuUnfoldOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Language, useCurrentLocale, useLanguageStore } from '@/store/language';
import { useThemeStore } from '@/store/theme';
import styles from '@/styles/header.module.scss';

const HeaderBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const locale = useCurrentLocale();
  const { languageOptions, setLanguage } = useLanguageStore();

  const t = useTranslations('Header'); // 使用nav命名空间的翻译

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
        <div className="flex items-center gap-8 h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center h-full">
            <Button
              type="text"
              icon={<MenuUnfoldOutlined />}
              style={{
                fontSize: '16px',
                width: 64,
                height: '100%',
              }}
            />
          </Link>

          {/* Navigation buttons */}
          <div className="flex items-center gap-6 h-full">
            <Button type="text" href="/dashboard">
              {t('dashboard')}
            </Button>
            <Button type="text" href="/test">
              {t('test')}
            </Button>
            <Button type="text" href="/reports">
              {t('reports')}
            </Button>
          </div>
        </div>
        <div className="grow"></div>
        {/* Right section */}
        <div className="flex items-center gap-4 h-full">
          {/* Language selector */}
          <Select defaultValue={locale} style={{ width: 100 }} options={languageOptions} onSelect={onLanguageChange} />

          {/* Theme toggle */}
          <Button type="text" icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />} onClick={toggleTheme} />

          {/* Avatar */}
          <div className=" bg-slate-500 rounded-lg w-8 h-8" />
        </div>
      </div>
    </Header>
  );
};

export default HeaderBar;
