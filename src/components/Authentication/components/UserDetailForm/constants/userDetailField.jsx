export const userDetailFields = [
    {
      name: "fullName",
      label: "Full Name",
      placeholder: "Enter your full name",
      type: "text",
      rules: { required: "Full name is required" },
    },
    {
      name: "username",
      label: "Username",
      placeholder: "Enter username",
      type: "text",
      rules: { required: "Username is required" },
    },
    {
      name: "emailId",
      label: "Email ID",
      placeholder: "example@domain.com",
      type: "text",
      rules: {
        required: "Email is required",
        pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
      },
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      placeholder: "10-digit number",
      type: "tel",
      rules: {
        required: "Phone number is required",
        pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit number" },
      },
    },
    {
      name: "gender",
      label: "Gender ",
      type: "select", 
      options: ["Male", "Female", "Other", "Prefer not to say"],
      rules: { required: "Please select your gender" },
    },
    {
      name: "dob",
      label: "Date of Birth",
      type: "date",
      rules: { required: "Date of birth is required" },
    },
    {
      name: "address",
      label: "Address",
      placeholder: "Street, Apartment, etc.",
      type: "text",
      rules: { required: "Address is required" },
    },
    {
      name: "zipCode",
      label: "Zip Code",
      placeholder: "6-digit zip code",
      type: "text",
      rules: {
        required: "Zip code is required",
        pattern: { value: /^[0-9]{6}$/, message: "Invalid zip code" },
      },
    },
    {
      name: "state",
      label: "State",
      placeholder: "Select your state",
      type: "select",
      options: [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
        "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
        "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
      ],
      rules: { required: "State is required" },
    },
  ];