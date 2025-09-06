import type { ReactNode } from "react";
import styled from "./Modal.module.css";

interface IModal {
  children: ReactNode;
}

export default function Modal({ children }: IModal) {
  return (
    <div className={styled.backdrop} role="dialog" aria-modal="true">
      <div className={styled.modal}>
        <button className={styled.closeButton} aria-label="Close modal">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
