import { Box, Flex, Text } from "@chakra-ui/react";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Pause,
  SkipForward,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  Code2,
  Copy,
} from "lucide-react";
import { useState } from "react";
import type { TestStep } from "../types/test.types";

interface TestStepCardProps {
  step: TestStep;
  index: number;
}

export const TestStepCard = ({ step, index }: TestStepCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [codeType, setCodeType] = useState<"playwright" | "selenium">("playwright");
  const [copied, setCopied] = useState(false);

  const generatePlaywrightCode = () => {
    if (step.url) {
      return `await page.goto('${step.url}');`;
    }
    if (step.element) {
      if (step.description.toLowerCase().includes('click')) {
        return `await page.locator('${step.element}').click();`;
      }
      if (step.description.toLowerCase().includes('enter') || step.value) {
        return `await page.locator('${step.element}').fill('${step.value || ''}');`;
      }
      return `await page.locator('${step.element}').waitFor();`;
    }
    if (step.found) {
      return `await expect(page.getByText('${step.found}')).toBeVisible();`;
    }
    return `// ${step.description}`;
  };

  const generateSeleniumCode = () => {
    if (step.url) {
      return `driver.get("${step.url}");`;
    }
    if (step.element) {
      const selector = step.element.startsWith('.')
        ? `By.className("${step.element.slice(1)}")`
        : step.element.startsWith('#')
        ? `By.id("${step.element.slice(1)}")`
        : step.element.includes('[')
        ? `By.cssSelector("${step.element}")`
        : `By.cssSelector("${step.element}")`;

      if (step.description.toLowerCase().includes('click')) {
        return `driver.findElement(${selector}).click();`;
      }
      if (step.description.toLowerCase().includes('enter') || step.value) {
        return `driver.findElement(${selector}).sendKeys("${step.value || ''}");`;
      }
      return `driver.findElement(${selector});`;
    }
    if (step.found) {
      return `WebDriverWait(driver, 10).until(\n  EC.visibility_of_element_located((By.XPATH, "//*[contains(text(), '${step.found}')]"))\n);`;
    }
    return `// ${step.description}`;
  };

  const handleCopyCode = () => {
    const code = codeType === "playwright" ? generatePlaywrightCode() : generateSeleniumCode();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusIcon = () => {
    switch (step.status) {
      case "passed":
        return <CheckCircle2 size={20} className="text-green-500" />;
      case "failed":
        return <XCircle size={20} className="text-red-500" />;
      case "running":
        return <Loader2 size={20} className="text-primary-500 animate-spin" />;
      case "skipped":
        return <SkipForward size={20} className="text-gray-400" />;
      case "pending":
        return <Pause size={20} className="text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (step.status) {
      case "passed":
        return "green.500";
      case "failed":
        return "red.500";
      case "running":
        return "primary.500";
      default:
        return "gray.500";
    }
  };

  const getBgColor = () => {
    switch (step.status) {
      case "passed":
        return "green.50";
      case "failed":
        return "red.50";
      case "running":
        return "primary.50";
      default:
        return "gray.50";
    }
  };

  const hasDetails =
    step.element ||
    step.value ||
    step.url ||
    step.found ||
    step.error ||
    step.screenshot;

  return (
    <Box
      bg={getBgColor()}
      borderWidth="1px"
      borderColor={
        step.status === "pending" ? "gray.200" : `${getStatusColor()}`
      }
      borderLeftWidth="4px"
      rounded="md"
      p={4}
      transition="all 0.2s"
      cursor={hasDetails ? "pointer" : "default"}
      _hover={hasDetails ? { shadow: "sm" } : {}}
      onClick={() => hasDetails && setIsExpanded(!isExpanded)}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" gap={3} flex={1}>
          {getStatusIcon()}
          <Box flex={1}>
            <Flex alignItems="center" gap={2}>
              <Text fontSize="sm" fontWeight="medium" color="gray.700">
                Step {index + 1}: {step.description}
              </Text>
              {step.status === "running" && (
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
            {step.duration !== undefined && (
              <Text fontSize="xs" color="gray.500" mt={1}>
                {(step.duration / 1000).toFixed(1)}s
              </Text>
            )}
          </Box>
        </Flex>

        {hasDetails && (
          <Box color="gray.400">
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </Box>
        )}
      </Flex>

      {/* Expanded Details */}
      {isExpanded && hasDetails && (
        <Box mt={4} pt={4} borderTopWidth="1px" borderColor="gray.200">
          {step.url && (
            <Flex gap={2} mb={2}>
              <Text
                fontSize="xs"
                fontWeight="semibold"
                color="gray.600"
                minWidth="80px"
              >
                URL:
              </Text>
              <Text fontSize="xs" color="gray.700" fontFamily="mono">
                {step.url}
              </Text>
            </Flex>
          )}

          {step.element && (
            <Flex gap={2} mb={2}>
              <Text
                fontSize="xs"
                fontWeight="semibold"
                color="gray.600"
                minWidth="80px"
              >
                Element:
              </Text>
              <Text fontSize="xs" color="gray.700" fontFamily="mono">
                {step.element}
              </Text>
            </Flex>
          )}

          {step.value && (
            <Flex gap={2} mb={2}>
              <Text
                fontSize="xs"
                fontWeight="semibold"
                color="gray.600"
                minWidth="80px"
              >
                Value:
              </Text>
              <Text fontSize="xs" color="gray.700">
                {step.value}
              </Text>
            </Flex>
          )}

          {step.found && (
            <Flex gap={2} mb={2}>
              <Text
                fontSize="xs"
                fontWeight="semibold"
                color="gray.600"
                minWidth="80px"
              >
                Found:
              </Text>
              <Text fontSize="xs" color="gray.700">
                "{step.found}"
              </Text>
            </Flex>
          )}

          {step.error && (
            <Flex gap={2} mb={2}>
              <Text
                fontSize="xs"
                fontWeight="semibold"
                color="red.600"
                minWidth="80px"
              >
                Error:
              </Text>
              <Text fontSize="xs" color="red.700">
                {step.error}
              </Text>
            </Flex>
          )}

          {step.screenshot && (
            <Flex alignItems="center" gap={2} mt={3}>
              <ImageIcon size={16} className="text-gray-500" />
              <Text
                fontSize="xs"
                color="primary.500"
                fontWeight="medium"
                _hover={{ textDecoration: "underline" }}
                cursor="pointer"
              >
                View Screenshot
              </Text>
            </Flex>
          )}

          {/* Code Generation Section */}
          <Box
            mt={4}
            pt={4}
            borderTopWidth="1px"
            borderColor="gray.200"
          >
            <Flex alignItems="center" justifyContent="space-between" mb={2}>
              <Flex alignItems="center" gap={2}>
                <Code2 size={14} className="text-gray-600" />
                <Text fontSize="xs" fontWeight="semibold" color="gray.600">
                  Generated Code
                </Text>
              </Flex>
              <Flex gap={2}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCodeType("playwright");
                  }}
                  className={`px-2 py-1 text-xs rounded ${
                    codeType === "playwright"
                      ? "bg-primary-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Playwright
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCodeType("selenium");
                  }}
                  className={`px-2 py-1 text-xs rounded ${
                    codeType === "selenium"
                      ? "bg-primary-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Selenium
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyCode();
                  }}
                  className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center gap-1"
                >
                  <Copy size={12} />
                  {copied ? "Copied!" : "Copy"}
                </button>
              </Flex>
            </Flex>
            <Box
              bg="gray.900"
              rounded="md"
              p={3}
              fontFamily="mono"
              fontSize="xs"
              color="gray.100"
              overflowX="auto"
            >
              <pre style={{ margin: 0 }}>
                {codeType === "playwright"
                  ? generatePlaywrightCode()
                  : generateSeleniumCode()}
              </pre>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
