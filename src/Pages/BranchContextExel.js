import React, { createContext, useState } from 'react';

// Create the context
export const BranchContextExel = createContext();

// Create the provider component
export const BranchProviderExel = ({ children }) => {
  const [branch_id, setBranchId] = useState(null); // State to hold the branch_id
  const [serviceId, setServiceId] = useState()
  return (
    <BranchContextExel.Provider value={{ branch_id, setBranchId,setServiceId,serviceId }}>
      {children}
    </BranchContextExel.Provider>
  );
};
