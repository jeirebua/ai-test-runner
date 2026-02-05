import { Box, Breadcrumb } from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";
import TestCaseTable from "./components/TestCaseTable";

function TestSuitePage() {
  const { testSuiteId } = useParams<{ testSuiteId: string }>();

  return (
    <Box className="container" py={6} mx="auto">
      <Breadcrumb.Root mb={6}>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link
              color="primary.500"
              _hover={{ textDecoration: "underline" }}
            >
              <Link to="/">Test suite</Link>
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink color="gray.600">
              {testSuiteId}
            </Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
      <TestCaseTable />
    </Box>
  );
}

export default TestSuitePage;
