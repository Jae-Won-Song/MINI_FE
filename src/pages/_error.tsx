// pages/_error.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import styled from 'styled-components';

interface ErrorPageProps {
  statusCode: number;
}

const Container = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  background-color: #0070f3;
  color: white;
  border-radius: 5px;
  &:hover {
    background-color: #005bb5;
  }
`;

const ErrorPage = ({ statusCode }: ErrorPageProps) => {
  const router = useRouter();

  useEffect(() => {
    // Store the previous URL in sessionStorage
    const previousUrl = document.referrer;
    sessionStorage.setItem('previousUrl', previousUrl);
  }, []);

  const goBack = () => {
    // Retrieve the previous URL from sessionStorage
    const previousUrl = sessionStorage.getItem('previousUrl');
    if (previousUrl) {
      router.push(previousUrl);
    } else {
      router.push('/'); // If there's no previous URL, go to the home page
    }
  };

  return (
    <Container>
      <Title>{statusCode ? `An error ${statusCode} occurred on server` : '404 - This page could not be found.'}</Title>
      <p>
        <Button onClick={goBack}>
          Go Back
        </Button>
      </p>
    </Container>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
