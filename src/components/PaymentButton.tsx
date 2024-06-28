'use client'

import React, { useState } from 'react';
import styled from 'styled-components';

const PaymentButton = ({
  font,
  fontSize,
  fontColor,
  fontWeight,
  text,
  isActive,
  onClick,
}) => {
  return (
    <Container>
      <Button
        font={font}
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontColor={fontColor}
        isActive={isActive}
        onClick={onClick}
      >
        {text}
      </Button>
    </Container>
  );
}

export default function PaymentButtons() {
  const [activeIndex, setActiveIndex] = useState(null);

  const buttons = [
    { text: '카카오pay', font: 'Arial', fontSize: '14px', fontColor: '#000', fontWeight: 'bold' },
    { text: '토스페이', font: 'Arial', fontSize: '14px', fontColor: '#000', fontWeight: 'bold' },
    { text: '신용/체크 카드', font: 'Arial', fontSize: '14px', fontColor: '#000', fontWeight: 'bold' },
    { text: 'KB Pay', font: 'Arial', fontSize: '14px', fontColor: '#000', fontWeight: 'bold' },
    { text: 'N Pay', font: 'Arial', fontSize: '14px', fontColor: '#000', fontWeight: 'bold' },
    { text: 'PAYCO', font: 'Arial', fontSize: '14px', fontColor: '#000', fontWeight: 'bold' },
    { text: '법인 카드', font: 'Arial', fontSize: '14px', fontColor: '#000', fontWeight: 'bold' },
    { text: '휴대폰 결제', font: 'Arial', fontSize: '14px', fontColor: '#000', fontWeight: 'bold' },
  ];

  return (
    <Container>
      {buttons.map((button, text) => (
        <PaymentButton
          key={text}
          {...button}
          isActive={activeIndex === text}
          onClick={() => setActiveIndex(text)}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Button = styled.button.attrs((props) => ({
  style: {
    backgroundColor: props.isActive ? '#f2f8ff' : '#fff',
    borderColor: props.isActive ? '#b7d5f6' : '#d9d9d9',
  },
}))`
  width: 165px;
  height: 50px;
  margin: 20px 0;
  border: 1px solid;
  padding: 10px;
  border-radius: 5px;
  font-family: ${(props) => props.font};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.fontColor};
  cursor: pointer;
`;
