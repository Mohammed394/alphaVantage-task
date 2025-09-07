import { test, expect } from "@playwright/test";
import { getCoreStockDataWithPerformance } from "../../../pages/alphavantage-apis/categories/coreStock.category";
import { coreStockFactory } from "../../../pages/alphavantage-apis/factories/coreStockFactory";

test.describe("Core Stock API Performance Tests - Using Enhanced Function", () => {
  test(
    "should measure Time Series Daily API response time - compact",
    { tag: ["@performance", "@core-stock"] },
    async () => {
      const requestPayload = coreStockFactory({});

      const result = await getCoreStockDataWithPerformance(requestPayload);

      // Validate performance
      expect(result.responseTime).toBeLessThan(1000);
      expect(result.statusCode).toBe(200);
      expect(result.timestamp).toBeDefined();

      // Validate data structure (same as existing functional tests)
      expect(result.data["Meta Data"]).toBeDefined();
      expect(result.data["Time Series (Daily)"]).toBeDefined();

      const metaData = result.data["Meta Data"];
      expect(metaData["2. Symbol"]).toBe(requestPayload.symbol);
      expect(metaData["4. Output Size"]).toBe("Compact");

      console.log(`📊 Performance Summary:
    - Response Time: ${result.responseTime}ms
    - Timestamp: ${result.timestamp}
    - Symbol: ${requestPayload.symbol}
    - URL: ${result.url}`);
    }
  );
});
