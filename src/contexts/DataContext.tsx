'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

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
  const [stringState, setStringState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('stringState');
      return saved !== null ? saved : 'initial string';
    }
    return 'initial string';
  });

  const [numberState, setNumberState] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('numberState');
      return saved !== null ? Number(saved) : 0;
    }
    return 0;
  });

  const [objectState, setObjectState] = useState<Record<string, unknown>>(
    () => {
      if (typeof window !== 'undefined') {
        const saved = sessionStorage.getItem('objectState');
        return saved !== null ? JSON.parse(saved) : { key: 'value' };
      }
      return { key: 'value' };
    },
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedStringState = sessionStorage.getItem('stringState');
      if (savedStringState !== null) setStringState(savedStringState);

      const savedNumberState = sessionStorage.getItem('numberState');
      if (savedNumberState !== null) setNumberState(Number(savedNumberState));

      const savedObjectState = sessionStorage.getItem('objectState');
      if (savedObjectState !== null)
        setObjectState(JSON.parse(savedObjectState));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('stringState', stringState);
    }
  }, [stringState]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('numberState', numberState.toString());
    }
  }, [numberState]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('objectState', JSON.stringify(objectState));
    }
  }, [objectState]);

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
