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
