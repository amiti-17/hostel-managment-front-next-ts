import * as yup from "yup";

export const loginValidationSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup
    .string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
});
