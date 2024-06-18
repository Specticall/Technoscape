import { useEffect, useRef } from "react";
import { useDialog } from "../components/general.tsx/Dialog";

export default function useClickOutsideRef(callback: () => void) {
  const elementRef = useRef<HTMLElement | null>(null);

  // Remove this and any associated stat variables if you want to use this hook on another project
  const { isShowing } = useDialog();

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!e.target) return;
      const clickedEl = e.target as Node;

      if (element.contains(clickedEl) || isShowing) return;
      callback();
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [callback, isShowing]);

  return elementRef;
}
