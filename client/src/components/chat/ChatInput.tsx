import { useState } from "react";
import useChatMutation from "../../service/useChatMutation";
import Action from "../action/Action";
import { ActionProvider } from "../../context/ActionContext";

type Props = {
  onSendChat: (value: string) => void;
  onSuccess: () => void;
};

export default function ChatInput({ onSendChat, onSuccess }: Props) {
  const [value, setValue] = useState("");

  const chatMutation = useChatMutation();
  const handleSendChat = () => {
    chatMutation.mutate(value, {
      onSuccess,
    });
    onSendChat(value);
    setValue("");
  };
  return (
    <div className="shadow-[rgba(0,0,0,0.05)] rounded-lg text-gray-900 shadow-[0_0_1rem_0.125rem] h-[10rem] w-full pb-4 grid grid-cols-[1fr_auto] border-[1px] border-slate-200 relative">
      <Action />

      <textarea
        className="w-full h-full resize-none overflow-visible outline-none py-4 pl-8"
        placeholder="Use Alt+K for shortcuts"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      ></textarea>
      <div className="px-4 flex flex-col justify-end h-full ">
        <i
          className="bx bxs-send p-2 text-lg w-10 aspect-square bg-slate-100 rounded-lg flex justify-center items-center hover:opacity-50 transition-all duration-200 cursor-pointer"
          onClick={handleSendChat}
        ></i>
      </div>
    </div>
  );
}
