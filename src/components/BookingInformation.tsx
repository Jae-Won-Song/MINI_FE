'use client';

import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { useDataContext } from '../contexts/DataContext';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import updateLocale from 'dayjs/plugin/updateLocale';
import PaymentButton from './PaymentButton';
import Buttons from './Buttons';
import Banner from '../../public/icons/elite_img_PC.png';

// Plugins 사용 설정
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(updateLocale);

// 한국어 요일 설정
dayjs.updateLocale('ko', {
  weekdays: ['일', '월', '화', '수', '목', '금', '토'],
});

const BookingInformation = () => {
  const { objectState } = useDataContext();

  // checkInDate와 checkOutDate가 이미 문자열 형식인 경우 바로 사용
  const dateCheckIn = dayjs(objectState.checkInDate as string);
  const dateCheckOut = dayjs(objectState.checkOutDate as string);

  const formattedCheckInDate = dateCheckIn.format('YYYY년 M월 D일 (ddd)');
  const formattedCheckOutDate = dateCheckOut.format('YYYY년 M월 D일 (ddd)');

  return (
    <BookingInformationContainer>
      <TitleContainer>
        <Title>예약 정보</Title>
      </TitleContainer>
      <TextBoxContainer>
        <TextBox>
          <TextTitle>예약일</TextTitle>
          <Text>
            {formattedCheckInDate} ~ {formattedCheckOutDate}
          </Text>
        </TextBox>
        <TextBox>
          <TextTitle>인원</TextTitle>
          <Text>{objectState.selectPerson as string}명</Text>
          {/* <pre>Object State: {JSON.stringify(objectState)}</pre> */}
        </TextBox>
        <EventBannerBox>
          <EventBannerTextBox>
            <EventBannerTexth3>
              다운로드만 해도 받는 엘리트 멤버십 혜택
            </EventBannerTexth3>
            <EventBannerText>
              지금 다운로드 하면 멤버십 할인가로 예약할 수 있어요.
            </EventBannerText>
            <Link href="./download">
              <Buttons label="다운로드" fullWidth={false} />
            </Link>
          </EventBannerTextBox>
          <EventBanner src={Banner} alt="프로모션 이미지" />
        </EventBannerBox>
      </TextBoxContainer>
      <PaymentMethodContainer>
        <PaymentMethodText>결제 수단</PaymentMethodText>
        <PaymetMethodButtonContainer>
          <PaymentButton />
        </PaymetMethodButtonContainer>
      </PaymentMethodContainer>
    </BookingInformationContainer>
  );
};

export default BookingInformation;

const BookingInformationContainer = styled.div`
  width: 1080px;
`;

const TitleContainer = styled.div`
  width: 1000px;
  height: 60px;
  margin: 20px auto;
`;

const Title = styled.h2`
  margin: 20px auto;
  font-size: 30px;
  line-height: 60px;
`;

const TextBoxContainer = styled.div`
  margin: 10px auto;
`;
const TextBox = styled.div`
  width: 1000px;
  height: 120px;
  border: 1px solid #7d7d7d;
  margin: 30px auto;
  box-shadow: 5px 5px 10px 0 #e5e5ec;
`;

const TextTitle = styled.h3`
  margin: 20px 30px;
`;
const Text = styled.div`
  margin: 25px 30px;
`;

const EventBannerBox = styled.div`
  width: 1000px;
  height: 270px;
  border: 1px solid #7d7d7d;
  margin: 30px auto;
  box-shadow: 5px 5px 10px 0 #e5e5ec;
  background-color: #edebff;
  position: relative;
  display: flex;
`;

const EventBanner = styled(Image)`
  width: 400px;
  height: 270px;
  position: absolute;
  right: 0;
`;

const EventBannerTextBox = styled.div`
  width: 500px;
  height: 150px;
  justify-content: center;
  align-content: center;
  margin: 60px 30px;
  line-height: 50px;
`;

const EventBannerTexth3 = styled.h3`
  font-size: 30px;
`;

const EventBannerText = styled.div`
  font-size: 22px;
`;

const PaymentMethodContainer = styled.div`
  width: 1000px;
  min-height: max-content;
  margin: 30px auto;
`;

const PaymentMethodText = styled.h3`
  margin: 20px auto;
  font-size: 18px;
`;

const PaymetMethodButtonContainer = styled.div`
  width: 1000px;
  min-height: max-content;
  margin: 30px auto;
`;
