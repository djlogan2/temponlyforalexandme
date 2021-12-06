import * as React from "react";
import {FC} from "react";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../../data/redux/hooks";
import {loggingIn2, loginSync} from "../../../data/redux/reducers/authReducer";
import {RootState} from "../../../data/redux/store";

const SignIn: FC = () => {
  const isLoggingIn: boolean = useAppSelector((state: RootState) => !!state.auth.loggingIn);
  const isLoggingIn2: string = useAppSelector((state: RootState) => state.auth.loggingIn2);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loggingIn2({
        data: "loading..."
      }))
      setTimeout(() => {
        dispatch(loginSync(values))
      }, 1000)
    },
  });

  return (
    <div>
      <h1>Signin page</h1>
      {isLoggingIn && <div>NOW LOGGING IN</div>}
      {isLoggingIn2 && (<div>{isLoggingIn2}</div>)}
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
