
import { Card, CardContent } from '@/components/ui/card';

interface KPICardUIProps {
  title: string;
  value: string;
  subtitle: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'accent' | 'default';
}

export const KPICardUI = ({ title, value, subtitle, icon, variant = 'default' }: KPICardUIProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          card: 'border-primary/20 shadow-glow-primary',
          background: 'var(--gradient-primary)',
          text: 'text-primary-foreground'
        };
      case 'accent':
        return {
          card: 'border-accent/20 shadow-glow-accent',
          background: 'var(--gradient-accent)',
          text: 'text-accent-foreground'
        };
      default:
        return {
          card: 'border-dashboard-border',
          background: 'var(--gradient-card)',
          text: 'text-foreground'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Card 
      className={`bg-dashboard-surface ${styles.card} transition-all duration-300 hover:scale-105 hover:shadow-elevated`}
      style={{ background: styles.background }}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className={`text-sm font-medium ${styles.text} opacity-90 mb-2`}>
              {title}
            </h3>
            <div className={`text-2xl font-bold ${styles.text} mb-1`}>
              {value}
            </div>
            <p className={`text-sm ${styles.text} opacity-70`}>
              {subtitle}
            </p>
          </div>
          {icon && (
            <div className={`${styles.text} opacity-60`}>
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
