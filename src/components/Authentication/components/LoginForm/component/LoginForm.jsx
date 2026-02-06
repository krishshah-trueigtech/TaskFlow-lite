import InputField from "../../../../../common/Input/InputField";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import loginFormFields from "../constants/loginFormField";
import { useAuth } from "../../../context/authContext.jsx";
import { loginUser } from "../../../../../services/authService.js";
import image from "../../../../../assets/image.webp";

const LoginForm = ({ onClose, setModalType }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();
  const onSubmit = async (data) => {
    try {
      const user = await loginUser(data);
      login(user);
      if (onClose) onClose();
      navigate("/dashboard");
    } catch {
      throw new Error({ message: "Invalid email or password" });
    }
  };
  return (
    <div className="form-container">
      <div className="form-image">
        <img className="h-full object-fit " src={image} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h2>Login</h2>
        <div className="line-text-container">
          <div className="line"></div>
          <p className="line-text">Login with email</p>

          <div className="line"></div>
        </div>
        {loginFormFields.map((fields) => (
          <div className="form-input-fields" key={fields.name}>
            <InputField
              control={control}
              name={fields.name}
              label={fields.label}
              placeholder={fields.placeholder}
              type={fields.type}
              rules={fields.rules}
            />

            {errors[fields.name] && (
              <span className="validation-errors">
                {errors[fields.name]?.message?.toString()}
              </span>
            )}
          </div>
        ))}
        <a className="text-xs">Forgot Your Password?</a>
        <button type="submit" className="form-buttons">
          Log In
        </button>
        <div>
          <span>Don’t have an account?</span>
          <a className="switch-text" onClick={() => setModalType("signup")}>
            {" "}
            Sign UP
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
