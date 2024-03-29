"use client";

import { useEffect, useState } from "react";
import style from "./style.module.css";

const CopyrightWrapper = () => {
  const [currentDomain, setCurrentDomain] = useState<string | undefined>(
    undefined
  );
  useEffect(() => {
    if (window !== undefined) {
      setCurrentDomain(window.location.hostname);
    }
  }, []);
  return (
    <div className={style.copyright}>
      © {currentDomain && currentDomain + ". "} All rights reserved
    </div>
  );
};

export default CopyrightWrapper;
