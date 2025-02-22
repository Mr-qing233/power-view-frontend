/**
 * 设备表格列定义
 */
import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';

import Battery from '@/components/Battery';
import StatusTag from '@/components/StatusTag';
import { Button } from '@/components/ui/button';

import { Device } from '@/interfaces/device';

interface CreateColumnsProps {
  onViewDetails: (deviceId: string) => void;
  onEditDevice: (deviceId: string) => void;
  onDeleteDevice: (deviceId: string) => void;
}

export const createColumns = ({
  onViewDetails,
  onEditDevice,
  onDeleteDevice,
  t,
}: CreateColumnsProps & { t: any }): ColumnDef<Device>[] => {
  return [
    {
      accessorKey: 'name',
      size: 20,
      minSize: 120,
      maxSize: 300,
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="-ml-4">
          {t('deviceName')}
          {column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      ),
    },
    {
      accessorKey: 'status',
      size: 150,
      minSize: 80,
      maxSize: 150,
      header: t('deviceStatus'),
      cell: ({ row }) => <StatusTag status={row.getValue('status')} />,
    },
    {
      accessorKey: 'batteryLevel',
      size: 200,
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="-ml-4">
          {t('devicePower')}
          {column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      ),
      sortingFn: (rowA, rowB) => {
        const a = rowA.getValue('batteryLevel') as number;
        const b = rowB.getValue('batteryLevel') as number;
        return a < b ? -1 : a > b ? 1 : 0;
      },
      cell: ({ row }) => (
        <div style={{ width: '20vw' }}>
          <Battery
            value={row.getValue('batteryLevel')}
            style={{
              height: 24,
              showPercentage: true,
              sliceColorVariable: '--devices-battery-slice-color',
            }}
          />
        </div>
      ),
    },
    {
      accessorKey: 'type',
      size: 12,
      minSize: 100,
      maxSize: 200,
      header: t('deviceType'),
      cell: ({ row }) => row.getValue('type') || '-',
    },
    {
      accessorKey: 'serialNumber',
      size: 15,
      minSize: 200,
      maxSize: 250,
      header: t('deviceNumber'),
      cell: ({ row }) => row.getValue('serialNumber') || '-',
    },
    {
      accessorKey: 'group',
      size: 12,
      minSize: 100,
      maxSize: 200,
      header: t('deviceGroup'),
      cell: ({ row }) => row.getValue('group') || '-',
    },
    {
      accessorKey: 'lastUpdated',
      size: 18,
      minSize: 150,
      maxSize: 250,
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="-ml-4">
          {t('lastUpdated')}
          {column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      ),
      sortingFn: (rowA, rowB) => {
        const a = new Date(rowA.getValue('lastUpdated') as string).getTime();
        const b = new Date(rowB.getValue('lastUpdated') as string).getTime();
        return a < b ? -1 : a > b ? 1 : 0;
      },
      cell: ({ row }) =>
        new Date(row.getValue('lastUpdated')).toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
    },
    {
      id: 'actions',
      size: 20,
      minSize: 200,
      maxSize: 200,
      header: () => <div>{t('actions')}</div>,
      cell: ({ row }) => {
        const device = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => onViewDetails(device.id)}>
              {t('details')}
            </Button>
            <Button variant="outline" size="sm" onClick={() => onEditDevice(device.id)}>
              {t('edit')}
            </Button>
            <Button variant="outline" size="sm" onClick={() => onDeleteDevice(device.id)}>
              {t('delete')}
            </Button>
          </div>
        );
      },
    },
  ];
};
