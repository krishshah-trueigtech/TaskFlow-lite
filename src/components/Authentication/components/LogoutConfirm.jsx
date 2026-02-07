import { useAuth } from "../context/authContext";

const LogoutConfirm = ({ onClose }) => {
  const { logout } = useAuth();

  const handleConfirm = () => {
    logout();
    onClose();
  };

  return (
    <div className="p-6 text-center">
      <h3 className="text-xl mb-4">Are you sure you want to log out?</h3>
      <div className="flex justify-center gap-4">
        <button onClick={onClose} className="btn-secondary">
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutConfirm;
