import { createAPIContext } from "../../../utils/api-context";
import { companyOverviewRequest } from "../models/requests/fundamentalRequest";
import {
  companyOverviewResponse,
  CompanyOverviewPerformanceResult,
} from "../models/responses/fundamentalResponse";

export async function getCompanyOverviewData(
  payload: companyOverviewRequest
): Promise<companyOverviewResponse> {
  const api = await createAPIContext();
  const apiKey = process.env.API_KEY || "demo";
  const url = `${process.env.BASE_URL}?function=${payload.function}&symbol=${payload.symbol}&apikey=${apiKey}`;
  const response = await api.get<companyOverviewResponse>(url);
  return response;
}

export async function getCompanyOverviewDataWithPerformance(
  payload: companyOverviewRequest
): Promise<CompanyOverviewPerformanceResult> {
  const api = await createAPIContext();
  const apiKey = process.env.API_KEY || "demo";
  const url = `${process.env.BASE_URL}?function=${payload.function}&symbol=${payload.symbol}&apikey=${apiKey}`;

  console.log(
    `🚀 Starting Company Overview API call to: ${url.replace(apiKey, "[HIDDEN]")}`
  );
  const startTime = Date.now();

  try {
    const response = await api.get<companyOverviewResponse>(url);
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    console.log(`✅ Company Overview API call completed in ${responseTime}ms`);

    return {
      data: response,
      responseTime,
      statusCode: 200,
      timestamp: new Date().toISOString(),
      url: url.replace(apiKey, "[HIDDEN]"),
    };
  } catch (error) {
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    console.log(
      `❌ Company Overview API call failed after ${responseTime}ms:`,
      error
    );
    throw error;
  }
}
