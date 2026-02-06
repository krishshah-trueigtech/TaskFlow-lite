const SignUpFormFields = [
  {
    name: "username",
    label: "User Name ",
    placeholder: "Username ",
    type: "text",
    rules: {
      required: "Please Enter your username",
      minLength: {
        value: 3,
        message: "username should be atleast 3 characters",
      },
    },
  },
  {
    name: "email",
    label: "E-mail ",
    placeholder: "Enter your email",
    type: "text",
    rules: {
      required: "Please Enter your Email",
      pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
    },
  },
  {
    name: "phoneNumber",
    label: "Phone No.",
    placeholder: "Enter 10-digit number",
    type: "tel",
    rules: {
      required: "Phone number is required",
      pattern: {
        value: /^[0-9]{10}$/,
        message: "Please enter a valid 10-digit phone number",
      },
    },
  },
  {
    name: "password",
    label: "Password",
    placeholder: "-----------",
    type: "password",
    rules: {
      required: "Password is required",
      minLength: { value: 8, message: "Min 8 characters" },
    },
  },
  {
    name: "ageConfirm",
    label:
      " I confirm that I am 18 years or older and legally allowed to participate in online gaming.",
    type: "checkbox",
    rules: {
      required: "You must confirm your age to proceed",
    },
  },
];
export default SignUpFormFields;
