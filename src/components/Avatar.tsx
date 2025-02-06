'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

import useUserStore from '@/store/user';
import styles from '@/styles/components/avatar.module.scss';

const Avatar = () => {
  const { userInfo, clearUser } = useUserStore();
  const t = useTranslations('Common');

  if (!userInfo?.state) {
    return (
      <div className="w-10 h-10 flex items-center justify-center text-white">
        <Button variant="link" className={styles.login}>
          {t('login')}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center select-none">
      <div
        className="bg-slate-500 rounded-full w-10 h-10 flex items-center justify-center text-white"
        onClick={clearUser}
      >
        {userInfo?.name?.[0]?.toUpperCase() || 'U'}
      </div>
    </div>
  );
};

export default Avatar;
