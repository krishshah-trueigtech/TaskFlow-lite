import { useAuth } from "../Authentication/context/authContext";
import { useModal } from "../../common/Modal/context/ModalContext.jsx";

const Navbar = () => {
  const { user } = useAuth();
  const { openModal } = useModal();

  const handleLogoutClick = () => {
    openModal("logoutConfirm");
  };
  const navBtnClass =
    "form-button whitespace-nowrap shadow-none transition-all " +
    "!px-3 !py-1.5 !text-xs " +
    "sm:!px-4 sm:!py-2 sm:!text-sm";

  return (
    <nav className="bg-secondaryColor text-primaryText w-full">
      <div className="flex items-center justify-between gap-2 p-2 sm:p-3 min-h-12 w-full max-w-full overflow-hidden">
        <div className="flex flex-col justify-center gap-0.5 min-w-0">
          <h2 className="font-bold text-base sm:text-xl leading-tight truncate">
            TaskFlow-Lite
          </h2>
          {user && (
            <span className="text-[10px] sm:text-xs text-gray-300 truncate max-w-[100px] sm:max-w-xs block">
              Hi, {user.email}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {user ? (
            <>
              <button
                className={navBtnClass}
                onClick={() => openModal("userDetails")}
              >
                User Details
              </button>
              <button className={navBtnClass} onClick={handleLogoutClick}>
                LogOut
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => openModal("login")}
                className={navBtnClass}
              >
                Login
              </button>
              <button
                onClick={() => openModal("signup")}
                className={navBtnClass}
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
