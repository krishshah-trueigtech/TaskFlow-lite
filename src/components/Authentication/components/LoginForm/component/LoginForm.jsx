import InputField from "../../../../../common/Input/InputField";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import loginFormFields from "../constants/loginFormField";
import { useAuth } from "../../../context/authContext.jsx";
import loginUser from "../../../../../services/authService.js";
// import UseLogin from "../hooks/index.js"

const LoginForm = () => {
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
      navigate("/dashboard");
    } catch {
      throw new Error({ message: "Invalid email or password" });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: 300, margin: "auto" }}
    >
      <h2>Login</h2>

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
            <span style={{ color: "red", fontSize: "0.8rem" }}>
              {errors[fields.name]?.message?.toString()}
            </span>
          )}
        </div>
      ))}

      <button type="submit" style={{ marginTop: 10 }}>
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
