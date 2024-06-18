import { Icon } from "@iconify/react/dist/iconify.js";
import ActionHint from "./ActionHint";
import { cn } from "../../utils/helper";
import { useState } from "react";
import useClickOutsideRef from "../../hooks/useClickOutside";
import ActionList from "./ActionList";
import { ScrollArea } from "../general.tsx/ScrollArea";
import { useAction } from "../../context/ActionContext";

export default function Action() {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedAction } = useAction();

  const modalRef = useClickOutsideRef(() => {
    if (!isOpen) return;
    setIsOpen(false);
  });

  return (
    <>
      {/* Floating window */}
      <article
        className={cn(
          "bg-white border-[1px] border-slate-200 absolute inset-0 translate-y-[-19rem] transition-all duration-200 rounded-lg shadow-[0_0_1rem_0.125rem] shadow-[rgba(0,0,0,0.05)] h-[20rem] flex flex-col opacity-0 invisible",
          isOpen && "translate-y-[-21rem] opacity-100 visible"
        )}
        ref={modalRef}
      >
        {/* <ActionHint /> */}
        <ScrollArea className="flex-1">
          <ActionList />
        </ScrollArea>
        <div className="rounded-b-lg  border-t border-slate-200 overflow-hidden">
          <input
            className="px-6 py-4 w-full bg-slate-50"
            placeholder="Search available actions..."
          />
        </div>
      </article>

      {/* Visible tooltip */}
      <div
        className="col-span-2 px-8 pb-2 py-3 bg-light rounded-t-lg cursor-pointer hover:bg-[#f1eeff] duration-200 transition-all"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((cur) => !cur);
        }}
      >
        <header className="text-accent flex gap-4 items-center">
          <Icon
            icon="fluent:text-bullet-list-square-sparkle-16-regular"
            width={"20px"}
          />
          <p className=" flex-1">
            What can I do for you?
            <span className="font-semibold ml-2">{selectedAction}</span>
          </p>
          <i
            className={cn(
              "bx bx-chevron-up text-accent text-2xl leading-[100%] transition-all duration-200",
              isOpen && "rotate-180"
            )}
          ></i>
        </header>
      </div>
    </>
  );
}
