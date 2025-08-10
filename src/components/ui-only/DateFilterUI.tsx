
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, Calendar } from 'lucide-react';

export const DateFilterUI = () => {
  return (
    <div className="flex items-center space-x-3 bg-dashboard-surface border border-dashboard-border rounded-lg p-3">
      <div className="flex items-center space-x-2">
        <Calendar className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-foreground">기간:</span>
      </div>

      <Select defaultValue="thisMonth">
        <SelectTrigger className="w-32 bg-dashboard-bg border-dashboard-border text-foreground">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-dashboard-elevated border-dashboard-border">
          <SelectItem value="thisMonth" className="text-foreground hover:bg-dashboard-surface">이번 달</SelectItem>
          <SelectItem value="lastMonth" className="text-foreground hover:bg-dashboard-surface">지난 달</SelectItem>
          <SelectItem value="thisYear" className="text-foreground hover:bg-dashboard-surface">올해</SelectItem>
          <SelectItem value="custom" className="text-foreground hover:bg-dashboard-surface">사용자 지정</SelectItem>
        </SelectContent>
      </Select>

      {/* 사용자 지정 날짜 입력 필드들 - 기본적으로 숨김 */}
      <div className="hidden space-x-2">
        <Input
          type="date"
          className="w-36 bg-dashboard-bg border-dashboard-border text-foreground"
        />
        <span className="text-muted-foreground">~</span>
        <Input
          type="date"
          className="w-36 bg-dashboard-bg border-dashboard-border text-foreground"
        />
        <Button 
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          적용
        </Button>
      </div>

      <Button 
        size="sm"
        variant="outline"
        className="border-dashboard-border text-foreground hover:bg-dashboard-elevated"
      >
        <RefreshCw className="w-4 h-4" />
      </Button>
    </div>
  );
};
