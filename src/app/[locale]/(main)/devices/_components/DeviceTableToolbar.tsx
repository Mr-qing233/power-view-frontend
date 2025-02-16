/**
 * 设备表格工具栏组件
 *
 * 功能：
 * - 提供设备名称搜索功能
 * - 集成 TanStack Table 的过滤功能
 * - 使用 shadcn/ui 的 Input 组件
 *
 * 数据流：
 * - 从表格实例获取过滤状态
 * - 通过 column.setFilterValue 更新过滤条件
 * - 自动触发表格重新渲染
 */

import React from 'react';

import { Table } from '@tanstack/react-table';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

import { Device } from '@/interfaces/device';

interface DeviceTableToolbarProps {
  /** TanStack Table 实例 */
  table: Table<Device>;
}

export function DeviceTableToolbar({ table }: DeviceTableToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-4">
        {/* 搜索框组件 */}
        <div className="relative w-64">
          {/* 搜索图标 */}
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          {/* 搜索输入框 */}
          <Input
            placeholder="按名称搜索..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className="pl-8"
          />
        </div>
      </div>
    </div>
  );
}
