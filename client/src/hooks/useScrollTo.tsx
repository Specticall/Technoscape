import { MutableRefObject, useCallback, useEffect } from "react";

type Props<T> = {
  scrollAreaRef: MutableRefObject<T>;
};

export default function useScrollTo<T>(
  { scrollAreaRef }: Props<T>,
  dependency: unknown[]
) {
  const scrollToBottom = useCallback(() => {
    if (!scrollAreaRef.current) return;

    const scrollElement = scrollAreaRef.current.querySelector("div>div");

    if (!scrollElement) return;

    scrollElement.scrollTo({
      top: scrollElement.scrollHeight,
      behavior: "smooth",
    });
  }, [scrollAreaRef]);

  useEffect(() => {
    scrollToBottom();
  }, [...dependency, scrollToBottom]);

  return scrollToBottom;
}
