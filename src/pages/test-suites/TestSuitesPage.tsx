import { Box } from "@chakra-ui/react";
import TestSuiteFormContainer from "./containers/TestSuiteFormContainer";
import TestSuiteTable from "./components/TestSuiteTable";

function TestSuitesPage() {
  return (
    <Box className="container" py={6} mx="auto">
      <Box display="flex" gap={8}>
        <Box w="80" flexShrink={0} overflowY="auto">
          <TestSuiteFormContainer />
        </Box>
        <Box flex="1" overflowY="auto">
          <TestSuiteTable />
        </Box>
      </Box>
    </Box>
  );
}

export default TestSuitesPage;
