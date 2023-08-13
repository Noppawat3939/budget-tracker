import { Skeleton } from "@/components";

type UseRenderSkeletonParams = { isShow: boolean; length?: number };

export default function useRenderSkeleton({
  length,
  isShow,
}: UseRenderSkeletonParams) {
  const renderSkeleton = Array.from({ length: length || 1 }).fill(
    <Skeleton isShow={isShow} />
  ) as JSX.Element[];

  return { renderSkeleton };
}
