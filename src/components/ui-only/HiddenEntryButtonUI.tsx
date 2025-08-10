
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const HiddenEntryButtonUI = () => {
  return (
    <>
      {/* Hidden Button - 디버깅용으로 보이게 설정됨 */}
      <div 
        className="fixed bottom-4 right-4 w-8 h-8 rounded-full cursor-pointer opacity-0 hover:opacity-10 transition-opacity z-50"
        style={{ background: 'transparent' }}
        role="button"
        aria-label="Hidden entry button"
      />

      {/* PIN Input Modal - 디자인만 */}
      <Dialog open={false}>
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
                placeholder="6자리 PIN"
                className="bg-dashboard-bg border-dashboard-border text-foreground"
                maxLength={6}
              />
              <p className="text-destructive text-sm mt-2 hidden">잘못된 PIN 코드입니다.</p>
            </div>
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                className="border-dashboard-border text-foreground hover:bg-dashboard-elevated"
              >
                취소
              </Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                확인
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
