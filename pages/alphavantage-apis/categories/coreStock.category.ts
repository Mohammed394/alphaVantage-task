import { createAPIContext } from "../../../utils/api-context";
import { CoreStockRequest } from "../models/requests/coreStockRequest";
import {
  CoreStockPerformanceResult,
  CoreStockResponse,
} from "../models/responses/coreStockResponse";

export async function getCoreStockData(
  payload: CoreStockRequest
): Promise<CoreStockResponse> {
  const api = await createAPIContext();
  const apiKey = process.env.API_KEY || 'demo';
  const url = `${process.env.BASE_URL}?function=TIME_SERIES_DAILY&symbol=${payload.symbol}&outputsize=${payload.outputsize}&apikey=${apiKey}`;
  const response = await api.get<CoreStockResponse>(url);
  return response;
}

export async function   getCoreStockDataWithPerformance(
  payload: CoreStockRequest
): Promise<CoreStockPerformanceResult> {
  const api = await createAPIContext();
  const apiKey = process.env.API_KEY || 'demo';
  const url = `${process.env.BASE_URL}?function=TIME_SERIES_DAILY&symbol=${payload.symbol}&outputsize=${payload.outputsize}&apikey=${apiKey}`;

  console.log(`🚀 Starting API call to: ${url.replace(apiKey, "[HIDDEN]")}`);
  const startTime = Date.now();

  try {
    const response = await api.get<CoreStockResponse>(url);
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    console.log(`✅ API call completed in ${responseTime}ms`);

    return {
      data: response,
      responseTime,
      statusCode: 200, // You'd need to modify your api context to return status
      timestamp: new Date().toISOString(),
      url: url.replace(apiKey, "[HIDDEN]"),
    };
  } catch (error) {
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    console.log(`❌ API call failed after ${responseTime}ms:`, error);
    throw error;
  }
}
