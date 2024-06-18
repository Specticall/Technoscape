import { useState } from "react";

type Props = {
  onChange: (value: string) => void;
};

export default function SearchBar({ onChange }: Props) {
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      <i className="bx bx-search-alt-2 text-xl left-4 top-[50%] translate-y-[-50%] absolute"></i>
      <input
        className="w-full bg-slate-100 border-[1px] border-slate-200 px-2 py-3 rounded-md flex items-center gap-3 pl-12"
        placeholder="Search"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      ></input>
    </div>
  );
}
