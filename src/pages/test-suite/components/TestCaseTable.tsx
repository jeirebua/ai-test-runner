import {
  Box,
  Button,
  Dialog,
  Table,
  Text,
} from "@chakra-ui/react"
import { Play, ChevronRight, Plus } from "lucide-react"
import { TEST_CASE_COLUMNS, DUMMY_TEST_CASES } from "../TestSuite.constants"
import TestCaseFormContainer from "../containers/TestCaseFormContainer"

function TestCaseTable() {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontWeight="semibold" fontSize="lg">Test Cases</Text>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button
              size="sm"
              bg="primary.500"
              color="white"
              _hover={{ bg: "primary.600" }}
              _active={{ bg: "primary.700" }}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <Plus size={14} /> Create Test Case
            </Button>
          </Dialog.Trigger>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Create Test Case</Dialog.Title>
                <Dialog.CloseTrigger />
              </Dialog.Header>
              <TestCaseFormContainer />
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Root>
      </Box>

      <Table.Root>
        <Table.Header>
          <Table.Row bg="primary.500">
            {TEST_CASE_COLUMNS.map((col) => (
              <Table.ColumnHeader key={col.key} color="white">
                {col.label}
              </Table.ColumnHeader>
            ))}
            <Table.ColumnHeader color="white">Actions</Table.ColumnHeader>
            <Table.ColumnHeader color="white" w="10" />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {DUMMY_TEST_CASES.map((testCase, index) => (
            <Table.Row key={testCase.id} cursor="pointer" _hover={{ bg: "gray.50" }}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell fontWeight="medium">{testCase.name}</Table.Cell>
              <Table.Cell color="gray.600">{testCase.steps}</Table.Cell>
              <Table.Cell>
                <Button
                  size="sm"
                  bg="primary.500"
                  color="white"
                  _hover={{ bg: "primary.600" }}
                  _active={{ bg: "primary.700" }}
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Play size={14} /> Run
                </Button>
              </Table.Cell>
              <Table.Cell color="gray.400" _hover={{ color: "primary.500" }}>
                <ChevronRight size={18} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}

export default TestCaseTable
