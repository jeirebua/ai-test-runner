import {
  Box,
  Button,
  Heading,
  Table,
} from "@chakra-ui/react"
import { Play, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { TEST_SUITE_COLUMNS, DUMMY_TEST_SUITES } from "../TestSuites.constants"

function TestSuiteTable() {
  const navigate = useNavigate()

  return (
    <Box>
      <Heading size="md" mb={4}>Test Suites</Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row bg="primary.500">
            {TEST_SUITE_COLUMNS.map((col) => (
              <Table.ColumnHeader key={col.key} color="white">{col.label}</Table.ColumnHeader>
            ))}
            <Table.ColumnHeader color="white">Actions</Table.ColumnHeader>
            <Table.ColumnHeader color="white" w="10" />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {DUMMY_TEST_SUITES.map((row, index) => (
            <Table.Row
              key={row.id}
              cursor="pointer"
              _hover={{ bg: "gray.50" }}
              onClick={() => navigate(`/test-suite/${row.id}`)}
            >
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{row.id}</Table.Cell>
              <Table.Cell>{row.description}</Table.Cell>
              <Table.Cell onClick={(e) => e.stopPropagation()}>
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

export default TestSuiteTable
