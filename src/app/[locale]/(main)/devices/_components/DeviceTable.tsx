/**
 * 设备表格组件
 *
 * 功能：
 * 1. 基于 TanStack Table v8 实现的数据表格
 * 2. 支持按列排序
 * 3. 支持按名称搜索过滤
 * 4. 支持分页展示
 * 5. 提供设备的查看、编辑、删除操作
 *
 * 数据流：
 * - 接收设备数据和搜索关键词
 * - 内部维护排序、过滤、分页状态
 * - 通过回调函数向上传递操作事件
 */

import { useEffect, useState } from 'react';

import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { createColumns } from './columns';
import styles from './device-table.module.scss';

import { Device } from '@/interfaces/device';

/**
 * 设备表格组件的属性接口
 */
interface DeviceTableProps {
  /** 设备数据数组 */
  devices: Device[];
  /** 搜索关键词 */
  searchValue: string;
  /** 查看设备详情的回调函数 */
  onViewDetails: (deviceId: string) => void;
  /** 编辑设备的回调函数 */
  onEditDevice: (deviceId: string) => void;
  /** 删除设备的回调函数 */
  onDeleteDevice: (deviceId: string) => void;
}

const DeviceTable: React.FC<DeviceTableProps> = ({
  devices,
  searchValue,
  onViewDetails,
  onEditDevice,
  onDeleteDevice,
}) => {
  // === 状态管理 ===

  /** 表格排序状态 */
  const [sorting, setSorting] = useState<SortingState>([]);
  /** 列过滤状态 */
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // 创建表格列配置
  const columns = createColumns({
    onViewDetails,
    onEditDevice,
    onDeleteDevice,
  });

  // === 表格实例配置 ===
  const table = useReactTable({
    // 数据源
    data: devices,
    columns,

    // 功能模型
    getCoreRowModel: getCoreRowModel(), // 核心行模型
    getSortedRowModel: getSortedRowModel(), // 排序模型
    getFilteredRowModel: getFilteredRowModel(), // 过滤模型

    // 状态更新处理器
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,

    // 启用列宽调整
    enableColumnResizing: true,
    columnResizeMode: 'onChange',

    // 默认列配置
    defaultColumn: {
      minSize: 80,
      size: 10,
    },

    // 初始状态配置
    initialState: {
      columnFilters: [
        {
          id: 'name',
          value: searchValue,
        },
      ],
    },

    // 当前状态
    state: {
      sorting,
      columnFilters,
    },
  });

  /**
   * 搜索过滤效果
   * 当搜索值变化时，更新表格的名称列过滤器
   */
  useEffect(() => {
    // 默认从accessorKey==='name'的列中进行搜索
    // 默认搜索对象为 accessorKey: 'name'
    const column = table.getColumn('name');
    if (column) {
      // 设置搜索内容
      column.setFilterValue(searchValue);
    }
  }, [searchValue, table]);

  return (
    <div className={styles.container}>
      <div className="rounded-md border">
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
