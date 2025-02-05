/* eslint-disable */
interface DeviceStats {
  totalDevices: number;
  onlineDevices: number;
  alertDevices: number;
  deviceStatusDistribution: {
    status: string;
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
