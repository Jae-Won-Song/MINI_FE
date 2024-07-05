'use client';

import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
  buttonColor?: 'default' | 'black' | 'gray';
}

// fullWidth는 기본적으로 양옆을 가득 채웁니다.
// 사용하시는 페이지 또는 컴포넌트에서 fullWidth={false}로 설정하면 128px로 자동 조정됩니다.
// 예시: <Buttons label="등록" onClick={handleSubmit} fullWidth={false}/>

const Buttons: React.FC<ButtonProps> = function Buttons({
  label,
  onClick,
  disabled,
  fullWidth = true,
  fullHeight = true,
  buttonColor = 'default',
}) {
  return (
    <StyledButton
      type="submit"
      disabled={disabled}
      onClick={onClick}
      fullWidth={fullWidth}
      fullHeight={fullHeight}
      buttonColor={buttonColor}
    >
      {label}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  fullWidth: boolean;
  fullHeight: boolean;
  buttonColor: 'default' | 'black' | 'gray';
}>`
  /* 기본버튼 */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 10px;
  width: ${({ fullWidth }) => (fullWidth ? 'auto' : '128px')};
  height: ${({ fullHeight }) => (fullHeight ? '56px' : '40px')};
  background: ${({ buttonColor }) =>
    buttonColor === 'black'
      ? '#111111'
      : buttonColor === 'gray'
        ? '#D3D3D3'
        : '#f85b2b'};
  color: ${({ buttonColor }) =>
    buttonColor === 'black'
      ? '#ffffff'
      : buttonColor === 'gray'
        ? '#111111'
        : '#ffffff'};
  border-radius: 6px;
  border: none;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  @media only screen and (max-width: 1440px) {
    height: 50px;
  }
  @media only screen and (max-width: 1080px) {
    height: 45px;
  }
`;

export default Buttons;
