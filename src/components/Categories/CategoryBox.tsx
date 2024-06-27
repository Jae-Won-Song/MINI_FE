import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';
import styled from 'styled-components';

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  path: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ icon: Icon, label, path, selected = false }) => {
  return (
    <StyledLink href={`/?category=${path}`} selected={selected}>
      <Icon size={26} />
      <div>{label}</div>
    </StyledLink>
  );
};

const StyledLink = styled(Link)<{ selected: boolean }>`
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
  color: ${(props) => (props.selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)')};

  &:hover {
    color: rgba(0, 0, 0, 0.8);
  }

  &:first-child {
    background-color: ${(props) => (props.selected ? '#F85B2B' : '#111111')};
    color: #ffffff;
  }
`;

export default CategoryBox;
