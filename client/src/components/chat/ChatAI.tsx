import { useState } from "react";
import Icons from "../Icons";
import Button from "../general.tsx/Button";
import { Icon } from "@iconify/react";
import LoadingSpinner from "../general.tsx/LoadingSpinner";
import { usePopup } from "../general.tsx/Popup";

type Params = {
  message: string;
  topic: string;
  onRegenerate: (id: string) => void;
  canRegenerate: boolean;
  id: string;
};

export default function ChatAI({
  message,
  topic,
  onRegenerate,
  canRegenerate,
  id,
}: Params) {
  const [isLoading, setIsLoading] = useState(false);
  const { notify } = usePopup();

  const handleCopy = async () => {
    try {
      if (!message) return;
      await navigator.clipboard.writeText(message);
      notify("Copied to clipboard");
    } catch (err) {
      notify("Fail copying to clipboard");
    }
  };

  return (
    <article className="grid grid-cols-[auto_1fr] gap-x-4 mr-16 max-w-[80rem]">
      <div className="[&>svg]:w-[20px] row-span-2">
        <Icons icon="star" />
      </div>
      <div className="flex gap-4 items-center mb-2">
        <h2 className="pt-2">Real AI</h2>
      </div>
      <div className="bg-accent p-6 rounded-xl rounded-bl-sm text-gray-100 mt-2 flex flex-col">
        <p className="mb-4 gap-4">
          <span className="font-semibold">Topic</span>
          <span className="ml-2 font-[400]">{topic}</span>
        </p>
        <div className="grid grid-cols-[1fr_auto] gap-x-6 flex-1">
          <div className="flex flex-col gap-8 items-start">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center gap-4 pt-6">
                <LoadingSpinner size={"md"} />
                <p className="text-slate-200">Regenerating Responses</p>
              </div>
            ) : (
              <p className="font-[400] text-gray-100 leading-[175%] ">
                {message}
              </p>
            )}
            {canRegenerate && (
              <Button
                variant="secondary"
                className="flex items-center justify-center gap-2"
                onClick={() => {
                  onRegenerate(id);
                  setIsLoading(true);
                }}
                disabled={isLoading}
              >
                <Icon icon="mingcute:flash-fill" />
                Regenerate
              </Button>
            )}
          </div>
          <i
            onClick={handleCopy}
            className="bx bx-copy text-2xl hover:opacity-75 transition-all duration-200 cursor-pointer self-end"
          ></i>
        </div>
      </div>
    </article>
  );
}
