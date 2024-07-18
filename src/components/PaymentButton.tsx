'use client';

import React, { useState, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import { useDataContext, DataContextProps } from '../contexts/DataContext';
import KbLogo from '../../public/icons/1200x600wa.png';
import TossLogo from '../../public/icons/images.png';

interface PaymentButtonProps {
  font?: string;
  fontSize?: string;
  fontColor?: string;
  fontWeight?: string;
  text: string;
  isActive: boolean;
  onClick: () => void;
  hasBenefit: boolean;
}

const PaymentButton = ({
  font,
  fontSize,
  fontColor,
  fontWeight,
  text,
  isActive,
  onClick,
  hasBenefit,
}: PaymentButtonProps) => {
  return (
    <Button
      font={font}
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontColor={fontColor}
      isActive={isActive}
      onClick={onClick}
      text={text}
      hasBenefit={hasBenefit}
    >
      {hasBenefit && <BenefitBadge>혜택</BenefitBadge>}
      {text === 'KB Pay' ? (
        <>
          <LogoImageWrapper>
            <Image
              src={KbLogo}
              alt="KB Pay Logo"
              layout="fill"
              objectFit="contain"
            />
          </LogoImageWrapper>
          {text}
        </>
      ) : text === 'toss pay' ? (
        <>
          <LogoImageWrapper>
            <Image
              src={TossLogo}
              alt="Toss Pay Logo"
              layout="fill"
              objectFit="contain"
            />
          </LogoImageWrapper>
          {text}
        </>
      ) : (
        text
      )}
    </Button>
  );
};

const PaymentButtons = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState<boolean>(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState<boolean>(false);
  const [selectedDropdown1, setSelectedDropdown1] =
    useState<string>('카드를 선택해주세요.');

  const [selectedDropdown2, setSelectedDropdown2] = useState<string>('일시불');
  const { setObjectState }: DataContextProps = useDataContext();

  const [selectedCardCompany, setSelectedCardCompany] = useState<string | null>(
    null,
  );
  const [selectedInstallment, setSelectedInstallment] = useState<string | null>(
    null,
  );
  const [isPaymentMethodSelected, setIsPaymentMethodSelected] =
    useState<boolean>(false);

  const buttons = useMemo(
    () => [
      {
        text: '카카오pay',
        font: 'Arial',
        fontSize: '14px',
        fontColor: '#000',
        fontWeight: 'bold',
        message: (
          <>
            <p>
              <Tag>선착순</Tag> 카카오pay
            </p>
            <p>호텔/펜션 - 7만원 이상, 10% 할인 (오전10시, 일 1300명)</p>
            <p>최대 할인금액 1만원</p>
            <p>모텔 - 2만원 이상, 2천원 할인 (오전10시, 일 1100명)</p>
          </>
        ),
        hasBenefit: true,
      },
      {
        text: 'toss pay',
        font: 'Arial',
        fontSize: '14px',
        fontColor: '#000',
        fontWeight: 'bold',
        message: (
          <>
            <p>
              <Tag>선착순</Tag> 토스페이
            </p>
            <p>3만원 이상, 10% 최대 1만원 할인 (오전10시, 일 500명)</p>
            <p>2만원 이상, 2천원 할인 (오후 4시, 일 1200명)</p>
            <p>+생애 첫결제 시, 5천원 캐시백</p>
          </>
        ),
        hasBenefit: true,
      },
      {
        text: '신용/체크 카드',
        font: 'Arial',
        fontSize: '14px',
        fontColor: '#000',
        fontWeight: 'bold',
        message: (
          <>
            <p>
              <Tag>선착순</Tag> 신용/체크 카드
            </p>
            <p>국내숙소 - 7만원 이상, 5천원 할인</p>
            <p>오전 0시 우리 (일 80명), 농협 (일 300명)</p>
            <p>삼성 (일 220명), 하나 (일 100명)</p>
            <p>국내숙소 - 현대카드 M포인트 10% 사용, 0.5% 적립</p>
            <p>최대 5,000P 사용가능</p>
          </>
        ),
        hasBenefit: true,
        hasDropdown: true,
        dropdownItems1: [
          '카드를 선택해주세요.',
          '우리',
          '신한',
          '비씨(페이북)',
          '현대',
          '삼성',
          '롯데',
          'KB국민',
          'NH농협',
          '하나(외환)',
          '씨티',
          '광주',
          '제주',
          '신협체크',
          '전북',
          'MG새마을금고',
          '저축은행체크',
          '우체국카드',
          '카카오뱅크',
          'KDB산업은행',
          '케이뱅크',
        ],
        dropdownItems2: [
          '일시불',
          '2개월 (무이자 할부)',
          '3개월 (무이자 할부)',
          '4개월 (무이자 할부)',
          '5개월 (무이자 할부)',
          '6개월',
          '7개월',
          '8개월',
          '9개월',
          '10개월',
          '11개월',
          '12개월',
        ],
      },
      {
        text: 'KB Pay',
        font: 'Arial',
        fontSize: '14px',
        fontColor: '#000',
        fontWeight: 'normal',
        message: <p>KB Pay를 선택했습니다</p>,
        hasBenefit: false,
        hasDropdown: true,
        dropdownItems2: [
          '일시불',
          '2개월 (무이자 할부)',
          '3개월 (무이자 할부)',
          '4개월 (무이자 할부)',
          '5개월 (무이자 할부)',
          '6개월',
          '7개월',
          '8개월',
          '9개월',
          '10개월',
          '11개월',
          '12개월',
        ],
      },
      {
        text: '🅝 Pay',
        font: 'Yu Gothic',
        fontSize: '14px',
        fontColor: '#000',
        fontWeight: 'bold',
        message: (
          <>
            <p>
              <Tag>선착순</Tag> 네이버페이
            </p>
            <p>국내숙소 - 10만원 이상, 7% 최대 1만원 할인</p>
            <p>(오전 0시, 일700명)</p>
          </>
        ),
        hasBenefit: true,
      },
      {
        text: 'PAYCO',
        font: 'Arial',
        fontSize: '14px',
        fontColor: '#FA2928',
        fontWeight: 'bold',
        message: <p>PAYCO를 선택했습니다</p>,
        hasBenefit: false,
      },
      {
        text: '법인 카드',
        font: 'Arial',
        fontSize: '14px',
        fontColor: '#000',
        fontWeight: 'bold',
        message: <p>법인 카드를 선택했습니다</p>,
        hasBenefit: false,
      },
      {
        text: '휴대폰 결제',
        font: 'Arial',
        fontSize: '14px',
        fontColor: '#000',
        fontWeight: 'bold',
        message: <p>휴대폰 결제를 선택했습니다</p>,
        hasBenefit: false,
      },
    ],
    [],
  );

  // Modify handleClick function
  const handleClick = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
      setIsDropdownOpen1(false);
      setIsDropdownOpen2(false);
      setSelectedCardCompany(null);
      setSelectedInstallment(null);
      setIsPaymentMethodSelected(false);
    } else {
      setActiveIndex(index);
      setIsDropdownOpen1(false);
      setIsDropdownOpen2(false);
      setSelectedDropdown1('카드를 선택해주세요.');
      setSelectedDropdown2('일시불');
      setSelectedCardCompany(null);
      setSelectedInstallment(null);
      setIsPaymentMethodSelected(
        buttons[index].text !== '신용/체크 카드' &&
          buttons[index].text !== 'KB Pay',
      );
    }
  };

  // Update dropdown handlers to manage state
  const handleDropdownToggle1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
  };

  const handleDropdownToggle2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  const handleDropdownSelect1 = (item: string) => {
    setSelectedDropdown1(item);
    setSelectedCardCompany(item); // Update selected card company
    setIsDropdownOpen1(false);
    if (activeIndex !== null && buttons[activeIndex].text === 'KB Pay') {
      setIsPaymentMethodSelected(true);
    }
  };

  const handleDropdownSelect2 = (item: string) => {
    setSelectedDropdown2(item);
    setSelectedInstallment(item); // Update selected installment
    setIsDropdownOpen2(false);
    if (activeIndex !== null && buttons[activeIndex].text === 'KB Pay') {
      setIsPaymentMethodSelected(true);
    }
    if (
      activeIndex !== null &&
      buttons[activeIndex].text === '신용/체크 카드' &&
      selectedDropdown1 !== '카드를 선택해주세요.'
    ) {
      setIsPaymentMethodSelected(true);
    }
  };

  // Use useEffect to update context state
  useEffect(() => {
    if (activeIndex !== null) {
      setObjectState((prevState) => ({
        ...prevState,
        isPaymentMethodSelected,
        paymentDetails: {
          method: buttons[activeIndex].text,
          cardCompany: selectedCardCompany,
          installment: selectedInstallment,
        },
      }));
    }
  }, [
    activeIndex,
    selectedCardCompany,
    selectedInstallment,
    isPaymentMethodSelected,
    buttons,
    setObjectState,
  ]);

  return (
    <div>
      <ButtonContainer>
        {buttons.map((button, index) => (
          <PaymentButton
            key={index}
            {...button}
            isActive={activeIndex === index}
            onClick={() => handleClick(index)}
          />
        ))}
      </ButtonContainer>
      {activeIndex !== null && (
        <MessageContainer>
          {buttons[activeIndex].message}
          {buttons[activeIndex].hasDropdown && (
            <>
              {buttons[activeIndex].dropdownItems1 && (
                <DropdownContainer>
                  <DropdownButton onClick={handleDropdownToggle1}>
                    {selectedDropdown1}
                  </DropdownButton>
                  {isDropdownOpen1 && (
                    <Dropdown>
                      {buttons[activeIndex]?.dropdownItems1?.map(
                        (item, index) => (
                          <DropdownItem
                            key={index}
                            onClick={() => handleDropdownSelect1(item)}
                          >
                            {item}
                          </DropdownItem>
                        ),
                      )}
                    </Dropdown>
                  )}
                </DropdownContainer>
              )}
              <DropdownContainer>
                <DropdownButton onClick={handleDropdownToggle2}>
                  {selectedDropdown2}
                </DropdownButton>
                {isDropdownOpen2 && (
                  <Dropdown>
                    {buttons[activeIndex]?.dropdownItems2?.map(
                      (item, index) => (
                        <DropdownItem
                          key={index}
                          onClick={() => handleDropdownSelect2(item)}
                        >
                          {item}
                        </DropdownItem>
                      ),
                    )}
                  </Dropdown>
                )}
              </DropdownContainer>
            </>
          )}
        </MessageContainer>
      )}
    </div>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Button = styled.button<PaymentButtonProps>`
  width: 165px;
  height: 50px;
  margin: 20px 0;
  border: 1px solid;
  padding: 10px;
  border-radius: 5px;
  font-family: ${(props) => props.font};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.fontColor};
  cursor: pointer;
  position: relative;

  background-color: #fff;
  border-color: #d9d9d9;

  ${(props) =>
    props.isActive &&
    css`
      background-color: #f2f8ff;
      border-color: #b7d5f6;
    `}
`;

const BenefitBadge = styled.span`
  position: absolute;
  top: -10px;
  left: -10px;
  background-color: #ff4d4f;
  color: #fff;
  padding: 2px 6px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  text-align: left;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:after {
    content: '▼';
    font-size: 12px;
  }
`;

const DropdownContainer = styled.div`
  margin-top: 10px;
  width: 50%;
`;

const Dropdown = styled.div`
  max-height: 150px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  margin-top: 5px;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #bfbfbf;
    border-radius: 8px;
    &:hover {
      background-color: #66abfa;
      cursor: pointer;
    }
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
`;

const DropdownItem = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`;

const MessageContainer = styled.div`
  margin-top: 60px;
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 15px;
  background-color: #f5f7fa;
  font-size: 14px;
  color: #333;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Tag = styled.span`
  display: inline-block;
  background-color: #ffebec;
  color: #ff4d4f;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
  margin-bottom: 5px;
  margin-right: 10px;
`;

const LogoImageWrapper = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
`;

export default PaymentButtons;
