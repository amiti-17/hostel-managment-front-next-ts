import { USERS } from "@/Apollo/queries/users";
import { NotificationContext } from "@/components/NotificationWrapper/NotificationProvider";
import { strConst } from "@/config/system/constants/strConst";
import { StatusOutput } from "@/generated/types";
import { changePasswordValidation } from "@/yup/changePasswordValidation";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

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
        variables: { id: usersId, ...myPasswords },
        onCompleted(data) {
          const myData: StatusOutput = data.updatePassword;
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
      });
    },
  });
  return <form></form>;
};

export default ChangePasswordForm;
