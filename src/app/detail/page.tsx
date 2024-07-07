'use client';

import styled from 'styled-components';
import { useDataContext, DataContextProps } from '../../contexts/DataContext';
import { useRouter } from 'next/navigation';
import BookingInformation from '../../components/BookingInformation';
import AccommodationName from '../../components/AccommodationName';
import PaymentInformation from '../../components/PaymentInformation';

const Page = () => {
  const { setStringState, setNumberState, setObjectState } =
    useDataContext() as DataContextProps;
  const router = useRouter();

  const handleSubmit = () => {
    setStringState('새로운 문자열');
    setNumberState(43);
    setObjectState({ key: '새로운 값' });
    router.push('/download');
  };

  return (
    <PageContainer>
      <BookingInformation />
      <AccommodationInformation>
        <AccommodationName />
        <PaymentInformation />
      </AccommodationInformation>
      <button onClick={handleSubmit}>데이터 설정 후 이동</button>
    </PageContainer>
  );
};

export default Page;

const PageContainer = styled.div`
  display: flex;
`;

const AccommodationInformation = styled.div``;
