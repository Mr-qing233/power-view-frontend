/**
 * 设备列表组件导出文件
 * @version 2025-02-17
 *
 * 主要功能:
 * - 设备表格和卡片视图
 * - 统一的搜索过滤功能
 * - 加载状态和错误处理
 *
 * 组件架构:
 * ├── 展示组件
 * │   ├── DeviceTable - 表格视图
 * │   ├── DeviceCard - 卡片视图
 * │   └── LoadingState - 加载/错误状态
 * │
 * ├── 工具函数
 * │   ├── filterDevices - 设备列表过滤
 * │   └── deviceMatchesSearch - 单设备匹配检查
 * │
 * └── 文档
 *     ├── README.md - 使用说明
 *     └── CHANGELOG.md - 变更记录
 *
 * @see README.md 完整文档
 * @see CHANGELOG.md 变更记录
 */

// === 组件导出 ===
export { default as DeviceCard } from './DeviceCard';
export { default as DeviceTable } from './DeviceTable';

// === 工具函数导出 ===
export { deviceMatchesSearch, filterDevices } from './utils';

// === 类型导出 ===
export type { Device } from '@/interfaces/device';

/**
 * @deprecated 以下组件已被移除或重构
 * - DeviceTableToolbar: 功能已集成到页面组件
 * - cleanup.sh: 清理脚本已完成任务
 */
