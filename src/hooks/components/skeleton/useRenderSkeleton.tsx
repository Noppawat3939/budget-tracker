import { Skeleton } from "@/components";
import type { UseRenderSkeletonParams } from "./type";

export default function useRenderSkeleton({
  length,
  isShow,
}: UseRenderSkeletonParams) {
  const renderSkeleton = Array.from({ length: length || 1 }).fill(
    <Skeleton isShow={isShow} />
  ) as JSX.Element[];

  return { renderSkeleton };
}
