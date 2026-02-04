import InputField from "../../../../../common/Input/InputField.jsx";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SignUpFormFields from "../constants/SignUpFormField.js";
import { useAuth } from "../../../context/authContext.jsx";
import { register } from "../../../../../services/authService.js";
import image from "../../../../../assets/image.webp";

const SignUpForm = ({ onClose, setModalType }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const newUser = await register(data);
      if (onClose) onClose();
      login(newUser);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.message || "Failed to create account");
    }
  };
  return (
    <div className="form-container">
      <div>
        <img src={image} className="form-image" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h2>Sign Up</h2>
        <div className="line-text-container">
          <div className="line"></div>
          <p className="line-text">Sign Up with email</p>

          <div className="line"></div>
        </div>

        {SignUpFormFields.map((fields) => (
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

        <button
          className="form-buttons"
          type="submit"
          style={{ marginTop: 10 }}
        >
          Sign Up
        </button>
        <div>
          <span>Already have an account?</span>
          <a className="switch-text" onClick={() => setModalType("login")}>
            {" "}
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
