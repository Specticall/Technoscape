import Skeleton from "react-loading-skeleton";

export default function ChatSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-8 bg-red-200`">
        <div className="flex [&>span]:flex [&>span]:justify-end [&>span]:w-full pl-24">
          <Skeleton className="h-16 max-w-[40rem]" />
        </div>
        <div className="pr-24">
          <Skeleton className="h-8 max-w-[8rem] mb-2" />
          <Skeleton className="h-24 max-w-[60rem] " />
        </div>
        <div className="flex [&>span]:flex [&>span]:justify-end [&>span]:w-full pl-24">
          <Skeleton className="h-16 max-w-[40rem]" />
        </div>
        <div className="pr-24">
          <Skeleton className="h-8 max-w-[8rem] mb-2" />
          <Skeleton className="h-36 max-w-[60rem] " />
        </div>
        <div className="flex [&>span]:flex [&>span]:justify-end [&>span]:w-full pl-24">
          <Skeleton className="h-24 max-w-[60rem]" />
        </div>
        <div className="pr-24">
          <Skeleton className="h-8 max-w-[8rem] mb-2" />
          <Skeleton className="h-24 max-w-[60rem] " />
        </div>
      </div>
    </>
  );
}
