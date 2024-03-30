"use client";

import Link from "next/link";
import style from "./style.module.css";
import { usePathname } from "next/navigation";

type LinkComponentProps = {
  name: string;
};

const LinkComponent = ({ name }: LinkComponentProps) => {
  const pathName = usePathname();
  const displayName = name.slice(0, 1).toLocaleUpperCase() + name.slice(1);
  const linkClassName =
    pathName?.slice(1) === name
      ? style.link + " " + style.currentLink
      : style.link;
  return (
    <Link href={"/" + name} className={linkClassName}>
      {displayName}
    </Link>
  );
};

export default LinkComponent;
