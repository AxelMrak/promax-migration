import { createContext, useContext } from "react";

interface SelectContextType {
  value: string | undefined;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const SelectContext = createContext<SelectContextType | null>(null);

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("useSelectContext must be used within a Select provider");
  }
  return context;
};
