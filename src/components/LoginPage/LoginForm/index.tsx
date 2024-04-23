"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
  useMutation,
} from "@apollo/client";
import { FormEvent, useContext } from "react";
import InputGroup from "./InputGroup";
import { AUTH } from "@/Apollo/queries/auth";
import { StatusOutput } from "@/config/system/types/generated/types";
import { loginValidationSchema } from "@/yup/loginFormValidation";
import processGraphqlErrors from "@/CustomError/processGraphqlErrors";
import { NotificationContext } from "@/components/NotificationWrapper/NotificationProvider";
import style from "./style.module.css";

type LoginFormProps = {
  type?: "admin";
};

const LoginForm = ({ type }: LoginFormProps) => {
  const { setIsShown, setMessage, setType } = useContext(NotificationContext);
  const [loginQuery, { loading }] = useMutation(AUTH.login);
  const [adminLoginQuery, { loading: adminLoading }] = useMutation(
    AUTH.adminLogin
  );
  const router = useRouter();
  const submitHandler = (values: { email: string; password: string }) => {
    console.log(JSON.stringify(values, null, 2));
    const queryConfig:
      | MutationFunctionOptions<
          any,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined = {
      variables: { input: values },
      onCompleted(data: { login: StatusOutput }) {
        console.log(data);
        type || router.push("/dashboard");
      },
      onError(error) {
        console.log(error);
        processGraphqlErrors({ error, setIsShown, setMessage, setType });
      },
    };
    if (type === "admin") {
      adminLoginQuery(queryConfig);
      return;
    }
    loginQuery(queryConfig);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: submitHandler,
  });
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
      <button
        type="submit"
        className={style.submitButton}
        disabled={loading || adminLoading}
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
