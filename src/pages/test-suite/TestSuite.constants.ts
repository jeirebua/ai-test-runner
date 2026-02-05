import * as Yup from "yup"
import type { TestCase, TestCaseFormValues } from "./TestSuite.types"

export const TEST_CASE_FORM_DEFAULTS: TestCaseFormValues = {
  name: "",
  steps: "",
}

export const TEST_CASE_VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  steps: Yup.string().required("Steps are required"),
})

export const TEST_CASE_COLUMNS = [
  { key: "no" as const, label: "No." },
  { key: "name" as const, label: "Name" },
  { key: "steps" as const, label: "Steps" },
]

export const DUMMY_TEST_CASES: TestCase[] = [
  {
    id: "tc-1",
    name: "Login",
    steps: "Navigate to login page, enter credentials, click login, verify dashboard redirect",
  },
  {
    id: "tc-2",
    name: "Add to Cart",
    steps: "Browse product list, click on item, click add to cart, verify cart count updates",
  },
  {
    id: "tc-3",
    name: "Checkout",
    steps: "Open cart, proceed to checkout, fill shipping info, place order, verify confirmation",
  },
  {
    id: "tc-4",
    name: "Logout",
    steps: "Click profile icon, click logout, verify redirect to login page",
  },
]
