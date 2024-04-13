import { User } from "@/config/system/types/generated/types";
import style from "./style.module.css";
import displayArray from "@/functions/utils/displayArray";

const UserDetails = ({ user }: { user: User }) => {
  const { email, roles } = user;
  console.log(user);

  return (
    <>
      <div className={style.userDetailsWrapper}>
        <div className="underline">Contact information:</div>
        <div>
          email: <br />
          {email}
        </div>
        <div>
          phone: <br />
          {"NA"}
        </div>
        <div>
          roles: <br />
          {displayArray(roles)}
        </div>
        <div>status ?</div>
        <div>groups ?</div>
        <button>Update profile</button>
      </div>
    </>
  );
};

export default UserDetails;
