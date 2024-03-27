"use client";

import { useFormik } from "formik";
import { loginValidationSchema } from "@/yup/loginFromValidation";
import InputGroup from "./InputGroup";

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const { errors, touched, values, handleBlur, handleSubmit, handleChange } =
    formik;
  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        type="email"
        values={values}
        errors={errors}
        touched={touched}
        handleBlur={handleBlur}
        handleChange={handleChange}
      />
      <InputGroup
        type="password"
        values={values}
        errors={errors}
        touched={touched}
        handleBlur={handleBlur}
        handleChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
