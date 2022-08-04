import { LoginTimer, UserState } from '@lib/atom';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

export default function useTimer() {
  const [timer, setTimer] = useRecoilState(LoginTimer);
  const reset = useResetRecoilState(LoginTimer);
  const user = useRecoilValue(UserState);

  useEffect(() => {
    if (user.email) {
      const interval = setInterval(() => {
        if (timer === 0) clearInterval(interval);
        else setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    if (!user.email) return reset();
  }, [timer, user.email]);

  return { timer, reset };
}
