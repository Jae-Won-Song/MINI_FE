'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import SlideButtons from './SlideButtons';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
}

const ImageModal = ({ isOpen, onClose, images }: ImageModalProps) => {
  const [currentImageNum, setCurrentImageNum] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentImageNum(0);
    }
  }, [isOpen]);

  const handleImageClickLeft = () => {
    if (currentImageNum > 0) {
      setCurrentImageNum(currentImageNum - 1);
    }
  };

  const handleImageClickRight = () => {
    if (currentImageNum < images.length - 1) {
      setCurrentImageNum(currentImageNum + 1);
    }
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer ref={modalRef}>
        <SlideButtonsWrapper
          onClick={handleImageClickLeft}
          disabled={currentImageNum === 0}
        >
          <SlideButtons
            arrowDirection="left"
            active={false}
            size="smallCircle"
          />
        </SlideButtonsWrapper>
        <ModalImageWrapper>
          <ModalImage key={currentImageNum} image={images[currentImageNum]} />
        </ModalImageWrapper>
        <CloseButton onClick={onClose}>X</CloseButton>
        <SlideButtonsWrapper
          onClick={handleImageClickRight}
          disabled={currentImageNum === images.length - 1}
        >
          <SlideButtons arrowDirection="right" active size="smallCircle" />
        </SlideButtonsWrapper>
      </ModalContainer>
    </Overlay>
  );
};

export default ImageModal;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

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
  padding: 60px 10px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const SlideButtonsWrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const ModalImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;
  height: 750px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const ModalImage = styled.div<{ image: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border: none;
  color: black;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    color: #f85b2b;
  }
`;
