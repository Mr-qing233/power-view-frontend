'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

import useUserStore from '@/store/user';
import styles from '@/styles/pages/homePage.module.scss';

const HomePage = () => {
  const t = useTranslations('Home');
  const { userInfo } = useUserStore();

  const renderLoginButton = () => {
    if (userInfo?.state) {
      return (
        <Button variant="outline" className="w-24" asChild>
          <Link href="https://github.com/Mr-qing233">{t('learnMore')}</Link>
        </Button>
      );
    }
    return (
      <Button variant="outline" className="w-24" asChild>
        <Link href="/login">{t('login')}</Link>
      </Button>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.description}>{t('description')}</p>
        <div className={styles.buttonContainer}>
          <Button className="w-24" asChild>
            <Link href="/dashboard">{t('getStarted')}</Link>
          </Button>
          {renderLoginButton()}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
