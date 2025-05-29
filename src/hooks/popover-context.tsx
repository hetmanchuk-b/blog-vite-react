import {createContext, useContext} from "react";

interface PopoverContextProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const PopoverContext = createContext<PopoverContextProps>(null!);

export const usePopoverContext = () => {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error("usePopoverContext must be used within an PopoverContext");
  }

  return context
};