import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import TestSuitesPage from "./pages/test-suites/TestSuitesPage";
import { TestSuitePage } from "./pages/test-suite";

function App() {
  return (
    <Box display="flex" flexDir="column" h="100vh">
      <Header />
      <Routes>
        <Route path="/" element={<TestSuitesPage />} />
        <Route path="/test-suite/:testSuiteId" element={<TestSuitePage />} />
      </Routes>
    </Box>
  );
}

export default App;
