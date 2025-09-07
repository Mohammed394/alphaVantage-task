import { APIRequestContext, request } from '@playwright/test';
import { expect } from '@playwright/test';

export interface ApiPerformanceMetrics {
  responseTime: number;
  statusCode: number;
  responseSize: number;
  timestamp: Date;
  url: string;
  method: string;
}

export interface ApiPerformanceThresholds {
  maxResponseTime: number;
  minResponseTime?: number;
  expectedStatusCode?: number;
  maxResponseSize?: number;
}

export class ApiPerformanceTester {
  private apiContext: APIRequestContext;
  private metrics: ApiPerformanceMetrics[] = [];

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
  }

  static async create(baseURL?: string, headers?: Record<string, string>): Promise<ApiPerformanceTester> {
    const apiContext = await request.newContext({
      baseURL,
      extraHTTPHeaders: headers,
    });
    return new ApiPerformanceTester(apiContext);
  }

  /**
   * Measure API response time for GET request
   */
  async measureGetRequest(
    url: string, 
    thresholds: ApiPerformanceThresholds,
    testName?: string
  ): Promise<ApiPerformanceMetrics> {
    const startTime = performance.now();
    const response = await this.apiContext.get(url);
    const endTime = performance.now();
    
    const responseTime = endTime - startTime;
    const responseBody = await response.text();
    const responseSize = new Blob([responseBody]).size;
    
    const metrics: ApiPerformanceMetrics = {
      responseTime,
      statusCode: response.status(),
      responseSize,
      timestamp: new Date(),
      url: this.sanitizeUrl(url),
      method: 'GET'
    };

    this.metrics.push(metrics);
    
    // Log performance metrics
    console.log(`\n=== API Performance Test ${testName ? `(${testName})` : ''} ===`);
    console.log(`URL: ${metrics.url}`);
    console.log(`Response Time: ${responseTime.toFixed(2)}ms`);
    console.log(`Status Code: ${metrics.statusCode}`);
    console.log(`Response Size: ${responseSize} bytes`);
    console.log(`Timestamp: ${metrics.timestamp.toISOString()}`);
    
    // Validate thresholds
    this.validateThresholds(metrics, thresholds);
    
    return metrics;
  }

  /**
   * Run multiple requests to get average response time
   */
  async measureAverageResponseTime(
    url: string, 
    iterations: number = 5,
    thresholds: ApiPerformanceThresholds,
    testName?: string
  ): Promise<{ average: number; min: number; max: number; metrics: ApiPerformanceMetrics[] }> {
    const testMetrics: ApiPerformanceMetrics[] = [];
    
    console.log(`\n=== Running ${iterations} iterations for ${testName || 'API Performance Test'} ===`);
    
    for (let i = 0; i < iterations; i++) {
      console.log(`Iteration ${i + 1}/${iterations}`);
      const metrics = await this.measureGetRequest(url, thresholds, `${testName} - Iteration ${i + 1}`);
      testMetrics.push(metrics);
      
      // Add small delay between requests
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const responseTimes = testMetrics.map(m => m.responseTime);
    const average = responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;
    const min = Math.min(...responseTimes);
    const max = Math.max(...responseTimes);
    
    console.log(`\n=== Performance Summary for ${testName || 'API Test'} ===`);
    console.log(`Average Response Time: ${average.toFixed(2)}ms`);
    console.log(`Min Response Time: ${min.toFixed(2)}ms`);
    console.log(`Max Response Time: ${max.toFixed(2)}ms`);
    console.log(`Standard Deviation: ${this.calculateStandardDeviation(responseTimes).toFixed(2)}ms`);
    
    // Validate average against thresholds
    expect(average).toBeLessThanOrEqual(thresholds.maxResponseTime);
    
    return { average, min, max, metrics: testMetrics };
  }

  /**
   * Load test - measure response time under concurrent requests
   */
  async loadTest(
    url: string,
    concurrentRequests: number = 5,
    thresholds: ApiPerformanceThresholds,
    testName?: string
  ): Promise<ApiPerformanceMetrics[]> {
    console.log(`\n=== Load Test: ${concurrentRequests} concurrent requests ===`);
    
    const promises = Array.from({ length: concurrentRequests }, (_, i) =>
      this.measureGetRequest(url, thresholds, `${testName} - Concurrent ${i + 1}`)
    );
    
    const results = await Promise.all(promises);
    
    const responseTimes = results.map(r => r.responseTime);
    const averageResponseTime = responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;
    
    console.log(`\n=== Load Test Summary ===`);
    console.log(`Concurrent Requests: ${concurrentRequests}`);
    console.log(`Average Response Time: ${averageResponseTime.toFixed(2)}ms`);
    console.log(`Max Response Time: ${Math.max(...responseTimes).toFixed(2)}ms`);
    console.log(`Min Response Time: ${Math.min(...responseTimes).toFixed(2)}ms`);
    
    return results;
  }


  private validateThresholds(metrics: ApiPerformanceMetrics, thresholds: ApiPerformanceThresholds): void {
    // Validate response time
    expect(metrics.responseTime).toBeLessThanOrEqual(thresholds.maxResponseTime);
    
    if (thresholds.minResponseTime) {
      expect(metrics.responseTime).toBeGreaterThanOrEqual(thresholds.minResponseTime);
    }
    
    // Validate status code
    if (thresholds.expectedStatusCode) {
      expect(metrics.statusCode).toBe(thresholds.expectedStatusCode);
    }
    
    // Validate response size
    if (thresholds.maxResponseSize) {
      expect(metrics.responseSize).toBeLessThanOrEqual(thresholds.maxResponseSize);
    }
  }

  private sanitizeUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      if (urlObj.searchParams.has('apikey')) {
        urlObj.searchParams.set('apikey', '***HIDDEN***');
      }
      return urlObj.toString();
    } catch {
      return url.replace(/apikey=[^&]+/g, 'apikey=***HIDDEN***');
    }
  }

  private calculateStandardDeviation(values: number[]): number {
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squaredDiffs = values.map(val => Math.pow(val - avg, 2));
    const avgSquaredDiff = squaredDiffs.reduce((sum, val) => sum + val, 0) / squaredDiffs.length;
    return Math.sqrt(avgSquaredDiff);
  }

  /**
   * Get all collected metrics
   */
  getAllMetrics(): ApiPerformanceMetrics[] {
    return [...this.metrics];
  }

  /**
   * Generate performance report
   */
  generateReport(): string {
    if (this.metrics.length === 0) {
      return 'No performance metrics collected';
    }

    const responseTimes = this.metrics.map(m => m.responseTime);
    const average = responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;
    const min = Math.min(...responseTimes);
    const max = Math.max(...responseTimes);
    
    return `
=== API Performance Report ===
Total Requests: ${this.metrics.length}
Average Response Time: ${average.toFixed(2)}ms
Min Response Time: ${min.toFixed(2)}ms
Max Response Time: ${max.toFixed(2)}ms
Standard Deviation: ${this.calculateStandardDeviation(responseTimes).toFixed(2)}ms

Requests by URL:
${this.groupByUrl().map(group => `${group.url}: ${group.count} requests, avg ${group.avgResponseTime.toFixed(2)}ms`).join('\n')}
    `;
  }

  private groupByUrl(): Array<{ url: string; count: number; avgResponseTime: number }> {
    const groups = this.metrics.reduce((acc, metric) => {
      if (!acc[metric.url]) {
        acc[metric.url] = [];
      }
      acc[metric.url].push(metric.responseTime);
      return acc;
    }, {} as Record<string, number[]>);

    return Object.entries(groups).map(([url, times]) => ({
      url,
      count: times.length,
      avgResponseTime: times.reduce((sum, time) => sum + time, 0) / times.length
    }));
  }

  /**
   * Clean up resources
   */
  async dispose(): Promise<void> {
    await this.apiContext.dispose();
  }
}
