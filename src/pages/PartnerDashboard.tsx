import { useState, useEffect } from 'react';
import { KPICard } from '@/components/KPICard';
import { DateFilter } from '@/components/DateFilter';
import { LevelsTable } from '@/components/LevelsTable';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SummaryData {
  personal_commission: number;
  management_commission: number;
  personal_sales: number;
  team_sales: number;
  direct_count: number;
  subtree_count: number;
}

interface LevelData {
  level: number;
  members: number;
  sales: number;
  commission: number;
}

export const PartnerDashboard = () => {
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [levelsData, setLevelsData] = useState<LevelData[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const { toast } = useToast();

  const USE_MOCK = true; // Toggle for development

  const mockSummaryData: SummaryData = {
    personal_commission: 523000,
    management_commission: 1142000,
    personal_sales: 6840000,
    team_sales: 22840000,
    direct_count: 7,
    subtree_count: 34
  };

  const mockLevelsData: LevelData[] = [
    { level: 1, members: 12, sales: 12400000, commission: 620000 },
    { level: 2, members: 18, sales: 10400000, commission: 416000 },
    { level: 3, members: 4, sales: 3000000, commission: 90000 }
  ];

  const fetchSummaryData = async () => {
    try {
      if (USE_MOCK) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setSummaryData(mockSummaryData);
      } else {
        const token = localStorage.getItem('partner-token');
        const response = await fetch('/api/partner/summary', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setSummaryData(data);
        } else {
          throw new Error('Failed to fetch summary');
        }
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
      toast({
        title: "데이터 로드 오류",
        description: "요약 데이터를 불러오는데 실패했습니다.",
        variant: "destructive"
      });
    }
  };

  const fetchLevelsData = async (from: string, to: string) => {
    try {
      setLoading(true);
      if (USE_MOCK) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        setLevelsData(mockLevelsData);
      } else {
        const token = localStorage.getItem('partner-token');
        const response = await fetch(`/api/partner/levels?from=${from}&to=${to}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setLevelsData(data);
        } else {
          throw new Error('Failed to fetch levels');
        }
      }
    } catch (error) {
      console.error('Error fetching levels:', error);
      toast({
        title: "데이터 로드 오류",
        description: "레벨별 데이터를 불러오는데 실패했습니다.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (from: string, to: string) => {
    setDateRange({ from, to });
    fetchLevelsData(from, to);
  };

  const handleRefresh = () => {
    fetchSummaryData();
    if (dateRange.from && dateRange.to) {
      fetchLevelsData(dateRange.from, dateRange.to);
    }
    toast({
      title: "새로고침 완료",
      description: "데이터가 업데이트되었습니다."
    });
  };

  useEffect(() => {
    fetchSummaryData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Header */}
      <div className="border-b border-dashboard-border bg-dashboard-surface">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                파트너
              </Badge>
              <h1 className="text-2xl font-bold text-foreground">조직 대시보드</h1>
            </div>
            <DateFilter onDateChange={handleDateChange} onRefresh={handleRefresh} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KPICard
            title="판매수당"
            value={summaryData ? formatCurrency(summaryData.personal_commission) : '로딩 중...'}
            subtitle={summaryData ? `개인 매출: ${formatCurrency(summaryData.personal_sales)}` : ''}
            icon={<DollarSign className="w-6 h-6" />}
            variant="primary"
          />
          <KPICard
            title="관리수당"
            value={summaryData ? formatCurrency(summaryData.management_commission) : '로딩 중...'}
            subtitle={summaryData ? `팀 매출: ${formatCurrency(summaryData.team_sales)}` : ''}
            icon={<TrendingUp className="w-6 h-6" />}
            variant="accent"
          />
          <KPICard
            title="조직 현황"
            value={summaryData ? `${summaryData.direct_count} / ${summaryData.subtree_count}` : '로딩 중...'}
            subtitle="Direct / Subtree"
            icon={<Users className="w-6 h-6" />}
          />
        </div>

        {/* Levels Table */}
        {loading ? (
          <div className="bg-dashboard-surface border border-dashboard-border rounded-lg p-8 text-center">
            <div className="animate-pulse">
              <div className="h-4 bg-dashboard-border rounded w-1/4 mx-auto mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-4 bg-dashboard-border rounded"></div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <LevelsTable data={levelsData} />
        )}
      </div>
    </div>
  );
};