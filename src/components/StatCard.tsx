import { cn } from '@/lib/utils';
import styles from '@/styles/components/stat-card.module.scss';

interface StatCardProps {
  title: string;
  value: number;
  type?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, type = 'default', className }) => {
  return (
    <div className={cn(styles.card, styles[type], className)}>
      <div className={styles.value}>{value}</div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default StatCard;
