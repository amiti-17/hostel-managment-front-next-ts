"use client";

import { useFormik } from "formik";
import { loginValidationSchema } from "@/yup/loginFormValidation";
import InputGroup from "./InputGroup";
import style from "./style.module.css";
import { useMutation } from "@apollo/client";
import { AUTH } from "@/Apollo/queries/auth";
import { FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { StatusOutput } from "@/generated/types";

const LoginForm = () => {
  const [loginQuery, { loading, error }] = useMutation(AUTH.login);
  const router = useRouter();
  const submitHandler = (values: { email: string; password: string }) => {
    console.log(JSON.stringify(values, null, 2));
    loginQuery({
      variables: { input: values },
      onCompleted(data: { login: StatusOutput }) {
        console.log(data);
        router.push("/dashboard");
      },
    });
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: submitHandler,
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
