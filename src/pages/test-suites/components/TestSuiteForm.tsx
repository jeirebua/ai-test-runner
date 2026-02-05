import {
  Box,
  Button,
  Card,
  Text,
  Input,
  Textarea,
  NativeSelect,
} from "@chakra-ui/react";
import type { FormikProps } from "formik";
import type { TestSuiteForm as TestSuiteFormType } from "../TestSuites.types";

interface TestSuiteFormProps {
  formik: FormikProps<TestSuiteFormType>;
}

function TestSuiteForm({ formik }: TestSuiteFormProps) {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    handleSubmit,
  } = formik;

  return (
    <Card.Root borderRadius="xl" bg="white">
      <Card.Header>
        <Card.Title>New Test Suite</Card.Title>
      </Card.Header>
      <Card.Body as="form" display="flex" flexDir="column" gap={4}>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>
            Name
          </Text>
          <Input
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Login Flow"
            borderColor={touched.name && errors.name ? "red.500" : undefined}
          />
          {touched.name && errors.name && (
            <Text color="red.500" fontSize="xs" mt={1}>
              {errors.name}
            </Text>
          )}
        </Box>

        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>
            Description
          </Text>
          <Textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Describe what this suite tests"
            borderColor={
              touched.description && errors.description ? "red.500" : undefined
            }
          />
          {touched.description && errors.description && (
            <Text color="red.500" fontSize="xs" mt={1}>
              {errors.description}
            </Text>
          )}
        </Box>

        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>
            URL
          </Text>
          <Input
            name="url"
            value={values.url}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="https://example.com"
            borderColor={touched.url && errors.url ? "red.500" : undefined}
          />
          {touched.url && errors.url && (
            <Text color="red.500" fontSize="xs" mt={1}>
              {errors.url}
            </Text>
          )}
        </Box>

        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>
            Username{" "}
            <Text as="span" color="gray.500">
              (optional)
            </Text>
          </Text>
          <Input
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="user@email.com"
          />
        </Box>

        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>
            Password{" "}
            <Text as="span" color="gray.500">
              (optional)
            </Text>
          </Text>
          <Input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="••••••••"
          />
        </Box>

        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>
            OS
          </Text>

          <NativeSelect.Root size="sm">
            <NativeSelect.Field
              name="os"
              value={values.os}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="linux">Linux</option>
              <option value="windows">Windows</option>
              <option value="macos">macOS</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Box>

        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>
            Browser
          </Text>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field
              placeholder="Select option"
              name="browser"
              value={values.browser}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="chromium">Chromium</option>
              <option value="firefox">Firefox</option>
              <option value="safari">Safari</option>
              <option value="edge">Edge</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Box>

        <Button
          type="button"
          w="100%"
          bg="primary.500"
          color="white"
          _hover={{ bg: "primary.600" }}
          _active={{ bg: "primary.700" }}
          disabled={isSubmitting}
          onClick={() => handleSubmit()}
        >
          Create Test Suite
        </Button>
      </Card.Body>
    </Card.Root>
  );
}

export default TestSuiteForm;
