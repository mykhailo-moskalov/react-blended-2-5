import type { ReactNode } from "react";
import styled from "./Container.module.css";

interface IContainer {
  children: ReactNode;
}

export default function Container({ children }: IContainer) {
  return <div className={styled.container}>{children}</div>;
}
