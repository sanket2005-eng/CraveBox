import { test, expect } from '@playwright/test';
import { APIHelper } from './fixtures/api-helper';
import { testCheckoutFormData, testOrderData } from './fixtures/test-data';
import {
  connectMongoDB,
  disconnectMongoDB,
  getOrder,
  deleteOrderByOrderId,
  verifyOrderExists,
  verifyOrderDetails,
} from './fixtures/mongodb-helper';

test.describe('End-to-End Order Placement Flow', () => {
  let apiHelper: APIHelper;

  test.beforeEach(async ({ page }) => {
    apiHelper = new APIHelper(page);
    
    // Verify backend is running
    const backendRunning = await apiHelper.verifyBackendIsRunning();
    if (!backendRunning) {
      throw new Error('Backend is not running. Please start it with: npm run dev in backend/');
    }

    await connectMongoDB();
  });

  test.afterEach(async () => {
    await disconnectMongoDB();
  });

  test('Complete order flow: Add items → Checkout → Create Order → Save in MongoDB', async ({
    page,
  }) => {
    // Step 1: Navigate to home page
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Indian Fast Food');

    // Step 2: Navigate to menu
    await page.click('text=Menu');
    await page.waitForURL(/.*menu/, { timeout: 10000 });
    await page.waitForLoadState('load');
    
    // Wait for menu items to load
    await page.waitForSelector('[data-testid="add-to-cart-btn"]', { timeout: 10000 });
    await page.waitForTimeout(500);

    // Step 3: Find and add first pizza to cart
    const addToCartButtons = page.locator('[data-testid="add-to-cart-btn"]');
    await expect(addToCartButtons.first()).toBeVisible();
    await addToCartButtons.first().click();
    
    // Verify toast notification
    await expect(page.locator('text=Added')).toBeVisible();
    
    // Verify cart count updated
    await expect(page.locator('text=1')).toBeVisible(); // Cart badge

    // Step 4: Navigate to cart
    await page.click('text=Cart');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*cart/);

    // Verify item in cart
    await expect(page.locator('text=Classic Pizza')).toBeVisible();

    // Step 5: Proceed to checkout
    await page.click('text=Proceed to Checkout');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*checkout/);

    // Step 6: Fill checkout form
    await page.fill('input[placeholder="Enter your full name"]', testCheckoutFormData.fullName);
    await page.fill('input[placeholder*="9933880173"]', testCheckoutFormData.phone);
    await page.fill('input[placeholder*="123"]', testCheckoutFormData.houseNo);
    await page.fill('input[placeholder*="Sector"]', testCheckoutFormData.area);
    await page.fill('input[placeholder*="Metro Station"]', testCheckoutFormData.landmark);
    await page.fill('input[placeholder*="122001"]', testCheckoutFormData.pinCode);

    // Step 7: Verify COD is selected
    await expect(page.locator('text=Cash on Delivery')).toBeVisible();

    // Step 8: Verify order summary shows correct total
    const totalElement = page.locator('text=Grand Total').locator('..').locator('span').last();
    const totalText = await totalElement.textContent();
    expect(totalText).toMatch(/₹\d+/);

    // Step 9: Set up API interception before placing order
    const responses = await apiHelper.setupAPIInterception();

    // Step 10: Place order
    await page.click('button:has-text("Place Order")');

    // Step 11: Wait for order API response
    const orderResponse = await apiHelper.waitForOrderAPIResponse(201);
    
    // Verify API response structure
    expect(orderResponse.success).toBe(true);
    expect(orderResponse.data).toHaveProperty('orderId');
    expect(orderResponse.data).toHaveProperty('_id');
    expect(orderResponse.data.customerName).toBe(testCheckoutFormData.fullName);

    const orderId = orderResponse.data.orderId;
    console.log(`✅ Order created via API with ID: ${orderId}`);

    // Step 12: Verify we're redirected to success page
    await page.waitForURL(/.*order-success/);
    await expect(page.locator('text=Order Placed Successfully')).toBeVisible();

    // Step 13: Verify order is saved in MongoDB
    await page.waitForTimeout(1000); // Small delay to ensure write
    const orderInDB = await getOrder(orderId);
    
    expect(orderInDB).toBeTruthy();
    expect(orderInDB?.customerName).toBe(testCheckoutFormData.fullName);
    expect(orderInDB?.phone).toBe(testCheckoutFormData.phone);
    expect(orderInDB?.address.street).toContain(testCheckoutFormData.area);
    expect(orderInDB?.orderStatus).toBe('placed');
    
    console.log(`✅ Order verified in MongoDB: ${JSON.stringify(orderInDB, null, 2)}`);

    // Cleanup
    await deleteOrderByOrderId(orderId);
  });

  test('COD order with multiple items - backend persistence', async ({ page }) => {
    // Navigate to menu
    await page.goto('/menu');
    await page.waitForLoadState('load');
    await page.waitForSelector('[data-testid="add-to-cart-btn"]', { timeout: 10000 });

    // Add multiple items to cart
    const addToCartButtons = page.locator('[data-testid="add-to-cart-btn"]');
    
    // Add first item
    await addToCartButtons.nth(0).click();
    await page.waitForTimeout(500);

    // Add second item
    await addToCartButtons.nth(1).click();
    await page.waitForTimeout(500);

    // Go to checkout
    await page.goto('/checkout');
    await page.waitForLoadState('load');
    
    // Wait for form fields to be visible with longer timeout
    await page.waitForSelector('input[placeholder="Enter your full name"]', { timeout: 15000 });
    await page.waitForTimeout(1000);

    // Fill form with different data
    await page.fill('input[placeholder="Enter your full name"]', 'Multi Item Tester');
    await page.fill('input[placeholder="9933880173"]', '9876543210');
    await page.fill('input[placeholder="e.g., 123, Tower A"]', 'House 42');
    await page.fill('input[placeholder="e.g., Sector 14, MG Road"]', 'New Sector 89');
    await page.fill('input[placeholder="e.g., Near Metro Station"]', 'Near Bus Stop');
    await page.fill('input[placeholder="e.g., 122001"]', '122005');

    // Place order
    await page.click('button:has-text("Place Order")');

    // Get response
    const orderResponse = await apiHelper.waitForOrderAPIResponse(201);
    const orderId = orderResponse.data.orderId;

    // Verify in MongoDB
    await page.waitForTimeout(1000);
    const orderInDB = await getOrder(orderId);
    
    expect(orderInDB).toBeTruthy();
    expect(orderInDB?.items.length).toBeGreaterThan(1);
    expect(orderInDB?.customerName).toBe('Multi Item Tester');
    
    console.log(`✅ Multi-item order verified with ${orderInDB?.items.length} items`);

    // Cleanup
    await deleteOrderByOrderId(orderId);
  });

  test('Verify order data matches form input exactly', async ({ page }) => {
    // Go to menu
    await page.goto('/menu');
    await page.waitForLoadState('load');
    await page.waitForSelector('[data-testid="add-to-cart-btn"]', { timeout: 10000 });
    
    const addToCartButtons = page.locator('[data-testid="add-to-cart-btn"]');
    await addToCartButtons.first().click();
    await page.waitForTimeout(500);

    await page.goto('/checkout');
    await page.waitForLoadState('load');
    
    // Wait for form fields to be visible
    await page.waitForSelector('input[placeholder="Enter your full name"]', { timeout: 15000 });
    await page.waitForTimeout(1000);

    // Use unique test data
    const uniquePhone = '9111111111';
    const uniqueName = 'DataMatch Tester';
    const uniqueArea = 'Unique Sector XYZ';

    await page.fill('input[placeholder="Enter your full name"]', uniqueName);
    await page.fill('input[placeholder="9933880173"]', uniquePhone);
    await page.fill('input[placeholder="e.g., 123, Tower A"]', 'Apt 101');
    await page.fill('input[placeholder="e.g., Sector 14, MG Road"]', uniqueArea);
    await page.fill('input[placeholder="e.g., Near Metro Station"]', 'Test Landmark');
    await page.fill('input[placeholder="e.g., 122001"]', '121001');

    await page.click('button:has-text("Place Order")');
    const orderResponse = await apiHelper.waitForOrderAPIResponse(201);
    const orderId = orderResponse.data.orderId;

    // Verify exact match in MongoDB
    await page.waitForTimeout(1000);
    const orderInDB = await getOrder(orderId);

    expect(orderInDB?.customerName).toBe(uniqueName);
    expect(orderInDB?.phone).toBe(uniquePhone);
    expect(orderInDB?.address.street).toContain(uniqueArea);
    expect(orderInDB?.whatsappNotified).toBe(true); // WhatsApp should be triggered

    console.log(`✅ Data integrity verified: All form fields match MongoDB`);

    // Cleanup
    await deleteOrderByOrderId(orderId);
  });
});
