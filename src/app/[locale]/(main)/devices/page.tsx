'use client';

import { useEffect, useState } from 'react';

import StatCard from '@/components/StatCard';
import { Button } from '@/components/ui/button';

import DeviceCard from './_components/DeviceCard';
import DeviceTable from './_components/DeviceTable';
import styles from './page.module.scss';

import { Device, DeviceStats, generateMockDevices, generateMockDeviceStats } from '@/interfaces/device';

export default function DevicesPage() {
  // 视图模式：列表/卡片
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');

  // 状态管理
  const [devices, setDevices] = useState<Device[]>([]);
  const [stats, setStats] = useState<DeviceStats | null>(null);

  // 在客户端加载数据（模拟加载延迟）
  useEffect(() => {
    const timer = setTimeout(() => {
      setDevices(generateMockDevices(10));
      setStats(generateMockDeviceStats());
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 数据未加载前显示骨架屏[暂未实现]
  if (!stats) {
    return <div className=""></div>;
  }

  /* eslint-disable no-console */
  // 处理函数
  const handleViewDetails = (deviceId: string) => {
    console.log('View details:', deviceId);
  };

  const handleEditDevice = (deviceId: string) => {
    console.log('Edit device:', deviceId);
  };

  const handleDeleteDevice = (deviceId: string) => {
    console.log('Delete device:', deviceId);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h1>设备管理</h1>
          <div className={styles.stats}>
            <StatCard title="总设备" value={stats.totalDevices} />
            <StatCard title="在线设备" value={stats.onlineDevices} type="success" />
            <StatCard title="告警设备" value={stats.alertDevices} type="warning" />
          </div>
        </div>
        <div className={styles.actions}>
          <Button>添加设备</Button>
          <Button variant="outline">批量导入</Button>
          <Button variant="outline">导出数据</Button>
        </div>
      </header>

      <section className={styles.filters}>
        <div className={styles.viewToggle}>
          <Button variant={viewMode === 'table' ? 'default' : 'outline'} onClick={() => setViewMode('table')}>
            列表视图
          </Button>
          <Button variant={viewMode === 'card' ? 'default' : 'outline'} onClick={() => setViewMode('card')}>
            卡片视图
          </Button>
        </div>
      </section>

      <section className={styles.content}>
        {viewMode === 'table' ? (
          <DeviceTable
            devices={devices}
            onViewDetails={handleViewDetails}
            onEditDevice={handleEditDevice}
            onDeleteDevice={handleDeleteDevice}
          />
        ) : (
          <div className={styles.cardGrid}>
            {devices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                onViewDetails={handleViewDetails}
                onEditDevice={handleEditDevice}
                onDeleteDevice={handleDeleteDevice}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
