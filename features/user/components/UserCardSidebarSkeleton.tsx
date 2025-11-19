import { Skeleton } from "@/components/feedback/Skeleton";

export default function UserSectionSkeleton() {
  return (
    <section className="p-4 space-y-2 w-full">
      <div className="flex flex-col gap-1 mb-2">
        <div className="flex items-center justify-between w-full mb-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        <Skeleton className="h-3 w-32" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-9 rounded-lg w-full" />
        <Skeleton className="h-9 rounded-lg w-full" />
      </div>
    </section>
  );
}
