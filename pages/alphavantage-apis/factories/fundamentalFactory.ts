import { companyOverviewRequest } from "../models/requests/fundamentalRequest";

export function companyOverviewFactory(
  overrides: Partial<companyOverviewRequest> = {}
): companyOverviewRequest {
  return {
    function: "OVERVIEW",
    symbol: "IBM",
    ...overrides,
  };
}
