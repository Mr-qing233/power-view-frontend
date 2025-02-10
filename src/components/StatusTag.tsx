import { cn } from '@/lib/utils';
import styles from '@/styles/components/status-tag.module.scss';

export type DeviceStatus = 'online' | 'offline' | 'warning' | 'error';

interface StatusTagProps {
  status: DeviceStatus;
  text?: string;
  className?: string;
}

const statusTextMap: Record<DeviceStatus, string> = {
  online: '在线',
  offline: '离线',
  warning: '警告',
  error: '错误',
};

const StatusTag: React.FC<StatusTagProps> = ({ status, text, className }) => {
  return (
    <span className={cn(styles.tag, styles[status], className)}>
      <span className={styles.dot} />
      <span>{text || statusTextMap[status]}</span>
    </span>
  );
};

export default StatusTag;
