import { useAuth } from "../Authentication/context/authContext";
import { useModal } from "../../common/Modal/context/ModalContext.jsx";

const Navbar = () => {
  const { user } = useAuth();
  const { openModal } = useModal();

  const handleLogoutClick = () => {
    openModal("logoutConfirm");
  };

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
                onClick={() => openModal("userDetails")}
              >
                User Details
              </button>
              <button className="form-button" onClick={handleLogoutClick}>
                LogOut
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => openModal("login")}
                className="form-button"
              >
                Login
              </button>
              <button
                onClick={() => openModal("signup")}
                className="form-button"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
