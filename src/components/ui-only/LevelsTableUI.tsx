
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// 샘플 데이터
const sampleData = [
  { level: 1, members: 12, sales: 12400000, commission: 620000 },
  { level: 2, members: 18, sales: 10400000, commission: 416000 },
  { level: 3, members: 4, sales: 3000000, commission: 90000 }
];

export const LevelsTableUI = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className="bg-dashboard-surface border-dashboard-border" style={{ background: 'var(--gradient-card)' }}>
      <CardHeader>
        <CardTitle className="text-foreground">레벨별 현황</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-dashboard-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-dashboard-border hover:bg-dashboard-elevated/50">
                <TableHead className="text-foreground font-medium bg-dashboard-elevated/30">레벨</TableHead>
                <TableHead className="text-foreground font-medium bg-dashboard-elevated/30">인원수</TableHead>
                <TableHead className="text-foreground font-medium bg-dashboard-elevated/30">매출</TableHead>
                <TableHead className="text-foreground font-medium bg-dashboard-elevated/30">관리수당</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleData.map((row) => (
                <TableRow 
                  key={row.level}
                  className="border-dashboard-border hover:bg-dashboard-elevated/70 transition-colors cursor-pointer"
                >
                  <TableCell className="text-foreground font-medium">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
                        {row.level}
                      </div>
                      <span>레벨 {row.level}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">
                    <span className="font-medium">{row.members.toLocaleString()}</span>
                    <span className="text-muted-foreground ml-1">명</span>
                  </TableCell>
                  <TableCell className="text-foreground">
                    <span className="font-medium">{formatCurrency(row.sales)}</span>
                  </TableCell>
                  <TableCell className="text-foreground">
                    <span className="font-medium text-accent">{formatCurrency(row.commission)}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
