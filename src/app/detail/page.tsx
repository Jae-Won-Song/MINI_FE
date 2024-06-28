'use client'

import styled from 'styled-components';
import BookingInformation from '../../components/BookingInformation';
import AccommodationName from '../../components/AccommodationName';
import PaymentInformation from '../../components/PaymentInformation';

const page = () => {
  return (
    <PageContainer>
      <BookingInformation />
      <AccommodationInformation>
        <AccommodationName />
        <PaymentInformation />
      </AccommodationInformation>
    </PageContainer>
  )
}

export default page;

const PageContainer = styled.div`
  display: flex;
`;

const AccommodationInformation = styled.div`
  
`;