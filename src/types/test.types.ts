export type TestStepStatus = "pending" | "running" | "passed" | "failed" | "skipped";
export type TestStatus = "pending" | "running" | "passed" | "failed";
export type BrowserType = "chrome" | "firefox" | "safari" | "edge";

export interface TestStep {
  id: string;
  description: string;
  status: TestStepStatus;
  duration?: number;
  screenshot?: string;
  element?: string;
  value?: string;
  error?: string;
  url?: string;
  found?: string;
}

export interface TestConfig {
  url: string;
  browser: BrowserType;
  email?: string;
  password?: string;
}

export interface TestResult {
  id: string;
  name: string;
  description: string;
  status: TestStatus;
  steps: TestStep[];
  duration?: number;
  executedAt?: Date;
  aiSuggestion?: string;
}
