import { test, expect } from "@playwright/test";
import { getCompanyOverviewDataWithPerformance } from "../../../pages/alphavantage-apis/categories/fundamental.category";
import { companyOverviewFactory } from "../../../pages/alphavantage-apis/factories/fundamentalFactory";

test.describe("Company Overview API Performance Tests - Using Enhanced Function", () => {
  test(
    "should measure Company Overview API response time",
    { tag: ["@performance", "@fundamental"] },
    async () => {
      const requestPayload = companyOverviewFactory();

      const result =
        await getCompanyOverviewDataWithPerformance(requestPayload);

      // Validate performance
      expect(result.responseTime).toBeLessThan(1000);
      expect(result.statusCode).toBe(200);
      expect(result.timestamp).toBeDefined();

      // Validate data structure (same as existing functional tests)
      expect(result.data["Symbol"]).toBe(requestPayload.symbol);
      expect(result.data["AssetType"]).toBeDefined();
      expect(result.data["Name"]).toBeDefined();
      expect(result.data["Description"]).toBeDefined();
      expect(result.data["Exchange"]).toBeDefined();

      console.log(`📊 Company Overview Performance Summary:
    - Response Time: ${result.responseTime}ms
    - Timestamp: ${result.timestamp}
    - Symbol: ${requestPayload.symbol}
    - URL: ${result.url}`);
    }
  );
});
