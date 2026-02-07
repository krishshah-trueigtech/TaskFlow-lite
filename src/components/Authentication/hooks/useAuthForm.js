import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { loginUser, registerUser } from "../../../services/authService";

export const useAuthForm = (mode, onClose) => {
  const isLogin = mode === "login";
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset();
  }, [mode, reset]);

  const onFormSubmit = async (data) => {
    try {
      const authFunction = isLogin ? loginUser : registerUser;
      const result = await authFunction(data);

      login(result);

      if (onClose) onClose();
      navigate("/dashboard");
    } catch (error) {
      alert(error.message || "Authentication Failed");
    }
  };

  return {
    control,
    errors,
    handleSubmit: handleSubmit(onFormSubmit),
    isLogin,
  };
};
