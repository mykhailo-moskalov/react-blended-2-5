import type { ReactNode } from "react";
import style from "./GridItem.module.css";

interface IGridItem {
  children: ReactNode;
}

export default function GridItem({ children }: IGridItem) {
  return <li className={style.item}>{children}</li>;
}
