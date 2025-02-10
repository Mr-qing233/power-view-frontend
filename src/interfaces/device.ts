import { DeviceStatus } from '@/components/StatusTag';

export interface Device {
  id: string;
  name: string;
  status: DeviceStatus;
  batteryLevel: number;
  lastUpdated: string;
  group?: string;
  description?: string;
  location?: string;
  type?: string;
  serialNumber?: string;
}

export interface DeviceStats {
  totalDevices: number;
  onlineDevices: number;
  alertDevices: number;
  deviceStatusDistribution: {
    status: DeviceStatus;
    count: number;
  }[];
  activityTrend: {
    date: string;
    activeDevices: number;
  }[];
  batteryStats: {
    deviceId: string;
    batteryLevel: number;
    status: 'charging' | 'discharging' | 'full';
  }[];
}

export interface DeviceGroup {
  id: string;
  name: string;
  description?: string;
  deviceCount: number;
}

const getRandomStatus = (index: number): DeviceStatus => {
  const statuses: DeviceStatus[] = ['online', 'offline', 'warning', 'error'];
  return statuses[index % 4];
};

const getRandomType = (index: number): string => {
  const types = ['类型A', '类型B', '类型C'];
  return types[index % 3];
};

// 假数据生成函数，使用确定性算法
export const generateMockDevices = (count: number = 10): Device[] => {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => ({
    id: `device-${i + 1}`,
    name: `设备 ${i + 1}`,
    status: getRandomStatus(i),
    batteryLevel: 20 + ((i * 7) % 80), // 生成20-100之间的值
    lastUpdated: new Date(now.getTime() - i * 3600000).toISOString(), // 每个设备间隔1小时
    group: `分组 ${Math.floor(i / 3) + 1}`,
    type: getRandomType(i),
    serialNumber: `SN${(i + 1).toString().padStart(8, '0')}`,
  }));
};

// 生成固定的统计数据
export const generateMockDeviceStats = (): DeviceStats => {
  const now = new Date();
  const baseActiveDevices = 85;

  return {
    totalDevices: 100,
    onlineDevices: 85,
    alertDevices: 5,
    deviceStatusDistribution: [
      { status: 'online', count: 85 },
      { status: 'offline', count: 10 },
      { status: 'warning', count: 3 },
      { status: 'error', count: 2 },
    ],
    activityTrend: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(now.getTime() - (6 - i) * 86400000).toISOString().split('T')[0],
      activeDevices: baseActiveDevices + (i % 3) * 5,
    })),
    batteryStats: Array.from({ length: 10 }, (_, i) => ({
      deviceId: `device-${i + 1}`,
      batteryLevel: 20 + ((i * 7) % 80),
      status: ['charging', 'discharging', 'full'][i % 3] as 'charging' | 'discharging' | 'full',
    })),
  };
};
