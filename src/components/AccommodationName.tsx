// 'use client';

// import React from 'react';
// import styled from 'styled-components';
// import useSWR from 'swr';
// import { useDataContext } from '../contexts/DataContext';
// import { Accommodation, Room, RoomData } from '../app/[slug]/page';
// import IconsImport from './IconsImport';

// interface ObjectStateType {
//   accommodationId: number;
//   roomId: number;
//   selectPerson: number;
// }

// const fetcher = (url: string) => fetch(url).then((res) => res.json());
// const accommodationURL = `https://yusuengdo.ddns.net/open-api/accommodation/`;

// const AccommodationName = () => {
//   const { objectState } = useDataContext() as unknown as {
//     objectState: ObjectStateType;
//   };

//   const { data: accommodationData, error: accommodationError } = useSWR<{
//     data: Accommodation;
//   }>(`${accommodationURL}${objectState.accommodationId}`, fetcher);

//   const { data: roomData, error: roomError } = useSWR<RoomData>(
//     `${accommodationURL}${objectState.accommodationId}/room/${objectState.roomId}`,
//     fetcher,
//   );

//   if (accommodationError || roomError) return <div>Failed to load</div>;
//   if (!accommodationData || !roomData) return <div>Loading...</div>;

//   const { data: accommodation } = accommodationData;

//   // roomData가 Room 배열인지 객체인지 확인
//   const isRoomArray = Array.isArray(roomData.data);
//   const roomsOrMessage = isRoomArray ? roomData.data : [roomData.data];

//   // 속성 접근 전에 undefined나 비어 있는지 체크
//   if (!roomsOrMessage[0]) return <div>객실 데이터를 찾을 수 없습니다.</div>;
//   return (
//     <AccommodationNameContainer>
//       <TitleContainer>
//         <Title>{accommodation.title}</Title>
//       </TitleContainer>
//       <AccommodationImage image={accommodation.image} />
//       <InformationContainer>
//         <InformationTitle>객실명</InformationTitle>
//         <InformationText>{roomsOrMessage[0]?.roomTitle}</InformationText>
//       </InformationContainer>
//       <InformationContainer>
//         <InformationTitle>객실 정보</InformationTitle>
//         <InformationText>
//           {roomsOrMessage[0]?.roomSize}평 / {roomsOrMessage[0]?.roomMaxCount}인
//           객실 / {'\n'}
//           {roomsOrMessage[0].roomIntro.replace(/(<([^>]+)>)/gi, '')}
//         </InformationText>
//       </InformationContainer>
//       <InformationContainer>
//         <InformationTitle>편의 시설</InformationTitle>
//         <IconsContainer>
//           <IconsImport
//             icons={{
//               bath: roomsOrMessage[0]?.roomBath,
//               hometheater: roomsOrMessage[0]?.roomHometheater,
//               aircondition: roomsOrMessage[0]?.roomAircondition,
//               tv: roomsOrMessage[0]?.roomTv,
//               pc: roomsOrMessage[0]?.roomPc,
//               cable: roomsOrMessage[0]?.roomCable,
//               internet: roomsOrMessage[0]?.roomInternet,
//               refrigerator: roomsOrMessage[0]?.roomRefrigerator,
//               toiletries: roomsOrMessage[0]?.roomToiletries,
//               sofa: roomsOrMessage[0]?.roomSofa,
//               cook: roomsOrMessage[0]?.roomCook,
//               table: roomsOrMessage[0]?.roomTable,
//               hairdryer: roomsOrMessage[0]?.roomHairdryer,
//             }}
//           />
//         </IconsContainer>
//       </InformationContainer>
//     </AccommodationNameContainer>
//   );
// };

// export default AccommodationName;

// const AccommodationNameContainer = styled.div`
//   width: 650px;
//   border: 1px solid #7d7d7d;
//   border-radius: 25px;
//   margin: 0 20px 0;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const TitleContainer = styled.div`
//   height: 60px;
//   margin: 20px;
// `;

// const Title = styled.h2`
//   margin: 20px auto;
//   font-size: 30px;
//   line-height: 60px;
// `;

// const AccommodationImage = styled.div<{ image: string }>`
//   width: 100%;
//   height: 180px;
//   margin-bottom: 20px;
//   background-image: url(${(props) => props.image});
//   background-size: cover;
//   background-position: center;
// `;

// const InformationContainer = styled.div`
//   width: 100%;
//   margin-bottom: 20px;
//   display: flex;
//   align-items: flex-start; /* 텍스트와 아이콘 상단 정렬 */
// `;

// const InformationTitle = styled.h4`
//   width: 100px;
//   margin: 10px 0; /* 상하 마진만 적용 */
//   font-size: 20px;
// `;

// const InformationText = styled.div`
//   width: 80%;
//   margin: 10px 0;
//   font-size: 16px;
//   white-space: pre-line; /* 줄바꿈 문자 (\n) 인식 */
// `;

// const IconsContainer = styled.div`
//   display: flex;
//   gap: 10px; /* 아이콘들 사이의 간격 설정 */
//   align-self: flex-start; /* 아이콘들 상단 정렬 */
// `;

// detail페이지 데이터 없는 문제를 useEffect로 accommodationError || roomError 없을 때 router.push('/') 되는지 안되는지 시험

'use client';

import React, { useEffect } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { useDataContext } from '../contexts/DataContext';
import { Accommodation, Room, RoomData } from '../app/[slug]/page';
import IconsImport from './IconsImport';

interface ObjectStateType {
  accommodationId: number;
  roomId: number;
  selectPerson: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const accommodationURL = `https://yusuengdo.ddns.net/open-api/accommodation/`;

const AccommodationName = () => {
  const router = useRouter();
  const { objectState } = useDataContext() as unknown as {
    objectState: ObjectStateType;
  };

  const { data: accommodationData, error: accommodationError } = useSWR<{
    data: Accommodation;
  }>(`${accommodationURL}${objectState.accommodationId}`, fetcher);

  const { data: roomData, error: roomError } = useSWR<RoomData>(
    `${accommodationURL}${objectState.accommodationId}/room/${objectState.roomId}`,
    fetcher,
  );

  useEffect(() => {
    if (accommodationError || roomError) {
      router.push('/');
    }
  }, [accommodationError, roomError, router]);

  if (accommodationError || roomError) return <div>Failed to load</div>;
  if (!accommodationData || !roomData) return <div>Loading...</div>;

  const { data: accommodation } = accommodationData;

  // roomData가 Room 배열인지 객체인지 확인
  const isRoomArray = Array.isArray(roomData.data);
  const roomsOrMessage = isRoomArray ? roomData.data : [roomData.data];

  // 속성 접근 전에 undefined나 비어 있는지 체크
  if (!roomsOrMessage[0]) return <div>객실 데이터를 찾을 수 없습니다.</div>;
  return (
    <AccommodationNameContainer>
      <TitleContainer>
        <Title>{accommodation.title}</Title>
      </TitleContainer>
      <AccommodationImage image={accommodation.image} />
      <InformationContainer>
        <InformationTitle>객실명</InformationTitle>
        <InformationText>{roomsOrMessage[0]?.roomTitle}</InformationText>
      </InformationContainer>
      <InformationContainer>
        <InformationTitle>객실 정보</InformationTitle>
        <InformationText>
          {roomsOrMessage[0]?.roomSize}평 / {roomsOrMessage[0]?.roomMaxCount}인
          객실 / {'\n'}
          {roomsOrMessage[0].roomIntro.replace(/(<([^>]+)>)/gi, '')}
        </InformationText>
      </InformationContainer>
      <InformationContainer>
        <InformationTitle>편의 시설</InformationTitle>
        <IconsContainer>
          <IconsImport
            icons={{
              bath: roomsOrMessage[0]?.roomBath,
              hometheater: roomsOrMessage[0]?.roomHometheater,
              aircondition: roomsOrMessage[0]?.roomAircondition,
              tv: roomsOrMessage[0]?.roomTv,
              pc: roomsOrMessage[0]?.roomPc,
              cable: roomsOrMessage[0]?.roomCable,
              internet: roomsOrMessage[0]?.roomInternet,
              refrigerator: roomsOrMessage[0]?.roomRefrigerator,
              toiletries: roomsOrMessage[0]?.roomToiletries,
              sofa: roomsOrMessage[0]?.roomSofa,
              cook: roomsOrMessage[0]?.roomCook,
              table: roomsOrMessage[0]?.roomTable,
              hairdryer: roomsOrMessage[0]?.roomHairdryer,
            }}
          />
        </IconsContainer>
      </InformationContainer>
    </AccommodationNameContainer>
  );
};

export default AccommodationName;

const AccommodationNameContainer = styled.div`
  width: 650px;
  border: 1px solid #7d7d7d;
  border-radius: 25px;
  margin: 0 20px 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleContainer = styled.div`
  height: 60px;
  margin: 20px;
`;

const Title = styled.h2`
  margin: 20px auto;
  font-size: 30px;
  line-height: 60px;
`;

const AccommodationImage = styled.div<{ image: string }>`
  width: 100%;
  height: 180px;
  margin-bottom: 20px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

const InformationContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start; /* 텍스트와 아이콘 상단 정렬 */
`;

const InformationTitle = styled.h4`
  width: 100px;
  margin: 10px 0; /* 상하 마진만 적용 */
  font-size: 20px;
`;

const InformationText = styled.div`
  width: 80%;
  margin: 10px 0;
  font-size: 16px;
  white-space: pre-line; /* 줄바꿈 문자 (\n) 인식 */
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 10px; /* 아이콘들 사이의 간격 설정 */
  align-self: flex-start; /* 아이콘들 상단 정렬 */
`;
