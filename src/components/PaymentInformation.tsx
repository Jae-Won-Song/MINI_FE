'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useDataContext } from '../contexts/DataContext';
import Buttons from './Buttons';
import { useRouter } from 'next/navigation';
import TermsModal from './TermsModal'; // TermsModal 컴포넌트 추가

interface ObjectStateType {
  stayDays: number;
  price: number;
  accommodationId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  selectPerson: number;
  isPaymentMethodSelected: boolean;
}

const getTokenFromLocalStorage = () => {
  return localStorage.getItem('accessToken');
};

const PaymentInformation = () => {
  const { objectState } = useDataContext() as unknown as {
    objectState: ObjectStateType;
  }; // useDataContext에서 numberState를 가져오도록 수정해야 합니다.
  const [token, setToken] = useState<string | null>(null);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [checkedItems, setCheckedItems] = useState({
    terms1: false,
    terms2: false,
    terms3: false,
  });
  const router = useRouter();

  useEffect(() => {
    const storedToken = getTokenFromLocalStorage();
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // objectState.price가 undefined인 경우를 대비한 조건부 렌더링
  if (!objectState || !objectState.price) {
    return <LoadingMessage>데이터를 불러오는 중입니다...</LoadingMessage>;
  }

  const formattedCheckInDate = dayjs(objectState.checkInDate).format(
    'YYYY-MM-DD',
  );
  const formattedCheckOutDate = dayjs(objectState.checkOutDate).format(
    'YYYY-MM-DD',
  );

  const handleReservation = () => {
    if (
      Object.values(checkedItems).every((item) => item) &&
      objectState.isPaymentMethodSelected
    ) {
      router.push('/complete'); // ./test 페이지로 이동
    } else {
      alert('필수값을 모두 입력해주세요.');
    }
  };

  const handleAllChecked = () => {
    const newState = !isAllChecked;
    setIsAllChecked(newState);
    setCheckedItems({
      terms1: newState,
      terms2: newState,
      terms3: newState,
    });
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedItems({
      ...checkedItems,
      [e.target.name]: e.target.checked,
    });
  };

  const openModal = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <PaymentInformationContainer>
      <Information>결제 정보</Information>
      <InformationContainer>
        <InformationTitle>
          객실 가격 ({objectState.stayDays}박)
        </InformationTitle>
        <InformationText>
          {objectState.price.toLocaleString()}원
        </InformationText>
      </InformationContainer>
      <DivisionLine />
      <TotalInformationContainer>
        <TotalInformationTitle>총 결제 금액</TotalInformationTitle>
        <TotalInformationText>
          {objectState.price.toLocaleString()}원
        </TotalInformationText>
      </TotalInformationContainer>
      <TermsContainer>
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            checked={isAllChecked}
            onChange={handleAllChecked}
          />
          <h5>전체 동의</h5>
        </CheckboxContainer>
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            name="terms1"
            checked={checkedItems.terms1}
            onChange={handleChecked}
          />
          <h5>숙소 이용규칙 및 취소/환불규정 동의 (필수)</h5>
          <ArrowButton onClick={() => openModal('terms')}>{'>'}</ArrowButton>
        </CheckboxContainer>
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            name="terms2"
            checked={checkedItems.terms2}
            onChange={handleChecked}
          />
          <h5>개인정보 수집 및 이용 (필수)</h5>
          <ArrowButton onClick={() => openModal('privacy')}>{'>'}</ArrowButton>
        </CheckboxContainer>
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            name="terms3"
            checked={checkedItems.terms3}
            onChange={handleChecked}
          />
          <h5>만 14세 이상 확인 (필수)</h5>
          <ArrowButton onClick={() => openModal('age')}>{'>'}</ArrowButton>
        </CheckboxContainer>
      </TermsContainer>
      <ButtonContainer>
        <Buttons
          label="결제하기"
          fullWidth={false}
          onClick={handleReservation}
        />
      </ButtonContainer>
      {isModalOpen && (
        <TermsModal onClose={closeModal} content={modalContent} />
      )}
    </PaymentInformationContainer>
  );
};

export default PaymentInformation;

const PaymentInformationContainer = styled.div`
  width: 650px;
  height: 540px;
  border: 1px solid #7d7d7d;
  margin: 40px auto;
`;

const InformationContainer = styled.div`
  width: 600px;
  height: 40px;
  margin: 30px auto;
  display: flex;
  line-height: 10px;
`;

const Information = styled.div`
  width: 150px;
  margin: 30px;
  font-size: 20px;
`;

const InformationTitle = styled.h4`
  width: 150px;
  margin: 10px;
  font-size: 20px;
`;
const InformationText = styled.div`
  width: 350px;
  margin: 10px;
  font-size: 22px;
  text-align: right;
`;

const DivisionLine = styled.div`
  border-top: 1px solid #7d7d7d;
  margin: 10px auto;
  width: 600px;
`;

const TotalInformationContainer = styled.div`
  width: 600px;
  height: 40px;
  margin: 30px auto;
  display: flex;
  line-height: 10px;
`;

const TotalInformationTitle = styled.h4`
  width: 150px;
  margin: 10px;
  font-size: 20px;
`;
const TotalInformationText = styled.div`
  width: 350px;
  margin: 10px;
  font-size: 22px;
  text-align: right;
`;

const TermsContainer = styled.div`
  width: 580px;
  margin: 30px auto;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;
const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  margin-left: auto;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  width: 350px;
  height: 140px;
  margin: 40px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const LoadingMessage = styled.div`
  margin: 20px;
  font-size: 18px;
  text-align: center;
  color: #333;
`;
