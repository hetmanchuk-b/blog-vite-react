import type {PropsWithChildren} from "react";
import {createPortal} from "react-dom";

interface PortalProps extends PropsWithChildren {
  target: string;
}

export const Portal = ({target, children}: PortalProps) => {
  return createPortal(children, document.getElementById(target)!);
};