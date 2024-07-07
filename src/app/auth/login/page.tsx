'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import { useAuth } from 'src/contexts/AuthContext';
import Inputs from '@/components/Inputs';
import Buttons from '@/components/Buttons';
import LoginBackground from '../../../../public/images/login_background.jpg';

// 로그인, 회원가입 페이지에 진입했을 때는 NavBar의 로그인, 회원 가입 링크가 보이지 않게 만들기

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!data.email || !data.password) {
      alert('모든 필수 입력란을 채워주세요.');
      return;
    }
    login(data as { email: string; password: string });
  };

  return (
    <LoginPageWrapper>
      <StyledImage src={LoginBackground} alt="로그인 페이지 배경" />
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <BigTitle>로그인</BigTitle>
        <Section>
          <Inputs
            id="email"
            label="이메일"
            placeholder="이메일"
            fullWidth
            required
            register={register}
          />
          <Inputs
            id="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호"
            fullWidth
            required
            register={register}
          />
        </Section>
        <Buttons label="로그인" />
        <RegisterLink>
          아직 아이디가 없다면?{' '}
          <Link
            href="/auth/register"
            style={{ fontWeight: 700, borderBottom: '1px solid #111111' }}
          >
            회원가입
          </Link>
        </RegisterLink>
      </FormContainer>
    </LoginPageWrapper>
  );
};

export default LoginPage;

const LoginPageWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(3px) opacity(0.5);
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 500px;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const BigTitle = styled.div`
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 20px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`;

const RegisterLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;