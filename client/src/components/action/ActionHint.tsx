import { Icon } from "@iconify/react/dist/iconify.js";

export default function ActionHint() {
  return (
    <ul className="flex gap-8 px-6 py-4 ">
      <li className="flex gap-2 items-center justify-center">
        <i className="bx bxs-up-arrow bg-slate-100 p-[0.375rem] rounded-sm text-[0.75rem]"></i>
        <i className="bx bxs-down-arrow bg-slate-100 p-[0.375rem] rounded-sm text-[0.75rem]"></i>
        <p className="text-slate-400">to navigate</p>
      </li>
      <li className="flex gap-[0.375rem] items-center justify-start flex-1 ">
        <div className="bg-slate-100 p-[0.375rem] rounded-sm">
          <Icon icon="streamline:return-2-solid" width={"12px"} />
        </div>
        <p className="text-slate-400">to select</p>
      </li>
      <li className="flex gap-[0.375rem] items-center justify-center">
        <div className="bg-slate-100 p-[0.375rem] rounded-sm text-[0.75rem]">
          esc
        </div>
        <p className="text-slate-400">to close</p>
      </li>
    </ul>
  );
}
