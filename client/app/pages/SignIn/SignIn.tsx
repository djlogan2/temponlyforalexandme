import * as React from "react";
import { FC } from "react";
import ClientICCServer from "../../../../imports/client/clienticcserver";
import { useFormik } from "formik";
import useTranslate from "../../../data/hooks/useTranslate/index";

const SignIn: FC = () => {
  const t = useTranslate("login");
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      ClientICCServer.loginWithPassword(values);
    },
  });

  return (
    <div>
      <h1>{t("title")}</h1>
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
