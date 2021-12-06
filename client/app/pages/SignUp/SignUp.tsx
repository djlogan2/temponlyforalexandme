import * as React from "react";
import {FC} from "react";
import {Field, Form, FormikErrors, FormikProps, withFormik,} from "formik";
import {useAppDispatch} from "../../../data/redux/hooks";
import {registerAsync} from "../../../data/redux/reducers/authReducer";

interface FormValues {
   email: string;
   username: string;
   password: string;
   confirmPassword: string;
 }

 interface OtherProps {
   message: string;
 }

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const {
    touched, errors, isSubmitting, message,
  } = props;
  return (
    <Form>
      <h1>{message}</h1>
      <Field type="email" name="email" />
      {touched.email && errors.email && <div>{errors.email}</div>}

      <Field name="username" />
      {touched.username && errors.username && <div>{errors.username}</div>}

      <Field type="password" name="password" />
      {touched.password && errors.password && <div>{errors.password}</div>}

      <Field type="password" name="confirmPassword" />
      {touched.confirmPassword && errors.confirmPassword && <div>{errors.confirmPassword}</div>}

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
};

 interface SignUpFormProps {
   initialEmail?: string;
   message: string;
 }

const SignUpForm = withFormik<SignUpFormProps, FormValues>({
  mapPropsToValues: (props) => ({
    email: props.initialEmail || "",
    username: "",
    password: "",
    confirmPassword: "",
  }),

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};
    if (!values.email) {
      errors.email = "Required";
    }

    if (!values.username) {
      errors.username = "Required";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Required";
    }
    return errors;
  },

  handleSubmit: (values, {props}) => {
      props.dispatch(registerAsync(values));
  },
})(InnerForm);

const SignUp: FC = () => {
    const dispatch = useAppDispatch();
    return (
        <div>
            <h1>Signup page</h1>
            <SignUpForm message="ICC registration form" dispatch={dispatch} />
        </div>
    );
}

export default SignUp;
