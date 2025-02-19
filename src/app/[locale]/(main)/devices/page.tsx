/**
 * 设备管理页面
 */

'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { Search } from 'lucide-react';

import StatCard from '@/components/StatCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import { DeviceCard, DeviceTable, filterDevices } from './_components';
import styles from './page.module.scss';

import { Device, DeviceStats, generateMockDevices, generateMockDeviceStats } from '@/interfaces/device';

export default function DevicesPage() {
  // === 状态管理 ===
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [searchValue, setSearchValue] = useState<string>('');
  const [devices, setDevices] = useState<Device[]>([]);
  const [stats, setStats] = useState<DeviceStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // === 数据加载 ===
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 模拟API调用
      const mockDevices = generateMockDevices(10);
      const mockStats = generateMockDeviceStats();

      // 模拟网络延迟
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      // 随机模拟错误情况
      if (Math.random() < 0.1) {
        // 10% 概率触发错误
        throw new Error('加载设备数据失败，请重试');
      }

      setDevices(mockDevices);
      setStats(mockStats);
    } catch (error) {
      console.error('Failed to load devices:', error);
      setError(error instanceof Error ? error.message : '未知错误');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 首次加载数据
  useEffect(() => {
    loadData();
  }, [loadData]);

  // === 数据处理 ===
  const filteredDevices = useMemo(() => filterDevices(devices, searchValue), [devices, searchValue]);

  // === 事件处理函数 ===
  /* eslint-disable no-console*/
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
      {/* 页面头部：标题和统计信息 */}
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h1>设备管理</h1>
        </div>
        <div className="flex-1" />
        <div className={styles.stats}>
          {isLoading ? (
            // 统计卡片占位
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 w-48 animate-pulse rounded-lg bg-muted" />
            ))
          ) : error ? (
            <div className="text-red-500">加载统计信息失败</div>
          ) : (
            <>
              <StatCard title="总设备" value={stats?.totalDevices ?? 0} />
              <StatCard title="在线设备" value={stats?.onlineDevices ?? 0} type="success" />
              <StatCard title="告警设备" value={stats?.alertDevices ?? 0} type="warning" />
            </>
          )}
        </div>
      </header>

      {/* 工具栏：操作按钮、搜索、视图切换 */}
      <section className={styles.filters}>
        <div className={styles.viewToggle}>
          {/* 批量操作按钮组 */}
          <div className={styles.actions}>
            <Button>添加设备</Button>
            <Button variant="outline">批量导入</Button>
            <Button variant="outline">导出数据</Button>
          </div>
          <div className="flex-1" />
          {/* 搜索和视图切换 */}
          <div className="flex items-center gap-6">
            {/* 搜索框 */}
            <div className={styles.search}>
              <Search className="absolute  left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="按名称搜索..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className={styles.input}
                disabled={isLoading || !!error}
              />
            </div>
            {/* 视图切换开关 */}
            <div className="flex items-center gap-2">
              <Switch
                id="view-mode"
                checked={viewMode === 'card'}
                onCheckedChange={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
                className={styles.switch}
                disabled={isLoading || !!error}
              />
              <Label htmlFor="view-mode">切换视图</Label>
            </div>
          </div>
        </div>
      </section>

      {/* 主内容区：设备列表 */}
      <section className={styles.content}>
        <div className={styles.deviceList}>
          {viewMode === 'table' ? (
            // 表格视图 - 传入过滤后的数据
            <DeviceTable
              devices={filteredDevices}
              onViewDetails={handleViewDetails}
              onEditDevice={handleEditDevice}
              onDeleteDevice={handleDeleteDevice}
            />
          ) : (
            // 卡片视图 - 使用过滤后的数据
            <div className={styles.cardGrid}>
              {filteredDevices.map((device) => (
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
        </div>
      </section>
    </div>
  );
}
