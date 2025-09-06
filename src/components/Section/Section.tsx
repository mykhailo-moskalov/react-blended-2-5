import type { ReactNode } from "react";
import style from "./Section.module.css";

interface ISection {
  children: ReactNode;
}

export default function Section({ children }: ISection) {
  return <section className={style.section}>{children}</section>;
}
