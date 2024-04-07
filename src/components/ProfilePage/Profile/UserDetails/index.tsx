import { User } from "@/generated/types";
import style from "./style.module.css";
import displayArray from "@/functions/utils/displayArray";
import Overlay from "@/components/Overlay";

const UserDetails = ({ user }: { user: User }) => {
  const { email, role } = user;

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
          {displayArray(role)}
        </div>
        <div>status ?</div>
        <div>groups ?</div>
        <div>working days ?</div>
        <button>Update profile</button>
      </div>
    </>
  );
};

export default UserDetails;
