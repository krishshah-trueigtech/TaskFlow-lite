import userDetailFields from "../constants/userDetailField.js";
import { useUserDetailForm } from "../hooks/useUserDetailForm";
import FormGenerator from "../../../common/FormGenerator/FormGenerator.jsx";
import profile from "../../../assets/profile.webp";

const UserDetailForm = ({ onClose }) => {
  const { control, errors, handleSubmit, user } = useUserDetailForm(onClose);

  return (
    <div className="details-container">
      <form onSubmit={handleSubmit} className="details-form">
        <div className="profile-info">
          <h2>Personal Information</h2>
          <img className="profile-image" src={profile} alt="profile" />
          <p>{user?.fullName}</p>
          <p>User ID: {user?.id}</p>
        </div>

        <div className="form-details w-full">
          <FormGenerator
            formFields={userDetailFields}
            control={control}
            errors={errors}
          />
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
