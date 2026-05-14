import { Page, BrowserContext } from '@playwright/test';

const API_BASE_URL = 'http://localhost:5000/api';

export class APIHelper {
  constructor(private page: Page) {}

  /**
   * Intercept API calls and log responses
   */
  async setupAPIInterception() {
    const responses: any[] = [];
    
    this.page.on('response', async (response) => {
      if (response.url().includes('/api/')) {
        try {
          const body = await response.json().catch(() => null);
          responses.push({
            url: response.url(),
            status: response.status(),
            body,
            timestamp: new Date(),
          });
        } catch (e) {
          // Ignore parse errors
        }
      }
    });

    return responses;
  }

  /**
   * Wait for API response and verify status code
   */
  async waitForOrderAPIResponse(expectedStatus: number = 201) {
    const response = await this.page.waitForResponse(
      (response) => response.url().includes('/api/orders') && response.request().method() === 'POST'
    );
    
    if (response.status() !== expectedStatus) {
      throw new Error(`Expected status ${expectedStatus}, got ${response.status()}`);
    }

    return response.json();
  }

  /**
   * Verify order was sent with correct data
   */
  async verifyOrderPayload(expectedData: any): Promise<boolean> {
    let orderPayload: any;

    await this.page.route('**/api/orders', async (route) => {
      const postData = route.request().postDataJSON();
      orderPayload = postData;
      
      // Verify structure
      if (!postData.customerName || !postData.phone || !postData.address) {
        await route.abort('failed');
        return;
      }

      await route.continue();
    });

    return !!orderPayload;
  }

  /**
   * Make API call to create order
   */
  async createOrderViaAPI(orderData: any) {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get order from API
   */
  async getOrderFromAPI(orderId: string) {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch order: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Verify backend API is running
   */
  async verifyBackendIsRunning(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL.replace('/api', '')}/api/health`);
      return response.ok;
    } catch (e) {
      return false;
    }
  }
}
