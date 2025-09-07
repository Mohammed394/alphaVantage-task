# Alpha Vantage API Testing Framework

A comprehensive testing framework for Alpha Vantage APIs built with Playwright, TypeScript, and Lighthouse for performance testing. This framework provides end-to-end testing capabilities with advanced performance monitoring, CI/CD integration, and detailed reporting.

## 📁 Repository Structure

```
alphaVantage-task/
├── .env                          # Environment variables (API keys, base URLs)
├── .github/
│   └── workflows/
│       └── playwright.yml        # GitHub Actions CI/CD workflow
├── .gitignore                    # Git ignore rules
├── .prettierignore              # Prettier formatting ignore rules
├── .prettierrc                  # Prettier configuration
├── allure-results/              # Allure test results (generated)
├── dashboard.html               # Main testing dashboard
├── docs/                        # Documentation files
├── historical-dashboard.html    # Historical test results dashboard
├── lighthouse-reports/          # Lighthouse performance reports (generated)
├── node_modules/               # Node.js dependencies
├── package-lock.json           # Lock file for exact dependency versions
├── package.json                # Project dependencies and scripts
├── pages/                      # Page Object Model structure
│   └── alphavantage-apis/
│       ├── categories/         # API category implementations
│       │   └── coreStock.category.ts
│       ├── factories/          # Factory pattern implementations
│       │   └── coreStockFactory.ts
│       └── models/            # Data models and types
│           ├── requests/      # Request models
│           │   ├── coreStockRequest.ts
│           │   └── fundamental.ts
│           └── responses/     # Response models
│               └── coreStockResponse.ts
├── playwright-report/          # Playwright HTML reports (generated)
├── playwright.config.ts        # Playwright configuration
├── test-results/              # Test execution results (generated)
├── tests/                     # Test suites organized by type
│   ├── API/                   # Functional API tests
│   │   ├── CoreStock/        # Stock market data endpoints
│   │   │   └── time-series-daily-api.spec.ts
│   │   └── Fundamental/      # Company financial data endpoints
│   │       └── company-overview-api.spec.ts
│   └── Performance/          # Performance and load tests
│       ├── CoreStock/        # Stock API performance tests
│       │   └── company-overview-performance.spec.ts
│       └── Fundamental/      # Fundamental API performance tests
│           └── time-series-daily-performance.spec.ts
└── utils/                    # Shared utilities and helpers
    ├── api-context.ts        # API context and configuration
    └── api-performance-tester.ts  # Performance testing utilities
```

## 🏗️ Architecture Overview

### Pages Structure (Page Object Model)

The framework follows the Page Object Model pattern with a hierarchical structure:

#### Categories (`pages/alphavantage-apis/categories/`)
- **Purpose**: High-level API category implementations
- **Usage**: Contains business logic for different API categories
- **Example**: `coreStock.category.ts` - Implements core stock market data APIs
- **Features**: 
  - Built-in performance measuring
  - Error handling and retry logic
  - Response validation
  - Logging and debugging

#### Factories (`pages/alphavantage-apis/factories/`)
- **Purpose**: Factory pattern for creating API instances
- **Usage**: Centralized creation and configuration of API objects
- **Example**: `coreStockFactory.ts` - Factory for core stock API instances
- **Benefits**:
  - Consistent object creation
  - Configuration management
  - Dependency injection

#### Models (`pages/alphavantage-apis/models/`)
- **Purpose**: Data models and type definitions
- **Structure**:
  - `requests/` - Request payload models and validation
  - `responses/` - Response data models and parsing
- **Usage**: Type-safe API interactions with validation

### Test Structure

#### Test Organization
```
tests/
├── API/                           # Functional API endpoint testing
│   ├── CoreStock/                # Stock market data APIs
│   │   └── time-series-daily-api.spec.ts
│   └── Fundamental/              # Company financial data APIs
│       └── company-overview-api.spec.ts
└── Performance/                   # Performance benchmarking (mirrors API structure)
    ├── CoreStock/                # Stock API performance tests
    │   └── company-overview-performance.spec.ts
    └── Fundamental/              # Fundamental API performance tests
        └── time-series-daily-performance.spec.ts
```

#### Test Categories
1. **API Tests** (`tests/API/`): Functional validation of API endpoints
   - **CoreStock**: Time series data, intraday quotes, and market indicators
   - **Fundamental**: Company overviews, financial statements, and earnings data
   
2. **Performance Tests** (`tests/Performance/`): Non-functional testing organized by API category
   - **CoreStock**: Performance testing for stock market data endpoints
   - **Fundamental**: Performance testing for company financial data endpoints
   - Response time measurement, load testing, and statistical analysis

## 🚀 Features

### 1. API Testing
- **Comprehensive Coverage**: Tests for all major Alpha Vantage API endpoints
- **Response Validation**: Automatic validation of API responses
- **Error Handling**: Robust error handling and retry mechanisms
- **Data Integrity**: Validation of returned data formats and structures

### 2. Performance Testing
- **Response Time Monitoring**: Built-in performance measuring for all API calls
- **Load Testing**: Concurrent request testing and stress testing
- **Statistical Analysis**: Average, median, and percentile response time calculations
- **Threshold Validation**: Configurable performance thresholds
- **Lighthouse Integration**: Web performance auditing capabilities

### 4. Enhanced Logging and Debugging
- **Detailed Logging**: Comprehensive logging for all API interactions
- **URL Sanitization**: Automatic removal of sensitive data from logs
- **Error Tracking**: Detailed error reporting and stack traces
- **Performance Metrics**: Built-in performance data collection

### 5. Allure Reports
- **Rich Reporting**: Detailed test execution reports with Allure
- **Security**: API keys automatically sanitized from reports
- **Environment Info**: System and browser information in reports
- **Attachments**: Screenshots and logs attached to test results
- **Trends**: Historical test execution trends and analytics

### 6. Interactive Dashboards
- **Main Dashboard** (`dashboard.html`): Real-time test execution monitoring
- **Historical Dashboard** (`historical-dashboard.html`): Long-term trend analysis
- **Performance Metrics**: Response time charts and analytics
- **Filter Capabilities**: Time-based filtering and data exploration

## 🛠️ Usage Instructions

### Prerequisites
```bash
Node.js 20+
npm or yarn package manager
```

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd alphaVantage-task

# Install dependencies
npm install

# Install Playwright browsers (required for first-time setup)
npx playwright install

# Install Playwright browsers with system dependencies (if needed)
npx playwright install --with-deps

# Set up environment variables
cp .env.example .env
# Edit .env with your Alpha Vantage API key
```

### Playwright Setup
```bash
# Install specific browsers only
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit

# Update Playwright to latest version
npm update @playwright/test
npx playwright install

# Verify Playwright installation
npx playwright --version
```

### Environment Configuration
Create a `.env` file with the following variables:
```bash
API_KEY=your_alpha_vantage_api_key
BASE_URL=alpha_vantage_url
```

### Running Tests

#### Basic Test Execution
```bash
# Run all tests
npm playwright test

# Run specific test file
npx playwright test tests/CoreStock/time-series-daily.spec.ts

# Run api tests
npx playwright test --grep "@api"

# Run performance tests
npx npx playwright test --grep "@performance
```

#### Test Suite Categories
```bash
# API functionality tests
npx playwright test tests/API/

# Core stock API tests
npx playwright test tests/API/CoreStock/

# Fundamental data API tests
npx playwright test tests/API/Fundamental/

# Performance tests (all)
npx playwright test tests/Performance/

# Performance tests by category
npx playwright test tests/Performance/CoreStock/
npx playwright test tests/Performance/Fundamental/

# Specific test files
npx playwright test tests/API/CoreStock/time-series-daily-api.spec.ts
npx playwright test tests/API/Fundamental/company-overview-api.spec.ts
npx playwright test tests/Performance/CoreStock/company-overview-performance.spec.ts
npx playwright test tests/Performance/Fundamental/time-series-daily-performance.spec.ts
```

### Code Formatting and Linting

#### Prettier Formatting
```bash
# Check code formatting
npm run format:check

# Auto-format code
npm run format

# Format specific files
npx prettier --write "tests/**/*.ts"
```

#### Linting Commands
```bash
# Run TypeScript compiler check
npx tsc --noEmit

# Check for TypeScript errors
npx tsc --noEmit --pretty
```

### Using Categories, Factories, and Models

#### Categories Usage
```typescript
import { CoreStockCategory } from '../pages/alphavantage-apis/categories/coreStock.category';

// Initialize category
const coreStock = new CoreStockCategory();

// Use with built-in performance measuring
const result = await coreStock.getCoreStockDataWithPerformance('IBM', 'TIME_SERIES_DAILY');
console.log(`Response time: ${result.responseTime}ms`);
console.log(`Data:`, result.data);
```

#### Factories Usage
```typescript
import { CoreStockFactory } from '../pages/alphavantage-apis/factories/coreStockFactory';

// Create API instance
const stockApi = CoreStockFactory.createCoreStockApi();

// Use factory-created instance
const data = await stockApi.getTimeSeriesDaily('AAPL');
```

#### Models Usage
```typescript
import { CoreStockRequest } from '../pages/alphavantage-apis/models/requests/coreStockRequest';
import { CoreStockResponse } from '../pages/alphavantage-apis/models/responses/coreStockResponse';

// Type-safe request
const request: CoreStockRequest = {
  symbol: 'GOOGL',
  function: 'TIME_SERIES_DAILY'
};

// Validated response
const response: CoreStockResponse = await api.getData(request);
```

## 🔧 Performance Testing

### API Performance Tester
The framework includes a comprehensive performance testing utility:

```typescript
import { ApiPerformanceTester } from '../utils/api-performance-tester';

const tester = new ApiPerformanceTester();

// Single request performance test
await tester.measureApiCall(
  () => api.getTimeSeriesDaily('IBM'),
  { maxResponseTime: 2000 }
);

// Load testing
await tester.performLoadTest(
  () => api.getCompanyOverview('MSFT'),
  { concurrent: 5, iterations: 10 }
);
```

### Performance Features
- **Response Time Measurement**: Precise timing for API calls
- **Load Testing**: Concurrent request simulation
- **Statistical Analysis**: Mean, median, percentile calculations
- **Threshold Validation**: Pass/fail based on performance criteria
- **Report Generation**: Detailed performance reports

## 🤖 GitHub Actions Workflow

### Workflow Features
The `.github/workflows/playwright.yml` workflow provides:

- **Scheduled Runs**: Daily automated test execution
- **Manual Triggers**: On-demand test suite execution
- **Multiple Test Suites**: API, performance, and regression testing
- **Parallel Execution**: Optimized test execution
- **Artifact Management**: Test reports and results storage
- **Slack Integration**: Test result notifications
- **GitHub Pages**: Automated dashboard deployment

### Workflow Configuration
```yaml
# Manual trigger with test suite selection
workflow_dispatch:
  inputs:
    suite:
      description: "Test suite to run"
      required: true
      default: api
      type: choice
      options:
        - api
        - performance  
        - regression

# Daily automated runs
schedule:
  - cron: "0 0 * * *"
```

### Environment Secrets
Required GitHub repository secrets:
- `API_KEY`: Alpha Vantage API key
- `BASE_URL`: API base URL
- `SLACK_BOT_TOKEN`: Slack integration token
- `E2E_SLACK_CHANNEL_ID`: Slack channel for notifications

### Workflow Execution
```bash
# Trigger specific test suite
gh workflow run playwright.yml -f suite=performance

# View workflow status
gh run list --workflow=playwright.yml

# Download artifacts
gh run download <run-id>
```

## 📊 Reports and Dashboards

### Allure Reports
- **Location**: `allure-results/` directory
- **Features**: Detailed test execution reports with trends
- **Security**: API keys automatically sanitized
- **Viewing**: Open `playwright-report/index.html` after test execution

### Lighthouse Reports
- **Location**: `lighthouse-reports/` directory
- **Content**: Performance audits and scores
- **Integration**: Automated generation during performance tests

### Interactive Dashboards
- **Main Dashboard**: `dashboard.html` - Real-time monitoring
- **Historical Dashboard**: `historical-dashboard.html` - Trend analysis
- **Features**: Charts, filters, and performance analytics

## 🛡️ Security Features

### API Key Protection
- **Environment Variables**: Secure storage in `.env` files
- **URL Sanitization**: Automatic removal from logs and reports
- **GitHub Secrets**: Secure CI/CD configuration
- **Report Cleaning**: Sanitized Allure and Playwright reports

### Data Security
- **No Hardcoded Secrets**: All sensitive data in environment variables
- **Secure Logging**: Automatic sanitization of sensitive information
- **Access Control**: GitHub repository and workflow permissions

## 🔍 Debugging and Troubleshooting

### Common Issues
1. **API Key Errors**: Verify `.env` file configuration
2. **Rate Limiting**: Implement delays between requests
3. **Network Issues**: Check BASE_URL and connectivity
4. **Performance Failures**: Adjust threshold values

### Debug Commands
```bash
# Run tests with detailed output
npx playwright test --reporter=list

# Run single test with debug
npx playwright test tests/CoreStock/time-series-daily.spec.ts --debug

# Generate trace files
npx playwright test --trace=on

# Show test report
npx playwright show-report
```

## 📈 Performance Benchmarks

### Expected Response Times
- **Core Stock APIs**: < 1000ms average
- **Fundamental Data**: < 1000ms average
- **Performance Tests**: Statistical analysis included
- **Load Tests**: Concurrent request handling validation

### Lighthouse Scores
- **Performance**: Target > 90
- **Accessibility**: Target > 95
- **Best Practices**: Target > 90
- **SEO**: Target > 90

## 🔗 Links

- [Alpha Vantage API Documentation](https://www.alphavantage.co/documentation/)
- [Playwright Documentation](https://playwright.dev/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Allure Framework](https://docs.qameta.io/allure/)
