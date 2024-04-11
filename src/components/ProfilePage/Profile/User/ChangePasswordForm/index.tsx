import { USERS } from "@/Apollo/queries/users";
import { NotificationContext } from "@/components/NotificationWrapper/NotificationProvider";
import { strConst } from "@/config/system/constants/strConst";
import { StatusOutput } from "@/config/system/types/generated/types";
import { changePasswordValidation } from "@/yup/changePasswordValidation";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import style from "./style.module.css";
import processGraphqlErrors from "@/CustomError/processGraphqlErrors";

type ChangePasswordFormProps = {
  usersId: string;
};

const ChangePasswordForm = ({ usersId }: ChangePasswordFormProps) => {
  const router = useRouter();
  const { setIsShown, setMessage, setType } = useContext(NotificationContext);
  const pathname = usePathname() ?? "./dashboard";
  const [updatePassword, { loading, error }] = useMutation(
    USERS.updatePassword
  );
  const formik = useFormik({
    initialValues: {
      oldPassword: strConst.emptyStr,
      newPassword: strConst.emptyStr,
      confirmNewPassword: strConst.emptyStr,
    },
    validationSchema: changePasswordValidation,
    onSubmit: (values) => {
      const { confirmNewPassword, ...myPasswords } = values;
      updatePassword({
        variables: { input: { id: usersId, ...myPasswords } },
        onCompleted(data) {
          console.log({ data });
          const myData: StatusOutput = data.updateUsersPassword;
          console.log({ myData, error });
          if (myData && myData.status) {
            setType("success");
            setMessage("Password updated successfully");
            router.replace(pathname);
          } else {
            setType("error");
            setMessage("Something went wrong");
          }
          setIsShown(true);
        },
        onError(error) {
          processGraphqlErrors({ error, setIsShown, setMessage, setType });
        },
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className={style.form}>
      <input
        type="password"
        name="oldPassword"
        placeholder="Old password"
        onChange={formik.handleChange}
        value={formik.values.oldPassword}
        autoComplete="current-password"
      />
      {formik.touched.oldPassword && formik.errors.oldPassword ? (
        <div className={style.messageBox}>{formik.errors.oldPassword}</div>
      ) : null}
      <input
        type="password"
        name="newPassword"
        placeholder="New password"
        onChange={formik.handleChange}
        value={formik.values.newPassword}
        autoComplete="new-password"
      />
      {formik.touched.newPassword && formik.errors.newPassword ? (
        <div className={style.messageBox}>{formik.errors.newPassword}</div>
      ) : null}
      <input
        type="password"
        name="confirmNewPassword"
        placeholder="Confirm new password"
        onChange={formik.handleChange}
        value={formik.values.confirmNewPassword}
        autoComplete="new-password"
      />
      {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword ? (
        <div className={style.messageBox}>
          {formik.errors.confirmNewPassword}
        </div>
      ) : null}
      <button type="submit" disabled={loading}>
        Submit
      </button>
    </form>
  );
};

export default ChangePasswordForm;
