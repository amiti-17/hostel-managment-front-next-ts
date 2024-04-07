"use client";

import { MouseEventHandler, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import style from "./style.module.css";

const Overlay = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const onClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    router.replace(pathname ?? "/dashboard");
  };
  return (
    <div className={style.overlay} onClick={onClickHandler}>
      <div className={style.modalWrapper} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Overlay;
