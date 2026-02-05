import * as Yup from "yup"
import type { TestCase, TestCaseFormValues, TestStep } from "./TestSuite.types"

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

export const DUMMY_TEST_STEPS: Record<string, TestStep[]> = {
  "tc-1": [
    { id: "ts-1-1", name: "Navigate to login page", durationMs: 1240, result: "passed", screenshotUrl: "https://placehold.co/400x250?text=Login+Page" },
    { id: "ts-1-2", name: "Enter credentials", durationMs: 430, result: "passed", screenshotUrl: "https://placehold.co/400x250?text=Enter+Credentials" },
    { id: "ts-1-3", name: "Click login button", durationMs: 890, result: "passed", screenshotUrl: "https://placehold.co/400x250?text=Click+Login" },
    { id: "ts-1-4", name: "Verify dashboard redirect", durationMs: 1560, result: "passed", screenshotUrl: "https://placehold.co/400x250?text=Dashboard" },
  ],
  "tc-2": [
    { id: "ts-2-1", name: "Browse product list", durationMs: 980, result: "passed", screenshotUrl: "https://placehold.co/400x250?text=Product+List" },
    { id: "ts-2-2", name: "Click on item", durationMs: 340, result: "passed", screenshotUrl: "https://placehold.co/400x250?text=Product+Detail" },
    { id: "ts-2-3", name: "Click add to cart", durationMs: 620, result: "failed", screenshotUrl: "https://placehold.co/400x250?text=Add+to+Cart" },
    { id: "ts-2-4", name: "Verify cart count updates", durationMs: 510, result: "skipped", screenshotUrl: "https://placehold.co/400x250?text=Cart+Count" },
  ],
  "tc-3": [
    { id: "ts-3-1", name: "Open cart", durationMs: 450, result: "passed", screenshotUrl: "https://placehold.co/400x250?text=Open+Cart" },
    { id: "ts-3-2", name: "Proceed to checkout", durationMs: 730, result: "passed", screenshotUrl: "https://placehold.co/400x250?text=Checkout" },
    { id: "ts-3-3", name: "Fill shipping info", durationMs: 1200, result: "passed", screenshotUrl: "https://placehold.co/400x250?text=Shipping+Info" },
    { id: "ts-3-4", name: "Place order", durationMs: 2100, result: "failed", screenshotUrl: "https://placehold.co/400x250?text=Place+Order" },
    { id: "ts-3-5", name: "Verify confirmation", durationMs: 880, result: "skipped", screenshotUrl: "https://placehold.co/400x250?text=Confirmation" },
  ],
  "tc-4": [
    { id: "ts-4-1", name: "Click profile icon", durationMs: 320, result: "passed", screenshotUrl: "https://placehold.co/400x250?text=Profile+Icon" },
    { id: "ts-4-2", name: "Click logout", durationMs: 480, result: "passed", screenshotUrl: "https://placehold.co/400x250?text=Click+Logout" },
    { id: "ts-4-3", name: "Verify redirect to login page", durationMs: 950, result: "passed", screenshotUrl: "https://placehold.co/400x250?text=Redirected+Login" },
  ],
}
