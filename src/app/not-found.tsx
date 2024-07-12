'use client';

import Link from 'next/link';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <Container>
      <Title>페이지를 찾을 수 없습니다</Title>
      <Message>
        <span>404</span> Page Not Found
      </Message>
      <StyledLink href="/">메인 페이지로 돌아가기</StyledLink>
    </Container>
  );
};

export default NotFound;

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
`;

const Message = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-weight: 700;
  span {
    font-size: 1.8rem;
    font-family: 'Cafe24Moyamoya-Face-v1.0';
    color: #f85b2b;
    margin-right: 0.5rem;
  }
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
