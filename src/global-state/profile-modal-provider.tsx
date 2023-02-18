import React, { useState } from "react";
import { useContext } from "react";
import { providerProps } from "../types/interfaces";

export const ModalProfileContext = React.createContext(false);
export const ModalProfileContextUpdate = React.createContext(() => {});

export function useModalProfile() {
  return useContext(ModalProfileContext);
}

export function useModalProfileUpdate() {
  return useContext(ModalProfileContextUpdate);
}

export default function ModalProfileProvider({ children }: providerProps) {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModalProfile() {
    setIsOpen((current) => !current);
  }

  return (
    <ModalProfileContext.Provider value={isOpen}>
      <ModalProfileContextUpdate.Provider value={toggleModalProfile}>
        {children}
      </ModalProfileContextUpdate.Provider>
    </ModalProfileContext.Provider>
  );
}
