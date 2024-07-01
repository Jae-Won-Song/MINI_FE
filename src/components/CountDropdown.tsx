import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import MainSearchRegion from './Banner/MainSearchRegion';

interface DropdownItem {
  label: string;
  value: string;
  component?: React.ReactNode;
}

interface DropdownProps {
  items?: DropdownItem[];
  defaultLabel: string;
  defaultComponent: React.ReactNode;
  onSelect: (item: DropdownItem) => void;
  onClose: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  items = [],
  defaultLabel,
  onSelect,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>({
    label: '인원수',
    value: 'MainSearchRegion',
    component: <MainSearchRegion />,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: DropdownItem) => {
    setSelectedItem(item);
    onSelect(item);
    setIsAnimating(true);
    setIsOpen(false);
    onClose();
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
          {selectedItem ? selectedItem.label : defaultLabel}
        </DropdownButton>
        {(isOpen || isAnimating) && (
          <>
            <DropdownMenu
              isOpen={isOpen}
              onAnimationEnd={() => setIsAnimating(false)}
            >
              {items.map((item) => (
                <DropdownMenuItem
                  key={item.value}
                  onClick={() => handleSelect(item)}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenu>
            {selectedItem && selectedItem.component && (
              <DropdownComponentWrapper isOpen={isOpen}>
                {selectedItem.component}
              </DropdownComponentWrapper>
            )}
          </>
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

const slideDown = keyframes`
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-10px);
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
`;

const DropdownMenu = styled.ul<{ isOpen: boolean }>`
  padding: 0;
  margin: 0;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  z-index: 11;
  animation: ${({ isOpen }) =>
    isOpen
      ? css`
          ${slideDown} 0.3s ease-out
        `
      : css`
          ${slideUp} 0.3s ease-out
        `};
`;

const DropdownMenuItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const DropdownComponentWrapper = styled.div<{ isOpen: boolean }>`
  margin-top: 10px;
  border: 1px solid #cccccc;
  padding: 10px;
  display: block;
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

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;
  animation: ${({ isOpen }) =>
    isOpen
      ? css`
          ${fadeIn} 0.3s ease-out
        `
      : css`
          ${fadeOut} 0.3s ease-out
        `};
`;

export default Dropdown;
