<<<<<<< HEAD
'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import seoul from '../../../public/images/seoul.jpg';
import jeonla from '../../../public/images/jeonla.jpg';
import gangwon from '../../../public/images/gangwon.jpg';
import gyeongi from '../../../public/images/gyeongi.jpg';
import gyeongsang from '../../../public/images/gyeongsang.jpg';
import chungcheong from '../../../public/images/chungcheong.jpg';
=======
'use client'

import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import seoul from '../../../public/images/seoul.jpg'
import jeonla from '../../../public/images/jeonla.jpg'
import gangwon from '../../../public/images/gangwon.jpg'
import gyeongi from '../../../public/images/gyeongi.jpg'
import gyeongsang from '../../../public/images/gyeongsang.jpg'
import chungcheong from '../../../public/images/chungcheong.jpg'

// 추후 백엔드 데이터에 따라 내용 다르게 설정할 것.
// 지역에 따라 번호가 부여될 예정
>>>>>>> b0926d1 (rename: component의 banner 폴더 추가)

const regionImages = [
  { src: seoul, alt: 'Seoul', name: '서울' },
  { src: gyeongi, alt: 'Gyeongi', name: '경기' },
  { src: gangwon, alt: 'Gangwon', name: '강원' },
  { src: chungcheong, alt: 'Chungcheong', name: '충청' },
  { src: jeonla, alt: 'Jeonla', name: '전라' },
  { src: gyeongsang, alt: 'Gyeongsang', name: '경상' },
];

const regionNames = [
<<<<<<< HEAD
  '서울',
  '부산',
  '속초',
  '강릉',
  '양양',
  '전주',
  '대구',
  '경주',
  '여수',
  '천안',
  '서귀포',
  '대전',
  '제주',
  '인천',
  '가평',
=======
  '서울', '부산', '속초', '강릉', '양양', '전주', '대구', '경주', '여수', '천안', '서귀포', '대전', '제주', '인천', '가평'
>>>>>>> b0926d1 (rename: component의 banner 폴더 추가)
];

const MainSearchRegion = () => {
  return (
    <RegionWrapper>
      <RegionWithPhotoWrapper>
        {regionImages.map((region, index) => (
<<<<<<< HEAD
          <Link key={index} href={`/search?keyword=${region.name}`} passHref>
            <ImageWrapper>
              <Image
=======
          <Link key={index} href={`/search?region=${region.name}`} passHref>
            <ImageWrapper>
              <Image 
>>>>>>> b0926d1 (rename: component의 banner 폴더 추가)
                src={region.src}
                alt={region.alt}
                width={75}
                height={75}
<<<<<<< HEAD
                objectFit="cover"
=======
                objectFit='cover'
>>>>>>> b0926d1 (rename: component의 banner 폴더 추가)
              />
              <p>{region.name}</p>
            </ImageWrapper>
          </Link>
        ))}
      </RegionWithPhotoWrapper>
      <RegionWithTextWrapper>
        {regionNames.map((region, index) => (
<<<<<<< HEAD
          <StyledLink key={index} href={`/search?keyword=${region}`} passHref>
            {region}
          </StyledLink>
        ))}
      </RegionWithTextWrapper>
    </RegionWrapper>
  );
};
=======
          <StyledLink key={index} href={`/search?region=${region}`} passHref>{region}</StyledLink>
        ))}
      </RegionWithTextWrapper>
    </RegionWrapper>
  )
}
>>>>>>> b0926d1 (rename: component의 banner 폴더 추가)

const RegionWrapper = styled.div`
  width: 590px;
  box-shadow: 4px 4px 5px 5px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
<<<<<<< HEAD
`;
=======
`
>>>>>>> b0926d1 (rename: component의 banner 폴더 추가)

const RegionWithPhotoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
<<<<<<< HEAD
=======
  /* gap: 3px; */
>>>>>>> b0926d1 (rename: component의 banner 폴더 추가)
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
<<<<<<< HEAD
    border-bottom: 1px solid #cccccc;
  }
`;
=======
    border-bottom: 1px solid #CCCCCC;
  }
`
>>>>>>> b0926d1 (rename: component의 banner 폴더 추가)

const ImageWrapper = styled.div`
  text-align: center;
  padding: 5px;
  transition: 0.2s;
<<<<<<< HEAD

  &:hover {
    background-color: #cccccc;
  }
`;

const RegionWithTextWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 18px;
`;

const StyledLink = styled(Link)`
=======
  
  &:hover {    
    background-color: #cccccc;
  }
`

const RegionWithTextWrapper = styled.div`
  display: grid;  
  grid-template-columns: repeat(5, 1fr);
  gap: 18px;
`

const StyledLink = styled(Link)`  
>>>>>>> b0926d1 (rename: component의 banner 폴더 추가)
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85px;
  height: 40px;
  border: 1px solid #cccccc;
  transition: 0.2s;

<<<<<<< HEAD
  &:hover {
=======
  &:hover {    
>>>>>>> b0926d1 (rename: component의 banner 폴더 추가)
    background-color: #cccccc;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.6);
  }
<<<<<<< HEAD
`;

export default MainSearchRegion;
=======
`

export default MainSearchRegion
>>>>>>> b0926d1 (rename: component의 banner 폴더 추가)
