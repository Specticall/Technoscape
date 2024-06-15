import { cn } from "../../utils/helper";

/**
 *
 * @param progress Progress value, use decimal (0 - 1)
 * @returns
 */
export default function Progress({
  // Progress value, use decimal (0 - 1)
  progress,
  className,
  ...props
}: {
  progress: number;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      // Progress bar container class
      className={cn(
        "h-2 w-full bg-slate-200 rounded-full relative overflow-hidden",
        className
      )}
      role="progressbar"
    >
      <div
        // Progress bar inner class
        className={cn(
          "absolute inset-0 bg-slate-900 origin-left transition-all rounded-full duration-200"
        )}
        style={{
          width: `${progress * 100}%`,
        }}
      ></div>
    </div>
  );
}
