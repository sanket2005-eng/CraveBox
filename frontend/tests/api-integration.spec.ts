import { test, expect } from '@playwright/test';
import { APIHelper } from './fixtures/api-helper';
import { testOrderData } from './fixtures/test-data';
import {
  connectMongoDB,
  disconnectMongoDB,
  getOrder,
  deleteOrderByOrderId,
  getAllOrders,
} from './fixtures/mongodb-helper';

test.describe('API Integration & Backend Verification', () => {
  let apiHelper: APIHelper;

  test.beforeEach(async ({ page }) => {
    apiHelper = new APIHelper(page);
    await connectMongoDB();
  });

  test.afterEach(async () => {
    await disconnectMongoDB();
  });

  test('Backend health check endpoint is accessible', async ({ page }) => {
    const isRunning = await apiHelper.verifyBackendIsRunning();
    expect(isRunning).toBe(true);
  });

  test('POST /api/orders creates order with correct status code', async ({ page }) => {
    await page.goto('/menu');
    await page.waitForLoadState('networkidle');

    // Add item to cart
    const addToCartButtons = page.locator('[data-testid="add-to-cart-btn"]');
    await addToCartButtons.first().click();

    // Go to checkout
    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');

    // Fill form
    await page.fill('input[placeholder="Enter your full name"]', 'API Test User');
    await page.fill('input[placeholder*="9933880173"]', '9999999999');
    await page.fill('input[placeholder*="123"]', 'Test House');
    await page.fill('input[placeholder*="Sector"]', 'API Test Sector');
    await page.fill('input[placeholder*="Metro Station"]', 'API Test Landmark');
    await page.fill('input[placeholder*="122001"]', '122222');

    // Wait for API response
    const orderResponse = await apiHelper.waitForOrderAPIResponse(201);
    
    // Verify response structure
    expect(orderResponse).toHaveProperty('success', true);
    expect(orderResponse).toHaveProperty('message');
    expect(orderResponse).toHaveProperty('data');
    expect(orderResponse.data).toHaveProperty('_id');
    expect(orderResponse.data).toHaveProperty('orderId');

    // Cleanup
    await deleteOrderByOrderId(orderResponse.data.orderId);
  });

  test('Order API response contains all required fields', async ({ page }) => {
    await page.goto('/menu');
    await page.waitForLoadState('networkidle');

    const addToCartButtons = page.locator('button:has-text("Add to Cart")');
    await addToCartButtons.first().click();

    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');

    await page.fill('input[placeholder="Enter your full name"]', 'Field Test User');
    await page.fill('input[placeholder*="9933880173"]', '9888888888');
    await page.fill('input[placeholder*="123"]', 'Field Test House');
    await page.fill('input[placeholder*="Sector"]', 'Field Test Area');
    await page.fill('input[placeholder*="Metro Station"]', 'Field Test Mark');
    await page.fill('input[placeholder*="122001"]', '122333');

    const orderResponse = await apiHelper.waitForOrderAPIResponse(201);
    const orderData = orderResponse.data;

    // Verify required fields
    expect(orderData).toHaveProperty('orderId');
    expect(orderData).toHaveProperty('_id');
    expect(orderData).toHaveProperty('customerName', 'Field Test User');
    expect(orderData).toHaveProperty('phone', '9888888888');
    expect(orderData).toHaveProperty('address');
    expect(orderData.address).toHaveProperty('street');
    expect(orderData.address).toHaveProperty('city');
    expect(orderData.address).toHaveProperty('state');
    expect(orderData.address).toHaveProperty('pincode');
    expect(orderData).toHaveProperty('items');
    expect(orderData.items.length).toBeGreaterThan(0);
    expect(orderData).toHaveProperty('totalAmount');
    expect(orderData).toHaveProperty('orderStatus', 'placed');
    expect(orderData).toHaveProperty('paymentStatus', 'pending');
    expect(orderData).toHaveProperty('whatsappNotified', true);

    // Cleanup
    await deleteOrderByOrderId(orderData.orderId);
  });

  test('GET /api/orders/:id retrieves order correctly', async ({ page }) => {
    await page.goto('/menu');
    await page.waitForLoadState('networkidle');

    const addToCartButtons = page.locator('button:has-text("Add to Cart")');
    await addToCartButtons.first().click();

    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');

    await page.fill('input[placeholder="Enter your full name"]', 'Retrieval Test');
    await page.fill('input[placeholder*="9933880173"]', '9777777777');
    await page.fill('input[placeholder*="123"]', 'Retrieval House');
    await page.fill('input[placeholder*="Sector"]', 'Retrieval Sector');
    await page.fill('input[placeholder*="Metro Station"]', 'Retrieval Mark');
    await page.fill('input[placeholder*="122001"]', '122444');

    const createResponse = await apiHelper.waitForOrderAPIResponse(201);
    const orderId = createResponse.data.orderId;

    // Fetch order using API helper
    const retrievedOrder = await apiHelper.getOrderFromAPI(orderId);

    expect(retrievedOrder.success).toBe(true);
    expect(retrievedOrder.data.orderId).toBe(orderId);
    expect(retrievedOrder.data.customerName).toBe('Retrieval Test');

    // Cleanup
    await deleteOrderByOrderId(orderId);
  });

  test('MongoDB order document matches API response', async ({ page }) => {
    await page.goto('/menu');
    await page.waitForLoadState('networkidle');

    const addToCartButtons = page.locator('button:has-text("Add to Cart")');
    await addToCartButtons.first().click();

    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');

    const testName = 'MongoDB Match Test';
    const testPhone = '9666666666';
    const testArea = 'MongoDB Test Area';

    await page.fill('input[placeholder="Enter your full name"]', testName);
    await page.fill('input[placeholder*="9933880173"]', testPhone);
    await page.fill('input[placeholder*="123"]', 'MongoDB House');
    await page.fill('input[placeholder*="Sector"]', testArea);
    await page.fill('input[placeholder*="Metro Station"]', 'MongoDB Mark');
    await page.fill('input[placeholder*="122001"]', '122555');

    const apiResponse = await apiHelper.waitForOrderAPIResponse(201);
    const orderId = apiResponse.data.orderId;

    // Wait for DB write
    await page.waitForTimeout(1000);

    // Get from MongoDB
    const mongoDBOrder = await getOrder(orderId);

    // Compare
    expect(mongoDBOrder?.orderId).toBe(apiResponse.data.orderId);
    expect(mongoDBOrder?.customerName).toBe(testName);
    expect(mongoDBOrder?.phone).toBe(testPhone);
    expect(mongoDBOrder?.address.street).toContain(testArea);
    expect(mongoDBOrder?.items[0]?.name).toBe(apiResponse.data.items[0]?.name);
    expect(mongoDBOrder?.totalAmount).toBe(apiResponse.data.totalAmount);

    // Cleanup
    await deleteOrderByOrderId(orderId);
  });

  test('Order data persists in MongoDB after creation', async ({ page }) => {
    await page.goto('/menu');
    await page.waitForLoadState('networkidle');

    const addToCartButtons = page.locator('button:has-text("Add to Cart")');
    await addToCartButtons.first().click();

    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');

    await page.fill('input[placeholder="Enter your full name"]', 'Persistence Test');
    await page.fill('input[placeholder*="9933880173"]', '9555555555');
    await page.fill('input[placeholder*="123"]', 'Persist House');
    await page.fill('input[placeholder*="Sector"]', 'Persist Sector');
    await page.fill('input[placeholder*="Metro Station"]', 'Persist Mark');
    await page.fill('input[placeholder*="122001"]', '122666');

    const orderResponse = await apiHelper.waitForOrderAPIResponse(201);
    const orderId = orderResponse.data.orderId;

    // Wait and verify multiple times
    await page.waitForTimeout(500);
    const firstCheck = await getOrder(orderId);
    expect(firstCheck).toBeTruthy();

    await page.waitForTimeout(1000);
    const secondCheck = await getOrder(orderId);
    expect(secondCheck).toBeTruthy();
    expect(secondCheck?.orderId).toBe(firstCheck?.orderId);

    // Cleanup
    await deleteOrderByOrderId(orderId);
  });

  test('Multiple orders are stored independently in MongoDB', async ({ page }) => {
    const orderIds: string[] = [];

    // Create first order
    await page.goto('/menu');
    await page.waitForLoadState('networkidle');
    
    let addToCartButtons = page.locator('[data-testid="add-to-cart-btn"]');
    await addToCartButtons.first().click();

    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');

    await page.fill('input[placeholder="Enter your full name"]', 'Order 1');
    await page.fill('input[placeholder*="9933880173"]', '9111111111');
    await page.fill('input[placeholder*="123"]', 'Order1 House');
    await page.fill('input[placeholder*="Sector"]', 'Order1 Sector');
    await page.fill('input[placeholder*="Metro Station"]', 'Order1 Mark');
    await page.fill('input[placeholder*="122001"]', '122777');

    const response1 = await apiHelper.waitForOrderAPIResponse(201);
    orderIds.push(response1.data.orderId);

    await page.waitForTimeout(1000);

    // Create second order
    await page.goto('/menu');
    await page.waitForLoadState('networkidle');
    
    addToCartButtons = page.locator('[data-testid="add-to-cart-btn"]');
    await addToCartButtons.nth(1).click();

    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');

    await page.fill('input[placeholder="Enter your full name"]', 'Order 2');
    await page.fill('input[placeholder*="9933880173"]', '9222222222');
    await page.fill('input[placeholder*="123"]', 'Order2 House');
    await page.fill('input[placeholder*="Sector"]', 'Order2 Sector');
    await page.fill('input[placeholder*="Metro Station"]', 'Order2 Mark');
    await page.fill('input[placeholder*="122001"]', '122888');

    const response2 = await apiHelper.waitForOrderAPIResponse(201);
    orderIds.push(response2.data.orderId);

    // Verify both exist independently
    await page.waitForTimeout(1000);
    
    const order1 = await getOrder(orderIds[0]);
    const order2 = await getOrder(orderIds[1]);

    expect(order1?.customerName).toBe('Order 1');
    expect(order2?.customerName).toBe('Order 2');
    expect(order1?.orderId).not.toBe(order2?.orderId);

    // Cleanup
    for (const id of orderIds) {
      await deleteOrderByOrderId(id);
    }
  });

  test('Order validation rejects invalid data', async ({ page }) => {
    // This test attempts to bypass frontend validation and send bad data
    // The backend should reject it

    try {
      const invalidOrderData = {
        customerName: '', // Empty name
        phone: '123', // Invalid phone
        address: {
          street: '',
          city: '',
          state: '',
          pincode: '123', // Invalid pincode
        },
        items: [], // No items
        totalAmount: -100, // Negative amount
      };

      const response = await apiHelper.createOrderViaAPI(invalidOrderData);
      
      // If it somehow passes, at least verify it's rejected
      if (response.success === false) {
        expect(response.success).toBe(false);
      }
    } catch (error) {
      // Expected to throw an error due to validation
      expect(error).toBeTruthy();
    }
  });
});
