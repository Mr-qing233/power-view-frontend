import Battery from '@/components/Battery';
import StatusTag from '@/components/StatusTag';
import { Button } from '@/components/ui/button';

import styles from './device-card.module.scss';

import { Device } from '@/interfaces/device';

interface DeviceCardProps {
  device: Device;
  onViewDetails: (deviceId: string) => void;
  onEditDevice: (deviceId: string) => void;
  onDeleteDevice: (deviceId: string) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onViewDetails, onEditDevice, onDeleteDevice }) => {
  const { id, name, status, batteryLevel, type, serialNumber, group, lastUpdated } = device;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.name}>{name}</h3>
        <StatusTag status={status} />
      </div>

      <div className={styles.content}>
        <div className={styles.row}>
          <span className={styles.label}>电量</span>
          <Battery
            value={batteryLevel}
            style={{
              width: 120,
              height: 24,
              showPercentage: true,
            }}
          />
        </div>

        <div className={styles.row}>
          <span className={styles.label}>类型</span>
          <span>{type || '-'}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>序列号</span>
          <span>{serialNumber || '-'}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>分组</span>
          <span>{group || '-'}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>最后更新</span>
          <span>
            {new Date(lastUpdated).toLocaleString('zh-CN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="outline" size="sm" onClick={() => onViewDetails(id)}>
          详情
        </Button>
        <Button variant="outline" size="sm" onClick={() => onEditDevice(id)}>
          编辑
        </Button>
        <Button variant="outline" size="sm" onClick={() => onDeleteDevice(id)}>
          删除
        </Button>
      </div>
    </div>
  );
};

export default DeviceCard;
