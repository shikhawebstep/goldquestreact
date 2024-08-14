import React, { createContext, useState } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <SidebarContext.Provider value={{ activeTab, handleTabChange }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
