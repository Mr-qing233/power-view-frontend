import { useState } from 'react';

import Menu, { MenuProps } from 'antd/es/menu/menu';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { MenuItem } from '@/interfaces/Navigation';
import styles from '@/styles/navigation.module.scss';

const NavigationComponent = () => {
  const t = useTranslations('Header'); // 使用nav命名空间的翻译

  const items: MenuItem[] = [
    {
      key: 'dashboard',
      label: t('dashboard'),
      // icon: '',
    },
    {
      key: 'test',
      label: t('test'),
      // icon: '',
    },
    {
      key: 'reports',
      label: t('reports'),
    },
    {
      key: 'disabled',
      label: t('disabled'),
      disabled: true,
    },
  ];

  const router = useRouter();
  const pathname = usePathname();

  const [, setCurrentKey] = useState<string>(pathname.split('/')[2]);
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrentKey(e.key);
    router.push(`/${e.key}`);
  };

  return (
    <Menu
      className={styles.nav}
      onClick={onClick}
      selectedKeys={[pathname.split('/')[2]]}
      mode="horizontal"
      items={items}
    />
  );
};

export default NavigationComponent;
