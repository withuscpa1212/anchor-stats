import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, Calendar } from 'lucide-react';

interface DateFilterProps {
  onDateChange: (from: string, to: string) => void;
  onRefresh: () => void;
}

export const DateFilter = ({ onDateChange, onRefresh }: DateFilterProps) => {
  const [preset, setPreset] = useState('thisMonth');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const getPresetDates = (presetValue: string) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    switch (presetValue) {
      case 'thisMonth':
        return {
          from: `${year}-${String(month + 1).padStart(2, '0')}-01`,
          to: `${year}-${String(month + 1).padStart(2, '0')}-${String(new Date(year, month + 1, 0).getDate()).padStart(2, '0')}`
        };
      case 'lastMonth':
        const lastMonth = month === 0 ? 11 : month - 1;
        const lastMonthYear = month === 0 ? year - 1 : year;
        return {
          from: `${lastMonthYear}-${String(lastMonth + 1).padStart(2, '0')}-01`,
          to: `${lastMonthYear}-${String(lastMonth + 1).padStart(2, '0')}-${String(new Date(lastMonthYear, lastMonth + 1, 0).getDate()).padStart(2, '0')}`
        };
      case 'thisYear':
        return {
          from: `${year}-01-01`,
          to: `${year}-12-31`
        };
      default:
        return { from: fromDate, to: toDate };
    }
  };

  const handlePresetChange = (value: string) => {
    setPreset(value);
    if (value !== 'custom') {
      const dates = getPresetDates(value);
      setFromDate(dates.from);
      setToDate(dates.to);
      onDateChange(dates.from, dates.to);
    }
  };

  const handleApply = () => {
    if (fromDate && toDate) {
      onDateChange(fromDate, toDate);
    }
  };

  // Initialize with current month
  useState(() => {
    const dates = getPresetDates('thisMonth');
    setFromDate(dates.from);
    setToDate(dates.to);
    onDateChange(dates.from, dates.to);
  });

  return (
    <div className="flex items-center space-x-3 bg-dashboard-surface border border-dashboard-border rounded-lg p-3">
      <div className="flex items-center space-x-2">
        <Calendar className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-foreground">기간:</span>
      </div>

      <Select value={preset} onValueChange={handlePresetChange}>
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

      {preset === 'custom' && (
        <>
          <Input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-36 bg-dashboard-bg border-dashboard-border text-foreground"
          />
          <span className="text-muted-foreground">~</span>
          <Input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-36 bg-dashboard-bg border-dashboard-border text-foreground"
          />
          <Button 
            onClick={handleApply}
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            적용
          </Button>
        </>
      )}

      <Button 
        onClick={onRefresh}
        size="sm"
        variant="outline"
        className="border-dashboard-border text-foreground hover:bg-dashboard-elevated"
      >
        <RefreshCw className="w-4 h-4" />
      </Button>
    </div>
  );
};