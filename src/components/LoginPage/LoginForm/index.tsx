"use client";

import { useFormik } from "formik";
import { loginValidationSchema } from "@/yup/loginFormValidation";
import InputGroup from "./InputGroup";
import style from "./style.module.css";
import { useMutation } from "@apollo/client";
import { AUTH } from "@/Apollo/queries/auth";
import { FormEvent, useEffect } from "react";

const LoginForm = () => {
  const [loginQuery, { data, loading, error }] = useMutation(AUTH.login);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      loginQuery({
        variables: { input: values },
        onCompleted(data) {
          console.log(data);
        },
      });
    },
  });
  useEffect(() => {
    console.log(loading, error);
  }, [loading, error]);
  const { errors, touched, values, handleBlur, handleSubmit, handleChange } =
    formik;
  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit();
      }}
      className={style.form}
    >
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
      <button type="submit" className={style.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
