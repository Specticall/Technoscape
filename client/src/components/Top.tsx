import { useCompany } from "../context/CompanyContext";
import useCompanyMutation from "../service/useCompanyMutation";
import Icons from "./Icons";
import LoadingSpinner from "./general.tsx/LoadingSpinner";

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
  const { selectedCompany } = useCompany();
  const { deleteMutation } = useCompanyMutation();

  return (
    <div className="flex items-center justify-center gap-4 px-8 py-4 border-b border-slate-200">
      <div className="w-8 aspect-square bg-gray-400 rounded-full"></div>
      <p className="mr-6">{selectedCompany?.name}</p>
      <ul className="flex-1 flex items-center gap-6">
        <li className="[&>i]:text-xl text-slate-800 cursor-pointer hover:text-slate-500 [&>i]:transition-all [&>i]:duration-200">
          <i className="bx bx-star"></i>
        </li>
        <li className="[&>i]:text-xl text-slate-800 cursor-pointer hover:text-slate-500 [&>i]:transition-all [&>i]:duration-200">
          <i className="bx bxs-archive-in"></i>
        </li>
        <li
          className="[&>i]:text-xl text-slate-800 cursor-pointer hover:text-slate-500 [&>i]:transition-all [&>i]:duration-200"
          onClick={() => {
            if (!selectedCompany || !selectedCompany?.id) return;
            deleteMutation.mutate({ companyId: selectedCompany.id });
          }}
        >
          {deleteMutation.isPending ? (
            <LoadingSpinner size={"sm"} />
          ) : (
            <i className="bx bx-trash"></i>
          )}
        </li>
      </ul>
      <div className="flex gap-3 items-center justify-center">
        <div className="[&>svg]:w-[36px]">
          <Icons icon="logo" />
        </div>
        <p>Powered by AI Copilot</p>
      </div>
    </div>
  );
}
