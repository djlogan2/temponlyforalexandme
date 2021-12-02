import { i18n } from "meteor/universe:i18n";
import * as React from "react";
import { FC } from "react";
import { inputs } from "./constants";

const T = i18n.createComponent();

i18n.setLocale("en-us");

const SignUp: FC = () => (
  <div>
    <h1><T>Signup.title</T></h1>
    <form>
      {inputs.map((input) => (
        <div key={input.id}>
          <label htmlFor={input.id}>
            {input.label}
            <input
              type={input.type}
              placeholder={input.placeholder}
              id={input.id}
            />
          </label>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  </div>
);

export default SignUp;
