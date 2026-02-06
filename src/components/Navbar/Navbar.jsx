import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/context/authContext";
import Modal from "../../common/Modal/Modal.jsx";
import LoginForm from "../Authentication/components/LoginForm/component/LoginForm.jsx";
import SignUpForm from "../Authentication/components/SignUpForm/component/SignUpForm.jsx";
import UserDetailsForm from "../Authentication/components/UserDetailForm/component/userDetailForm.jsx";

const Navbar = () => {
  const [modalType, setModalType] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const closeModal = () => setModalType(null);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      closeModal();
      logout();
      navigate("/");
    }
  };

  const modalConfig = {
    login: {
      title: "Login",
      component: <LoginForm onClose={closeModal} setModalType={setModalType} />,
    },
    signup: {
      title: "Create Account",
      component: (
        <SignUpForm onClose={closeModal} setModalType={setModalType} />
      ),
    },
    userDetails: {
      title: "User Details",
      component: <UserDetailsForm onClose={closeModal} />,
    },
  };
  const currentModal = modalConfig[modalType];

  return (
    <nav className="bg-secondaryColor text-primaryText min-w-full min-h-11">
      <div className="flex items-center justify-between gap-1 p-3 min-h-12">
        <div className="flex flex-col m-1 gap-2">
          <h2>TaskFlow-Lite</h2>
          {user && <span className="flex justify-start">Hi, {user.email}</span>}
        </div>

        <div className="flex gap-1">
          {user ? (
            <>
              <button
                className="form-button"
                onClick={() => setModalType("userDetails")}
              >
                User Details
              </button>
              <button className="form-button" onClick={handleLogout}>
                LogOut
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setModalType("login")}
                className="form-button"
              >
                Login
              </button>
              <button
                onClick={() => setModalType("signup")}
                className="form-button"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        <Modal
          isOpen={!!modalType}
          onClose={closeModal}
          title={currentModal?.title || ""}
        >
          {currentModal?.component}
        </Modal>
      </div>
    </nav>
  );
};

export default Navbar;
