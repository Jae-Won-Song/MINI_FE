import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

const useRequireSelection = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const accommodationId = searchParams.get('accommodationId');

  const hasLoggedAlerted = useRef(false);
  const hasSelectedAlerted = useRef(false);

  useEffect(() => {
    if (!isLoggedIn && !hasLoggedAlerted.current) {
      hasLoggedAlerted.current = true;
      alert('로그인 후 다시 예약을 진행해 주세요.');
      router.push('/auth/login');
    } else if (isLoggedIn && !accommodationId && !hasSelectedAlerted.current) {
      hasSelectedAlerted.current = true;
      alert('숙소를 먼저 선택해 주세요.');
      window.history.back();
    }
  }, [isLoggedIn, accommodationId, router]);

  return { isLoggedIn, accommodationId };
};

export default useRequireSelection;
