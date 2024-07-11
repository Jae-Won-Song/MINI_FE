'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import Image from 'next/image';
import { useAuth } from 'src/contexts/AuthContext';
import Inputs from '../../../components/Inputs';
import Buttons from '../../../components/Buttons';
import RegisterBackground from '../../../../public/images/register_background.jpg';

const RegisterPage: React.FC = () => {
  const { register: registerUser } = useAuth();

  const { register, handleSubmit } = useForm<FieldValues>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);

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
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return '비밀번호는 최소 8자 이상이어야 합니다.';
    }
    if (!hasLowerCase) {
      return '비밀번호에는 영문 소문자가 포함되어야 합니다.';
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

  const validatePhoneNumber = (phoneNumber: string) => {
    if (phoneNumber.length !== 13) {
      return '전화번호 13자리를 모두 적어주세요.';
    }
    return '';
  };

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

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const input = event.target.value.replace(/\D/g, '');
    const formattedInput = formatPhoneNumber(input);
    setPhoneNumber(formattedInput);
    const error = validatePhoneNumber(formattedInput);
    setPhoneNumberError(error);
  };

  const formatPhoneNumber = (input: string) => {
    if (input.length <= 3) {
      return input;
    }
    if (input.length <= 7) {
      return `${input.slice(0, 3)}-${input.slice(3)}`;
    }
    if (input.length <= 11) {
      return `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7, 11)}`;
    }
    return `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7, 11)}`;
  };

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermsChecked(event.target.checked);
  };

  const onSubmit: SubmitHandler<FieldValues> = () => {
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !phoneNumber ||
      !termsChecked
    ) {
      alert('모든 필수 입력란을 채워주세요.');
      return;
    }
    if (password !== confirmPassword) {
      alert('비밀번호와 비밀번호 확인 내용이 일치하지 않습니다.');
      return;
    }
    registerUser({
      name,
      email,
      password,
      phoneNumber,
    });
  };

  return (
    <RegisterPageWrapper>
      <StyledImage src={RegisterBackground} alt="회원가입 페이지 배경" />
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <BigTitle>회원가입</BigTitle>
        <Section>
          <SmallTitle>
            기본 정보
            <SmallTitleSpan>(필수)</SmallTitleSpan>
          </SmallTitle>
          <Inputs
            id="name"
            label="이름"
            placeholder="이름"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            register={register}
          />
          <Inputs
            id="email"
            label="이메일"
            placeholder="이메일 입력(@ 포함)"
            value={email}
            onChange={handleEmailChange}
            errorMessage={emailError}
            isValid={emailError === ''}
            required
            register={register}
          />
          <Inputs
            id="password"
            label="비밀번호"
            placeholder="비밀번호 입력(영문 소문자, 숫자, 특수문자 필수, 8자 이상)"
            value={password}
            type="password"
            onChange={handlePasswordChange}
            errorMessage={passwordError}
            isValid={passwordError === '아주 좋은 비밀번호입니다!'}
            required
            register={register}
          />
          <Inputs
            id="confirmPassword"
            label="비밀번호 확인"
            placeholder="비밀번호 한 번 더 입력"
            value={confirmPassword}
            type="password"
            onChange={handleConfirmPasswordChange}
            errorMessage={confirmPasswordError}
            isValid={confirmPasswordError === '입력한 비밀번호와 일치합니다!'}
            required
            register={register}
          />
          <Inputs
            id="phoneNumber"
            label="전화번호"
            placeholder="전화번호 입력(하이픈은 자동 입력됩니다)"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            errorMessage={phoneNumberError}
            isValid={phoneNumberError === ''}
            maxLength={13}
            register={register}
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
        <Buttons label="등록" />
        <LoginLink>
          이미 회원가입을 하셨나요?{' '}
          <Link
            href="/auth/login"
            style={{ fontWeight: 700, borderBottom: '1px solid #111111' }}
          >
            로그인
          </Link>
        </LoginLink>
      </FormContainer>
    </RegisterPageWrapper>
  );
};

export default RegisterPage;

const RegisterPageWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 120vh;
  display: flex;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(3px) opacity(0.6);
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
