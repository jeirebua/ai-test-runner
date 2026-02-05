export type OS = "linux" | "windows" | "macos"
export type Browser = "chromium" | "firefox" | "safari" | "edge"

export interface TestSuiteForm {
  name: string
  description: string
  url: string
  username: string
  password: string
  os: OS
  browser: Browser
}

export interface TestSuiteRow {
  id: string
  description: string
}
