import { CiUser } from "react-icons/ci";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { User } from "@/generated/types";
import style from "./style.module.css";
import Overlay from "@/components/Overlay";
import { searchParamsConst } from "@/config/system/constants/searchParams";
import { strConst } from "@/config/system/constants/strConst";

type UserName = Pick<User, "name">;

type UserComponentProps = UserName & {
  // userName: string;
};

const UserComponent = ({ name }: UserComponentProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const changePassword = searchParams?.get(searchParamsConst.changePassword);
  return (
    <div className={style.userWrapper}>
      {searchParams && changePassword && (
        <Overlay>
          <></>
        </Overlay>
      )}
      <div className={style.profilePictureWrapper}>
        <CiUser className={style.profilePicture} />
      </div>

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
