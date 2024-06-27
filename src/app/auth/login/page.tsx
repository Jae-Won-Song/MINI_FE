'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Inputs from '@/components/Inputs';
import Buttons from '@/components/Buttons';
import Image from 'next/image';
import LoginBackground from '../../../../public/images/login_background.jpg';
import useSWR from 'swr';

// /open-api/user/login을 통해 로그인
// {
  // {
  //   "email": "abc@gmail.com",
  //   "password" : "samplepassword"
  // }
  // {
  //   "status": 200,
  //   "message": "OK",
  //   "data": {
  //     "accessToken": "token",
  //     "refreshToken": "token"
  //   }
  // }

const LoginPage: React.FC = function LoginPage() {

  // const { data, error } = useSWR<APIResponse>(`https://yusuengdo.ddns.net/open-api/user/login`, fetcher);
  // console.log('Login Data', data)

  const validateEmail = (email: string) => {
  //  이 부분에는 아이디와 일치하는지 확인하는 내용이 들어가야 함
  };

  const validatePassword = (password: string) => {
    // 이 부분에는 토큰의 비밀번호와 일치하는지 확인하는 내용이 들어가야 함
  };

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    const error = validateEmail(newEmail);
    setEmailError(error);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    const error = validatePassword(newPassword);
    setPasswordError(error);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (
      !fullName ||
      !username ||
      !email ||
      !password
    ) {
      alert('모든 입력란을 채워주세요.');
    } else if (password !== data.password) {
      alert('비밀번호가 일치하지 않습니다.');
    } else {
      alert('로그인 성공!');
    }
  };

  // 로그인 유지, 아이디 저장 여부 선택 시 해당 내용이 유지될 수 있게 해야 함.


  return (
    <LoginPageWrapper>
      <StyledImage 
        src={LoginBackground}
        alt='로그인 페이지 배경'
      />
      <FormContainer>      
        <BigTitle>로그인</BigTitle>
        <Section>
          <Inputs
            label="아이디"
            type="username"
            placeholder="아이디"
            fullWidth
            required
          />
          <Inputs
            label="비밀번호"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            errorMessage={passwordError}
            isValid={passwordError === '아주 좋은 비밀번호입니다!'}
            required
          />
        </Section>
        <Section>
          <CheckboxWrapper>
            <Label>
              <input type="checkbox" />
              아이디 저장
            </Label>
            <Label>
              <input type="checkbox" />
              로그인 유지
            </Label>
          </CheckboxWrapper>
        </Section>
        <Buttons label="로그인" onclick={handleSubmit} />
        <RegisterLink>
          아직 아이디가 없다면? <Link href="/auth/register" style={{fontWeight: 700, borderBottom: '1px solid #111111'}}>회원가입</Link>
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

const FormContainer = styled.div`
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

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RegisterLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 20px;
`