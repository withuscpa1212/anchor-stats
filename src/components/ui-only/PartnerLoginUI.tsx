
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export const PartnerLoginUI = () => {
  return (
    <div className="min-h-screen bg-dashboard-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-dashboard-surface border-dashboard-border" style={{ background: 'var(--gradient-card)' }}>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">파트너 로그인</CardTitle>
          <p className="text-muted-foreground">에이전트 계정으로 로그인하세요</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="agentId" className="text-foreground">에이전트 ID</Label>
              <Input
                id="agentId"
                type="text"
                placeholder="에이전트 ID를 입력하세요"
                className="bg-dashboard-bg border-dashboard-border text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="bg-dashboard-bg border-dashboard-border text-foreground"
              />
            </div>
            
            {/* 에러 메시지 영역 - 기본적으로 숨김 */}
            <div className="hidden text-destructive text-sm text-center">
              로그인에 실패했습니다. 정보를 확인해주세요.
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              로그인
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
