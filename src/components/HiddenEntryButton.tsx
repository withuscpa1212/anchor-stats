import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface HiddenEntryButtonProps {
  onPinSuccess: () => void;
}

const PIN_CODE = '924713';
const CLICK_TIMEOUT = 3000; // 3 seconds
const REQUIRED_CLICKS = 5;

export const HiddenEntryButton = ({ onPinSuccess }: HiddenEntryButtonProps) => {
  const [clickCount, setClickCount] = useState(0);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);

  const resetClickCount = () => {
    setClickCount(0);
    if (clickTimer) {
      clearTimeout(clickTimer);
      setClickTimer(null);
    }
  };

  const handleHiddenClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    // Clear existing timer
    if (clickTimer) {
      clearTimeout(clickTimer);
    }

    // Set new timer to reset clicks
    const timer = setTimeout(() => {
      resetClickCount();
    }, CLICK_TIMEOUT);
    setClickTimer(timer);

    // Check if we reached required clicks
    if (newCount >= REQUIRED_CLICKS) {
      setShowPinModal(true);
      resetClickCount();
    }
  };

  const handlePinSubmit = () => {
    if (pin === PIN_CODE) {
      setShowPinModal(false);
      setPin('');
      setError('');
      onPinSuccess();
    } else {
      setError('잘못된 PIN 코드입니다.');
      setPin('');
    }
  };

  const handlePinChange = (value: string) => {
    setPin(value);
    setError('');
  };

  useEffect(() => {
    return () => {
      if (clickTimer) {
        clearTimeout(clickTimer);
      }
    };
  }, [clickTimer]);

  return (
    <>
      {/* Hidden Button */}
      <div 
        className="fixed bottom-4 right-4 w-8 h-8 rounded-full cursor-pointer opacity-0 hover:opacity-10 transition-opacity z-50"
        style={{ background: 'transparent' }}
        onClick={handleHiddenClick}
        role="button"
        aria-label="Hidden entry button"
      />

      {/* PIN Input Modal */}
      <Dialog open={showPinModal} onOpenChange={setShowPinModal}>
        <DialogContent className="bg-dashboard-surface border-dashboard-border">
          <DialogHeader>
            <DialogTitle className="text-foreground font-medium">파트너 액세스</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                PIN 코드를 입력하세요
              </label>
              <Input
                type="password"
                value={pin}
                onChange={(e) => handlePinChange(e.target.value)}
                placeholder="6자리 PIN"
                className="bg-dashboard-bg border-dashboard-border text-foreground"
                maxLength={6}
                onKeyDown={(e) => e.key === 'Enter' && handlePinSubmit()}
                autoFocus
              />
              {error && (
                <p className="text-destructive text-sm mt-2">{error}</p>
              )}
            </div>
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setShowPinModal(false)}
                className="border-dashboard-border text-foreground hover:bg-dashboard-elevated"
              >
                취소
              </Button>
              <Button 
                onClick={handlePinSubmit}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                확인
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};