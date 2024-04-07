import { errorMsg } from "@/config/system/constants/errorMsg";
import { regExp } from "@/config/system/regexp";
import * as yup from "yup";

export const changePasswordValidation = yup.object({
  oldPassword: yup
    .string()
    .required(errorMsg.required)
    .min(8, errorMsg.passwordLength)
    .max(100, errorMsg.passwordRichTopSymbolsLimit)
    .matches(regExp.lowerCaseLetter, errorMsg.passwordLowerCase)
    .matches(regExp.upperCaseLetter, errorMsg.passwordUpperCase)
    .matches(regExp.digit, errorMsg.passwordDigit)
    .matches(regExp.specialSymbol, errorMsg.passwordSpecialSymbols),
  newPassword: yup
    .string()
    .required(errorMsg.required)
    .min(8, errorMsg.passwordLength)
    .max(100, errorMsg.passwordRichTopSymbolsLimit)
    .matches(regExp.lowerCaseLetter, errorMsg.passwordLowerCase)
    .matches(regExp.upperCaseLetter, errorMsg.passwordUpperCase)
    .matches(regExp.digit, errorMsg.passwordDigit)
    .matches(regExp.specialSymbol, errorMsg.passwordSpecialSymbols),
  confirmNewPassword: yup
    .string()
    .required(errorMsg.required)
    .oneOf([yup.ref("newPassword")], errorMsg.passwordMustMatch),
});
