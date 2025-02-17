import { Device } from '@/interfaces/device';

/**
 * 过滤设备列表
 *
 * 基于搜索关键词过滤设备，支持以下字段：
 * - 名称（name）
 * - 序列号（serialNumber）
 * - 分组（group）
 *
 * @param devices - 设备列表
 * @param searchValue - 搜索关键词
 * @returns 过滤后的设备列表
 */
export const filterDevices = (devices: Device[], searchValue: string): Device[] => {
  if (!searchValue.trim()) {
    return devices;
  }

  const searchLower = searchValue.toLowerCase();
  return devices.filter((device) => {
    const searchFields = [device.name, device.serialNumber, device.group];

    return searchFields.some((field) => field?.toLowerCase().includes(searchLower));
  });
};

/**
 * 检查设备是否匹配搜索条件
 * 用于单个设备的快速检查
 *
 * @param device - 设备对象
 * @param searchValue - 搜索关键词
 * @returns 是否匹配
 */
export const deviceMatchesSearch = (device: Device, searchValue: string): boolean => {
  if (!searchValue.trim()) {
    return true;
  }

  const searchLower = searchValue.toLowerCase();
  return [device.name, device.serialNumber, device.group].some((field) => field?.toLowerCase().includes(searchLower));
};
