'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Inputs from '@/components/Inputs';
import Buttons from '@/components/Buttons';
import useSWR from 'swr';

// /open-api/user/login을 통해 로그인
const LoginPage: React.FC = function LoginPage() {

  // const { data, error } = useSWR<APIResponse>(`https://yusuengdo.ddns.net/open-api//open-api/user/login`, fetcher);
  // console.log('Login Data', data)

  const validateEmail = (email: string) => {
    const hasAtSign = /@/.test(email);
    if (!hasAtSign) {
      return '이메일에는 @ 문자가 포함되어야 합니다.';
    }
    return '';
  };

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return '비밀번호는 최소 8자 이상이어야 합니다.';
    }
    if (!hasLowerCase) {
      return '비밀번호에는 영문 소문자가 포함되어야 합니다.';
    }
    if (!hasUpperCase) {
      return '비밀번호에는 영문 대문자가 포함되어야 합니다.';
    }
    if (!hasNumber) {
      return '비밀번호에는 숫자가 포함되어야 합니다.';
    }
    if (!hasSpecialChar) {
      return '비밀번호에는 특수문자가 포함되어야 합니다.';
    }
    return '아주 좋은 비밀번호입니다!';
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string,
  ) => {
    if (confirmPassword === '') {
      setConfirmPasswordError('');
    } else if (password === confirmPassword) {
      setConfirmPasswordError('입력한 비밀번호와 일치합니다!');
    } else {
      setConfirmPasswordError('입력한 비밀번호와 일치하지 않습니다.');
    }
  };

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [birthdate, setBirthdate] = useState('');

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
    validateConfirmPassword(newPassword, confirmPassword);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    validateConfirmPassword(password, newConfirmPassword);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key, ctrlKey } = event;
    const allowedKeys = [
      'Backspace',
      'Tab',
      'Enter',
      'Alt',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Delete',
      'Home',
      'End',
    ];

    if (
      !/^\d$/.test(key) &&
      !allowedKeys.includes(key) &&
      !(ctrlKey && (key === 'a' || key === 'c' || key === 'v'))
    ) {
      event.preventDefault();
    }
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (
      !fullName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !birthdate
    ) {
      alert('모든 필수 입력란을 채워주세요.');
    } else if (password !== confirmPassword) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    } else {
      // Form submission logic here
      alert('폼이 제출되었습니다.');
    }
  };

  return (
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
        <Label>
          <input type="checkbox" />
          아이디 저장
        </Label>
        <Label>
          <input type="checkbox" />
          로그인 유지
        </Label>
      </Section>
      <Buttons label="로그인" onclick={handleSubmit} />
      <LoginLink>
        아직 아이디가 없다면? <Link href="/auth/register">회원가입</Link>
      </LoginLink>
    </FormContainer>
  );
};

export default LoginPage;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  gap: 20px;
  margin: 0 auto;  
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

const LoginLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
