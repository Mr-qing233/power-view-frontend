/**
 * 设备表格组件
 *
 * 功能：
 * 1. 基于 TanStack Table v8 实现的数据表格
 * 2. 支持按列排序
 * 3. 接收过滤后的设备数据
 * 4. 支持分页展示
 * 5. 提供设备的查看、编辑、删除操作
 */

import { useState } from 'react';

import { flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { createColumns } from './columns';
import styles from './device-table.module.scss';

import { Device } from '@/interfaces/device';

interface DeviceTableProps {
  /** 设备数据数组（已过滤） */
  devices: Device[];
  /** 查看设备详情的回调函数 */
  onViewDetails: (deviceId: string) => void;
  /** 编辑设备的回调函数 */
  onEditDevice: (deviceId: string) => void;
  /** 删除设备的回调函数 */
  onDeleteDevice: (deviceId: string) => void;
}

const DeviceTable: React.FC<DeviceTableProps> = ({ devices, onViewDetails, onEditDevice, onDeleteDevice }) => {
  // === 状态管理 ===
  const [sorting, setSorting] = useState<SortingState>([]);
  const t = useTranslations('Devices');

  // 创建表格列配置
  const columns = createColumns({
    onViewDetails,
    onEditDevice,
    onDeleteDevice,
    t,
  });

  // === 表格实例配置 ===
  const table = useReactTable({
    // 数据源
    data: devices,
    columns,

    // 功能模型
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    // 状态更新处理器
    onSortingChange: setSorting,

    // 启用列宽调整
    enableColumnResizing: true,
    columnResizeMode: 'onChange',

    // 默认列配置
    defaultColumn: {
      minSize: 80,
      size: 10,
    },

    // 当前状态
    state: {
      sorting,
    },
  });

  return (
    <div className={styles.container}>
      <div className="rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} style={{ width: header.getSize() }}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // 无数据时显示空状态
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  暂无数据
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DeviceTable;
