import { createContext, useContext, useState, useCallback } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalConfig, setModalConfig] = useState({
    type: null,
    props: {},
  });

  const openModal = useCallback((type, props = {}) => {
    setModalConfig({ type, props });
  }, []);

  const closeModal = useCallback(() => {
    setModalConfig({ type: null, props: {} });
  }, []);

  return (
    <ModalContext.Provider value={{ ...modalConfig, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
