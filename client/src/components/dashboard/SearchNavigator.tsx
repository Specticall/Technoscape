import useChatQuery from "../../service/useChatQuery";
import useCompanyQuery from "../../service/useCompanyQuery";

export default function SearchNavigator() {
  const { companyData } = useCompanyQuery();

  return (
    <div className="flex justify-between  items-center mt-4 text-sm mb-8">
      <div className="flex gap-2 items-center justify-center">
        <p>Newest</p>
        <i className="bx bxs-chevron-down"></i>
      </div>
      <p className="flex items-center gap-2 text-gray-600">
        <div className="bg-gray-100 px-[4px] rounded-sm">
          {companyData?.length || 0}
        </div>
        Companies
      </p>
    </div>
  );
}
