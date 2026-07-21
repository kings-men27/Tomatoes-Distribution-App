export interface FastApiPayload {
  originState: string;
  destinationCity: string;
  season: string;
  packagingType: string;
  transportMode: string;
  coldStorageAvailable: string;
  storageType: string;
  ripenessLevel: string;
  initialDamageLevel: string;
  routeDistanceKm: number;
  quantitySentCrates: number;
  hoursSinceHarvestAtDispatch: number;
}



export interface ServiceResponse {
  success: boolean;
  data?: any; 
  message?: string;
  error?: string;
  isConfigured?: boolean;
}

export class FastApiService {
  // Read once during initialization and trim whitespace
  private static readonly baseUrl = process.env.FASTAPI_SERVICE_URL?.trim();

  /**
   * Forwards payload to FastAPI service endpoint
   * @param payload - Data from frontend
   */
  static async sendToFastApi(payload: FastApiPayload): Promise<ServiceResponse> {
    if (!this.baseUrl) {
      console.warn(' FASTAPI_SERVICE_URL is not set in .env. Skipping external request.');
      return { 
        success: false, 
        message: 'FastAPI service URL is not configured.',
        isConfigured: false 
      };
    }

    const targetUrl = this.baseUrl; 


    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

    try {
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`FastAPI returned status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      return { success: true, data };

    } catch (error: unknown) { // 3. Catch as unknown (safer than any)
      const isAbortError = error instanceof Error && error.name === 'AbortError';
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      console.error(` Error calling FastAPI at ${targetUrl}:`, errorMessage);
      
      return {
        success: false,
        error: isAbortError ? 'FastAPI request timed out (cold start).' : errorMessage,
      };

    } finally {
      // This prevents memory leaks on the Node.js server.
      clearTimeout(timeoutId);
    }
  }
}