import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import MainSearchDate from './Banner/MainSearchDate';
import MainSearchRegion from './Banner/MainSearchRegion';
import MainSearchPeople from './Banner/MainSearchPeople';
import '../styles/constants/_colors.scss';

interface DateRegionDropdownProps {
  onClose: () => void;
}

const DateRegionDropdown: React.FC<DateRegionDropdownProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    setIsOpen(!isOpen);
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsAnimating(true);
        setIsOpen(false);
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside, isOpen]);

  return (
    <>
      {isOpen && <Overlay isOpen={isOpen} />}
      <DropdownWrapper ref={dropdownRef}>
        <DropdownButton onClick={handleToggle}>
          여행지를 선택하세요
        </DropdownButton>
        {(isOpen || isAnimating) && (
          <DropdownContentWrapper
            isOpen={isOpen}
            onAnimationEnd={() => setIsAnimating(false)}
          >
            <DropdownContent>
              <MainSearchRegion />
              <MainSearchDate />
              <MainSearchPeople />
            </DropdownContent>
          </DropdownContentWrapper>
        )}
      </DropdownWrapper>
    </>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const DropdownButton = styled.button`
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 10px 20px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 4px;
  font-size: 16px;
`;

const DropdownContentWrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  background-color: #ffffff;
  z-index: 11;
  animation: ${({ isOpen }) =>
    isOpen
      ? css`
          ${fadeIn} 0.3s ease-out
        `
      : css`
          ${fadeOut} 0.3s ease-out
        `};
`;

const DropdownContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;
  animation: ${fadeIn} 0.3s ease-out;
`;

export default DateRegionDropdown;
