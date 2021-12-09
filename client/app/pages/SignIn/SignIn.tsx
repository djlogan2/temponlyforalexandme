import * as React from "react";
import { FC } from "react";
import { useHistory, RouteComponentProps } from "react-router-dom";
import ClientICCServer from "../../../../imports/client/clienticcserver";
import { useFormik } from "formik";
import useTranslate from "../../../data/hooks/useTranslate/index";
import { inputs } from "./constants";

const SignIn: FC<RouteComponentProps> = () => {
  const t = useTranslate("login");

  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      ClientICCServer.loginWithPassword({
        ...values,
        callback: (err) => {
          if (!err) {
            history.push("/");
          }
        },
      });
    },
  });

  return (
    <div>
      <h1>{t("title")}</h1>
      <form onSubmit={formik.handleSubmit}>
        {inputs.map((input) => (
          <React.Fragment key={input.id}>
            <label htmlFor={input.id}>{input.label}</label>
            <input
              id={input.id}
              name={input.id}
              type={input.type}
              onChange={formik.handleChange}
              value={formik.values[input.id]}
            />
          </React.Fragment>
        ))}

        <button type="submit">Submit</button>
        <button onClick={() => history.push("/register")} type="button">
          Dont have account? Register here
        </button>
      </form>
    </div>
  );
};

export default SignIn;
