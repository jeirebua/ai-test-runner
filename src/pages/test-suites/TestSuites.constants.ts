import * as Yup from "yup"
import type { TestSuiteForm, TestSuiteRow } from "./TestSuites.types"

export const TEST_SUITE_COLUMNS = [
  { key: "no" as const, label: "No." },
  { key: "id" as const, label: "ID" },
  { key: "description" as const, label: "Description" },
]

export const TEST_SUITE_FORM_DEFAULTS: TestSuiteForm = {
  name: "",
  description: "",
  url: "",
  username: "",
  password: "",
  os: "linux",
  browser: "chromium",
}

export const TEST_SUITE_VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  url: Yup.string().url("Must be a valid URL").required("URL is required"),
  username: Yup.string(),
  password: Yup.string(),
  os: Yup.string().oneOf(["linux", "windows", "macos"]).required(),
  browser: Yup.string().oneOf(["chromium", "firefox", "safari", "edge"]).required(),
})

export const DUMMY_TEST_SUITES: TestSuiteRow[] = [
  { id: "TS-001", description: "Validates user login and session handling" },
  { id: "TS-002", description: "Checks form validation on signup page" },
  { id: "TS-003", description: "Ensures dashboard components render correctly" },
  { id: "TS-004", description: "End-to-end test for the checkout process" },
]
