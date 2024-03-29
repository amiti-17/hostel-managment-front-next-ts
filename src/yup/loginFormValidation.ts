import { regExp, regExpStr } from "@/config/system/regexp";
import * as yup from "yup";

export const loginValidationSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup
    .string()
    .min(8, "Must contain at least 8 characters")
    .max(100, "Must be 100 characters or less")
    .matches(
      regExp.lowerCaseLetter,
      "Should contain at least one lowercase character"
    )
    .matches(
      regExp.upperCaseLetter,
      "Should contain at least one uppercase character"
    )
    .matches(regExp.digit, "Should contain at least one digit")
    .matches(
      regExp.specialSymbol,
      "ShouldContain one of special symbols: " +
        regExpStr.specialSymbol.split("\\").join("")
    )
    .required("Required"),
});
