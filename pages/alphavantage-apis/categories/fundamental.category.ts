import { createAPIContext } from "../../../utils/api-context";
import { companyOverviewRequest } from "../models/requests/fundamentalRequest";
import { companyOverviewResponse } from "../models/responses/fundamentalResponse";

export async function getCompanyOverviewData(
  payload: companyOverviewRequest
): Promise<companyOverviewResponse> {
  const api = await createAPIContext();
  const apiKey = process.env.API_KEY;
  const url = `${process.env.BASE_URL}?function=${payload.function}&symbol=${payload.symbol}&apikey=${apiKey}`;
  const response = await api.get<companyOverviewResponse>(url);
  return response;
}
