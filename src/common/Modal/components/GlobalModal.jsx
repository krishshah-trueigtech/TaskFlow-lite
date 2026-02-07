import Modal from "./Modal";
import { useModal } from "../context/ModalContext";
import MODAL_COMPONENTS from "../index";

const GlobalModal = () => {
  const { type, props, closeModal, openModal } = useModal();

  if (!type) return null;

  const Component = MODAL_COMPONENTS[type];

  if (!Component) {
    console.error(`No modal component found for type: ${type}`);
    return null;
  }

  const handleSwitchMode = () => {
    const nextMode = type === "login" ? "signup" : "login";
    openModal(nextMode);
  };

  const getTitle = () => {
    if (type === "login") return "Login";
    if (type === "signup") return "Create Account";
    if (type === "userDetails") return "User Details";
    if (type === "taskForm")
      return props.editingTask ? "Edit Task" : "Create New Task";
    return "";
  };

  return (
    <Modal isOpen={true} onClose={closeModal} title={getTitle()}>
      <Component
        {...props}
        mode={type === "login" || type === "signup" ? type : undefined}
        onClose={closeModal}
        onSwitchMode={handleSwitchMode}
      />
    </Modal>
  );
};

export default GlobalModal;
