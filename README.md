# RepMove — Playwright Tests (Login & Registration)
# Automated tests for the staging application RepMove

# Stack: Playwright + TypeScript, reporting with HTML and Allure.
# Main configuration is in playwright.config.ts (baseURL, reporters, timeouts)

# Requirements:
-Node.js v18+ (recommended 18 or 20)
-npm (comes with Node.js)

# Clone the repository
git clone https://github.com/kustova-kate/repMoveKustova.git
cd repMoveKustova

# Install dependencies
npm install

# Install Playwright browsers (only once)
npx playwright install


# Environment variables are stored in .env (already included with sample values):
EMAIL, PASSWORD – valid test credentials
WRONG_EMAIL, WRONG_PASSWORD – invalid test data
Base URL is configured in playwright.config.ts.

# Run all tests:
npm test
# or
npx playwright test

# Run in UI mode (debug)
npx playwright test --ui

# Run a single test file
npx playwright test tests/login.spec.ts

# Run by test title
npx playwright test -g "successfully login"

# Headed mode (visible browser)
npx playwright test --headed

# HTML report
npx playwright show-report

# Allure report
Allure requires Java Runtime (JRE 8+) installed locally.
# Run tests (collect allure-results)
npx playwright test
# Generate report
npm run allure:generate
# Open report
npm run allure:open


# Linting
npm run lint