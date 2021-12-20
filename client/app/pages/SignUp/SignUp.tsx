import * as React from "react";
import { FC } from "react";
import { useHistory, RouteComponentProps } from "react-router-dom";
import ClientICCServer from "../../../../zold/client/clienticcserver";
import { useFormik } from "formik";
import useTranslate from "../../../data/hooks/useTranslate";
import { inputs } from "./constants";

const SignUp: FC<RouteComponentProps> = () => {
  const history = useHistory();
  const t = useTranslate("signup");

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      ClientICCServer.createUser({
        ...values,
        callback: (err: unknown) => {
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
        <button onClick={() => history.push("/login")} type="button">
          Have account? Login here
        </button>
      </form>
    </div>
  );
};

export default SignUp;
