'use client';

import React from 'react';
import styled from 'styled-components';

interface SlideButtonsProps {
  arrowDirection: 'left' | 'right';
  size?:
    | 'rectangle'
    | 'round'
    | 'square'
    | 'circle'
    | 'smallSquare'
    | 'smallCircle';
  onClick?: () => void;
  // eslint-disable-next-line react/no-unused-prop-types
  disabled?: boolean;
  active?: boolean;
}

const ArrowLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M15 6l-6 6 6 6V6z" />
  </svg>
);

const ArrowRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M9 18l6-6-6-6v12z" />
  </svg>
);

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
      return { width: '56px', height: '80px' }; // default size
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

const SlideButtons: React.FC<SlideButtonsProps> = ({
  arrowDirection,
  onClick,
  active,
  size,
}: SlideButtonsProps) => (
  <CreateBtn active={active} size={size} arrowDirection={arrowDirection}>
    {arrowDirection === 'left' ? <ArrowLeft /> : <ArrowRight />}
  </CreateBtn>
);

export default SlideButtons;

const CreateBtn = styled.button<SlideButtonsProps>`
  width: ${(props) => getDimensions(props.size || 'rectangle').width};
  height: ${(props) => getDimensions(props.size || 'rectangle').height};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.disabled ? '#e0e0e0' : props.active ? '#555555' : '#cccccc'};
  border: none;
  border-radius: ${(props) =>
    getBorderRadius(props.size || 'rectangle', props.arrowDirection)};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${(props) =>
      props.disabled ? '#e0e0e0' : props.active ? '#333333' : '#aaaaaa'};
  }

  svg {
    fill: ${(props) => (props.disabled ? '#9e9e9e' : 'white')};
  }
`;
