import { User } from "@/config/system/types/generated/types";
import style from "./style.module.css";
import displayArray from "@/functions/utils/displayArray";
import { useEffect } from "react";

const UserDetails = ({ user }: { user: User }) => {
  const { email, roles, groupList, phone } = user;
  console.log(user);

  return (
    <>
      <div className={style.userDetailsWrapper}>
        <div className="underline">Contact information:</div>
        <div>
          <span className={style.titleSpan}>email: </span>
          <br />
          {email}
        </div>
        <div>
          <span className={style.titleSpan}>phone: </span>
          <br />
          {phone}
        </div>
        {roles && (
          <div>
            <span className={style.titleSpan}>roles: </span>
            <br />
            {displayArray(roles)}
          </div>
        )}
        {groupList && groupList[0] && (
          <div>
            <span className={style.titleSpan}>groups: </span>
            <br />
            {displayArray(groupList)}{" "}
          </div>
        )}
        {/* <button>Update profile</button> */}
      </div>
    </>
  );
};

export default UserDetails;
