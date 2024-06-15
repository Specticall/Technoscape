import Progress from "../general.tsx/Progress";

export default function ChatStatistics({
  sentiment,
  urgency,
}: {
  sentiment: number;
  urgency: number;
}) {
  const sentimentPercent = sentiment / 10;
  const urgencyPercent = urgency / 10;

  return (
    <div className="flex justify-end pl-24 pr-16">
      <article className="bg-light p-6 rounded-md flex justify-self-end justify-end items-end flex-col">
        <div className="flex gap-4 items-center mb-2">
          <p className="text-slate-600">Urgency</p>
          <div className="flex w-full items-center justify-center gap-x-3">
            <i className="bx bx-line-chart text-2xl row-span-2 text-slate-600"></i>
            <Progress progress={urgencyPercent} className="w-[10rem]" />
            <div>{urgencyPercent * 100}%</div>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <p className="text-slate-600">Sentiment</p>
          <div className="flex w-full items-center justify-center gap-x-3">
            <i className="bx bx-happy  text-2xl row-span-2 text-slate-600"></i>
            <Progress progress={sentimentPercent} className="w-[10rem]" />
            <div>{sentimentPercent * 100}%</div>
          </div>
        </div>
      </article>
    </div>
  );
}
