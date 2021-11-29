import * as React from "react";
import { FC } from "react";
import { inputs } from "./constants";

const SignIn: FC = () => (
  <div>
    <h1>Signin page</h1>
    <form>
      {inputs.map((input) => (
        <div>
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

export default SignIn;
