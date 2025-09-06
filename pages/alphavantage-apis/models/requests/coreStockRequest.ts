export interface CoreStockRequest {
  function: string;
  symbol: string;
  outputsize: "compact" | "full";
  datatype: "json" | "csv";
}
