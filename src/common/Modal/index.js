import AuthForm from "../../components/Authentication/components/AuthForm";
import UserDetailsForm from "../../components/Authentication/components/userDetailForm";
import TaskForm from "../../components/Tasks/components/TaskForm/components/TaskForm";
import LogoutConfirm from "../../components/Authentication/components/LogoutConfirm";

const MODAL_COMPONENTS = {
  login: AuthForm,
  signup: AuthForm,
  userDetails: UserDetailsForm,
  taskForm: TaskForm,
  logoutConfirm: LogoutConfirm,
};

export default MODAL_COMPONENTS;
