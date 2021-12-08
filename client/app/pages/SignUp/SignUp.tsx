import * as React from "react";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import ClientICCServer from "../../../../imports/client/clienticcserver";
import { useFormik } from "formik";


const SignUp: FC = () => {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    },
    onSubmit: (values) => {
      ClientICCServer.createUser({ ...values, callback: (err) => {
        if (!err) {
          history.push("/");
        }
        } });
    },
  });

  return (
    <div>
      <h1>Signup page</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
        />
        <button type="submit">Submit</button>
        <button onClick={() => history.push("/login")}>Have account? Login here</button>
      </form>
    </div>
  );
}

export default SignUp;
