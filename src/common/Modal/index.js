import AuthForm from "../../components/Authentication/components/AuthForm";
import UserDetailsForm from "../../components/Authentication/components/userDetailForm";
import TaskForm from "../../components/Tasks/components/TaskForm/components/TaskForm";

const MODAL_COMPONENTS = {
  login: AuthForm,
  signup: AuthForm,
  userDetails: UserDetailsForm,
  taskForm: TaskForm,
};

export default MODAL_COMPONENTS;