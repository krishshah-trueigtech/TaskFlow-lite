import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../../../common/Input/InputField";
import { userDetailFields } from "../constants/userDetailField";
import { useAuth } from "../../../context/authContext.jsx";
import { useUpdateUser } from "../hooks/useUpdateUser";
import profile from "../../../../../assets/profile.webp";

const UserDetailForm = (onClose) => {
  const { user } = useAuth();
  const { updateUser } = useUpdateUser();

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
      dob: user?.dob ? new Date(user.dob).toISOString().split("T")[0] : "",
      address: user?.address || "",
      zipCode: user?.zipCode || "",
      state: user?.state || "",
    },
  });

  const onSubmit = async (data) => {
    const result = await updateUser(data);
    if (result.success) {
      alert("Profile updated successfully!");
    }
    if (onClose) onClose();
  };

  return (
    <div className="details-container">
      <form onSubmit={handleSubmit(onSubmit)} className="details-form">
        <div className="profile-info">
          <h2>Personal Information</h2>
          <img className="profile-image" src={profile}></img>
          <p>{user?.fullName}</p>
          <p>User ID: {user?.id}</p>
        </div>
        <div className="form-details ">
          {userDetailFields.map((field) => (
            <div key={field.name} style={{ marginBottom: "1rem" }}>
              <InputField
                control={control}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                type={field.type}
                rules={field.rules}
                options={field.options}
              />

              {errors[field.name] && (
                <span style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors[field.name]?.message}
                </span>
              )}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="form-button"
          style={{ marginTop: "1rem" }}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default UserDetailForm;
