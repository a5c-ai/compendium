import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export interface PortalProps {
  children: React.ReactNode;
}

export const Portal: React.FC<PortalProps> = ({ children }) => {
  const [el] = useState(() => {
    const d = document.createElement("div");
    d.setAttribute("data-tkc-portal", "");
    return d;
  });
  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, [el]);
  return createPortal(children, el);
};
