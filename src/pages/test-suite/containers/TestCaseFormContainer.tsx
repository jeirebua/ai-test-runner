import { Formik } from "formik"
import type { FormikHelpers } from "formik"
import CreateTestCaseForm from "../components/CreateTestCaseForm"
import {
  TEST_CASE_FORM_DEFAULTS,
  TEST_CASE_VALIDATION_SCHEMA,
} from "../TestSuite.constants"
import type { TestCaseFormValues } from "../TestSuite.types"

function TestCaseFormContainer() {
  const handleSubmit = (
    values: TestCaseFormValues,
    { setSubmitting, resetForm }: FormikHelpers<TestCaseFormValues>
  ) => {
    // TODO: wire up API call
    console.log("create test case", values)
    setSubmitting(false)
    resetForm()
  }

  return (
    <Formik
      initialValues={TEST_CASE_FORM_DEFAULTS}
      validationSchema={TEST_CASE_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {(formik) => <CreateTestCaseForm formik={formik} />}
    </Formik>
  )
}

export default TestCaseFormContainer
