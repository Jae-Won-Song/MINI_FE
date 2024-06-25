'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import src from '../../../public/images/mainBannerImage.jpg';
import SelectRoom from '../../components/SelectRoom';

const page = ({ category, name }) => {
  return (
    <Container>
      <TextContainer>
        <h3>모텔</h3>
        <h2>서울의 방</h2>
        <br />
        <div>소개 글 내용</div>
      </TextContainer>

      <ImageContainer>
        <StyledImage src={src} alt="임시 이미지" />
        <StyledMap src={src} alt="임시 이미지" />
      </ImageContainer>
      <SelectRoom />
      <SelectRoom />
      <SelectRoom />
      <SelectRoom />
    </Container>
  );
};
export default page;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1920px;
`;

const StyledImage = styled(Image)`
  width: 1000px;
  height: 700px;
  padding: 20px 20px 20px 0;
`;

const StyledMap = styled(Image)`
  width: 680px;
  height: 700px;
  padding: 20px 0 20px 20px;
`;

const ImageContainer = styled.div`
  display: flex;
`;

const TextContainer = styled.div`
  width: 1680px;
`;
