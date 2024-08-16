// PaginationContext.js
import React, { createContext, useState } from 'react';

const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
  const [currentItem, setCurrentItem] = useState(1);
  const [showPerPage, setShowPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState(50); 

  const totalPages = Math.ceil(totalResults / showPerPage);

  return (
    <PaginationContext.Provider value={{ currentItem, setCurrentItem, showPerPage, setShowPerPage, totalResults, setTotalResults, totalPages }}>
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginationContext;
