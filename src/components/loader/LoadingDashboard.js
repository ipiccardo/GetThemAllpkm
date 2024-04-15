import {
  Flex,
  Container,
  Stack,
  SimpleGrid,
  useMediaQuery,
} from "@chakra-ui/react";
import MyLoader from "./MyLoader";

const LoadingDashboard = () => {
  return Array.from({ length: 20 }).map((_, index) => (
    <div key={new Date().getTime() + index}>
      <MyLoader />
    </div>
  ));
};

export default LoadingDashboard;
