import style from "./style.module.css";

type SeparatorProps = {
  width: string;
  height: string;
};

const Separator = ({ width, height }: SeparatorProps) => {
  // const style.separator
  return <div className={style.separator} style={{ width, height }}></div>;
};

export default Separator;
