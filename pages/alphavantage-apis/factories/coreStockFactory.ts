import { CoreStockRequest } from "../models/requests/coreStockRequest";

export function coreStockFactory(
  overrides: Partial<CoreStockRequest> = {}
): CoreStockRequest {
  return {
    function: "TIME_SERIES_DAILY",
    symbol: "IBM",
    outputsize: "compact",
    datatype: "json",
    ...overrides,
  };
}
