import React from "react";
import { useAuthForm } from "../hooks/useAuthForm";
import loginFields from "../constants/loginFields";
import signUpFields from "../constants/SignUpFields";
import FormGenerator from "../../../common/components/FormGenerator";
import image from "../../../assets/image.webp";

const AuthForm = ({ mode, onClose, onSwitchMode }) => {
  const { control, errors, handleSubmit, isLogin } = useAuthForm(mode, onClose);
  const formFields = isLogin ? loginFields : signUpFields;

  return (
    <div className="flex mx-auto justify-between gap-3 p-0 max-w-4xl w-full">
      <div className="max-w-md w-full max-sm:hidden hidden md:block">
        <img
          className="h-full w-full object-cover rounded-l-2xl"
          src={image}
          alt="auth"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-1 p-6 max-w-md w-full mx-auto bg-primaryColor md:rounded-r-2xl"
      >
        <h1 className="text-3xl font-bold mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h1>

        <div className="flex flex-row p-2 gap-2 items-center w-full my-2">
          <div className="border-t border-gray-600 flex-grow"></div>
          <p className="text-xs text-gray-400 whitespace-nowrap">
            {isLogin ? "Login with email" : "Sign Up with email"}
          </p>
          <div className="border-t border-gray-600 flex-grow"></div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <FormGenerator
            formFields={formFields}
            control={control}
            errors={errors}
          />
        </div>

        {isLogin && (
          <a className="text-xs text-text-subtle mb-4 mt-2 hover:text-white transition-colors">
            Forgot Your Password?
          </a>
        )}

        <div className="w-full p-2 mt-2">
          <button
            type="submit"
            className="w-full py-3 bg-formInputbutton hover:border-formInputFocus text-white font-medium rounded-xl transition-all"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </div>

        <div className="mt-4 text-xs text-gray-400">
          <span>
            {isLogin ? "Don’t have an account?" : "Already have an account?"}
          </span>
          <a
            className="ml-1 text-switchText underline cursor-pointer hover:text-yellow-400"
            onClick={onSwitchMode}
          >
            {isLogin ? "Sign Up" : "Login"}
          </a>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
