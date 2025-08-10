import { useState } from 'react';
import { HiddenEntryButton } from '@/components/HiddenEntryButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Shield, Users, BarChart3 } from 'lucide-react';

const Index = () => {
  const [showPartnerAccess, setShowPartnerAccess] = useState(false);

  const handlePinSuccess = () => {
    setShowPartnerAccess(true);
    // Redirect to login page after a short delay
    setTimeout(() => {
      window.location.href = '/partners/login';
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              비즈니스 성장을 위한
              <span className="text-transparent bg-clip-text" style={{ background: 'var(--gradient-primary)' }}>
                {' '}파트너 플랫폼
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              효율적인 파트너 관리와 데이터 기반 의사결정으로 비즈니스 성과를 극대화하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="text-lg px-8 py-6"
                style={{ background: 'var(--gradient-primary)' }}
              >
                플랫폼 알아보기
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 border-dashboard-border text-foreground hover:bg-dashboard-elevated"
              >
                문의하기
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            강력한 파트너 관리 도구
          </h2>
          <p className="text-lg text-muted-foreground">
            데이터 기반의 인사이트로 파트너 네트워크를 성장시키세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card 
            className="bg-dashboard-surface border-dashboard-border hover:scale-105 transition-transform"
            style={{ background: 'var(--gradient-card)' }}
          >
            <CardHeader>
              <TrendingUp className="w-8 h-8 text-primary mb-2" />
              <CardTitle className="text-foreground">실시간 대시보드</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                매출, 수당, 조직 현황을 실시간으로 모니터링하고 분석하세요.
              </p>
            </CardContent>
          </Card>

          <Card 
            className="bg-dashboard-surface border-dashboard-border hover:scale-105 transition-transform"
            style={{ background: 'var(--gradient-card)' }}
          >
            <CardHeader>
              <Shield className="w-8 h-8 text-accent mb-2" />
              <CardTitle className="text-foreground">보안 시스템</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                강화된 보안으로 파트너 정보와 중요 데이터를 안전하게 보호합니다.
              </p>
            </CardContent>
          </Card>

          <Card 
            className="bg-dashboard-surface border-dashboard-border hover:scale-105 transition-transform"
            style={{ background: 'var(--gradient-card)' }}
          >
            <CardHeader>
              <Users className="w-8 h-8 text-primary mb-2" />
              <CardTitle className="text-foreground">조직 관리</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                효율적인 조직 구조 관리와 파트너 성과 추적을 지원합니다.
              </p>
            </CardContent>
          </Card>

          <Card 
            className="bg-dashboard-surface border-dashboard-border hover:scale-105 transition-transform"
            style={{ background: 'var(--gradient-card)' }}
          >
            <CardHeader>
              <BarChart3 className="w-8 h-8 text-accent mb-2" />
              <CardTitle className="text-foreground">상세 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                레벨별 현황, 매출 분석 등 상세한 비즈니스 인사이트를 제공합니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Partner Access Success Message */}
      {showPartnerAccess && (
        <div className="fixed inset-0 bg-dashboard-bg/80 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="bg-dashboard-surface border-dashboard-border max-w-md mx-4">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                파트너 액세스 승인
              </h3>
              <p className="text-muted-foreground">
                로그인 페이지로 이동합니다...
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Hidden Entry Button */}
      <HiddenEntryButton onPinSuccess={handlePinSuccess} />
    </div>
  );
};

export default Index;
