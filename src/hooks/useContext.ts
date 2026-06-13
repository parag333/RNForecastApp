import { createContext, useContext } from 'react';

const DataContext = createContext<string | undefined>(undefined);

function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataContext.Provider');
  }
  return context;
}
