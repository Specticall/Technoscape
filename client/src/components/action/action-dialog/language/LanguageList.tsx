import Skeleton from "react-loading-skeleton";
import { useAction } from "../../../../context/ActionContext";
import { Language } from "../../../../service/useLanguageQuery";
import { cn } from "../../../../utils/helper";

type Props = {
  languageData?: Language[];
};

export default function LanguageList({ languageData }: Props) {
  const { language: selectedLanguage, handleChangeLanguage } = useAction();

  if (!languageData)
    return (
      <ul className="mt-6 grid grid-cols-3 gap-4 mb-8">
        {new Array(9).fill("empty").map((_, i) => {
          return <Skeleton height={"3rem"} key={i} />;
        })}
      </ul>
    );

  return (
    <ul className="mt-6 grid grid-cols-3 gap-4 mb-8">
      {languageData?.map(({ language, id }) => {
        const isSelected = language === selectedLanguage;

        return (
          <li
            key={id}
            className={cn(
              "border-[1px] border-slate-100 p-3 rounded-md cursor-pointer duration-200 transition-all",
              isSelected
                ? "bg-accent text-white border-accent"
                : "hover:bg-slate-100"
            )}
            onClick={() => handleChangeLanguage(language)}
          >
            {language}
          </li>
        );
      })}
    </ul>
  );
}
