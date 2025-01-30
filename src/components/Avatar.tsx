'use client';

import { Button } from 'antd';
import { useTranslations } from 'next-intl';

import useUserStore from '@/store/user';

const Avatar = () => {
  const { userInfo } = useUserStore();
  const t = useTranslations('Common');

  if (!userInfo?.state) {
    return <Button type="link">{t('login')}</Button>;
  }

  return (
    <div className="flex items-center">
      <div className="bg-slate-500 rounded-full w-10 h-10 flex items-center justify-center text-white">
        {userInfo?.name?.[0]?.toUpperCase() || 'U'}
      </div>
    </div>
  );
};

export default Avatar;
