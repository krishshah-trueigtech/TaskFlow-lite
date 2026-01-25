import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";
import loginUser from "../../services/authService.js";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
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
      setError({ message: "Invalid email or password" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="email">
        <label>Email</label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Enter a valid email",
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div className="password">
        <label>Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be atleast 8 characters",
            },
          })}
        />
        {errors.password && !errors.email && (
          <span>{errors.password.message}</span>
        )}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
