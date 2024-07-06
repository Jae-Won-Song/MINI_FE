// src/context/DataContext.tsx

'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface DataContextProps {
  stringState: string;
  setStringState: React.Dispatch<React.SetStateAction<string>>;
  numberState: number;
  setNumberState: React.Dispatch<React.SetStateAction<number>>;
  objectState: Record<string, unknown>;
  setObjectState: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const [stringState, setStringState] = useState('initial string');
  const [numberState, setNumberState] = useState(0);
  const [objectState, setObjectState] = useState({ key: 'value' });

  return (
    <DataContext.Provider
      value={{
        stringState,
        setStringState,
        numberState,
        setNumberState,
        objectState,
        setObjectState,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataContextProvider');
  }
  return context;
};
