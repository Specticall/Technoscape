import { useState } from "react";
import { useAction } from "../../../../context/ActionContext";
import useDebounce from "../../../../hooks/useDebounce";
import useLanguageQuery from "../../../../service/useLanguageQuery";
import SearchBar from "../../../general.tsx/SearchBar";
import ActionLanguageNavigator from "./ActionLanguageNavigator";
import LanguageList from "./LanguageList";

export default function ActionLanguageDialog() {
  const [value, setValue] = useState("");

  const { language: selectedLanguage } = useAction();
  const { languageData, paginationInfo, setQuery, nextPage, prevPage } =
    useLanguageQuery({ take: 9 });

  useDebounce(() => {
    setQuery(value);
    return value;
  }, 500);

  return (
    <article className="bg-white p-8 rounded-lg w-full max-w-[45rem]">
      <h2 className="text-xl font-semibold mb-1">{`Translating to ${
        selectedLanguage || "Indonesian"
      }`}</h2>
      <p className="text-slate-400 mb-6 pb-4 border-b-[1px] border-slate-300">
        You can change the translate target language by selecting below{" "}
      </p>

      <SearchBar onChange={setValue} />

      <LanguageList languageData={languageData} />

      <ActionLanguageNavigator
        nextPage={nextPage}
        prevPage={prevPage}
        paginationInfo={paginationInfo}
      />
    </article>
  );
}
