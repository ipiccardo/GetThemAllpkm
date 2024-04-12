import { Skeleton } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";

const CustomSkeleton = ({ fromCards }) => {
  // Define el tamaño del skeleton según el ancho de la pantalla
  const skeletonWidth = useBreakpointValue({
    base: "100%",
    sm: "384px",
    md: "384px",
    lg: "384px",
  });
  const skeletonHeight = useBreakpointValue({
    base: fromCards ? "524px" : "100px",
    sm: fromCards ? "524px" : "200px",
    md: fromCards ? "524px" : "300px",
    lg: fromCards ? "524px" : "400px",
  });

  return <Skeleton width={skeletonWidth} height={skeletonHeight} />;
};

export default CustomSkeleton;
