import { regExp } from "@/config/system/regexp";
import { errorMsg } from "@/config/system/constants/errorMsg";
import * as yup from "yup";

export const loginValidationSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup
    .string()
    .min(8, errorMsg.passwordLength)
    .max(100, errorMsg.passwordRichTopSymbolsLimit)
    .matches(regExp.lowerCaseLetter, errorMsg.passwordLowerCase)
    .matches(regExp.upperCaseLetter, errorMsg.passwordUpperCase)
    .matches(regExp.digit, errorMsg.passwordDigit)
    .matches(regExp.specialSymbol, errorMsg.passwordSpecialSymbols)
    .required(errorMsg.required),
});
