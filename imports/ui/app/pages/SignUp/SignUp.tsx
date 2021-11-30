import * as React from "react";
import { FC } from "react";
import { inputs } from "./constants";

const SignUp: FC = () => (
  <div>
    <h1>Signup page</h1>
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
