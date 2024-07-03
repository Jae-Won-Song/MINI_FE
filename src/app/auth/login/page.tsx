'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Inputs from '@/components/Inputs';
import Buttons from '@/components/Buttons';
import Image from 'next/image';
import LoginBackground from '../../../../public/images/login_background.jpg';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginPage: React.FC = function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    console.log('Form submitted with data:', data);  // Debug log
    // if (
    //   // !name ||
    //   // !email
    // ){
    //   alert('모든 필수 입력란을 채워주세요.');
    // } else if
    
    try {
      const response = await axios.post('http://yusuengdo.ddns.net/open-api/user/login', data);
      console.log('response', response);
      if (response.status === 200 && response.data) {
        const { accessToken, refreshToken } = response.data.data;
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);        
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        alert('로그인 성공! 메인 페이지로 이동합니다.')
        router.push(`/`);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <LoginPageWrapper>
      <StyledImage 
        src={LoginBackground}
        alt='로그인 페이지 배경'
      />
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <BigTitle>로그인</BigTitle>
        <Section>
          <Inputs
            id='email'
            label="이메일"
            placeholder="이메일"
            fullWidth
            required
            register={register}
          />
          <Inputs
            id="password"
            label="비밀번호"
            type='password'
            placeholder="비밀번호"
            fullWidth
            required
            register={register}
          />
        </Section>
        <Buttons label="로그인" />
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
`;
