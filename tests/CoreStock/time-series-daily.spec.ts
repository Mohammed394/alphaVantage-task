import { test, expect } from "@playwright/test";
import { coreStockFactory } from "../../pages/alphavantage-apis/factories/coreStockFactory";
import { getCoreStockData } from "../../pages/alphavantage-apis/categories/coreStock.category";

test.describe("Time Series Daily API Tests", () => {
  test("Validate Time Series Daily API Response Structure", async () => {
    const requestPayload = coreStockFactory();
    const response = await getCoreStockData(requestPayload);

    // Validate Meta Data
    expect(response["Meta Data"]).toBeDefined();
    const metaData = response["Meta Data"];
    expect(metaData["1. Information"]).toBeDefined();
    expect(metaData["2. Symbol"]).toBe(requestPayload.symbol);
    expect(metaData["3. Last Refreshed"]).toBeDefined();
    expect(metaData["4. Output Size"]).toBe("Compact");
    expect(metaData["5. Time Zone"]).toBeDefined();

    // Validate Time Series (Daily)
    expect(response["Time Series (Daily)"]).toBeDefined();
    const timeSeries = response["Time Series (Daily)"];
    const dates = Object.keys(timeSeries);
    expect(dates.length).toBeGreaterThan(0);

    // Validate structure of a single day's data
    const sampleDate = dates[0];
    const dailyData = timeSeries[sampleDate];
    expect(dailyData["1. open"]).toBeDefined();
    expect(dailyData["2. high"]).toBeDefined();
    expect(dailyData["3. low"]).toBeDefined();
    expect(dailyData["4. close"]).toBeDefined();
    expect(dailyData["5. volume"]).toBeDefined();
  });
});
