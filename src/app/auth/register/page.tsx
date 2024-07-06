'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import Image from 'next/image';
import { useAuth } from 'src/contexts/AuthContext';
import Inputs from '../../../components/Inputs';
import Buttons from '../../../components/Buttons';

const RegisterPage: React.FC = () => {
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('data', data);
    if (
      !name ||
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
          fullWidth
          required
        />
        <Inputs
          label="아이디"
          type="username"
          placeholder="아이디"
          fullWidth
          required
        />
        <Inputs
          label="이메일"
          type="email"
          placeholder="이메일"
          value={email}
          onChange={handleEmailChange}
          fullWidth
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
          fullWidth
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
          fullWidth
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
          label="생년월일"
          type="text"
          placeholder="생년월일 8자리를 입력해 주세요."
          onKeyDown={handleKeyDown}
          fullWidth
          required
        />
      </Section>
      <Section>
        <SmallTitle>
          성별
          <SmallTitleSpan>(선택)</SmallTitleSpan>
        </SmallTitle>
        <CheckboxLabel>
          <div>
            <input type="radio" name="gender" value="female" /> 여성
          </div>
          <div>
            <input type="radio" name="gender" value="male" /> 남성
          </div>
          <div>
            <input type="radio" name="gender" value="other" /> 애매함
          </div>
        </CheckboxLabel>
      </Section>
      <Section>
        <SmallTitle>
          이용 약관
          <SmallTitleSpan>(필수)</SmallTitleSpan>
        </SmallTitle>
        <Label>
          <input type="checkbox" />
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
  );
};

export default RegisterPage;

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

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  gap: 20px;
  margin: 0 auto;
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

const CheckboxLabel = styled.label`
  display: flex;
  gap: 30px;
`;

const LoginLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
