'use client';

import Link from 'next/link';
import styled from 'styled-components';

export default function NotFound() {
  return (
    <Container>
      <Title>
        <span>404</span> Page Not Found
      </Title>
      <Message>페이지를 찾을 수 없습니다.</Message>
      <StyledLink href="/">메인 페이지로 돌아가기</StyledLink>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 63vh;
  text-align: center;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  span {
    font-size: 2.3rem;
    font-family: 'Cafe24Moyamoya-Face-v1.0';
    color: #f85b2b;
    margin-right: 1rem;
  }
`;

const Message = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const StyledLink = styled(Link)`
  width: fit-content;
  font-size: 1rem;
  font-weight: 700;
  border-bottom: 1px solid;
  transition: 0.2s;

  &:hover {
    color: #f85b2b;
    border-bottom-color: #111111;
  }
`;
