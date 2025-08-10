
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HiddenEntryButtonUI } from '@/components/ui-only/HiddenEntryButtonUI';
import { PartnerLoginUI } from '@/components/ui-only/PartnerLoginUI';
import { PartnerDashboardUI } from '@/components/ui-only/PartnerDashboardUI';

export const UIShowcase = () => {
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'dashboard'>('home');

  if (currentView === 'login') {
    return (
      <div>
        <div className="fixed top-4 left-4 z-50">
          <Button 
            onClick={() => setCurrentView('home')}
            variant="outline"
            className="border-dashboard-border text-foreground hover:bg-dashboard-elevated"
          >
            ← 홈으로
          </Button>
        </div>
        <PartnerLoginUI />
      </div>
    );
  }

  if (currentView === 'dashboard') {
    return (
      <div>
        <div className="fixed top-4 left-4 z-50">
          <Button 
            onClick={() => setCurrentView('home')}
            variant="outline"
            className="border-dashboard-border text-foreground hover:bg-dashboard-elevated"
          >
            ← 홈으로
          </Button>
        </div>
        <PartnerDashboardUI />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dashboard-bg flex items-center justify-center p-8">
      <div className="text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-4">파트너 대시보드 UI</h1>
          <p className="text-muted-foreground text-lg">UI/UX 컴포넌트 쇼케이스</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => setCurrentView('login')}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            로그인 페이지 보기
          </Button>
          <Button 
            onClick={() => setCurrentView('dashboard')}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            대시보드 페이지 보기
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground space-y-2">
          <p>• 우측 하단의 숨겨진 버튼을 찾아보세요 (디버깅용으로 보이게 설정됨)</p>
          <p>• 모든 기능 로직은 제거되고 순수 UI/UX만 포함됩니다</p>
        </div>
      </div>
      
      {/* 숨겨진 진입 버튼 */}
      <HiddenEntryButtonUI />
    </div>
  );
};
