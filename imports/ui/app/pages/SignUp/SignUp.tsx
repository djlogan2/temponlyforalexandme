import * as React from "react";
import { FC } from "react";
import useTranslate from "../../data/hooks/useTranslate";
import { inputs } from "./constants";

const SignUp: FC = () => {
  const translate = useTranslate("signup");

  return (
    <div>
      <h1>{translate("title")}</h1>
      <form>
        {inputs.map((input) => (
          <div key={input.id}>
            <label htmlFor={input.id}>
              {translate(input.label)}
              <input type={input.type} id={input.id} />
            </label>
          </div>
        ))}
        <button type="submit">{translate("submit")}</button>
      </form>
    </div>
  );
};

export default SignUp;
