import React from "react";

interface DropdownContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownContext = React.createContext<DropdownContextType | null>(null);

export const useDropdown = () => {
  const context = React.useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdown must be used within a DropdownMenu provider");
  }
  return context;
};

export { DropdownContext };
