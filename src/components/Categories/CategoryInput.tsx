import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
  path: string;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected = false,
  onClick,
  path,
}) => {
  return (
    <CategoryContainer onClick={() => onClick(path)} selected={selected}>
      <Icon size={30} />
      <Label>{label}</Label>
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div<{ selected: boolean }>`
  border-radius: 1rem;
  border: 2px solid;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all 0.3s ease;
  cursor: pointer;
  border-color: ${(props) =>
    props.selected ? 'orange' : 'rgba(0, 0, 0, 0.2)'};

  &:hover {
    border-color: orange;
  }
`;

const Label = styled.div`
  font-weight: 600;
`;

export default CategoryInput;