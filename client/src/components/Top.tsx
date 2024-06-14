import Icons from "./Icons";

const options = [
  {
    icon: <i className="bx bx-star"></i>,
    action: () => {},
  },
  {
    icon: <i className="bx bxs-archive-in"></i>,
    action: () => {},
  },
  {
    icon: <i className="bx bx-trash"></i>,
    action: () => {},
  },
];

export default function Top() {
  return (
    <div className="flex items-center justify-center gap-4 px-8 py-4 border-b border-slate-200">
      <div className="w-8 aspect-square bg-gray-400 rounded-full"></div>
      <p className="mr-6">Name</p>
      <ul className="flex-1 flex items-center gap-6">
        {options.map((option) => {
          return (
            <li className="[&>i]:text-xl text-slate-800 cursor-pointer hover:text-slate-500 [&>i]:transition-all [&>i]:duration-200">
              {option.icon}
            </li>
          );
        })}
      </ul>
      <div className="flex gap-3 items-center justify-center">
        <div className="[&>svg]:w-[26px]">
          <Icons icon="star" />
        </div>
        <p>Powered by AI Copilot</p>
      </div>
    </div>
  );
}
