import React, { createContext, useState, useContext } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard'); // Default tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const changeTab = (tab) => {
    setActiveTab(tab);
  };
  return (
    <SidebarContext.Provider value={{ activeTab, setActiveTab,handleTabChange }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
