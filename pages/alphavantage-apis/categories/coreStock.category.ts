import { createAPIContext } from "../../../utils/api-context";
import { CoreStockRequest } from "../models/requests/coreStockRequest";
import { CoreStockResponse } from "../models/responses/coreStockResponse";

export async function getCoreStockData(
  payload: CoreStockRequest
): Promise<CoreStockResponse> {
  const api = await createAPIContext();
  const apiKey = process.env.API_KEY;
  const url = `${process.env.BASE_URL}?function=TIME_SERIES_DAILY&symbol=${payload.symbol}&outputsize=${payload.outputsize}&apikey=${apiKey}`;
  const response = await api.get<CoreStockResponse>(url);
  return response;
}
