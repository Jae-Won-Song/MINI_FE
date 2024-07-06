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
      <h3>{data.name}</h3>
      <p>{data.address}</p>
      <p>Rooms: {data.rooms}</p>
      <p>Contact: {data.contract}</p>
    </Card>
  );
};

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  text-align: center;

  h3 {
    margin: 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0.5rem 0 0;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
`;

export default AccomodationCard;
