'use client';

import styled from 'styled-components';
import BookingInformation from '../../components/BookingInformation';
import AccommodationName from '../../components/AccommodationName';
import PaymentInformation from '../../components/PaymentInformation';
import { useDataContext } from '../../contexts/DataContext';

const Page = () => {
  const { objectState } = useDataContext();

  if (!objectState) {
    return <div>데이터를 불러오는 중입니다...</div>;
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
