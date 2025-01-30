import Link from 'next/link';
import { useTranslations } from 'next-intl';

const HomePage = () => {
  const t = useTranslations('Home');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <div className="text-center px-6 py-12 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl max-w-2xl mx-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">{t('title')}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">{t('description')}</p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
          >
            {t('getStarted')}
          </Link>
          <Link
            href="/login"
            className="px-8 py-3 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg font-medium transition-colors"
          >
            {t('login')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
