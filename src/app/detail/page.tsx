// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import styled from 'styled-components';
// import BookingInformation from '../../components/BookingInformation';
// import AccommodationName from '../../components/AccommodationName';
// import PaymentInformation from '../../components/PaymentInformation';
// import { useDataContext } from '../../contexts/DataContext';

// const Page = () => {
//   const { objectState } = useDataContext();
//   const router = useRouter();

//   // useEffect(() => {
//   //   // objectState가 없을 때 홈페이지로 리디렉션
//   //   if (!objectState) {
//   //     router.push('/');
//   //   }
//   // }, [objectState, router]);

//   useEffect(() => {
//     // 클라이언트 사이드에서만 동작하도록 체크
//     if (typeof window !== 'undefined') {
//       // objectState 또는 다른 진입 조건을 확인합니다.
//       if (!objectState) {
//         // objectState가 없으면 홈페이지로 리디렉션
//         router.push('/');
//       }
//     }
//   }, [objectState, router]);

//   if (!objectState) {
//     return <div>데이터를 불러오는 중입니다...</div>;
//   }

//   return (
//     <PageContainer>
//       <BookingInformation />
//       <AccommodationInformation>
//         <AccommodationName />
//         <PaymentInformation />
//       </AccommodationInformation>
//     </PageContainer>
//   );
// };

// export default Page;

// const PageContainer = styled.div`
//   margin-top: 20px;
//   display: flex;
// `;

// const AccommodationInformation = styled.div``;

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import BookingInformation from '../../components/BookingInformation';
import AccommodationName from '../../components/AccommodationName';
import PaymentInformation from '../../components/PaymentInformation';
import { useDataContext } from '../../contexts/DataContext';

const Page = () => {
  const { objectState, setObjectState } = useDataContext();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 쿠키에서 objectState를 가져오는 로직 (예시)
      const cookieObjectState = document.cookie
        .split('; ')
        .find((row) => row.startsWith('objectState='))
        ?.split('=')[1];

      if (cookieObjectState) {
        setObjectState(JSON.parse(cookieObjectState));
      } else {
        // objectState가 없으면 홈페이지로 리디렉션
        router.push('/');
      }
    }
  }, [setObjectState, router]);

  useEffect(() => {
    if (!objectState) {
      // objectState가 없으면 홈페이지로 리디렉션
      router.push('/');
    }
  }, [objectState, router]);

  if (!objectState) {
    return <LoadingContainer>데이터를 불러오는 중입니다...</LoadingContainer>;
  }

  return (
    <PageContainer>
      <BookingInformation />
      <AccommodationInformation>
        <AccommodationName />
        <PaymentInformation />
      </AccommodationInformation>
    </PageContainer>
  );
};

export default Page;

const PageContainer = styled.div`
  margin-top: 20px;
  display: flex;
`;

const AccommodationInformation = styled.div``;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
  color: #333;
`;
