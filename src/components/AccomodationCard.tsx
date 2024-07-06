import React from 'react';
import styled from 'styled-components';

interface Hotel {
  name: string;
  address: string;
  rooms: number;
  contract: string;
  latitude: number;
  longtitude: number;
  photo: string;
}

interface AccomodationCardProps {
  data: Hotel;
}

const AccomodationCard: React.FC<AccomodationCardProps> = ({ data }) => {
  return (
    <Card>
      <ImageContainer>
        <img src={data.photo} alt={data.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </ImageContainer>
      <TextContainer>
        <h3>{data.name}</h3>
        <p>{data.address}</p>
        <p>남은 방 수: {data.rooms}</p>
        <p>연락처: {data.contract}</p>
      </TextContainer>
    </Card>
  );
};

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;

  h3 {
    margin: 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0.5rem 0 0;
  }
`;

const ImageContainer = styled.div`  
  width: 100%;
  height: 200px;
  overflow: hidden;
`;
const TextContainer = styled.div`  
  width: 100%;  
  padding: 16px;
  overflow: hidden;
`;

export default AccomodationCard;
