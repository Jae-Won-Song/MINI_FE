import React from 'react';
import styled from 'styled-components';
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from 'react-icons/ti';

interface Accomodation {
  id: number;
  title: string;
  address: string;
  category: string;
  thumbnail: string;
  price: number;
  latitude: number;
  longitude: number;
  likeCount: number;
  rating: number;
}

interface AccomodationCardProps {
  data: Accomodation;
}

const AccomodationCard: React.FC<AccomodationCardProps> = ({ data }) => {
  return (
    <Card>
      <ImageContainer>
        <img
          src={data.thumbnail}
          alt={data.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </ImageContainer>
      <TextContainer>
        <h3>{data.title}</h3>
        <p>{data.address}</p>
        <p>
          <span>{data.price.toLocaleString()}원</span> / 1박
        </p>
        <Rating>
          {RatingStars(data.rating)}
          <span>({data.rating})</span>
        </Rating>
      </TextContainer>
    </Card>
  );
};

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;

  h3 {
    font-size: 1.2rem;
  }

  p {
    margin: 0.4rem 0 0;
    font-size: 0.95rem;
  }
`;

const ImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
`;

const TextContainer = styled.div`
  width: 100%;
  padding: 15px;
  overflow: hidden;
  span {
    font-weight: 700;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  margin-top: 0.5rem;
  font-size: 1.1rem;
  color: #ffaa00;
`;

const Rating = styled.div`
  display: flex;
  align-items: end;
  color: #a7a7a7;
  span {
    margin-left: 0.3rem;
    font-size: 0.9rem;
    font-weight: 400;
  }
`;

export default AccomodationCard;