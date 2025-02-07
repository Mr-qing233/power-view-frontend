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
    { range: '50-80%', count: 45, color: '#1890ff' },
    { range: '80-100%', count: 32, color: '#52c41a' },
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
  activityTrend: Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    activeDevices: Math.floor(Math.random() * 20) + 70,
  })),

  batteryLineDevice: [
    {
      data: '数据一',
      value: 0.6,
      arr: 1,
    },
    {
      data: '数据二',
      value: 0.95,
      arr: 1,
    },
    {
      data: '数据三',
      value: 0.85,
      arr: 1,
    },
  ],
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

/**
 * 耗电排行列表组件
 */
const ConsumptionList = ({ data }: { data: typeof mockDeviceStats.batteryConsumption }) => (
  <div className={styles.list}>
    {data.map((item) => (
      <div key={item.deviceId} className={styles.item}>
        <div className={styles.info}>
          <div className={styles.name}>{item.deviceName}</div>
          <div className={styles.detail}>当前电量：{item.currentBattery}%</div>
        </div>
        <div className={styles.consumption}>-{item.consumption}%/天</div>
      </div>
    ))}
  </div>
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

    // 活动趋势图表
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
          data: mockDeviceStats.activityTrend.map((item) => item.date),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: 'line',
            data: mockDeviceStats.activityTrend.map((item) => item.activeDevices),
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(24,144,255,0.3)' },
                { offset: 1, color: 'rgba(24,144,255,0.1)' },
              ]),
            },
            lineStyle: {
              color: '#1890ff',
            },
            itemStyle: {
              color: '#1890ff',
            },
            smooth: true,
          },
        ],
      });
    }

    if (batteryLineChartRef.current) {
      const chart = echarts.init(batteryLineChartRef.current);
      chart.setOption({
        tooltip: { show: false },
        xAxis: {
          type: 'value',
          min: 0,
          max: 1,
          axisLine: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false },
        },
        yAxis: {
          //show: false,
          type: 'category',
          inverse: true,
          splitLine: { show: false },
          axisLine: { show: false },
          axisLabel: {
            show: true,
            interval: 0,
            margin: 10,
            textStyle: {
              color: '#000',
              fontSize: 16,
              fontWeight: 'bold',
            },
          },
          axisTick: { show: false },
          data: mockDeviceStats.batteryLineDevice.map((item) => item.data),
        },
        series: [
          {
            //渐变数据内容
            type: 'bar',
            barWidth: '34%',
            animationDuration: 2000,
            itemStyle: {
              normal: {
                borderWidth: 0,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#00a0e9',
                    },
                    {
                      offset: 1,
                      color: '#00ffff',
                    },
                  ],
                },
              },
            },
            label: {
              show: false,
            },
            data: mockDeviceStats.batteryLineDevice.map((item) => item.value),
            z: 0,
          },
          {
            //背景柱状图
            type: 'bar',
            barWidth: '34%',
            barGap: '-100%',
            animation: false,
            itemStyle: {
              normal: {
                borderWidth: 0,
                color: 'rgba(0,202,255,0.2)',
              },
            },
            data: mockDeviceStats.batteryLineDevice.map((item) => item.arr),
            z: 0,
          },

          {
            //辅助分割图形
            type: 'pictorialBar',
            barWidth: '34%',
            symbol: 'rect',
            // symbolRotate:"-20",
            symbolMargin: '200%', //控制分割图形的大小
            symbolSize: [4, '100%'],
            symbolRepeat: true,
            animation: false,
            itemStyle: {
              normal: {
                color: '#fff',
              },
            },
            label: {
              normal: {
                color: '#000',
                show: true,
                position: ['101%', '40%'],
                fontSize: 22,
                fontWeight: 'bold',
                formatter: function (params: { dataIndex: number }) {
                  return ' ' + mockDeviceStats.batteryLineDevice[params.dataIndex].value * 100 + '%';
                },
              },
            },
            data: mockDeviceStats.batteryLineDevice.map((item) => item.arr),
            z: 1,
          },
        ],
      });
    }

    // 图表自适应和清理
    const handleResize = () => {
      [statusChartRef, batteryChartRef, trendChartRef].forEach((ref) => {
        if (ref.current) {
          echarts.getInstanceByDom(ref.current)?.resize();
        }
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      [statusChartRef, batteryChartRef, trendChartRef].forEach((ref) => {
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
          <div className={styles.card}>
            <div className={styles.title}>耗电最快设备</div>
            <ConsumptionList data={mockDeviceStats.batteryConsumption} />
          </div>
          <div className={styles.card}>
            <div className={styles.title}>设备电量分布</div>
            <div ref={batteryLineChartRef} className={styles.line}></div>
          </div>
        </div>

        <div className={styles.trend}>
          <div className={styles.title}>设备活动趋势</div>
          <div ref={trendChartRef} className={styles.chart}></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
