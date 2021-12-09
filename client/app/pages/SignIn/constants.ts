interface IInput {
  label: string;
  id: "email" | "password";
  type: string;
}

export const inputs: IInput[] = [
  {
    label: "Email Address",
    id: "email",
    type: "email",
  },
  {
    label: "Password",
    id: "password",
    type: "password",
  },
];
