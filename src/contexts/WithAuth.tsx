'use client';

import React, { useEffect, useRef, ComponentType } from 'react';
import { useAuth } from './AuthContext'; // AuthContext가 있는 실제 경로로 변경
import { useRouter } from 'next/navigation';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => {
    const { isLoggedIn } = useAuth();
    const router = useRouter();
    const hasAlerted = useRef(false);

    useEffect(() => {
      if (!isLoggedIn && !hasAlerted.current) {
        alert('로그인이 필요한 페이지입니다.');
        hasAlerted.current = true;
        router.replace('/auth/login');
      }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) {
      return null; // 로그인이 안 되어 있는 경우, 리다이렉트 중에는 아무것도 렌더링하지 않음
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
