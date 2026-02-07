import React from "react";
import { useAuthForm } from "../hooks/useAuthForm";
import loginFields from "../constants/loginFields";
import signUpFields from "../constants/SignUpFields";
import FormGenerator from "../../../common/FormGenerator/FormGenerator";
import image from "../../../assets/image.webp";

const AuthForm = ({ mode, onClose, onSwitchMode }) => {
  const { control, errors, handleSubmit, isLogin } = useAuthForm(mode, onClose);

  const formFields = isLogin ? loginFields : signUpFields;

  return (
    <div className="form-container">
      <div className="form-image">
        <img className="h-full object-cover" src={image} alt="auth" />
      </div>
      <form onSubmit={handleSubmit} className="form">
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>

        <div className="line-text-container">
          <div className="line"></div>
          <p className="line-text">
            {isLogin ? "Login with email" : "Sign Up with email"}
          </p>
          <div className="line"></div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <FormGenerator
            formFields={formFields}
            control={control}
            errors={errors}
          />
        </div>

        {isLogin && <a className="text-xs mb-4 mt-2">Forgot Your Password?</a>}

        <div className="flex max-w-4/5 w-full p-4">
          <button type="submit" className="form-buttons">
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </div>

        <div>
          <span>
            {isLogin ? "Don’t have an account?" : "Already have an account?"}
          </span>
          <a className="switch-text ml-1" onClick={onSwitchMode}>
            {isLogin ? "Sign Up" : "Login"}
          </a>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
