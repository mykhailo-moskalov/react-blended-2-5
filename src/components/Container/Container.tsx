import React from "react";

import styled from "./Container.module.css";

interface IContainer {
  children: any;
}

export default function Container({ children }: IContainer) {
  return <div className={styled.container}>{children}</div>;
}
