import * as React from "react";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import ClientICCServer from "../../../../imports/client/clienticcserver";
import { useFormik } from "formik";

const SignIn: FC = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      ClientICCServer.loginWithPassword({ ...values, callback: (err) => {
          console.log(err);
          if (!err) {
          history.push("/");
          }
        }});
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
        <button onClick={() => history.push("/register")}>Dont have account? Register here</button>
      </form>
    </div>
  );
};

export default SignIn;
