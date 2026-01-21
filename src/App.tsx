import { Box, Container } from "@chakra-ui/react";
import { useState } from "react";
import { Header } from "./components/Header";
import { TestConfigForm } from "./components/TestConfigForm";
import { TestResults } from "./components/TestResults";
import {
  executeTest,
  parseTestDescription,
} from "./services/testRunner.service";
import type { TestConfig, TestResult } from "./types/test.types";

function App() {
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleRunTest = async (description: string, config: TestConfig) => {
    setIsRunning(true);
    setProgress(0);

    try {
      // Parse test description to generate steps
      const steps = await parseTestDescription(description);

      // Initialize test result
      const initialResult: TestResult = {
        id: Math.random().toString(36).substring(7),
        name: "Test Execution",
        description,
        status: "running",
        steps,
      };

      setTestResult(initialResult);

      // Execute test with real-time updates
      await executeTest({
        steps,
        config,
        onStepUpdate: (stepId, updates) => {
          setTestResult((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              steps: prev.steps.map((step) =>
                step.id === stepId ? { ...step, ...updates } : step,
              ),
            };
          });
        },
        onProgressUpdate: (progressValue) => {
          setProgress(progressValue);
        },
      });

      // Update final result
      setTestResult((prev) => {
        if (!prev) return prev;

        const hasFailure = prev.steps.some((s) => s.status === "failed");
        const totalDuration =
          prev.steps.reduce((sum, s) => sum + (s.duration || 0), 0) / 1000;

        let aiSuggestion: string | undefined;
        if (hasFailure) {
          const suggestions = [
            "The element selector may have changed. Try inspecting the page for the correct selector.",
            "The page may still be loading. Consider adding a wait condition before this step.",
            "This element might be inside a shadow DOM or iframe. Check the element hierarchy.",
            "The element might have a different selector. Try using data-testid attributes instead.",
            "Network latency may be causing timeouts. Consider increasing the timeout duration.",
          ];
          aiSuggestion =
            suggestions[Math.floor(Math.random() * suggestions.length)];
        }

        return {
          ...prev,
          status: hasFailure ? "failed" : "passed",
          duration: totalDuration,
          executedAt: new Date(),
          aiSuggestion,
        };
      });
    } catch (error) {
      console.error("Test execution failed:", error);
    } finally {
      setIsRunning(false);
    }
  };

  const handleRunAgain = () => {
    if (testResult) {
      // Reset test result
      setTestResult(null);
      setProgress(0);
    }
  };

  return (
    <Box minHeight="100vh" bg="gray.50">
      <Header />

      <Container maxW="container.xl" py={8}>
        <Box mb={8}>
          <TestConfigForm onRunTest={handleRunTest} isRunning={isRunning} />
        </Box>

        {testResult && (
          <TestResults
            result={testResult}
            onRunAgain={handleRunAgain}
            progress={progress}
          />
        )}
      </Container>
    </Box>
  );
}

export default App;
