import { cn } from "../../utils/helper";

type Props = {
  highlighted?: boolean;
  name: string;
  description: string;
};

export default function CompanyCard({ highlighted, name, description }: Props) {
  return (
    <article
      className={cn(
        "p-4 gap-x-4 grid grid-cols-[auto_1fr] rounded-md",
        highlighted && "bg-slate-100"
      )}
    >
      <div className="w-10 aspect-square bg-slate-500 rounded-full row-span-2"></div>
      <div>
        <h3>Company Name</h3>
      </div>
      <p className="text-gray-400">Lorem ipsum dolor sit...</p>
    </article>
  );
}
