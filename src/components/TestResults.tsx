import {
  Box,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import {
  Download,
  Copy,
  RefreshCw,
  Edit3,
  FileText,
  CheckCircle2,
  XCircle,
  Lightbulb,
} from "lucide-react";
import type { TestResult } from "../types/test.types";
import { TestStepCard } from "./TestStepCard";

interface TestResultsProps {
  result: TestResult;
  onRunAgain?: () => void;
  progress?: number;
}

export const TestResults = ({
  result,
  onRunAgain,
  progress,
}: TestResultsProps) => {
  const isRunning = result.status === "running";
  const isPassed = result.status === "passed";
  const isFailed = result.status === "failed";

  const handleDownloadReport = () => {
    console.log("Download report");
  };

  const handleCopyCode = () => {
    console.log("Copy code");
  };

  const handleEditTest = () => {
    console.log("Edit test");
  };

  const handleViewLogs = () => {
    console.log("View logs");
  };

  return (
    <Box>
      {/* Progress Bar */}
      {isRunning && progress !== undefined && (
        <Box mb={6}>
          <Flex justifyContent="space-between" mb={2}>
            <Text fontSize="sm" fontWeight="medium" color="gray.700">
              Status: Running...
            </Text>
            <Text fontSize="sm" fontWeight="medium" color="primary.500">
              {Math.round(progress)}%
            </Text>
          </Flex>
          <Box
            w="full"
            h="2"
            bg="gray.200"
            rounded="full"
            overflow="hidden"
          >
            <Box
              h="full"
              bg="primary.500"
              rounded="full"
              transition="width 0.3s ease"
              style={{ width: `${progress}%` }}
            />
          </Box>
        </Box>
      )}

      {/* Test Results Header */}
      {!isRunning && (
        <Box
          bg="white"
          borderWidth="1px"
          borderColor="gray.200"
          rounded="lg"
          p={6}
          mb={6}
          shadow="sm"
        >
          <Flex alignItems="center" justifyContent="space-between" mb={4}>
            <Flex alignItems="center" gap={3}>
              {isPassed ? (
                <CheckCircle2 size={32} className="text-green-500" />
              ) : (
                <XCircle size={32} className="text-red-500" />
              )}
              <Box>
                <Text fontSize="xl" fontWeight="bold" color="gray.800">
                  Test {isPassed ? "Passed" : "Failed"}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {result.executedAt?.toLocaleString()}
                </Text>
              </Box>
            </Flex>

            <Text fontSize="lg" fontWeight="semibold" color="gray.600">
              Duration: {result.duration?.toFixed(1)}s
            </Text>
          </Flex>

          {/* AI Suggestion for Failed Tests */}
          {isFailed && result.aiSuggestion && (
            <Box
              bg="yellow.50"
              borderWidth="1px"
              borderColor="yellow.200"
              borderLeftWidth="4px"
              borderLeftColor="yellow.500"
              rounded="md"
              p={4}
              mt={4}
            >
              <Flex alignItems="start" gap={3}>
                <Lightbulb size={20} className="text-yellow-600 mt-0.5" />
                <Box flex={1}>
                  <Text
                    fontSize="sm"
                    fontWeight="semibold"
                    color="yellow.800"
                    mb={1}
                  >
                    AI Suggestion:
                  </Text>
                  <Text fontSize="sm" color="yellow.700">
                    {result.aiSuggestion}
                  </Text>
                </Box>
              </Flex>
            </Box>
          )}

          {/* Action Buttons */}
          <Flex gap={3} mt={6} flexWrap="wrap">
            <Button
              onClick={onRunAgain}
              size="sm"
              bg="primary.500"
              color="white"
              _hover={{ bg: "primary.600" }}
            >
              <Flex alignItems="center" gap={2}>
                <RefreshCw size={16} />
                <Text>{isFailed ? "Retry Test" : "Run Again"}</Text>
              </Flex>
            </Button>

            <Button
              onClick={handleDownloadReport}
              size="sm"
              variant="outline"
              borderColor="gray.300"
              _hover={{ bg: "gray.50" }}
            >
              <Flex alignItems="center" gap={2}>
                <Download size={16} />
                <Text>Download Report</Text>
              </Flex>
            </Button>

            <Button
              onClick={handleCopyCode}
              size="sm"
              variant="outline"
              borderColor="gray.300"
              _hover={{ bg: "gray.50" }}
            >
              <Flex alignItems="center" gap={2}>
                <Copy size={16} />
                <Text>Copy Code</Text>
              </Flex>
            </Button>

            {isFailed && (
              <>
                <Button
                  onClick={handleEditTest}
                  size="sm"
                  variant="outline"
                  borderColor="gray.300"
                  _hover={{ bg: "gray.50" }}
                >
                  <Flex alignItems="center" gap={2}>
                    <Edit3 size={16} />
                    <Text>Edit Test</Text>
                  </Flex>
                </Button>

                <Button
                  onClick={handleViewLogs}
                  size="sm"
                  variant="outline"
                  borderColor="gray.300"
                  _hover={{ bg: "gray.50" }}
                >
                  <Flex alignItems="center" gap={2}>
                    <FileText size={16} />
                    <Text>View Logs</Text>
                  </Flex>
                </Button>
              </>
            )}
          </Flex>
        </Box>
      )}

      {/* Test Steps */}
      <Box
        bg="white"
        borderWidth="1px"
        borderColor="gray.200"
        rounded="lg"
        p={6}
        shadow="sm"
      >
        <Flex alignItems="center" gap={2} mb={4}>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700">
            {isRunning ? "Real-time Results" : "Test Steps"}
          </Text>
          {isRunning && (
            <Box
              as="span"
              h="2"
              w="2"
              bg="primary.500"
              rounded="full"
              animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
            />
          )}
        </Flex>

        <Flex direction="column" gap={3}>
          {result.steps.map((step, index) => (
            <TestStepCard key={step.id} step={step} index={index} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};
