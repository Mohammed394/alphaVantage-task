import { test, expect } from "@playwright/test";
import { companyOverviewFactory } from "../../../pages/alphavantage-apis/factories/fundamentalFactory";
import { getCompanyOverviewData } from "../../../pages/alphavantage-apis/categories/fundamental.category";

test.describe("Company Overview API Tests", () => {
  test(
    "Validate Company Overview API Response Structure",
    { tag: ["@api", "@fundamental"] },
    async () => {
      const requestPayload = companyOverviewFactory();
      const response = await getCompanyOverviewData(requestPayload);

      // Validate key fields in the response
      expect(response["Symbol"]).toBe(requestPayload.symbol);
      expect(response["AssetType"]).toBeDefined();
      expect(response["Name"]).toBeDefined();
      expect(response["Description"]).toBeDefined();
      expect(response["Exchange"]).toBeDefined();
      expect(response["Currency"]).toBeDefined();
      expect(response["Country"]).toBeDefined();
      expect(response["Sector"]).toBeDefined();
      expect(response["Industry"]).toBeDefined();
      expect(response["MarketCapitalization"]).toBeDefined();
      expect(response["PERatio"]).toBeDefined();
      expect(response["EPS"]).toBeDefined();
      expect(response["DividendPerShare"]).toBeDefined();
      expect(response["DividendYield"]).toBeDefined();
      expect(response["52WeekHigh"]).toBeDefined();
      expect(response["52WeekLow"]).toBeDefined();
      expect(response["SharesOutstanding"]).toBeDefined();
      expect(response["Beta"]).toBeDefined();
      expect(response["FiscalYearEnd"]).toBeDefined();
      expect(response["LatestQuarter"]).toBeDefined();
      expect(response["AnalystTargetPrice"]).toBeDefined();
      expect(response["TrailingPE"]).toBeDefined();
      expect(response["ForwardPE"]).toBeDefined();
      expect(response["PriceToSalesRatioTTM"]).toBeDefined();
      expect(response["PriceToBookRatio"]).toBeDefined();
      expect(response["EVToRevenue"]).toBeDefined();
      expect(response["EVToEBITDA"]).toBeDefined();
      expect(response["DividendDate"]).toBeDefined();
      expect(response["ExDividendDate"]).toBeDefined();
      expect(response["50DayMovingAverage"]).toBeDefined();
      expect(response["200DayMovingAverage"]).toBeDefined();
      expect(response["PercentInsiders"]).toBeDefined();
      expect(response["PercentInstitutions"]).toBeDefined();
      expect(response["RevenueTTM"]).toBeDefined();
      expect(response["GrossProfitTTM"]).toBeDefined();
      expect(response["DilutedEPSTTM"]).toBeDefined();
      expect(response["QuarterlyEarningsGrowthYOY"]).toBeDefined();
      expect(response["QuarterlyRevenueGrowthYOY"]).toBeDefined();
      expect(response["AnalystRatingStrongBuy"]).toBeDefined();
      expect(response["AnalystRatingBuy"]).toBeDefined();
      expect(response["AnalystRatingHold"]).toBeDefined();
      expect(response["AnalystRatingSell"]).toBeDefined();
      expect(response["AnalystRatingStrongSell"]).toBeDefined();
      expect(response["BookValue"]).toBeDefined();
      expect(response["ReturnOnAssetsTTM"]).toBeDefined();
      expect(response["ReturnOnEquityTTM"]).toBeDefined();
      expect(response["OperatingMarginTTM"]).toBeDefined();
      expect(response["RevenuePerShareTTM"]).toBeDefined();
      expect(response["ProfitMargin"]).toBeDefined();
      expect(response["EBITDA"]).toBeDefined();
    }
  );
});
