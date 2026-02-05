import { Accordion, Box, Drawer, Image, Text } from "@chakra-ui/react";
import type { TestCase, TestStep } from "../TestSuite.types";
import { DUMMY_TEST_STEPS } from "../TestSuite.constants";

const RESULT_COLORS: Record<string, string> = {
  passed: "green.500",
  failed: "red.500",
  skipped: "gray.500",
};

interface TestStepDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTestCase: TestCase | null;
}

function TestStepDrawer({
  isOpen,
  onClose,
  selectedTestCase,
}: TestStepDrawerProps) {
  const steps: TestStep[] = selectedTestCase
    ? (DUMMY_TEST_STEPS[selectedTestCase.id] ?? [])
    : [];

  return (
    <Drawer.Root
      open={isOpen}
      closeOnEscape
      onOpenChange={onClose}
      placement="end"
      size="lg"
    >
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>
              {selectedTestCase?.name ?? "Test Steps"}
            </Drawer.Title>
            <Drawer.CloseTrigger />
          </Drawer.Header>
          <Drawer.Body>
            <Accordion.Root multiple defaultValue={steps.length ? [steps[0].id] : []}>
              {steps.map((step, index) => (
                <Accordion.Item key={step.id} value={step.id}>
                  <Accordion.ItemTrigger>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={3}
                      w="100%"
                      py={2}
                    >
                      <Text
                        fontSize="sm"
                        color="gray.500"
                        w="6"
                        textAlign="center"
                      >
                        {index + 1}
                      </Text>
                      <Text
                        fontSize="sm"
                        fontWeight="medium"
                        flex="1"
                        textAlign="left"
                      >
                        {step.name}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {step.durationMs} ms
                      </Text>
                      <Text
                        fontSize="xs"
                        fontWeight="semibold"
                        color="white"
                        bg={RESULT_COLORS[step.result]}
                        px={2}
                        py={0.5}
                        borderRadius="full"
                        textTransform="capitalize"
                      >
                        {step.result}
                      </Text>
                    </Box>
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Box px={2} pb={3}>
                      <Image
                        src={step.screenshotUrl}
                        alt={`Screenshot of ${step.name}`}
                        w="100%"
                        borderRadius="md"
                        border="1px solid"
                        borderColor="gray.200"
                      />
                    </Box>
                  </Accordion.ItemContent>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}

export default TestStepDrawer;
