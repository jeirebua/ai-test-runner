# AI Test Runner - Project Specification

## Overview

An AI-powered test automation tool that allows users to write tests in natural language and execute them in real-time against web applications. Built for a hackathon MVP.

## Tech Stack

- **Frontend**: React with TypeScript
- **UI Libraries**: Chakra UI + Tailwind CSS
- **Icons**: Lucide React
- **Theme Color**: #FF6200 (Primary Brand Color)
- **State Management**: React Hooks (useState)
- **API**: Fake async responses with delays (no MSW)

## Core Features

### 1. Test Input & Configuration

- Natural language test description input (textarea)
- Target URL configuration
- Browser selection (Chrome, Firefox, Safari, Edge)
- Optional test data inputs (email, password)
- "Run Test" button to execute

### 2. Real-time Test Execution

- Live progress bar showing execution percentage
- Real-time step updates as test runs
- Status indicators for each step:
  - ✅ Passed (Green)
  - ❌ Failed (Red)
  - ⏳ Running (Orange/Brand color with animation)
  - ⏸️ Pending (Gray)
  - ⏭️ Skipped (Gray)

### 3. Test Results Display

- Overall test status (Passed/Failed)
- Total duration
- Execution timestamp
- Detailed step breakdown with:
  - Step number and description
  - Status and duration
  - Element selectors used
  - Values entered
  - Screenshots (simulated)
  - Error messages for failures

### 4. Interactive Features

- Expandable step cards (click to see details)
- AI suggestions for failed tests
- Action buttons:
  - 🔄 Run Again / Retry Test
  - 📥 Download Report
  - 📋 Copy Code
  - ✏️ Edit Test (for failed tests)
  - 📋 View Logs

## UI Layout

### Main Interface

```

┌──────────────────────────────────────────────────┐
│ Header: Logo + Title + User Actions │
├──────────────────────────────────────────────────┤
│ Test Configuration Form │
│ - Description textarea │
│ - URL input │
│ - Browser dropdown │
│ - Email/Password inputs (optional) │
│ - Run Test button │
├──────────────────────────────────────────────────┤
│ Progress Bar (when running) │
├──────────────────────────────────────────────────┤
│ Real-time Results (during execution) │
│ - Step cards with live status updates │
├──────────────────────────────────────────────────┤
│ Final Test Results (after completion) │
│ - Summary header │
│ - All steps with details │
│ - AI suggestions (if failed) │
│ - Action buttons │
└──────────────────────────────────────────────────┘

```

## Color Scheme

- **Primary Brand**: #FF6200 (Orange)
  - 50: #FFE8DB
  - 100: #FFCFB8
  - 200: #FFB794
  - 300: #FF9E71
  - 400: #FF854D
  - 500: #FF6200 (Main)
  - 600: #CC4E00
  - 700: #993B00
  - 800: #662700
  - 900: #331400
- **Success**: Green (#10B981)
- **Error**: Red (#EF4444)
- **Warning**: Yellow (#F59E0B)
- **Neutral**: Gray (#6B7280)
- **Background**: Gray 50 (#F9FAFB)

## Test Execution Flow

### 1. Parse Phase

```

User Input (Natural Language)
↓
AI Processing (1s delay)
↓
Generate Test Steps Array

```

### 2. Execution Phase

```

For each step:

- Update status to "running"
- Simulate execution (300-1000ms)
- Random 10% chance of failure
- Update with result (passed/failed)
- If failed: skip remaining steps
- Update progress bar

```

### 3. Results Phase

```

Display final results with:

- Overall status
- Duration
- All steps with details
- AI suggestions (if failed)
- Action buttons

```

## Sample Test Scenarios

### Example 1: Login Flow

**Input**: "Login as admin user, navigate to settings page, and verify profile information is displayed"

**Generated Steps**:

1. Navigate to login page
2. Enter email credentials
3. Enter password
4. Click login button
5. Navigate to settings page
6. Verify profile information displayed

### Example 2: E-commerce Checkout

**Input**: "Add product to cart and complete checkout"

**Generated Steps**:

1. Navigate to product page
2. Click "Add to Cart" button
3. Verify cart icon shows count
4. Click checkout button
5. Enter shipping details

### Example 3: Form Validation

**Input**: "Test contact form validation"

**Generated Steps**:

1. Navigate to contact form
2. Submit empty form
3. Verify validation errors
4. Fill required fields
5. Submit form
6. Verify success message

## Component Structure

```

src/
├── components/
│ ├── TestConfigForm.tsx # Input form for test config
│ ├── TestStepCard.tsx # Individual step display
│ ├── TestResults.tsx # Final results view
│ └── Header.tsx # App header
├── services/
│ └── testRunner.service.ts # Test execution logic
├── types/
│ └── test.types.ts # TypeScript interfaces
├── theme/
│ └── chakra.theme.ts # Chakra UI theme config
└── App.tsx # Main app component

```

## Key TypeScript Interfaces

```typescript
interface TestStep {
  id: string;
  description: string;
  status: "pending" | "running" | "passed" | "failed" | "skipped";
  duration?: number;
  screenshot?: string;
  element?: string;
  value?: string;
  error?: string;
  url?: string;
  found?: string;
}

interface TestConfig {
  url: string;
  browser: "chrome" | "firefox" | "safari" | "edge";
  email?: string;
  password?: string;
}

interface TestResult {
  id: string;
  name: string;
  description: string;
  status: "pending" | "running" | "passed" | "failed";
  steps: TestStep[];
  duration?: number;
  executedAt?: Date;
}
```

## Fake Response Logic

### parseTestDescription()

- Takes natural language string
- Returns array of TestStep objects
- 1 second delay to simulate AI processing
- Keyword-based step generation:
  - "login" → login steps
  - "settings"/"profile" → navigation steps
  - "dashboard" → verification steps
  - Default → generic 3-step test

### executeTest()

- Takes steps array and config
- Executes each step sequentially
- Per step:
  - 500ms delay before starting
  - 300-1000ms random execution time
  - 10% random failure rate
  - Calls onStepUpdate callback for real-time updates
- Returns TestResult with all step details

## UX Enhancements

### During Execution

- Smooth animations for status changes
- Progress bar updates in real-time
- Auto-scroll to current step
- Loading states on buttons

### After Execution

- Expandable step cards for details
- Color-coded status indicators
- Contextual AI suggestions
- Easy retry/download options

### Error States

- Clear error messages
- Screenshot placeholders
- Suggested fixes from "AI"
- Option to edit and retry

## Success Metrics for Demo

1. **Visual Impact**: Clean, modern UI with brand color
2. **Live Updates**: Real-time step execution visible
3. **Error Handling**: Failed tests show useful feedback
4. **Ease of Use**: Simple natural language input
5. **Professional Output**: Detailed results that look production-ready

## Future Enhancements (Post-Hackathon)

- Real browser automation backend (Playwright/Puppeteer)
- Test history and saved tests
- Multiple test suite management
- Screenshot capture and comparison
- Video recording of test runs
- Export to Cypress/Playwright code
- CI/CD integration
- Collaborative features
- Advanced AI test generation with GPT/Claude
