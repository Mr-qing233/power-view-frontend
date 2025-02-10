import Battery from '@/components/Battery';
import StatusTag from '@/components/StatusTag';
import { Button } from '@/components/ui/button';

import styles from './device-table.module.scss';

import { Device } from '@/interfaces/device';

interface DeviceTableProps {
  devices: Device[];
  onViewDetails: (deviceId: string) => void;
  onEditDevice: (deviceId: string) => void;
  onDeleteDevice: (deviceId: string) => void;
}

const DeviceTable: React.FC<DeviceTableProps> = ({ devices, onViewDetails, onEditDevice, onDeleteDevice }) => {
  return (
    <div className="overflow-x-auto">
      <table className={styles.table}>
        <thead>
          <tr>
            <th>设备名称</th>
            <th>状态</th>
            <th>电量</th>
            <th>类型</th>
            <th>序列号</th>
            <th>分组</th>
            <th>最后更新</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id}>
              <td>{device.name}</td>
              <td>
                <StatusTag status={device.status} />
              </td>
              <td>
                <Battery
                  value={device.batteryLevel}
                  style={{
                    width: 120,
                    height: 24,
                    showPercentage: true,
                  }}
                />
              </td>
              <td>{device.type || '-'}</td>
              <td>{device.serialNumber || '-'}</td>
              <td>{device.group || '-'}</td>
              <td>
                {new Date(device.lastUpdated).toLocaleString('zh-CN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
              <td>
                <div className={styles.actions}>
                  <Button variant="outline" size="sm" onClick={() => onViewDetails(device.id)}>
                    详情
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onEditDevice(device.id)}>
                    编辑
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onDeleteDevice(device.id)}>
                    删除
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceTable;
