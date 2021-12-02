import * as React from "react";
import { FC } from "react";
import { useFormik, Field } from "formik";
import { useAppDispatch } from "../../../data/redux/hooks";
import { loginAsync } from "../../../data/redux/reducers/authReducer";
import ClientICCServer from "../../../../imports/client/clienticcserver";

 interface FormValues {
   email: string;
   password: string;
 }

 interface OtherProps {
   message: string;
 }

 interface SignInFormProps {
   initialEmail?: string;
   message: string;
   onLogin: Function;
 }

const SignIn: FC = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginAsync(values));
    },
  });

  return (
    <div>
      <h1>Signin page</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignIn;
