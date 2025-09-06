import type { ReactNode } from "react";
import style from "./Grid.module.css";

interface IGrid {
  children: ReactNode;
}

export default function Grid({ children }: IGrid) {
  return <ul className={style.list}>{children}</ul>;
}
