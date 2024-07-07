'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import seoul from '../../../public/images/seoul.jpg';
import jeonla from '../../../public/images/jeonla.jpg';
import gangwon from '../../../public/images/gangwon.jpg';
import gyeongi from '../../../public/images/gyeongi.jpg';
import gyeongsang from '../../../public/images/gyeongsang.jpg';
import chungcheong from '../../../public/images/chungcheong.jpg';

interface MainSearchRegionProps {
  onSelectRegion: (region: string) => void; // 선택된 지역을 전달하는 함수
}

// 지역에 따라 번호가 부여될 예정

const regionImages = [
  { src: seoul, alt: 'Seoul', name: '서울' },
  { src: gyeongi, alt: 'Gyeongi', name: '경기' },
  { src: gangwon, alt: 'Gangwon', name: '강원' },
  { src: chungcheong, alt: 'Chungcheong', name: '충북' },
  { src: jeonla, alt: 'Jeonla', name: '전남' },
  { src: gyeongsang, alt: 'Gyeongsang', name: '경남' },
];

const regionNames = [
  '제주',
  '전북',
  '부산',
  '광주',
  '경북',
  '대구',
  '대전',
  '인천',
  '울산',
  '충남',
  '세종',
];

const MainSearchRegion: React.FC<MainSearchRegionProps> = ({
  onSelectRegion,
}) => {
  return (
    <RegionWrapper>
      <RegionWithPhotoWrapper>
        {regionImages.map((region, index) => (
          <div key={index} onClick={() => onSelectRegion(region.name)}>
            <ImageWrapper>
              <Image
                src={region.src}
                alt={region.alt}
                width={75}
                height={75}
                objectFit="cover"
              />
              <p>{region.name}</p>
            </ImageWrapper>
          </div>
        ))}
      </RegionWithPhotoWrapper>
      <RegionWithTextWrapper>
        {regionNames.map((region, index) => (
          <StyledRegion key={index} onClick={() => onSelectRegion(region)}>
            {region}
          </StyledRegion>
        ))}
      </RegionWithTextWrapper>
    </RegionWrapper>
  );
};

const RegionWrapper = styled.div`
  width: 590px;
  box-shadow: 4px 4px 5px 5px rgba(0, 0, 0, 0.05);
  background-color: #f7f7f7;
  border-radius: 6px;
  padding: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  position: absolute;
  top: 70px;
  right: 0;
  z-index: 100;
`;

const RegionWithPhotoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  text-align: center;
  padding-bottom: 24px;
  margin-bottom: 24px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 6px;
    width: 98%;
    border-bottom: 1px solid #cccccc;
  }
`;

const ImageWrapper = styled.div`
  text-align: center;
  padding: 5px;
  transition: 0.2s;
  cursor: pointer;
  font-size: 1.1rem;

  p {
    font-size: 1.1rem;
    font-weight: 700;
  }

  &:hover {
    background-color: #cccccc;
  }
`;

const RegionWithTextWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 18px;
`;

const StyledRegion = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85px;
  height: 40px;
  border: 1px solid #cccccc;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #cccccc;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.6);
  }
`;

export default MainSearchRegion;
