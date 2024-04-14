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

  return (
    <Flex alignItems="center" minH="100vh" justifyContent="center">
      <Container p="10" maxW="container.lg">
        <Stack p="5" alignItems="center" spacing="5">
          <>
            <SearchBar />
          </>
          <SimpleGrid
            mt="10"
            spacing="5"
            columns={isLargerThan766 ? { base: 1, md: 5 } : 1}
          >
            {Array.from({ length: 20 }).map((_, index) => (
              <div key={new Date().getTime() + index}>
                <MyLoader />
              </div>
            ))}
          </SimpleGrid>
          <CustomPagination />
        </Stack>
      </Container>
    </Flex>
  );
};

export default LoadingDashboard;
