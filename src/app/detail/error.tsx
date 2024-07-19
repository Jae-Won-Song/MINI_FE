'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const FilterError = ({ error }) => {
  const router = useRouter();

  useEffect(() => {
    if (error) {
      router.push('/');
    }
  }, [error, router]);

  return (
    <div id="error">
      <h2>잘못된 접근입니다.</h2>
      <h2>로그인 후 객실을 선택해주세요.</h2>
    </div>
  );
};

export default FilterError;
