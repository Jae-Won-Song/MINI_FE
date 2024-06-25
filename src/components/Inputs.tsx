'use client';

import React from 'react';
import styled from 'styled-components';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  fullWidth?: boolean;
  errorMessage?: string;
  isValid?: boolean;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  register: UseFormRegister<FieldValues>;
}

const Inputs: React.FC<InputProps> = function Inputs({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  fullWidth = true,
  errorMessage,
  onKeyDown,
  isValid = true,
  required = true,
  register,
}) {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <StyledInput
        id={id}
        type={type}
        {...register(id, {required})}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        fullWidth={fullWidth}
        isValid={isValid}
        required={required}
        onKeyDown={onKeyDown}
      />
      {errorMessage && (
        <ErrorMessage isValid={isValid}>{errorMessage}</ErrorMessage>
      )}
    </FormGroup>
  );
};

export default Inputs;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-size: 16px;
`;

const StyledInput = styled.input<{ fullWidth: boolean; isValid: boolean }>`
  box-sizing: border-box;
  padding: 16px;
  height: 56px;
  background: #ffffff;
  border: 1px solid #e5e5ec;
  border-radius: 6px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;

const ErrorMessage = styled.span<{ isValid: boolean }>`
  color: ${({ isValid }) => (isValid ? '#04B014' : '#DC0000')};
  font-size: 0.9em;
`;
