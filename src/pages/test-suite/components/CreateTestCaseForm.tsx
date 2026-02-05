import { Box, Button, Input, Text, Textarea, Dialog } from "@chakra-ui/react";
import type { FormikProps } from "formik";
import type { TestCaseFormValues } from "../TestSuite.types";

interface CreateTestCaseFormProps {
  formik: FormikProps<TestCaseFormValues>;
}

function CreateTestCaseForm({ formik }: CreateTestCaseFormProps) {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = formik;

  return (
    <>
      <Dialog.Body display="flex" flexDir="column" gap={4}>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1} color="gray.700">
            Name
          </Text>
          <Input
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Login"
            borderColor={touched.name && errors.name ? "red.500" : undefined}
          />
          {touched.name && errors.name && (
            <Text color="red.500" fontSize="xs" mt={1}>
              {errors.name}
            </Text>
          )}
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1} color="gray.700">
            Steps
          </Text>
          <Textarea
            name="steps"
            value={values.steps}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Navigate to login, enter credentials, click login"
            borderColor={touched.steps && errors.steps ? "red.500" : undefined}
          />
          {touched.steps && errors.steps && (
            <Text color="red.500" fontSize="xs" mt={1}>
              {errors.steps}
            </Text>
          )}
        </Box>
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.ActionTrigger asChild>
          <Button variant="outline">Cancel</Button>
        </Dialog.ActionTrigger>
        <Button
          type="button"
          bg="primary.500"
          color="white"
          _hover={{ bg: "primary.600" }}
          _active={{ bg: "primary.700" }}
          disabled={isSubmitting}
          onClick={() => handleSubmit()}
        >
          Create
        </Button>
      </Dialog.Footer>
    </>
  );
}

export default CreateTestCaseForm;
