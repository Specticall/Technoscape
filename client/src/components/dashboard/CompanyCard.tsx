import { cn } from "../../utils/helper";

type Props = {
  highlighted?: boolean;
  name: string;
  description: string;
};

export default function CompanyCard({
  highlighted,
  name,
  description,
  ...props
}: Props & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <article
      {...props}
      className={cn(
        "p-4 gap-x-4 grid grid-cols-[auto_1fr] rounded-md",
        highlighted && "bg-slate-100"
      )}
    >
      <div className="w-10 aspect-square bg-slate-500 rounded-full row-span-2"></div>
      <div>
        <h3>{name}</h3>
      </div>
      <p className="text-gray-400">
        {description.length >= 20
          ? description.slice(0, 20) + "..."
          : description}
      </p>
    </article>
  );
}
