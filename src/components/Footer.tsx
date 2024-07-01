'use client';

import React from 'react';
import styled from 'styled-components';
import qrCode from '../../public/images/qrCode.png';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent1>
        <TeamName>꽉찬육각형</TeamName>
        <FooterText>
          <ul>            
            <li>대표: 송재원 김태민</li>
            <li>(06241) 서울 강남구 강남대로 364(미왕빌딩) 10~11증</li>
            <li>개인정보 보호 책임자: 송재원, 김태민</li>
            <li>홈페이지: 미니프로젝트 배포 주소</li>
            <li>Copyright © 2024. All rights reserved.</li>
          </ul>
        </FooterText>
      </FooterContent1>
      <FooterContent2>
        <PartWrapper>
          <PartName>Back Ends</PartName>
          <FooterText>
            <ul>            
              <li>김태민(<Link href='https://github.com/rlaxoals36/KDT_BE8_Mini-Project'>깃허브</Link>)</li>
              <li>박지선(<Link href='https://github.com/rlaxoals36/KDT_BE8_Mini-Project'>깃허브</Link>)</li>
              <li>박현준(<Link href='https://github.com/rlaxoals36/KDT_BE8_Mini-Project'>깃허브</Link>)</li>
              <li>유승도(<Link href='https://github.com/rlaxoals36/KDT_BE8_Mini-Project'>깃허브</Link>)</li>
              <li>최병준(<Link href='https://github.com/rlaxoals36/KDT_BE8_Mini-Project'>깃허브</Link>)</li>
            </ul>
          </FooterText>
        </PartWrapper>
        <PartWrapper>
          <PartName>Front Ends</PartName>
          <FooterText>
            <ul>
              <li>송재원(<Link href='https://github.com/Jae-Won-Song/MINI_FE'>깃허브</Link>)</li>
              <li>이동희(<Link href='https://github.com/Jae-Won-Song/MINI_FE'>깃허브</Link>)</li>
              <li>임혜정(<Link href='https://github.com/Jae-Won-Song/MINI_FE'>깃허브</Link>)</li>
            </ul>
          </FooterText>
        </PartWrapper>
      </FooterContent2>
      <FooterContent3>
        <FooterText>
          <p style={{fontSize: '1.8rem', fontWeight: '700'}}>1234-5678</p>
          <ul>
            <li>오전 9시 ~ 오후 6시(토요일, 공휴일 휴무)</li>
            <li>
              <button>1:1 문의하기</button>
              <button>자주 묻는 질문</button>
            </li>
          </ul>
          <ApplicationContent>
            <div>
              <p style={{fontWeight: '700'}}>APP 다운로드</p>
              <p>스마트폰으로 QR코드 스캔</p>
            </div>
            <div style={{ position: 'relative', width: '4rem', height: '4rem' }}>
              <Image
                src={qrCode}
                alt="QR Code"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </ApplicationContent>
        </FooterText>
      </FooterContent3>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  width: 100vw;
  height: 290px;
  display: flex;
  justify-content: space-around;
  padding-top: 2rem;
`;

const FooterText = styled.div`  
  ul {    
    li {
      color: #111111;
      line-height: 1.6;
      font-size: 0.874rem;
      padding: 0;
    }
  }
  p {
    color: #111111;
    line-height: 1.6;
    font-size: 0.874rem;
    text-align: end;
  }`;

const FooterContent1 = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterContent2 = styled.div`
  ul {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    li {      
      color: #111111;
      line-height: 1.6;
      font-size: 0.874rem;
    }
  }
`;
const FooterContent3 = styled.div`  
  ul {
    padding-bottom: 1.5rem;
    li {      
      text-align: end;
      line-height: 2;
      color: #111111;
      font-size: 0.874rem;
    }
    button {      
      border-radius: 0;
      border: 1px solid #E5E5EC;
      padding: 0.2rem 0.5rem;
      margin-left: 0.5rem;
    }
  }
`;

const ApplicationContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 0.5rem 0.7rem;
  align-items: center;
  border: 1px solid #E5E5EC;
  font-size: 0.824rem;
  p {
    color: #111111;
    text-align: left;
  }
`

const PartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1.7rem;
`

const PartName = styled.div`
  font-size: 1.2rem;
  font-weight: 700;  
  color: #111111;
  padding-bottom: 0.2rem;
`

const TeamName = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  padding-bottom: 1.4rem;
  color: #111111;
`

export default Footer;
