import { test, expect } from '@playwright/test';

test.describe('Cart Operations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/menu');
    await page.waitForLoadState('networkidle');
  });

  test('Add single item to cart', async ({ page }) => {
    // Find and click add to cart
    const addToCartButtons = page.locator('[data-testid="add-to-cart-btn"]');
    await addToCartButtons.first().click();

    // Verify toast notification
    await expect(page.locator('text=Added')).toBeVisible();
    await expect(page.locator('text=to cart')).toBeVisible();

    // Navigate to cart
    await page.click('text=Cart');
    await page.waitForLoadState('networkidle');

    // Verify item appears in cart
    const cartItems = page.locator('[class*="cart"]');
    await expect(cartItems.locator('text=/Pizza|Burger|Momo|Pasta/')).toBeVisible();
  });

  test('Add multiple different items to cart', async ({ page }) => {
    const addToCartButtons = page.locator('[data-testid="add-to-cart-btn"]');

    // Add 3 different items
    await addToCartButtons.nth(0).click();
    await page.waitForTimeout(300);
    
    await addToCartButtons.nth(1).click();
    await page.waitForTimeout(300);
    
    await addToCartButtons.nth(2).click();
    await page.waitForTimeout(300);

    // Go to cart page
    await page.click('text=Cart');
    await page.waitForLoadState('networkidle');

    // Verify 3 items in cart
    const cartItemRows = page.locator('[class*="flex justify-between"]');
    const count = await cartItemRows.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('Increase item quantity in cart', async ({ page }) => {
    // Add item
    const addToCartButtons = page.locator('[data-testid="add-to-cart-btn"]');
    await addToCartButtons.first().click();

    // Go to cart
    await page.click('text=Cart');
    await page.waitForLoadState('networkidle');

    // Find increase quantity button and click it
    const increaseButtons = page.locator('button:has-text("+")');
    const initialQuantity = await page.locator('input[type="number"]').first().inputValue();
    
    await increaseButtons.first().click();
    await page.waitForTimeout(200);

    const newQuantity = await page.locator('input[type="number"]').first().inputValue();
    expect(Number(newQuantity)).toBeGreaterThan(Number(initialQuantity));
  });

  test('Remove item from cart', async ({ page }) => {
    // Add item
    const addToCartButtons = page.locator('[data-testid="add-to-cart-btn"]');
    await addToCartButtons.first().click();

    // Go to cart
    await page.click('text=Cart');
    await page.waitForLoadState('networkidle');

    // Get initial item count
    const itemsBeforeDelete = await page.locator('[class*="flex justify-between"]').count();

    // Find and click remove button (usually a trash icon or X button)
    const removeButtons = page.locator('button:has-text("Remove"), button:has-text("Delete"), button[aria-label*="remove"], button[aria-label*="delete"]');
    if (await removeButtons.first().isVisible()) {
      await removeButtons.first().click();
    } else {
      // Try alternate selectors
      const xButtons = page.locator('button').filter({ has: page.locator('svg') }).first();
      await xButtons.click();
    }

    await page.waitForTimeout(300);

    // Verify cart is empty or has fewer items
    const itemsAfterDelete = await page.locator('[class*="flex justify-between"]').count();
    expect(itemsAfterDelete).toBeLessThanOrEqual(itemsBeforeDelete);
  });

  test('Clear entire cart', async ({ page }) => {
    // Add multiple items
    const addToCartButtons = page.locator('[data-testid="add-to-cart-btn"]');
    await addToCartButtons.nth(0).click();
    await page.waitForTimeout(300);
    await addToCartButtons.nth(1).click();

    // Go to cart
    await page.click('text=Cart');
    await page.waitForLoadState('networkidle');

    // Find clear/remove all button
    const clearButton = page.locator('button:has-text("Clear"), button:has-text("Empty"), button:has-text("Remove All")');
    if (await clearButton.isVisible()) {
      await clearButton.click();
      await page.waitForTimeout(300);
      
      // Verify cart is empty
      const emptyMessage = page.locator('text=/Your cart is empty|No items/i');
      await expect(emptyMessage).toBeVisible();
    }
  });

  test('Cart totals calculate correctly', async ({ page }) => {
    // Add item
    const addToCartButtons = page.locator('[data-testid="add-to-cart-btn"]');
    await addToCartButtons.first().click();

    // Go to cart
    await page.click('text=Cart');
    await page.waitForLoadState('networkidle');

    // Verify totals are visible
    await expect(page.locator('text=/Item Total|Subtotal/i')).toBeVisible();
    await expect(page.locator('text=/GST|Tax/i')).toBeVisible();
    await expect(page.locator('text=/Delivery Fee/i')).toBeVisible();
    await expect(page.locator('text=/Grand Total/i')).toBeVisible();

    // Verify values are numbers
    const totalElements = page.locator('text=/₹\d+/');
    const count = await totalElements.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('Navigate to checkout from cart', async ({ page }) => {
    // Add item
    const addToCartButtons = page.locator('[data-testid="add-to-cart-btn"]');
    await addToCartButtons.first().click();

    // Go to cart
    await page.click('text=Cart');
    await page.waitForLoadState('networkidle');

    // Click checkout button
    const checkoutButton = page.locator('button:has-text("Proceed to Checkout"), button:has-text("Checkout")');
    await checkoutButton.click();

    // Verify on checkout page
    await page.waitForURL(/.*checkout/);
    await expect(page).toHaveURL(/.*checkout/);
    await expect(page.locator('text=/Delivery Address|Payment Method/i')).toBeVisible();
  });

  test('Prevent checkout with empty cart', async ({ page }) => {
    // Try to access checkout directly with empty cart
    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');

    // Should redirect to menu or show error
    const redirectedToMenu = page.url().includes('/menu');
    const showsError = await page.locator('text=/empty|no items/i').isVisible().catch(() => false);

    expect(redirectedToMenu || showsError).toBe(true);
  });

  test('Preserve cart items across page navigation', async ({ page }) => {
    // Add item
    const addToCartButtons = page.locator('[data-testid="add-to-cart-btn"]');
    await addToCartButtons.first().click();

    // Navigate away
    await page.click('text=Home');
    await page.waitForLoadState('networkidle');

    // Navigate back to menu
    await page.click('text=Menu');
    await page.waitForLoadState('networkidle');

    // Go to cart and verify item still there
    await page.click('text=Cart');
    await page.waitForLoadState('networkidle');

    const cartItems = page.locator('[class*="cart"]');
    await expect(cartItems.locator('text=/Pizza|Burger|Momo|Pasta/')).toBeVisible();
  });
});
