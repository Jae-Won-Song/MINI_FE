'use client';

import React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import Image from 'next/image';
import KakaoMapRender from '../../components/KakaoMapRender';
import SelectRoom from '../../components/SelectRoom';
import Star from '../../../public/icons/star.png'

interface Accommodation {
  category: string;
  title: string;
  tel: string;
  address: string;
  latitude: number;
  longitude: number;
  mlevel: number;
  image: string;
}

interface Room {
  roomId: number;
  roomTitle: string;
  roomMaxCount: number;
  roomOffseasonMinfee1: number;
  roomImg1: string;
  roomImg2: string;
  roomImg3: string;
  roomImg4: string;
  roomImg5: string;
  roomBath: string;
  roomHometheater: string;
  roomAircondition: string;
  roomTv: string;
  roomPc: string;
  roomCable: string;
  roomInternet: string;
  roomRefrigerator: string;
  roomToiletries: string;
  roomSofa: string;
  roomCook: string;
  roomTable: string;
  roomHairdryer: string;
}


const fetcher = (url) => fetch(url).then((res) => res.json());
const accommodationURL = `https://yusuengdo.ddns.net/open-api/accommodation/`;

const page = () => {
  const { data: accommodationData, error: accommodationError } = useSWR<{ data: Accommodation }>(
    `${accommodationURL}136213`,
    fetcher
  );

  const { data: roomData, error: roomError } = useSWR<{ data: Room[] }>(
    `${accommodationURL}136213/room`,
    fetcher
  );

  if (accommodationError || roomError) return <div>Failed to load</div>;
  if (!accommodationData || !roomData) return <div>Loading...</div>;

  const { data: accommodation } = accommodationData;
  const { data: rooms } = roomData;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(accommodation.address)
      .then(() => alert('주소가 클립보드에 복사되었습니다!'))
      .catch(() => alert('주소 복사에 실패했습니다.'));
  };

  return (
    <Container>
      <TextContainer>
        <h3>모텔</h3>
        <h2>서울의 방</h2>
        <br />
        <div>소개 글 내용</div>
        <h1>Data fetched using SWR</h1>
        <pre>{JSON.stringify(accommodationData, null, 2)}</pre>
        <h1>Data fetched using SWR</h1>
        <pre>{JSON.stringify(roomData, null, 2)}</pre>

        <div>
          <h3>{accommodation.category}</h3>
          <h2>{accommodation.title}</h2>
          <div>
            <StarImage src={Star} /> {accommodation.rating}
          </div>
          <div>전화번호: {accommodation.tel}</div>
        </div>
      </TextContainer>

      <ImageContainer>
        <StyledImage image={accommodation.image} />
        <MapContainer>
          <KakaoMapRender
            latitude={accommodation.latitude}
            longitude={accommodation.longitude}
            mapLevel={accommodation.mlevel}
          />
          <AddressContainer>
            {accommodation.address}
            <CopyButton onClick={handleCopyAddress}>복사</CopyButton>
          </AddressContainer>
        </MapContainer>
      </ImageContainer>

      {rooms.map((room) => (
        <SelectRoom
          key={room.roomId}
          title={room.roomTitle}
          MaxCount={room.roomMaxCount}
          fee={room.roomOffseasonMinfee1}
          accommodationId={accommodation.id}
          roomId={room.roomId}
          images={[
            room.roomImg1,
            room.roomImg2,
            room.roomImg3,
            room.roomImg4,
            room.roomImg5,
          ]}
          icons={{
            bath: room.roomBath,
            hometheater: room.roomHometheater,
            aircondition: room.roomAircondition,
            tv: room.roomTv,
            pc: room.roomPc,
            cable: room.roomCable,
            internet: room.roomInternet,
            refrigerator: room.roomRefrigerator,
            toiletries: room.roomToiletries,
            sofa: room.roomSofa,
            cook: room.roomCook,
            table: room.roomTable,
            hairdryer: room.roomHairdryer,
          }}
        />
      ))}
    </Container>
  );
};

export default page;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1920px;
`;

const StarImage = styled(Image)`
  width: 20px;
  height: 20px;
`;

const StyledImage = styled.div<{ image: string }>`
  width: 1000px;
  height: 700px;
  padding: 20px 20px 20px 0;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

const ImageContainer = styled.div`
  display: flex;
  padding: 0 20px 0 0;
`;

const MapContainer = styled.div`
  width: 680px;
  height: 700px;
  padding: 0 0 45px 20px;
  font-size: 25px;
  font-weight: 600;
  line-height: 55px;
`;

const AddressContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CopyButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

const TextContainer = styled.div`
  width: 1680px;
`;
