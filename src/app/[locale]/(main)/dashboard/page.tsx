'use client';

/**
 * 仪表盘页面组件
 *
 * 功能：展示设备相关的数据统计和图表
 * 布局：4-3-1结构
 * - 顶部(4列)：四个数据统计卡片
 * - 中部(3列)：状态分布、电量分布、耗电排行
 * - 底部(1列)：活动趋势图表
 */

import { useEffect, useRef } from 'react';

import * as echarts from 'echarts';

import Battery from '@/components/Battery';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import styles from './page.module.scss';

/**
 * 模拟数据
 */
const mockDeviceStats = {
  totalDevices: 100,
  onlineDevices: 85,
  alertDevices: 5,
  lowBatteryDevices: 8,
  deviceStatusDistribution: [
    { status: '在线', count: 85, color: '#52c41a' },
    { status: '离线', count: 10, color: '#8c8c8c' },
    { status: '告警', count: 5, color: '#ff4d4f' },
  ],
  batteryDistribution: [
    { range: '0-20%', count: 8, color: '#ff4d4f' },
    { range: '20-50%', count: 15, color: '#faad14' },
    { range: '50-90%', count: 45, color: '#1890ff' },
    { range: '90-100%', count: 32, color: '#52c41a' },
  ],
  // 最近7天耗电最快的设备
  batteryConsumption: [
    {
      deviceId: 'dev_001',
      deviceName: '设备A',
      consumption: 25,
      currentBattery: 45,
      lastUpdate: '2025/02/06',
    },
    {
      deviceId: 'dev_002',
      deviceName: '设备B',
      consumption: 20,
      currentBattery: 60,
      lastUpdate: '2025/02/06',
    },
    {
      deviceId: 'dev_003',
      deviceName: '设备C',
      consumption: 18,
      currentBattery: 72,
      lastUpdate: '2025/02/06',
    },
    {
      deviceId: 'dev_004',
      deviceName: '设备D',
      consumption: 15,
      currentBattery: 55,
      lastUpdate: '2025/02/06',
    },
    {
      deviceId: 'dev_005',
      deviceName: '设备E',
      consumption: 12,
      currentBattery: 80,
      lastUpdate: '2025/02/06',
    },
  ],
  batteryTrend: {
    dates: Array.from({ length: 7 }, (_, i) =>
      new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    ),
    data: {
      critical: Array.from({ length: 7 }, () => Math.floor(Math.random() * 5) + 3), // 0-20%
      warning: Array.from({ length: 7 }, () => Math.floor(Math.random() * 10) + 5), // 20-50%
      normal: Array.from({ length: 7 }, () => Math.floor(Math.random() * 15) + 40), // 50-90%
      good: Array.from({ length: 7 }, () => Math.floor(Math.random() * 10) + 25), // >90%
    },
  },
};

/**
 * 统计数据卡片组件
 */
const StatCard = ({ title, value }: { title: string; value: number | string }) => (
  <div className={styles.card}>
    <div className={styles.title}>{title}</div>
    <div className={styles.value}>{value}</div>
  </div>
);

const ConsumptionTable = ({ data }: { data: typeof mockDeviceStats.batteryConsumption }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>DeviceName</TableHead>
        <TableHead>Battery</TableHead>
        <TableHead>Consumption</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((item) => (
        <TableRow key={item.deviceId}>
          <TableCell className="text-center p-0 ">{item.deviceName}</TableCell>
          <TableCell className="p-0 w-full h-14">
            <Battery value={item.currentBattery} style={{ showPercentage: true, height: 30, labelWidth: 40 }} />
          </TableCell>
          <TableCell className="p-0 text-center">{item.consumption}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const Dashboard = () => {
  const statusChartRef = useRef<HTMLDivElement>(null);
  const batteryChartRef = useRef<HTMLDivElement>(null);
  const trendChartRef = useRef<HTMLDivElement>(null);
  const batteryLineChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 设备状态分布图表
    if (statusChartRef.current) {
      const chart = echarts.init(statusChartRef.current);
      chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            type: 'pie',
            radius: '60%',
            data: mockDeviceStats.deviceStatusDistribution.map((item) => ({
              name: item.status,
              value: item.count,
              itemStyle: { color: item.color },
            })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      });
    }

    // 电量分布图表
    if (batteryChartRef.current) {
      const chart = echarts.init(batteryChartRef.current);
      chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: mockDeviceStats.batteryDistribution.map((item) => item.range),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: 'bar',
            data: mockDeviceStats.batteryDistribution.map((item) => ({
              value: item.count,
              itemStyle: { color: item.color },
            })),
            barWidth: '40%',
          },
        ],
      });
    }

    // 电量变动趋势图表
    if (trendChartRef.current) {
      const chart = echarts.init(trendChartRef.current);
      chart.setOption({
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: mockDeviceStats.batteryTrend.dates,
        },
        yAxis: {
          type: 'value',
        },
        legend: {
          data: ['电量不足', '低电量', '正常', '良好'],
        },
        series: [
          {
            name: '电量不足',
            type: 'line',
            data: mockDeviceStats.batteryTrend.data.critical,
            itemStyle: { color: '#ff4d4f' },
            areaStyle: { opacity: 0.1 },
            smooth: true,
          },
          {
            name: '低电量',
            type: 'line',
            data: mockDeviceStats.batteryTrend.data.warning,
            itemStyle: { color: '#faad14' },
            areaStyle: { opacity: 0.1 },
            smooth: true,
          },
          {
            name: '正常',
            type: 'line',
            data: mockDeviceStats.batteryTrend.data.normal,
            itemStyle: { color: '#1890ff' },
            areaStyle: { opacity: 0.1 },
            smooth: true,
          },
          {
            name: '良好',
            type: 'line',
            data: mockDeviceStats.batteryTrend.data.good,
            itemStyle: { color: '#52c41a' },
            areaStyle: { opacity: 0.1 },
            smooth: true,
          },
        ],
      });
    }

    // 图表自适应和清理
    const handleResize = () => {
      [statusChartRef, batteryChartRef, trendChartRef, batteryLineChartRef].forEach((ref) => {
        if (ref.current) {
          echarts.getInstanceByDom(ref.current)?.resize();
        }
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      [statusChartRef, batteryChartRef, trendChartRef, batteryLineChartRef].forEach((ref) => {
        if (ref.current) {
          echarts.getInstanceByDom(ref.current)?.dispose();
        }
      });
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <div className={styles.grid}>
          <StatCard title="设备总数" value={mockDeviceStats.totalDevices} />
          <StatCard title="在线设备" value={mockDeviceStats.onlineDevices} />
          <StatCard title="告警设备" value={mockDeviceStats.alertDevices} />
          <StatCard title="低电量设备" value={mockDeviceStats.lowBatteryDevices} />
        </div>

        <div className={styles.charts}>
          <div className={styles.card}>
            <div className={styles.title}>设备状态分布</div>
            <div ref={statusChartRef} className={styles.chart}></div>
          </div>
          <div className={styles.card}>
            <div className={styles.title}>设备电量分布</div>
            <div ref={batteryChartRef} className={styles.chart}></div>
          </div>
          {/* <div className={styles.card}>
            <div className={styles.title}>耗电最快设备</div>
            <ConsumptionList data={mockDeviceStats.batteryConsumption} />
          </div> */}
          <div className={styles.card}>
            <div className={styles.title}>耗电最快设备</div>
            <div className={styles.batteryLineChart}>
              <ConsumptionTable data={mockDeviceStats.batteryConsumption} />
            </div>
          </div>
        </div>

        <div className={styles.trend}>
          <div className={styles.title}>设备电量变动趋势</div>
          <div ref={trendChartRef} className={styles.chart}></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
