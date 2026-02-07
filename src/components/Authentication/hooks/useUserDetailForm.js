import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { useUpdateUser } from "./useUpdateUser";

export const useUserDetailForm = (onClose) => {
  const { user } = useAuth();
  const { updateUser, loading } = useUpdateUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      fullName: user?.fullName || "",
      username: user?.username || "",
      emailId: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      gender: user?.gender || "",
      dob:
        user?.dob && !isNaN(new Date(user.dob))
          ? new Date(user.dob).toISOString().split("T")[0]
          : "",
      address: user?.address || "",
      zipCode: user?.zipCode || "",
      state: user?.state || "",
    },
  });

  const onFormSubmit = async (data) => {
    const result = await updateUser(data);
    if (result.success) {
      alert("Profile updated successfully!");
      if (onClose) onClose();
    }
  };

  return {
    control,
    errors,
    handleSubmit: handleSubmit(onFormSubmit),
    user,
    loading,
  };
};
