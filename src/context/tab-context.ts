import {createContext, useContext} from "react";

interface TabContextProps {
  activeTabIndex: number;
  setActiveTab: (activeTabIndex: number) => void;
}

export const TabContext = createContext<TabContextProps>(null!);

export const useTabContext = () => {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error("useTabContext must be used within an TabContext");
  }

  return context
}