import {
  Flex,
  Container,
  Stack,
  SimpleGrid,
  useMediaQuery,
} from "@chakra-ui/react";
import SearchBar from "../searchBar/SearchBar";
import MyLoader from "./MyLoader";
import CustomPagination from "../Pagination/Pagination";

const LoadingDashboard = () => {
  const [isLargerThan766] = useMediaQuery("(min-width: 766px)");

  return Array.from({ length: 20 }).map((_, index) => (
    <div key={new Date().getTime() + index}>
      <MyLoader />
    </div>
  ));
};

export default LoadingDashboard;
