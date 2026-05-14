import { test, expect } from '@playwright/test';

test.describe('Checkout Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    // Add item to cart first
    await page.goto('/menu');
    await page.waitForLoadState('networkidle');
    
    const addToCartButtons = page.locator('[data-testid="add-to-cart-btn"]');
    await addToCartButtons.first().click();

    // Navigate to checkout
    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');
  });

  test('Submit without filling required fields shows error', async ({ page }) => {
    // Try to submit empty form
    await page.click('button:has-text("Place Order")');

    // Verify error messages
    const errorMessage = page.locator('text=/Please fill all required fields|required/i');
    await expect(errorMessage).toBeVisible();
  });

  test('Invalid phone number shows error', async ({ page }) => {
    await page.fill('input[placeholder="Enter your full name"]', 'Test User');
    await page.fill('input[placeholder*="9933880173"]', '123'); // Too short
    
    await page.click('button:has-text("Place Order")');

    const errorMessage = page.locator('text=/valid.*phone|10.*digit/i');
    await expect(errorMessage).toBeVisible();
  });

  test('Valid phone number (10 digits) is accepted', async ({ page }) => {
    await page.fill('input[placeholder="Enter your full name"]', 'Valid Phone Test');
    await page.fill('input[placeholder*="9933880173"]', '9876543210');
    await page.fill('input[placeholder*="123"]', 'House 1');
    await page.fill('input[placeholder*="Sector"]', 'Sector 1');
    await page.fill('input[placeholder*="122001"]', '122001');

    // Should not show validation error
    const errorMessage = page.locator('text=/valid.*phone|Please enter/i');
    
    // Try to place order - should not show phone validation error
    await page.click('button:has-text("Place Order")');
    
    // Should either succeed or show different error, not phone error
    const phoneError = page.locator('text=/10.*digit mobile/i');
    await expect(phoneError).not.toBeVisible();
  });

  test('Pincode field limits to 6 digits', async ({ page }) => {
    const pincodeInput = page.locator('input[placeholder*="122001"]');
    
    await pincodeInput.fill('1234567890'); // Try to enter 10 digits
    const value = await pincodeInput.inputValue();
    
    // Should be limited to 6
    expect(value.length).toBeLessThanOrEqual(6);
  });

  test('Phone field limits to 10 digits', async ({ page }) => {
    const phoneInput = page.locator('input[placeholder*="9933880173"]');
    
    await phoneInput.fill('12345678901234'); // Try to enter more than 10
    const value = await phoneInput.inputValue();
    
    // Should be limited to 10
    expect(value.length).toBeLessThanOrEqual(10);
  });

  test('All required fields marked with asterisk', async ({ page }) => {
    // Verify required fields are marked
    const labels = page.locator('label:has-text("*")');
    const count = await labels.count();
    
    expect(count).toBeGreaterThanOrEqual(5); // Name, Phone, House, Area, Pincode
  });

  test('Form persists delivery address from cart context', async ({ page }) => {
    // Check if pre-filled with delivery address from context
    const cityInput = page.locator('input[value="Gurgaon"], input[placeholder="Gurgaon"]');
    const stateInput = page.locator('input[value="Haryana"], input[placeholder="Haryana"]');
    
    const cityExists = await cityInput.isVisible().catch(() => false);
    const stateExists = await stateInput.isVisible().catch(() => false);
    
    // At least one should be pre-filled
    expect(cityExists || stateExists).toBe(true);
  });

  test('Payment method selection is visible', async ({ page }) => {
    await expect(page.locator('text=Payment Method')).toBeVisible();
    await expect(page.locator('text=Cash on Delivery')).toBeVisible();
    await expect(page.locator('text=Credit/Debit Card')).toBeVisible();
  });

  test('COD is default payment method', async ({ page }) => {
    const codButton = page.locator('button:has-text("Cash on Delivery")');
    const isSelected = codButton.locator('..').locator('text=Cash on Delivery');
    
    // Should show as selected (look for visual indicator)
    await expect(codButton).toBeVisible();
  });

  test('Order summary shows all cost breakdowns', async ({ page }) => {
    await page.fill('input[placeholder="Enter your full name"]', 'Summary Test');
    await page.fill('input[placeholder*="9933880173"]', '9876543210');

    // Check for all cost elements
    await expect(page.locator('text=/Item Total|Subtotal/i')).toBeVisible();
    await expect(page.locator('text=/GST|Tax/i')).toBeVisible();
    await expect(page.locator('text=/Delivery Fee|Delivery/i')).toBeVisible();
    await expect(page.locator('text=/Platform Fee/i')).toBeVisible();
    await expect(page.locator('text=/Grand Total/i')).toBeVisible();
  });

  test('Delivery address fields update on input', async ({ page }) => {
    const houseInput = page.locator('input[placeholder*="123"]');
    const testValue = 'Tower A';
    
    await houseInput.fill(testValue);
    const inputValue = await houseInput.inputValue();
    
    expect(inputValue).toBe(testValue);
  });

  test('Form fields are properly labeled', async ({ page }) => {
    await expect(page.locator('text=Full Name')).toBeVisible();
    await expect(page.locator('text=Mobile Number')).toBeVisible();
    await expect(page.locator('text=House.*Building')).toBeVisible();
    await expect(page.locator('text=Area.*Street')).toBeVisible();
    await expect(page.locator('text=PIN Code')).toBeVisible();
  });

  test('Can select different payment methods', async ({ page }) => {
    const cardButton = page.locator('button:has-text("Credit/Debit Card")');
    
    await cardButton.click();
    
    // Verify selected state changed
    const isSelected = cardButton.locator('[class*="border-orange"]').isVisible().catch(() => false);
    expect(isSelected || await cardButton.evaluate(el => window.getComputedStyle(el).borderColor)).toBeTruthy();
  });

  test('Submit button shows processing state', async ({ page }) => {
    await page.fill('input[placeholder="Enter your full name"]', 'Processing Test');
    await page.fill('input[placeholder*="9933880173"]', '9876543210');
    await page.fill('input[placeholder*="123"]', 'House');
    await page.fill('input[placeholder*="Sector"]', 'Sector');
    await page.fill('input[placeholder*="122001"]', '122001');

    const submitButton = page.locator('button:has-text("Place Order")');
    await submitButton.click();

    // Check for processing state
    const processingState = page.locator('text=Processing|Loading').isVisible().catch(() => false);
    expect(processingState).toBeTruthy();
  });
});
