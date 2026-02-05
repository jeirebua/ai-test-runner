export interface TestCase {
  id: string
  name: string
  steps: string
}

export interface TestCaseFormValues {
  name: string
  steps: string
}

export type TestStepResult = "passed" | "failed" | "skipped"

export interface TestStep {
  id: string
  name: string
  durationMs: number
  result: TestStepResult
  screenshotUrl: string
}
