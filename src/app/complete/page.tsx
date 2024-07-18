'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import src from '../../../public/images/mainBannerImage.jpg';
import { useDataContext } from '../../contexts/DataContext';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface InformationRowProps {
  title: string;
  content: string;
}

interface ObjectStateType {
  title: string;
  accommodationTitle: string;
  stayDays: number;
  price: number;
  accommodationId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  selectPerson: number;
}

const getTokenFromLocalStorage = () => {
  return localStorage.getItem('accessToken');
};

const getObjectStateFromLocalStorage = (): ObjectStateType | null => {
  const data = localStorage.getItem('objectState');
  return data ? JSON.parse(data) : null;
};

const Page = () => {
  const { objectState, setObjectState } = useDataContext() as unknown as {
    objectState: ObjectStateType;
    setObjectState: (state: ObjectStateType) => void;
  };

  const [token, setToken] = useState<string | null>(null);
  const [response, setResponse] = useState<unknown>(null);
  const todayDate = dayjs().format('YYYY년 M월 D일');
  const router = useRouter();

  // useEffect(() => {
  //   // objectState가 없을 때 홈페이지로 리디렉션
  //   if (!objectState) {
  //     router.push('/');
  //   }
  // }, [objectState, router]);

  useEffect(() => {
    // 클라이언트 사이드에서만 동작하도록 체크
    if (typeof window !== 'undefined') {
      // objectState 또는 다른 진입 조건을 확인합니다.
      if (!objectState) {
        // objectState가 없으면 홈페이지로 리디렉션
        router.push('/');
      }
    }
  }, [objectState, router]);

  useEffect(() => {
    const storedToken = getTokenFromLocalStorage();
    const storedObjectState = getObjectStateFromLocalStorage();

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedObjectState) {
      setObjectState(storedObjectState);
    }
  }, [setObjectState]);

  useEffect(() => {
    if (token && objectState) {
      const makeReservation = async () => {
        const formattedCheckInDate = dayjs(objectState.checkInDate).format(
          'YYYY-MM-DD',
        );
        const formattedCheckOutDate = dayjs(objectState.checkOutDate).format(
          'YYYY-MM-DD',
        );

        const url = `https://yusuengdo.ddns.net/api/reservation/${objectState.accommodationId}/room/${objectState.roomId}/reserve`;

        const requestData = {
          headcount: objectState.selectPerson,
          startDate: formattedCheckInDate,
          endDate: formattedCheckOutDate,
          price: objectState.price,
        };

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        try {
          const response = await axios.post(url, requestData, config);
          console.log('예약 요청 성공:', response.data);
          setResponse(response.data); // 응답 데이터를 상태에 저장
        } catch (error) {
          if (error.response) {
            console.log('에러 응답:', error.response.data);
            setResponse(error.response.data); // 에러 응답을 상태에 저장
          } else if (error.request) {
            console.log('응답 없음:', error.request);
            setResponse({ status: 500, message: '응답을 받지 못했습니다' }); // 일반적인 에러 응답 설정
          } else {
            console.log('요청 설정 에러:', error.message);
            setResponse({
              status: 500,
              message: '요청 설정 중 문제가 발생했습니다',
            }); // 일반적인 에러 응답 설정
          }
        }
      };

      makeReservation();
    }
  }, [token, objectState]);

  if (!objectState) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  const formattedCheckInDate = dayjs(objectState.checkInDate).format(
    'YYYY-MM-DD',
  );
  const formattedCheckOutDate = dayjs(objectState.checkOutDate).format(
    'YYYY-MM-DD',
  );

  return (
    <PageContainer>
      <ReservationText>예약해 주셔서 감사합니다</ReservationText>
      <RoomInfoContainer>
        <RoomName>
          {objectState.accommodationTitle || '객실 제목 없음'}
        </RoomName>
        <StyledImage
          src={src}
          alt="임시 이미지"
          layout="fill"
          objectFit="cover"
        />
      </RoomInfoContainer>
      <InformationWrapper>
        <InformationRow title="예약 구매 일자" content={todayDate} />
        <InformationRow
          title="예약 인원"
          content={`${objectState.selectPerson ?? 0}명`}
        />
        <InformationRow
          title="객실명"
          content={`${objectState.title || '정보 없음'}`}
        />
        <InformationRow
          title="체크인 / 체크아웃 일자"
          content={`${formattedCheckInDate} ~ ${formattedCheckOutDate}`}
        />
        <InformationRow
          title="결제 금액"
          content={`${(objectState.price ?? 0).toLocaleString()}원`}
        />
      </InformationWrapper>
      <CancellationPolicy>
        <PolicyTitle>취소 및 환불 규정</PolicyTitle>
        <PolicyText>
          <ul>
            <li>
              <strong>[비수기]</strong>
            </li>
            <li>체크인 기준 2일 전 : 100% 환불</li>
            <li>체크인 기준 1일 전 : 90% 환불</li>
            <li>체크인 당일 및 No-show : 80% 환불</li>
            <li>
              <strong>[성수기]</strong> 매년 5월 ~ 10월, 12월 24일~31일
            </li>
            <li>체크인 기준 10일 전 및 예약 당일 : 100% 환불</li>
            <li>체크인 기준 9일 전 ~ 7일 전 : 90% 환불</li>
            <li>체크인 기준 6일 전 ~ 5일 전 : 70% 환불</li>
            <li>체크인 기준 4일 전 ~ 3일 전 : 50% 환불</li>
            <li>체크인 기준 2일 전 ~ 당일 및 No-show : 20% 환불</li>
          </ul>
          <p>연박 시, 전체 금액에 대해 취소 수수료 적용됩니다.</p>
          <p>
            당일 취소 및 No-show는 앱 내 취소가 불가하므로, 당사 고객센터를
            통하여 취소 및 환불 문의 바랍니다.
          </p>
          <p>취소, 환불 시 수수료가 발생할 수 있습니다.</p>
          <p>
            예약 후 10분 내 취소될 경우 취소 수수료가 발생하지 않습니다. (체크인
            시간 경과 후 제외)
          </p>
          <p>
            예약 후 10분 경과 시엔 해당 숙소의 취소 및 환불 규정이 적용됩니다.
          </p>
        </PolicyText>
      </CancellationPolicy>
    </PageContainer>
  );
};

const InformationRow = ({ title, content }: InformationRowProps) => (
  <InfoRow>
    <InfoTitle>{title}</InfoTitle>
    <InfoContent>{content}</InfoContent>
  </InfoRow>
);

export default Page;

const PageContainer = styled.div`
  width: 1920px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

const ReservationText = styled.div`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin: 20px 0;
`;

const RoomInfoContainer = styled.div`
  position: relative;
  width: 1700px;
  height: 550px;
  margin: 20px 0;
`;

const RoomName = styled.h2`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
  z-index: 1;
  font-size: 1.5rem;
`;

const StyledImage = styled(Image)`
  border-radius: 10px;
`;

const InformationWrapper = styled.div`
  width: 1700px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
`;

const InfoTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: normal;
`;

const InfoContent = styled.h4`
  font-size: 1.25rem;
  font-weight: 'normal';
  color: 'black';
`;

const CancellationPolicy = styled.div`
  width: 1700px;
  margin: 40px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff6f6;
`;

const PolicyTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const PolicyText = styled.div`
  color: red;
  font-size: 1rem;

  ul {
    padding-left: 20px;
  }

  li {
    margin-bottom: 10px;
  }

  p {
    margin-top: 20px;
  }
`;
