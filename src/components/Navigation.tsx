import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import styles from '@/styles/components/navigation.module.scss';

const NavigationComponent = () => {
  const t = useTranslations('Header'); // 使用nav命名空间的翻译
  const path = usePathname();
  const currentPath = path.split('/')[2];
  const items = [
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

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.key} className={styles.item}>
            {item.disabled ? (
              <span className={`${styles.link} ${styles.disabled}`}>{item.label}</span>
            ) : (
              <Link href={'/' + item.key} className={`${styles.link} ${currentPath === item.key ? styles.active : ''}`}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationComponent;
