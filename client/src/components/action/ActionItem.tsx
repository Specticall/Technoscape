import { ReactElement, ReactNode } from "react";
import { cn } from "../../utils/helper";
import { useDialog } from "../general.tsx/Dialog";

type Props = {
  title: string;
  description: string;
  selected: boolean;
  dialog?: {
    name: string;
    display: string;
  };
};

export default function ActionItem({
  title,
  description,
  selected,
  dialog,
  ...props
}: Props & React.HTMLAttributes<HTMLDivElement>) {
  const { showDialog } = useDialog();

  return (
    <div
      {...props}
      className={cn(
        "grid grid-cols-[auto_1fr_auto] gap-x-2 cursor-pointer hover:pl-8 transition-all duration-200 py-3 px-4 rounded-md",
        selected && "bg-slate-100"
      )}
    >
      <i className="bx bx-right-arrow-alt text-lg"></i>
      <p className="leading-[200%]">{title}</p>
      {dialog ? (
        <div
          className="flex items-center justify-center gap-4 row-span-2 text-accent underline hover:opacity-70 duration-200 transition-all"
          onClick={() => {
            if (!dialog) return;
            showDialog(dialog.name);
          }}
        >
          {dialog?.display}
        </div>
      ) : (
        <div></div>
      )}
      <div></div>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}
