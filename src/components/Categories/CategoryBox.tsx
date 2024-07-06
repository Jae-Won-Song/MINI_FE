import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  onClick: () => void;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  onClick,
  selected = false,
}) => {
  return (
    <StyledCategoryBox onClick={onClick} selected={selected}>
      <Icon size={26} />
      <div>{label}</div>
    </StyledCategoryBox>
  );
};

const StyledCategoryBox = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 110px;
  gap: 0.5rem;
  padding: 0.75rem;
  border-bottom: 2px solid;
  transition: all 0.3s ease;
  cursor: pointer;
  border-color: ${(props) => (props.selected ? '#F85B2B' : 'transparent')};
  color: ${(props) =>
    props.selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)'};

  &:hover {
    color: rgba(0, 0, 0, 0.8);
  }

  &:first-child {
    background-color: ${(props) => (props.selected ? '#F85B2B' : '#111111')};
    color: #ffffff;
  }
`;

export default CategoryBox;
