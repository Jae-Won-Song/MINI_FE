'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
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

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = data => {
    // const { data, error } = useSWR<APIResponse>(`https://yusuengdo.ddns.net/open-api/user/login`, fetcher);
    console.log('Login Data', data);
  };


  return (
    <LoginPageWrapper>
      <StyledImage 
        src={LoginBackground}
        alt='로그인 페이지 배경'
      />
      <FormContainer  onSubmit={handleSubmit(onSubmit)}>      
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
        {/* <Section>
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
        </Section> */}
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