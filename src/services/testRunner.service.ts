import type { TestStep, TestConfig, TestResult } from "../types/test.types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const generateId = () => Math.random().toString(36).substring(7);

// Generate steps based on natural language input
export const parseTestDescription = async (
  description: string,
): Promise<TestStep[]> => {
  // Simulate AI processing
  await delay(1000);

  const lowerDesc = description.toLowerCase();
  const steps: TestStep[] = [];

  // Login flow detection
  if (lowerDesc.includes("login")) {
    steps.push(
      {
        id: generateId(),
        description: "Navigate to login page",
        status: "pending",
        url: "https://demo.example.com/login",
      },
      {
        id: generateId(),
        description: "Enter email credentials",
        status: "pending",
        element: 'input[name="email"]',
        value: "admin@test.com",
      },
      {
        id: generateId(),
        description: "Enter password",
        status: "pending",
        element: 'input[type="password"]',
      },
      {
        id: generateId(),
        description: "Click login button",
        status: "pending",
        element: 'button:has-text("Login")',
      },
    );
  }

  // Settings/Profile page
  if (lowerDesc.includes("settings") || lowerDesc.includes("profile")) {
    steps.push(
      {
        id: generateId(),
        description: "Navigate to settings page",
        status: "pending",
        url: "https://demo.example.com/settings",
      },
      {
        id: generateId(),
        description: "Verify profile information displayed",
        status: "pending",
        found: "Profile Settings",
      },
    );
  }

  // Cart/Checkout flow
  if (lowerDesc.includes("cart") || lowerDesc.includes("checkout")) {
    steps.push(
      {
        id: generateId(),
        description: "Navigate to product page",
        status: "pending",
        url: "https://demo.example.com/products/123",
      },
      {
        id: generateId(),
        description: 'Click "Add to Cart" button',
        status: "pending",
        element: 'button[data-testid="add-to-cart"]',
      },
      {
        id: generateId(),
        description: "Verify cart icon shows count",
        status: "pending",
        element: ".cart-badge",
      },
      {
        id: generateId(),
        description: "Click checkout button",
        status: "pending",
        element: 'button:has-text("Checkout")',
      },
      {
        id: generateId(),
        description: "Enter shipping details",
        status: "pending",
        element: 'form[data-testid="shipping-form"]',
      },
    );
  }

  // Form validation
  if (lowerDesc.includes("form") || lowerDesc.includes("validation")) {
    steps.push(
      {
        id: generateId(),
        description: "Navigate to contact form",
        status: "pending",
        url: "https://demo.example.com/contact",
      },
      {
        id: generateId(),
        description: "Submit empty form",
        status: "pending",
        element: 'button[type="submit"]',
      },
      {
        id: generateId(),
        description: "Verify validation errors",
        status: "pending",
        found: "This field is required",
      },
      {
        id: generateId(),
        description: "Fill required fields",
        status: "pending",
        element: 'input[name="name"]',
      },
      {
        id: generateId(),
        description: "Submit form",
        status: "pending",
        element: 'button[type="submit"]',
      },
      {
        id: generateId(),
        description: "Verify success message",
        status: "pending",
        found: "Thank you for contacting us",
      },
    );
  }

  // Dashboard verification
  if (lowerDesc.includes("dashboard")) {
    steps.push(
      {
        id: generateId(),
        description: "Navigate to dashboard",
        status: "pending",
        url: "https://demo.example.com/dashboard",
      },
      {
        id: generateId(),
        description: "Verify dashboard loaded",
        status: "pending",
        found: "Welcome to Dashboard",
      },
    );
  }

  // Default generic test if no keywords matched
  if (steps.length === 0) {
    steps.push(
      {
        id: generateId(),
        description: "Navigate to target page",
        status: "pending",
        url: "https://demo.example.com",
      },
      {
        id: generateId(),
        description: "Verify page loaded successfully",
        status: "pending",
        found: "Page Title",
      },
      {
        id: generateId(),
        description: "Complete requested action",
        status: "pending",
      },
    );
  }

  return steps;
};

interface ExecuteTestOptions {
  steps: TestStep[];
  config: TestConfig;
  onStepUpdate: (stepId: string, updates: Partial<TestStep>) => void;
  onProgressUpdate: (progress: number) => void;
}

// Execute test with step-by-step updates
export const executeTest = async ({
  steps,
  onStepUpdate,
  onProgressUpdate,
}: ExecuteTestOptions): Promise<TestResult> => {
  const startTime = Date.now();
  let failedStepIndex = -1;

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];

    // Skip remaining steps if one failed
    if (failedStepIndex !== -1 && i > failedStepIndex) {
      onStepUpdate(step.id, { status: "skipped" });
      continue;
    }

    // Start step
    await delay(500);
    onStepUpdate(step.id, { status: "running" });

    // Simulate execution
    const executionTime = Math.floor(Math.random() * 700) + 300; // 300-1000ms
    await delay(executionTime);

    // Random 10% failure rate
    const failed = Math.random() < 0.1;

    if (failed) {
      failedStepIndex = i;
      const errors = [
        "Element not found",
        "Timeout waiting for element",
        "Element not visible",
        "Element not clickable",
        "Network request failed",
      ];
      const randomError = errors[Math.floor(Math.random() * errors.length)];

      onStepUpdate(step.id, {
        status: "failed",
        duration: executionTime,
        error: randomError,
        screenshot: `screenshot-${step.id}.png`,
      });
    } else {
      onStepUpdate(step.id, {
        status: "passed",
        duration: executionTime,
        screenshot:
          Math.random() > 0.5 ? `screenshot-${step.id}.png` : undefined,
      });
    }

    // Update progress
    const progress = ((i + 1) / steps.length) * 100;
    onProgressUpdate(progress);
  }

  const totalDuration = (Date.now() - startTime) / 1000;
  const hasFailure = failedStepIndex !== -1;

  // Generate AI suggestion for failed tests
  let aiSuggestion: string | undefined;
  if (hasFailure) {
    const suggestions = [
      "The element selector may have changed. Try inspecting the page for the correct selector.",
      "The page may still be loading. Consider adding a wait condition before this step.",
      "This element might be inside a shadow DOM or iframe. Check the element hierarchy.",
      "The element might have a different selector. Try using data-testid attributes instead.",
      "Network latency may be causing timeouts. Consider increasing the timeout duration.",
    ];
    aiSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
  }

  return {
    id: generateId(),
    name: "Test Execution",
    description: steps.map((s) => s.description).join(", "),
    status: hasFailure ? "failed" : "passed",
    steps,
    duration: totalDuration,
    executedAt: new Date(),
    aiSuggestion,
  };
};
