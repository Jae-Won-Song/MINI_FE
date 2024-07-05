'use client';

import React from 'react';
import styled from 'styled-components';

interface slideButtonsProps {
  arrowDirection: 'left' | 'right';
  size?:
    | 'rectangle'
    | 'round'
    | 'square'
    | 'circle'
    | 'smallSquare'
    | 'smallCircle';
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
}

const ArrowLeft = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M15 6l-6 6 6 6V6z" />
    </svg>
  );
};

const ArrowRight = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M9 18l6-6-6-6v12z" />
    </svg>
  );
};

const getDimensions = (size: string) => {
  switch (size) {
    case 'rectangle':
      return { width: '56px', height: '80px' };
    case 'round':
      return { width: '56px', height: '80px' };
    case 'square':
      return { width: '72px', height: '72px' };
    case 'circle':
      return { width: '72px', height: '72px' };
    case 'smallSquare':
      return { width: '48px', height: '48px' };
    case 'smallCircle':
      return { width: '48px', height: '48px' };
    default:
      return { width: '56px', height: '80px' };
  }
};

const getBorderRadius = (size: string, arrowDirection: string) => {
  if (size === 'circle' || size === 'smallCircle') {
    return '50%';
  }
  if (size === 'round' && arrowDirection === 'left') {
    return '10px 0 0 10px';
  }
  if (size === 'round' && arrowDirection === 'right') {
    return '0 10px 10px 0';
  }
  return '0';
};

const SlideButtons = ({
  arrowDirection,
  onClick,
  active,
  size = 'rectangle',
}: slideButtonsProps) => {
  return (
    <CreateBtn
      active={active}
      size={size}
      arrowDirection={arrowDirection}
      onClick={onClick}
    >
      {arrowDirection === 'left' ? <ArrowLeft /> : <ArrowRight />}
    </CreateBtn>
  );
};

export default SlideButtons;

const CreateBtn = styled.button<slideButtonsProps>`
  width: ${(props) => getDimensions(props.size || 'rectangle').width};
  height: ${(props) => getDimensions(props.size || 'rectangle').height};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.active ? '#555555' : '#cccccc')};
  border: none;
  border-radius: ${(props) =>
    getBorderRadius(props.size || 'rectangle', props.arrowDirection)};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? '#333333' : '#aaaaaa')};
  }

  svg {
    fill: white;
  }
`;
