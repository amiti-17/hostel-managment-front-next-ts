import { useContext } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { User } from "@/config/system/types/generated/types";
import Overlay from "@/components/Overlay";
import { UserContext } from "@/providers/User";
import { strConst } from "@/config/system/constants/strConst";
import { searchParamsConst } from "@/config/system/constants/searchParams";
import UsersProfileImage from "./UsersProfileImage";
import ChangePasswordForm from "./ChangePasswordForm";
import style from "./style.module.css";

type UserName = Pick<User, "name">;

type UserComponentProps = UserName & {
  // userName: string;
};

const UserComponent = ({ name }: UserComponentProps) => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const changePassword = searchParams?.get(searchParamsConst.changePassword);
  if (!user) {
    return null;
  }
  const userId = user.id;
  return (
    <div className={style.userWrapper}>
      {searchParams && changePassword && (
        <Overlay>
          <ChangePasswordForm usersId={userId} />
        </Overlay>
      )}
      <UsersProfileImage imageSrc={undefined} />
      <span style={{ fontSize: "larger" }}>{name}</span>
      <button
        onClick={(e) =>
          router.replace(
            pathname +
              strConst.questionMark +
              searchParamsConst.changePassword +
              strConst.equalSign +
              searchParamsConst.changePasswordTrue
          )
        }
      >
        Change password
      </button>
      <button>Settings</button>
    </div>
  );
};

export default UserComponent;
