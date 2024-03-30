import { ChangeEvent, FocusEvent } from "react";
import style from "./style.module.css";
import { FormikErrors, FormikTouched } from "formik";

type FormStamps = {
  email: string | undefined;
  password: string | undefined;
};

type InputGroupProps = {
  handleChange: {
    (e: ChangeEvent<any>): void;
    <T_1 = string | ChangeEvent<any>>(field: T_1): T_1 extends ChangeEvent<any>
      ? void
      : (e: string | ChangeEvent) => void;
  };
  handleBlur: {
    (e: FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  values: FormStamps;
  errors: FormikErrors<{
    email: string;
    password: string;
  }>;
  touched: FormikTouched<{
    email: string;
    password: string;
  }>;
  type: "email" | "password";
};

const InputGroup = ({
  handleChange,
  handleBlur,
  values,
  errors,
  touched,
  type,
}: InputGroupProps) => {
  return (
    <div className={style.inputGroup}>
      <input
        id={`${type}Input`}
        placeholder={`Input your ${type}...`}
        name={type}
        type={type}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[type]}
        className={style.input}
        autoComplete="type"
      />
      {touched[type] && errors[type] ? (
        <div className={style.messageBox}>{errors[type]}</div>
      ) : null}
    </div>
  );
};

export default InputGroup;
