import React from 'react';

import { Table } from '@tanstack/react-table';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

import { Device } from '@/interfaces/device';

interface DeviceTableToolbarProps {
  table: Table<Device>;
}

export function DeviceTableToolbar({ table }: DeviceTableToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
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
