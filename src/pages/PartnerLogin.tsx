import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface PartnerLoginProps {
  onLoginSuccess: () => void;
}

export const PartnerLogin = ({ onLoginSuccess }: PartnerLoginProps) => {
  const [agentId, setAgentId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!agentId || !password) {
      setError('에이전트 ID와 비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Mock login for development
      const USE_MOCK = true;
      
      if (USE_MOCK) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock successful login
        if (agentId === 'agent001' && password === 'password') {
          const mockToken = 'mock-jwt-token-' + Date.now();
          localStorage.setItem('partner-token', mockToken);
          onLoginSuccess();
        } else {
          setError('잘못된 로그인 정보입니다.');
        }
      } else {
        // Real API call
        const response = await fetch('/api/partner/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ agentId, password })
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('partner-token', data.token);
          onLoginSuccess();
        } else {
          setError('로그인에 실패했습니다.');
        }
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">파트너 로그인</h1>
          <p className="text-muted-foreground">에이전트 전용 대시보드에 접속하세요</p>
        </div>

        <Card className="bg-dashboard-surface border-dashboard-border shadow-lg" style={{ background: 'var(--gradient-card)' }}>
          <CardHeader>
            <CardTitle className="text-foreground text-center">계정 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="agentId" className="text-foreground">에이전트 ID</Label>
              <Input
                id="agentId"
                type="text"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                placeholder="에이전트 ID를 입력하세요"
                className="bg-dashboard-bg border-dashboard-border text-foreground"
                onKeyDown={handleKeyDown}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">비밀번호</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="bg-dashboard-bg border-dashboard-border text-foreground"
                onKeyDown={handleKeyDown}
              />
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            <Button 
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              style={{ background: loading ? undefined : 'var(--gradient-primary)' }}
            >
              {loading ? '로그인 중...' : '로그인'}
            </Button>

            <div className="text-center text-sm text-muted-foreground mt-4">
              <p>개발 환경 테스트 계정:</p>
              <p>ID: agent001, PW: password</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};