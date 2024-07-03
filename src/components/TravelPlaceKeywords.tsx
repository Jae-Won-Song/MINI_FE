'use client'

import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

const travelPlaceKeywords = [
  '경기', '제주', '충남', '인천', '대구', '대전', '서울', '경남', '부산', '전북', '울산', '광주', '강원', '경북', '전남', '충북', '세종'
];
const popularKeywords = [
  '여수', '강릉', '속초', '경주', '부산', '가평', '제주', '양양', '속초', '포항', '거제도', '대부도', '광안리해수욕장', '삼척', '대천해수욕장', '태안', '서울', '강원', '춘천', '대전', '영종도', '대천', '통영', '경주', '전주', '해운대'
];

const TravelPlaceKeywords = () => {
  
  const router = useRouter()

  return (
    <TravelPlaceKeywordsWrapper>
      <KeywordsWrapper>    
        <p>국내 여행지</p>
        <RegionWithTextWrapper>
          {travelPlaceKeywords.map((region, index) => (
            <StyledLink key={index} onClick={() => router.push(`/search?keyword=${region}`)}>{region}</StyledLink>
          ))}
        </RegionWithTextWrapper>
      </KeywordsWrapper>
      <KeywordsWrapper>
        <p>인기 검색 키워드</p>
        <RegionWithTextWrapper>
          {popularKeywords.map((region, index) => (
            <StyledLink key={index} onClick={() => router.push(`/search?keyword=${region}`)}>{region}</StyledLink>
          ))}
        </RegionWithTextWrapper>
      </KeywordsWrapper>
    </TravelPlaceKeywordsWrapper>
  )
}

const TravelPlaceKeywordsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`

const KeywordsWrapper = styled.div`  
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;  
  p {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 20px;
  }
`

const RegionWithTextWrapper = styled.div`
  box-shadow: 4px 4px 5px 5px rgba(0, 0, 0, 0.05);    
  padding: 45px;
  border-radius: 6px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 18px;  
`

const StyledLink = styled.div`  
  display: flex;  
  align-items: center;
  justify-content: center;
  justify-self: center;
  width: 200px;
  height: 40px;
  transition: 0.2s;
  position: relative;
  cursor: pointer;

  &::after {
    content: '';    
    height: 45%;
    position: absolute;
    right: -30px;
    left: -30px;
    z-index: -1;
    border-left: 1px solid black;    
  }

  &:nth-child(5n + 1)::after {
    border-left: 1px solid transparent;
  }
  &:last-child::after {    
    right: -57px;
    border-right: 1px solid black;
  }

  &:hover {
    color: #F85B2B;
    font-weight: 700;
  }
`

export default TravelPlaceKeywords
