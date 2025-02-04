'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import useUserStore from '@/store/user';
import styles from '@/styles/pages/homePage.module.scss';

const HomePage = () => {
  const t = useTranslations('Home');
  const { userInfo } = useUserStore();

  const renderLoginButton = () => {
    if (userInfo?.state) {
      return (
        <Link href="https://github.com/Mr-qing233" className={styles.secondaryButton}>
          {t('learnMore')}
        </Link>
      );
    }
    return (
      <Link href="/login" className={styles.secondaryButton}>
        {t('login')}
      </Link>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.description}>{t('description')}</p>
        <div className={styles.buttonContainer}>
          <Link href="/dashboard" className={styles.primaryButton}>
            {t('getStarted')}
          </Link>
          {renderLoginButton()}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
