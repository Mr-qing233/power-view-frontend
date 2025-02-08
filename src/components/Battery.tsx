/**
 * 电池图表组件
 *
 * 使用ECharts的pictorialBar类型实现分段电池效果
 * 支持自定义样式、主题切换、响应式布局
 * 使用symbolClip实现进度裁剪效果
 *
 * @version 2025/2/7
 */

import { useEffect, useRef } from 'react';

import * as echarts from 'echarts';

import { getCSSVariable } from '@/lib/utils';
import styles from '@/styles/components/battery.module.scss';

/**
 * 组件属性接口定义
 */
interface BatteryProps {
  value: number; // 电量值（0-100）

  style?: {
    width?: number | string; // 容器宽度
    height?: number | string; // 容器高度
    colors?: [string, string]; // 渐变色起止颜色
    backgroundColor?: string; // 背景色
    sliceColor?: string; // 分割线颜色
    sliceColorVariable?: string; // 分割线颜色CSS变量
    showPercentage?: boolean; // 是否显示百分比标签
    labelWidth?: number | string; // 标签宽度
  };
  className?: string; // 自定义类名
}

/**
 * 获取基于电量的默认颜色
 * 根据不同电量区间返回对应的颜色
 * - ≤20%: 红色警告色
 * - ≤50%: 橙色警示色
 * - ≤90%: 蓝色提示色
 * - >90%: 绿色正常色
 *
 * @param value - 电量值（0-100）
 * @returns [开始颜色, 结束颜色]
 */
const getDefaultColors = (value: number): [string, string] => {
  if (value <= 20) return ['#ff4d4f', '#ff7875']; // 红色警告
  if (value <= 50) return ['#faad14', '#ffc53d']; // 橙色警示
  if (value <= 90) return ['#1890ff', '#69c0ff']; // 蓝色提示
  return ['#52c41a', '#95de64']; // 绿色正常
};

/**
 * 创建电池图表配置
 * 使用ECharts的pictorialBar实现分段电池效果
 *
 * @param value - 电量值（0-100）
 * @param style - 自定义样式配置
 * @returns ECharts图表配置对象
 */
const createBatteryChartOption = (value: number, style?: BatteryProps['style']) => {
  const normalizedValue = value / 100; // 转换为0-1的值
  const colors = style?.colors || getDefaultColors(value);
  // 从CSS变量获取背景色，支持主题切换
  const backgroundColor = style?.backgroundColor || getCSSVariable('--battery-bg', 'rgba(0,0,0,0.04)');
  // 从CSS变量获取分割线颜色，支持主题切换
  const sliceColor =
    style?.sliceColor || getCSSVariable(style?.sliceColorVariable || '--battery-slice-color', 'rgba(0,0,0,0.04)');

  return {
    animation: true, // 启用动画效果
    // 图表布局配置
    grid: {
      left: 0, // 左侧留白
      right: style?.showPercentage ? style.labelWidth || 60 : 0, // 右侧为百分比文字预留空间
      containLabel: false, // 包含标签在内
    },
    // X轴（数值轴）配置
    xAxis: {
      show: false, // 隐藏坐标轴
      type: 'value', // 数值类型
      min: 0, // 最小值
      max: 1, // 最大值
    },
    // Y轴（类目轴）配置
    yAxis: {
      show: false, // 隐藏坐标轴
      type: 'category',
      data: [''], // 只有一个类目
    },
    // 系列列表配置
    series: [
      // 前景电量条配置
      {
        type: 'bar', // 象形柱图类型
        barWidth: '100%', // 宽度100%
        animationDuration: 2000, // 动画时长
        data: [normalizedValue], // 数据值
        z: 0, // 层级
        itemStyle: {
          borderWidth: 0, // 无边框
          color: {
            type: 'linear', // 线性渐变
            x: 0,
            y: 0,
            x2: 1,
            y2: 0, // 水平渐变
            colorStops: [
              { offset: 0, color: colors[0] }, // 渐变起始色
              { offset: 1, color: colors[1] }, // 渐变结束色
            ],
          },
        },
      },
      // 背景条配置
      {
        type: 'bar',
        barWidth: '100%', // 宽度100%
        barGap: '-100%', // 负间距
        animation: false, // 禁用动画
        data: [1], // 固定为最大值
        z: 0, // 层级
        itemStyle: {
          normal: {
            borderWidth: 0,
            color: backgroundColor, // 使用背景色（支持主题）
          },
        },
      },
      // 分割图形配置
      {
        //辅助分割图形
        type: 'pictorialBar',
        barWidth: '105%',
        symbol: 'rect',
        symbolMargin: '100%', //控制分割图形的大小
        symbolSize: [2, '100%'],
        symbolRepeat: true,
        animation: false,
        itemStyle: {
          normal: {
            color: sliceColor, // 分割线颜色
          },
        },

        // 标签配置（显示百分比）
        label: {
          show: style?.showPercentage || false, // 是否显示标签
          position: 'right', // 右侧显示
          color: '#000', // 继承颜色
          fontSize: 14, // 字体大小
          formatter: `${value}%`, // 格式化为百分比
          verticalAlign: 'top', // 垂直居中
        },
        data: [1],
        z: 1,
      },
    ],
  };
};

/**
 * 电池图表组件
 * 展示电量的可视化组件，支持主题切换和响应式布局
 */
const Battery: React.FC<BatteryProps> = ({ value, style, className }) => {
  // 图表DOM引用
  const chartRef = useRef<HTMLDivElement>(null);
  // 图表实例引用
  const chartInstance = useRef<echarts.EChartsType | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // 初始化图表实例
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    // 更新图表配置
    const option = createBatteryChartOption(value, style);
    chartInstance.current.setOption(option);

    // 监听窗口尺寸变化，调整图表大小
    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    // 监听主题变化，更新图表样式
    const observer = new MutationObserver(() => {
      if (chartInstance.current) {
        const option = createBatteryChartOption(value, style);
        chartInstance.current.setOption(option);
      }
    });

    // 观察主题属性变化
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-mode'],
    });

    // 组件卸载时的清理工作
    return () => {
      // 移除事件监听
      window.removeEventListener('resize', handleResize);
      // 停止主题观察
      observer.disconnect();
      // 销毁图表实例
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, [value, style]); // 依赖项：值和样式变化时更新

  // 渲染图表容器
  return (
    <div
      ref={chartRef}
      className={`${styles.battery} ${className || ''}`}
      style={{
        width: style?.width || '100%', // 默认宽度100%
        height: style?.height || 50, // 默认高度50px
      }}
    />
  );
};

export default Battery;
