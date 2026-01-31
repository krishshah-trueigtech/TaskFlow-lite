const loginFormFields = [
  {
    name: "email",
    label: "Email Address",
    placeholder: "Enter your email",
    type: "text",
    rules: {
      required: "Please Enter your Email",
      pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
    },
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter password",
    type: "password",
    rules: {
      required: "Password is required",
      minLength: { value: 8, message: "Min 8 characters" },
    },
  },
];
export default loginFormFields;
