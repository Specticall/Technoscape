import { useState } from "react";

export default function SearchBar() {
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      <i className="bx bx-search-alt-2 text-xl left-4 top-[50%] translate-y-[-50%] absolute"></i>
      <input
        className="w-full bg-gray-100 px-2 py-3 rounded-md flex items-center gap-3 pl-12"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
    </div>
  );
}
