type Props = {
  paginationInfo: {
    showing: string;
    outOf: number;
  };
  nextPage: () => void;
  prevPage: () => void;
};

export default function ActionLanguageNavigator({
  paginationInfo,
  nextPage,
  prevPage,
}: Props) {
  return (
    <div className="flex justify-between">
      <p className="text-slate-500">
        Showing <span className="text-slate-800">{paginationInfo.showing}</span>{" "}
        out of <span className="text-slate-800">{paginationInfo.outOf}</span>
      </p>
      <div className="flex gap-4">
        <i
          className="bx bx-chevron-left text-2xl cursor-pointer hover:text-slate-500 transition-all duration-200"
          onClick={prevPage}
        ></i>
        <i
          className="bx bx-chevron-right text-2xl cursor-pointer hover:text-slate-500 transition-all duration-200"
          onClick={nextPage}
        ></i>
      </div>
    </div>
  );
}
