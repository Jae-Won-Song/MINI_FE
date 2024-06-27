'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Inputs from '../../../components/Inputs';
import Buttons from '../../../components/Buttons';
import dayjs from 'dayjs';
import RegisterBackground from '../../../../public/images/register_background.jpg';
import Image from 'next/image';

// 	"email": "abc@gmail.com",
// 	"password": "password",
// 	"name": "최병준",
// 	"phoneNumber": "010-1234-5678"
// }

// {
// 	"status": 201,
// 	"message": "Created",
// 	"data": [
// 		{
// 			"id": 1,
// 			"email": "abc@gmail.com",
// 			"name": "최병준",
// 			"phoneNumber": "010-1234-5678"
// 		}
// 	]
// }


const RegisterPage: React.FC = function RegisterPage() {
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

  const validateBirthdate = (birthdate: string) => {
    if (birthdate.length !== 8) {
      return '생년월일 8자리를 모두 적어주세요.';
    }
    const birthDateObj = dayjs(birthdate, 'YYYYMMDD');
    const today = dayjs();
    const age = today.diff(birthDateObj, 'year');

    if (age < 14) {
      return '14세 미만은 가입할 수 없습니다.';
    }
    return '';
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
  const [birthdateError, setBirthdateError] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);

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

  const handleBirthdateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBirthdate = event.target.value;
    setBirthdate(newBirthdate);
    const error = validateBirthdate(newBirthdate);
    setBirthdateError(error);
  };

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermsChecked(event.target.checked);
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
      !birthdate ||
      !termsChecked
    ) {
      alert('모든 필수 입력란을 채워주세요.');
    } else if (password !== confirmPassword) {
      alert('비밀번호와 비밀번호 확인 내용이 일치하지 않습니다.');
    } else if (birthdateError) {
      alert(birthdateError);
    } else {
      alert('회원가입 완료!');
    }
  };

  return (
    <RegisterPageWrapper>
      <StyledImage 
        src={RegisterBackground}
        alt='회원가입 페이지 배경'
      />
      <FormContainer>
        <BigTitle>회원가입</BigTitle>
        <Section>
          <SmallTitle>
            기본 정보
            <SmallTitleSpan>(필수)</SmallTitleSpan>
          </SmallTitle>
          <Inputs
            label="이름"
            type="name"
            placeholder="이름"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Inputs
            label="아이디"
            type="username"
            placeholder="아이디"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Inputs
            label="이메일"
            type="email"
            placeholder="이메일"
            value={email}
            onChange={handleEmailChange}
            errorMessage={emailError}
            isValid={emailError === ''}
            required
          />
          <Inputs
            label="비밀번호"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
            errorMessage={passwordError}
            isValid={passwordError === '아주 좋은 비밀번호입니다!'}
            required
          />
          <Inputs
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            errorMessage={confirmPasswordError}
            isValid={confirmPasswordError === '입력한 비밀번호와 일치합니다!'}
            required
          />
        </Section>
        <Section>
          <SmallTitle>
            생년월일
            <SmallTitleSpan>(필수)</SmallTitleSpan>
          </SmallTitle>
          <Inputs
            label="생년월일(만 14세 미만은 가입할 수 없습니다.)"
            type="text"
            placeholder="생년월일 8자리를 입력해 주세요."
            value={birthdate}
            onChange={handleBirthdateChange}
            onKeyDown={handleKeyDown}
            errorMessage={birthdateError}
            isValid={birthdateError === ''}
            required
          />
        </Section>
        <Section>
          <SmallTitle>
            이용 약관
            <SmallTitleSpan>(필수)</SmallTitleSpan>
          </SmallTitle>
          <Label>
            <input
              type="checkbox" 
              checked={termsChecked}
              onChange={handleTermsChange}
              required
            />
            <span>[필수]</span> 이용 약관 및 개인정보 수집 관련 동의
          </Label>
          <Label>
            <input type="checkbox" />
            <span>[선택]</span> 마케팅 정보 수신 동의
          </Label>
        </Section>
        <Buttons label="등록" onclick={handleSubmit} />
        <LoginLink>
          이미 회원가입을 하셨나요? <Link href="/auth/login">로그인</Link>
        </LoginLink>
      </FormContainer>
    </RegisterPageWrapper>
  );
};

export default RegisterPage;

const RegisterPageWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(3px) opacity(0.6);
  position: fixed;
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
  left: 50%;
  transform: translateX(-50%);
  margin: 70px 0;
`;

const BigTitle = styled.div`
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 20px;
`;

const SmallTitle = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: 700;
`;

const SmallTitleSpan = styled.span`
  color: #767676;
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
