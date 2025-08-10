
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { KPICardUI } from './kpiCardUI';
import { DateFilterUI } from './dateFilterUI';
import { LevelsTableUI } from './levelsTableUI';
import { TrendingUp, Users, DollarSign } from 'lucide-react';

// 샘플 KPI 데이터
const sampleKPIData = {
  personal_commission: 523000,
  management_commission: 1142000,
  personal_sales: 6840000,
  team_sales: 22840000,
  direct_count: 7,
  subtree_count: 34
};

export const PartnerDashboardUI = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <div className="container mx-auto p-6 space-y-6">
        {/* 헤더 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
              파트너
            </Badge>
            <h1 className="text-2xl font-bold text-foreground">조직 대시보드</h1>
          </div>
          
          <DateFilterUI />
        </div>

        {/* KPI 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICardUI
            title="판매수당"
            value={formatCurrency(sampleKPIData.personal_commission)}
            subtitle={`개인 매출: ${formatCurrency(sampleKPIData.personal_sales)}`}
            icon={<DollarSign className="w-6 h-6" />}
            variant="primary"
          />
          
          <KPICardUI
            title="관리수당"
            value={formatCurrency(sampleKPIData.management_commission)}
            subtitle={`팀 매출: ${formatCurrency(sampleKPIData.team_sales)}`}
            icon={<TrendingUp className="w-6 h-6" />}
            variant="accent"
          />
          
          <KPICardUI
            title="직하/전체 인원"
            value={`${sampleKPIData.direct_count} / ${sampleKPIData.subtree_count}`}
            subtitle="Direct / Subtree"
            icon={<Users className="w-6 h-6" />}
          />
        </div>

        {/* 레벨별 현황 테이블 */}
        <LevelsTableUI />
      </div>
    </div>
  );
};
