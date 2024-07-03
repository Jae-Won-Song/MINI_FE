import React from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

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
  const router = useRouter();

  return (
    <Card onClick={() => router.push(`/placedetail=${data.id}`)}>
      <ImageContainer>
        <img src={data.thumbnail} alt={data.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </ImageContainer>
      <TextContainer>
        <h3>{data.title}</h3>
        <p>{data.address}</p>
        <p>{data.price}원 / 1박</p>
      </TextContainer>
    </Card>
  );
};

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;  /* 마우스 커서를 포인터로 변경 */
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

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
`;

export default AccomodationCard;
