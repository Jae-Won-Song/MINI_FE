'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import SlideButtons from './SlideButtons';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <SlideButtonsWrapper>
          <SlideButtons arrowDirection="left" active={false} size='smallCircle'/>
        </SlideButtonsWrapper>
        <ModalImage src={src} alt="임시 이미지" />
        <CloseButton onClick={onClose}>X</CloseButton>
        <SlideButtonsWrapper>
          <SlideButtons arrowDirection="right" active={true} size='smallCircle'/>
        </SlideButtonsWrapper>
      </ModalContainer>
    </Overlay>
  );
};

export default ImageModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const SlideButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

const ModalImage = styled(Image)`
  width: 100%;
  height: auto;
  border-radius: 10px;
  max-width: 90vw;
  max-height: 80vh;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border: none;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 20px;
  font-weight: bold;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
