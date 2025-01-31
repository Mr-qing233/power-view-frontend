'use client';

import styles from '@/styles/test.module.scss';

export default function TestPage() {
  const sections = Array.from({ length: 30 }, (_, index) => index);

  return (
    <div className="p-4">
      <div className={styles.testP}></div>
      <div className="w-64 h-64  bg-slate-500 dark:bg-zinc-300"></div>
      <h1 className="text-2xl mb-4">Scroll Test Page</h1>
      {sections.map((index) => (
        <div key={index} className="mb-8 p-4 bg-gray-100 rounded">
          <h2 className="text-xl mb-2">Section {index + 1}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
        </div>
      ))}
    </div>
  );
}
