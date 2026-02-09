import userDetailFields from "../constants/userDetailField.js";
import { useUserDetailForm } from "../hooks/useUserDetailForm";
import FormGenerator from "../../../common/components/FormGenerator";
import profile from "../../../assets/profile.webp";

const UserDetailForm = ({ onClose }) => {
  const { control, errors, handleSubmit, user } = useUserDetailForm(onClose);

  return (
    <div className="flex m-auto justify-center p-4 items-center content-center w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full max-w-lg gap-6"
      >
        <div className="flex flex-col items-center gap-2 m-2">
          <h2 className="text-2xl font-semibold">Personal Information</h2>
          <img
            className="h-24 w-24 rounded-full object-cover border-2 border-formInputBorder"
            src={profile}
            alt="profile"
          />
          <p className="text-lg font-medium">{user?.fullName}</p>
          <p className="text-sm text-gray-400">User ID: {user?.id}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <FormGenerator
            formFields={userDetailFields}
            control={control}
            errors={errors}
          />
        </div>

        <button
          type="submit"
          className="mt-6 px-8 py-2 bg-formInputbutton hover:border-formInputFocus text-white rounded-xl transition-colors w-full md:w-auto"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default UserDetailForm;
