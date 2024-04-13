import { Skeleton } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";

const CustomSkeleton = () => {
  const skeletonWidth = useBreakpointValue({
    base: "100%",
    sm: "384px",
    md: "384px",
    lg: "384px",
  });
  const skeletonHeight = useBreakpointValue({
    base: "100px",
    sm: "200px",
    md: "300px",
    lg: "400px",
  });

  return <Skeleton width={skeletonWidth} height={skeletonHeight} />;
};

export default CustomSkeleton;
