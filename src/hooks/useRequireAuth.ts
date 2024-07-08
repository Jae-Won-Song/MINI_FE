import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

const useRequireAuth = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const hasAlerted = useRef(false);

  useEffect(() => {
    if (!isLoggedIn && !hasAlerted.current) {
      hasAlerted.current = true;
      alert('로그인 후 다시 예약을 진행해 주세요.');
      router.push('/auth/login');
    }
  }, [isLoggedIn, router]);

  return { isLoggedIn };
};

export default useRequireAuth;
