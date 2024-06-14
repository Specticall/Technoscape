import { Icon } from "@iconify/react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function ChatInput() {
  return (
    <div className="shadow-slate-200 rounded-lg text-gray-900 shadow-[0_0_1rem_0.125rem] h-[10rem] w-full flex py-4">
      <div className="flex flex-col justify-end px-4 hover:opacity-50 transition-all duration-200 cursor-pointer">
        <Icon
          width={"1.75rem"}
          className="self-end"
          icon="fluent:text-bullet-list-square-sparkle-20-regular"
        />
      </div>
      <ScrollArea className="w-full h-full">
        <textarea
          className="w-full h-full resize-none overflow-visible outline-none py-4"
          placeholder="Use Alt+K for shortcuts"
        ></textarea>
      </ScrollArea>
      <div className="px-4 flex flex-col justify-end h-full ">
        <i className="bx bxs-send p-2 text-lg w-10 aspect-square bg-slate-100 rounded-lg flex justify-center items-center hover:opacity-50 transition-all duration-200 cursor-pointer"></i>
      </div>
    </div>
  );
}
