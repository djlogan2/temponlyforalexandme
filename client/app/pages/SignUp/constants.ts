interface IInput {
  label: string;
  id: "email" | "username" | "password" | "confirmPassword";
  type: string;
}

export const inputs: IInput[] = [
  {
    label: "Email Address",
    id: "email",
    type: "email",
  },
  {
    label: "Username",
    id: "username",
    type: "text",
  },
  {
    label: "Password",
    id: "password",
    type: "password",
  },
  {
    label: "Confirm password",
    id: "confirmPassword",

    type: "password",
  },
];
