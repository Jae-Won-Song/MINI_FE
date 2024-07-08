'use client';

import styled from 'styled-components';
import Image from 'next/image';
import qrCode from '../../../public/images/qrCode.png';

const Page = () => {
  return (
    <Container>
      <ApplicationContent>
        <TextContainer>
          <Title>지금 APP을 다운로드 해보세요</Title>
          <Subtitle>스마트폰으로 QR코드 스캔</Subtitle>
        </TextContainer>
        <ImageContainer>
          <Image src={qrCode} alt="QR Code" layout="fill" objectFit="cover" />
        </ImageContainer>
      </ApplicationContent>
    </Container>
  );
};

export default Page;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32rem;
`;

const ApplicationContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  padding: 2rem 3rem;
  align-items: center;
  border: 1px solid #e5e5ec;
  font-size: 1.5rem;
  p {
    color: #111111;
    text-align: left;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 2rem;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin: 0;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 15rem;
  height: 15rem;
`;
