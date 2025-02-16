/**
 * 设备管理页面
 *
 * 功能：
 * 1. 展示设备统计信息（总数、在线数、告警数）
 * 2. 提供设备列表和卡片两种视图模式
 * 3. 支持设备搜索、批量操作功能
 * 4. 支持设备的查看、编辑、删除等操作
 *
 * 组件结构：
 * - Header：页面标题和统计卡片
 * - Filters：操作按钮、搜索框和视图切换
 * - Content：设备表格/卡片列表
 */

'use client';

import { useEffect, useState } from 'react';

import { Search } from 'lucide-react';

import StatCard from '@/components/StatCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import DeviceCard from './_components/DeviceCard';
import DeviceTable from './_components/DeviceTable';
import styles from './page.module.scss';

import { Device, DeviceStats, generateMockDevices, generateMockDeviceStats } from '@/interfaces/device';

export default function DevicesPage() {
  // === 状态管理 ===

  // 视图模式切换状态：table-表格视图 / card-卡片视图
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  // 搜索关键词状态
  const [searchValue, setSearchValue] = useState<string>('');

  // 设备列表和统计数据状态管理
  const [devices, setDevices] = useState<Device[]>([]);
  const [stats, setStats] = useState<DeviceStats | null>(null);

  // === 副作用处理 ===

  /**
   * 模拟数据加载
   * - 延迟1秒后加载模拟数据
   * - 清理函数用于取消定时器
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDevices(generateMockDevices(10));
      setStats(generateMockDeviceStats());
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 数据加载前显示骨架屏[待实现]
  if (!stats) {
    return <div className=""></div>;
  }

  /* eslint-disable no-console */
  // === 事件处理函数 ===

  /**
   * 查看设备详情
   * @param deviceId 设备ID
   */
  const handleViewDetails = (deviceId: string) => {
    console.log('View details:', deviceId);
  };

  /**
   * 编辑设备信息
   * @param deviceId 设备ID
   */
  const handleEditDevice = (deviceId: string) => {
    console.log('Edit device:', deviceId);
  };

  /**
   * 删除设备
   * @param deviceId 设备ID
   */
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
          <StatCard title="总设备" value={stats.totalDevices} />
          <StatCard title="在线设备" value={stats.onlineDevices} type="success" />
          <StatCard title="告警设备" value={stats.alertDevices} type="warning" />
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
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="按名称搜索..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-8"
              />
            </div>
            {/* 视图切换开关 */}
            <div className="flex items-center gap-2">
              <Switch
                id="view-mode"
                checked={viewMode === 'card'}
                onCheckedChange={() => (viewMode === 'table' ? setViewMode('card') : setViewMode('table'))}
                className={styles.switch}
              />
              <Label htmlFor="view-mode">切换视图</Label>
            </div>
          </div>
        </div>
      </section>

      {/* 主内容区：设备列表 */}
      <section className={styles.content}>
        <div className={styles.deviceList}>
          {/* 根据视图模式切换显示方式 */}
          {viewMode === 'table' ? (
            <DeviceTable
              devices={devices}
              onViewDetails={handleViewDetails}
              onEditDevice={handleEditDevice}
              onDeleteDevice={handleDeleteDevice}
              searchValue={searchValue}
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
        </div>
      </section>
    </div>
  );
}
