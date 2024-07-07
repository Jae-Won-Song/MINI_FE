'use client';

import styled from 'styled-components';
import Image from 'next/image';
import src from '../../../public/images/mainBannerImage.jpg';
import useRequireSelection from '../../hooks/useRequireSelection';

interface InformationRowProps {
  title: string;
  content: string;
}

const Page = () => {
  const { isLoggedIn, accommodationId } = useRequireSelection();

  if (!isLoggedIn || !accommodationId) {
    return null; // 조건이 만족되지 않을 때는 아무것도 렌더링하지 않음
  }

  return (
    <PageContainer>
      <ReservationText>예약해 주셔서 감사합니다</ReservationText>
      <RoomInfoContainer>
        <RoomName>숙박업소 이름</RoomName>
        <StyledImage
          src={src}
          alt="임시 이미지"
          layout="fill"
          objectFit="cover"
        />
      </RoomInfoContainer>
      <InformationWrapper>
        <InformationRow title="예약 구매 일자" content="2024년 6월 20일" />
        <InformationRow title="예약 인원" content="5명" />
        <InformationRow title="객실명" content="A-1" />
        <InformationRow
          title="체크인 / 체크아웃 일자"
          content="2024년 6월 27일 ~ 2024년 6월 27일"
        />
        <InformationRow title="결제 금액" content="250,000원" />
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

const ReservationText = styled.h1`
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
