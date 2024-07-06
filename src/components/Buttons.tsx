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

<<<<<<< HEAD
const Buttons: React.FC<ButtonProps> = ({
=======
// fullWidth는 기본적으로 양옆을 가득 채웁니다. 
// 사용하시는 페이지 또는 컴포넌트에서 fullWidth={false}로 설정하면 128px로 자동 조정됩니다.
// 예시: <Buttons label="등록" onClick={handleSubmit} fullWidth={false}/>

const Buttons: React.FC<ButtonProps> = function Buttons({
>>>>>>> 410063f (feat: MainSearch에 People Counter 추가)
  label,
  onClick,
  disabled,
  fullWidth = true,
  fullHeight = true,
  buttonColor = 'default',
<<<<<<< HEAD
}) => (
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

const getBackgroundColor = (buttonColor: 'default' | 'black' | 'gray') => {
  if (buttonColor === 'black') {
    return '#111111';
  }
  if (buttonColor === 'gray') {
    return '#D3D3D3';
  }'use client';

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

const Buttons: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  fullWidth = true,
  fullHeight = true,
  buttonColor = 'default',
}) => (
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

const getBackgroundColor = (buttonColor: 'default' | 'black' | 'gray') => {
  if (buttonColor === 'black') {
    return '#111111';
  }
  if (buttonColor === 'gray') {
    return '#D3D3D3';
  }
  return '#f85b2b';
};

const getColor = (buttonColor: 'default' | 'black' | 'gray') => {
  if (buttonColor === 'black') {
    return '#ffffff';
  }
  if (buttonColor === 'gray') {
    return '#111111';
  }
  return '#ffffff';
};

const StyledButton = styled.button<{
  fullWidth: boolean;
  fullHeight: boolean;
  buttonColor: 'default' | 'black' | 'gray';
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 10px;
  width: ${({ fullWidth }) => (fullWidth ? 'auto' : '128px')};
  height: ${({ fullHeight }) => (fullHeight ? '56px' : '40px')};
  background: ${({ buttonColor }) => getBackgroundColor(buttonColor)};
  color: ${({ buttonColor }) => getColor(buttonColor)};
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
  return '#f85b2b';
};

const getColor = (buttonColor: 'default' | 'black' | 'gray') => {
  if (buttonColor === 'black') {
    return '#ffffff';
  }
  if (buttonColor === 'gray') {
    return '#111111';
  }
  return '#ffffff';
};

const StyledButton = styled.button<{
  fullWidth: boolean;
  fullHeight: boolean;
  buttonColor: 'default' | 'black' | 'gray';
}>`
=======
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

const StyledButton = styled.button<{ fullWidth: boolean, fullHeight: boolean, buttonColor: 'default' | 'black' | 'gray' }>`
  /* 기본버튼 */
>>>>>>> 410063f (feat: MainSearch에 People Counter 추가)
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 10px;
  width: ${({ fullWidth }) => (fullWidth ? 'auto' : '128px')};
  height: ${({ fullHeight }) => (fullHeight ? '56px' : '40px')};
<<<<<<< HEAD
  background: ${({ buttonColor }) => getBackgroundColor(buttonColor)};
  color: ${({ buttonColor }) => getColor(buttonColor)};
=======
  background: ${({ buttonColor }) =>
    buttonColor === 'black' ? '#111111' :
    buttonColor === 'gray' ? '#D3D3D3' :
    '#f85b2b'};
  color: ${({ buttonColor }) =>
    buttonColor === 'black' ? '#ffffff' :
    buttonColor === 'gray' ? '#111111' :
    '#ffffff'};
>>>>>>> 410063f (feat: MainSearch에 People Counter 추가)
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