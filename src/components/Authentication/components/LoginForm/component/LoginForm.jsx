import InputField from "../../../../../common/Input/InputField";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import loginFormFields from "../constants/loginFormField";
import { useAuth } from "../../../context/authContext.jsx";
import { loginUser } from "../../../../../services/authService.js";
import image from "../../../../../assets/image.webp";

const LoginForm = ({ onClose }) => {
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
      <div>
        <img src={image} className="form-image" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h2>Login</h2>
        <div className="line-text-container">
          <div className="line"></div>
          <p className="line-text">Login with email</p>

          <div className="line"></div>
        </div>
        {loginFormFields.map((fields) => (
          <div key={fields.name}>
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
        <span className="text-xs">Forgot Your Password?</span>
        <button type="submit" className="form-button">
          Log In
        </button>
        <div><span>Don’t have an account??</span><span className="switch-text"> Sign UP</span></div>
      </form>
    </div>
  );
};

export default LoginForm;
