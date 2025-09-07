import { request, APIRequestContext, APIResponse } from "@playwright/test";
import { expect } from "@playwright/test";
export interface APIContext {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: any): Promise<T>;
  put<T>(url: string, data: any): Promise<T>;
  patch<T>(url: string, data: any): Promise<T>;
  delete<T>(url: string): Promise<T>;
}

interface CreateOptions {
  baseURL?: string;
  headers?: Record<string, string>;
}

export async function createAPIContext(
  options: CreateOptions = {}
): Promise<APIContext> {
  const apiRequestContext: APIRequestContext = await request.newContext({
    baseURL: options.baseURL,
    extraHTTPHeaders: options.headers,
  });

  return {
    async get<T>(url: string): Promise<T> {
      const response: APIResponse = await apiRequestContext.get(url);
      expect(response.status()).toBeGreaterThanOrEqual(200);
      expect(response.status()).toBeLessThan(300);
      return logAndParseResponse<T>("GET", url, response);
    },
    async post<T>(url: string, data: any): Promise<T> {
      const response: APIResponse = await apiRequestContext.post(url, { data });
      expect(response.status()).toBeGreaterThanOrEqual(200);
      expect(response.status()).toBeLessThan(300);
      return logAndParseResponse<T>("POST", url, response);
    },
    async put<T>(url: string, data: any): Promise<T> {
      const response: APIResponse = await apiRequestContext.put(url, { data });
      expect(response.status()).toBeGreaterThanOrEqual(200);
      expect(response.status()).toBeLessThan(300);
      return logAndParseResponse<T>("PUT", url, response);
    },
    async patch<T>(url: string, data: any): Promise<T> {
      const response: APIResponse = await apiRequestContext.patch(url, {
        data,
      });
      expect(response.status()).toBeGreaterThanOrEqual(200);
      expect(response.status()).toBeLessThan(300);
      return logAndParseResponse<T>("PATCH", url, response);
    },
    async delete<T>(url: string): Promise<T> {
      const response: APIResponse = await apiRequestContext.delete(url);
      expect(response.status()).toBeGreaterThanOrEqual(200);
      expect(response.status()).toBeLessThan(300);
      return logAndParseResponse<T>("DELETE", url, response);
    },
  };
}

function sanitizeUrlForLogging(url: string): string {
  const urlObj = new URL(url);
  if (urlObj.searchParams.has("apikey")) {
    urlObj.searchParams.set("apikey", "***HIDDEN***");
  }
  return `${urlObj.pathname}${urlObj.search}`;
}

async function logAndParseResponse<T>(
  method: string,
  url: string,
  response: APIResponse
): Promise<T> {
  const sanitizedUrl = sanitizeUrlForLogging(url);
  console.log(`Making ${method} request to:`, sanitizedUrl);
  console.log("Response status code:", response.status());
  const jsonResponse = await response.json();
  return jsonResponse as T;
}
