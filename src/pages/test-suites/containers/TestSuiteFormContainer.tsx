import { Formik } from "formik";
import type { FormikHelpers } from "formik";
import TestSuiteForm from "../components/TestSuiteForm";
import {
  TEST_SUITE_FORM_DEFAULTS,
  TEST_SUITE_VALIDATION_SCHEMA,
} from "../TestSuites.constants";
import type { TestSuiteForm as TestSuiteFormType } from "../TestSuites.types";

function TestSuiteFormContainer() {
  const handleSubmit = (
    values: TestSuiteFormType,
    { setSubmitting, resetForm }: FormikHelpers<TestSuiteFormType>,
  ) => {
    // TODO: wire up API call
    console.log("submitted", values);
    setSubmitting(false);
    resetForm();
  };

  return (
    <Formik
      initialValues={TEST_SUITE_FORM_DEFAULTS}
      validationSchema={TEST_SUITE_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {(formik) => <TestSuiteForm formik={formik} />}
    </Formik>
  );
}

export default TestSuiteFormContainer;
