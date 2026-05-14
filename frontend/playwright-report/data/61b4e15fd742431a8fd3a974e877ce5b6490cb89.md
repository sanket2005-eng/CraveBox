# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: order-flow.spec.ts >> End-to-End Order Placement Flow >> COD order with multiple items - backend persistence
- Location: tests\order-flow.spec.ts:122:3

# Error details

```
TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('input[placeholder="Enter your full name"]') to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e4]:
    - generic [ref=e6]:
      - link "Pizza O Cafe The Family Restaurant" [ref=e7] [cursor=pointer]:
        - /url: /
        - img [ref=e10]
        - generic [ref=e13]:
          - generic [ref=e14]: Pizza O Cafe
          - generic [ref=e15]: The Family Restaurant
      - generic [ref=e16]:
        - link "Home" [ref=e17] [cursor=pointer]:
          - /url: /
        - link "Menu" [ref=e18] [cursor=pointer]:
          - /url: /menu
        - link "Cart" [ref=e19] [cursor=pointer]:
          - /url: /cart
      - generic [ref=e20]:
        - generic [ref=e21]:
          - img [ref=e22]
          - generic [ref=e25]: Gurgaon, India
        - link "9933880173" [ref=e26] [cursor=pointer]:
          - /url: tel:+919933880173
          - img [ref=e27]
          - generic [ref=e29]: "9933880173"
        - link [ref=e30] [cursor=pointer]:
          - /url: /cart
          - img [ref=e32]
  - main
  - contentinfo [ref=e36]:
    - generic [ref=e38]:
      - generic [ref=e39]:
        - generic [ref=e40]:
          - img [ref=e42]
          - generic [ref=e44]:
            - heading "Pizza O Cafe" [level=3] [ref=e45]
            - paragraph [ref=e46]: The Family Restaurant
        - paragraph [ref=e47]: Serving the best Indian fast food since 2015. Quality ingredients, authentic taste, and quick delivery.
        - generic [ref=e48]:
          - link [ref=e49] [cursor=pointer]:
            - /url: "#"
            - img [ref=e50]
          - link [ref=e53] [cursor=pointer]:
            - /url: "#"
            - img [ref=e54]
          - link [ref=e56] [cursor=pointer]:
            - /url: "#"
            - img [ref=e57]
      - generic [ref=e59]:
        - heading "Quick Links" [level=4] [ref=e60]
        - list [ref=e61]:
          - listitem [ref=e62]:
            - link "Home" [ref=e63] [cursor=pointer]:
              - /url: /
          - listitem [ref=e64]:
            - link "Our Menu" [ref=e65] [cursor=pointer]:
              - /url: /menu
          - listitem [ref=e66]:
            - link "Cart" [ref=e67] [cursor=pointer]:
              - /url: /cart
      - generic [ref=e68]:
        - heading "Contact Us" [level=4] [ref=e69]
        - list [ref=e70]:
          - listitem [ref=e71]:
            - img [ref=e72]
            - generic [ref=e75]:
              - text: Galsi Thana Para, Near Eye Care,
              - text: Gurgaon, Haryana - 122001
          - listitem [ref=e76]:
            - img [ref=e77]
            - link "+91 9933880173" [ref=e79] [cursor=pointer]:
              - /url: tel:+919933880173
          - listitem [ref=e80]:
            - img [ref=e81]
            - generic [ref=e84]:
              - text: "Open: 10:00 AM - 11:00 PM"
              - text: All Days Open
      - generic [ref=e85]:
        - heading "We Accept" [level=4] [ref=e86]
        - generic [ref=e87]:
          - generic [ref=e88]: Cash on Delivery
          - generic [ref=e89]: UPI
          - generic [ref=e90]: Paytm
          - generic [ref=e91]: PhonePe
          - generic [ref=e92]: Google Pay
          - generic [ref=e93]: Cards
        - paragraph [ref=e95]:
          - text: "FSSAI License: 12345678901234"
          - text: "GSTIN: 06ABCDE1234F1Z5"
    - generic [ref=e98]:
      - paragraph [ref=e99]: © 2025 Pizza O Cafe. All rights reserved. Made with ❤️ in India
      - generic [ref=e100]:
        - generic [ref=e101]: Privacy Policy
        - generic [ref=e102]: •
        - generic [ref=e103]: Terms of Service
```

# Test source

```ts
  43  | 
  44  |     // Step 3: Find and add first pizza to cart
  45  |     const addToCartButtons = page.locator('[data-testid="add-to-cart-btn"]');
  46  |     await expect(addToCartButtons.first()).toBeVisible();
  47  |     await addToCartButtons.first().click();
  48  |     
  49  |     // Verify toast notification
  50  |     await expect(page.locator('text=Added')).toBeVisible();
  51  |     
  52  |     // Verify cart count updated
  53  |     await expect(page.locator('text=1')).toBeVisible(); // Cart badge
  54  | 
  55  |     // Step 4: Navigate to cart
  56  |     await page.click('text=Cart');
  57  |     await page.waitForLoadState('networkidle');
  58  |     await expect(page).toHaveURL(/.*cart/);
  59  | 
  60  |     // Verify item in cart
  61  |     await expect(page.locator('text=Classic Pizza')).toBeVisible();
  62  | 
  63  |     // Step 5: Proceed to checkout
  64  |     await page.click('text=Proceed to Checkout');
  65  |     await page.waitForLoadState('networkidle');
  66  |     await expect(page).toHaveURL(/.*checkout/);
  67  | 
  68  |     // Step 6: Fill checkout form
  69  |     await page.fill('input[placeholder="Enter your full name"]', testCheckoutFormData.fullName);
  70  |     await page.fill('input[placeholder*="9933880173"]', testCheckoutFormData.phone);
  71  |     await page.fill('input[placeholder*="123"]', testCheckoutFormData.houseNo);
  72  |     await page.fill('input[placeholder*="Sector"]', testCheckoutFormData.area);
  73  |     await page.fill('input[placeholder*="Metro Station"]', testCheckoutFormData.landmark);
  74  |     await page.fill('input[placeholder*="122001"]', testCheckoutFormData.pinCode);
  75  | 
  76  |     // Step 7: Verify COD is selected
  77  |     await expect(page.locator('text=Cash on Delivery')).toBeVisible();
  78  | 
  79  |     // Step 8: Verify order summary shows correct total
  80  |     const totalElement = page.locator('text=Grand Total').locator('..').locator('span').last();
  81  |     const totalText = await totalElement.textContent();
  82  |     expect(totalText).toMatch(/₹\d+/);
  83  | 
  84  |     // Step 9: Set up API interception before placing order
  85  |     const responses = await apiHelper.setupAPIInterception();
  86  | 
  87  |     // Step 10: Place order
  88  |     await page.click('button:has-text("Place Order")');
  89  | 
  90  |     // Step 11: Wait for order API response
  91  |     const orderResponse = await apiHelper.waitForOrderAPIResponse(201);
  92  |     
  93  |     // Verify API response structure
  94  |     expect(orderResponse.success).toBe(true);
  95  |     expect(orderResponse.data).toHaveProperty('orderId');
  96  |     expect(orderResponse.data).toHaveProperty('_id');
  97  |     expect(orderResponse.data.customerName).toBe(testCheckoutFormData.fullName);
  98  | 
  99  |     const orderId = orderResponse.data.orderId;
  100 |     console.log(`✅ Order created via API with ID: ${orderId}`);
  101 | 
  102 |     // Step 12: Verify we're redirected to success page
  103 |     await page.waitForURL(/.*order-success/);
  104 |     await expect(page.locator('text=Order Placed Successfully')).toBeVisible();
  105 | 
  106 |     // Step 13: Verify order is saved in MongoDB
  107 |     await page.waitForTimeout(1000); // Small delay to ensure write
  108 |     const orderInDB = await getOrder(orderId);
  109 |     
  110 |     expect(orderInDB).toBeTruthy();
  111 |     expect(orderInDB?.customerName).toBe(testCheckoutFormData.fullName);
  112 |     expect(orderInDB?.phone).toBe(testCheckoutFormData.phone);
  113 |     expect(orderInDB?.address.street).toContain(testCheckoutFormData.area);
  114 |     expect(orderInDB?.orderStatus).toBe('placed');
  115 |     
  116 |     console.log(`✅ Order verified in MongoDB: ${JSON.stringify(orderInDB, null, 2)}`);
  117 | 
  118 |     // Cleanup
  119 |     await deleteOrderByOrderId(orderId);
  120 |   });
  121 | 
  122 |   test('COD order with multiple items - backend persistence', async ({ page }) => {
  123 |     // Navigate to menu
  124 |     await page.goto('/menu');
  125 |     await page.waitForLoadState('networkidle');
  126 | 
  127 |     // Add multiple items to cart
  128 |     const addToCartButtons = page.locator('[data-testid="add-to-cart-btn"]');
  129 |     
  130 |     // Add first item
  131 |     await addToCartButtons.nth(0).click();
  132 |     await page.waitForTimeout(500);
  133 | 
  134 |     // Add second item
  135 |     await addToCartButtons.nth(1).click();
  136 |     await page.waitForTimeout(500);
  137 | 
  138 |     // Go to checkout
  139 |     await page.goto('/checkout');
  140 |     await page.waitForLoadState('domcontentloaded');
  141 |     
  142 |     // Wait for form fields to be visible
> 143 |     await page.waitForSelector('input[placeholder="Enter your full name"]', { timeout: 10000 });
      |                ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
  144 |     await page.waitForTimeout(500);
  145 | 
  146 |     // Fill form with different data
  147 |     await page.fill('input[placeholder="Enter your full name"]', 'Multi Item Tester');
  148 |     await page.fill('input[placeholder="9933880173"]', '9876543210');
  149 |     await page.fill('input[placeholder="e.g., 123, Tower A"]', 'House 42');
  150 |     await page.fill('input[placeholder="e.g., Sector 14, MG Road"]', 'New Sector 89');
  151 |     await page.fill('input[placeholder="e.g., Near Metro Station"]', 'Near Bus Stop');
  152 |     await page.fill('input[placeholder="e.g., 122001"]', '122005');
  153 | 
  154 |     // Place order
  155 |     await page.click('button:has-text("Place Order")');
  156 | 
  157 |     // Get response
  158 |     const orderResponse = await apiHelper.waitForOrderAPIResponse(201);
  159 |     const orderId = orderResponse.data.orderId;
  160 | 
  161 |     // Verify in MongoDB
  162 |     await page.waitForTimeout(1000);
  163 |     const orderInDB = await getOrder(orderId);
  164 |     
  165 |     expect(orderInDB).toBeTruthy();
  166 |     expect(orderInDB?.items.length).toBeGreaterThan(1);
  167 |     expect(orderInDB?.customerName).toBe('Multi Item Tester');
  168 |     
  169 |     console.log(`✅ Multi-item order verified with ${orderInDB?.items.length} items`);
  170 | 
  171 |     // Cleanup
  172 |     await deleteOrderByOrderId(orderId);
  173 |   });
  174 | 
  175 |   test('Verify order data matches form input exactly', async ({ page }) => {
  176 |     // Go directly to checkout
  177 |     await page.goto('/menu');
  178 |     await page.waitForLoadState('networkidle');
  179 |     
  180 |     const addToCartButtons = page.locator('[data-testid="add-to-cart-btn"]');
  181 |     await addToCartButtons.first().click();
  182 | 
  183 |     await page.goto('/checkout');
  184 |     await page.waitForLoadState('domcontentloaded');
  185 |     
  186 |     // Wait for form fields to be visible
  187 |     await page.waitForSelector('input[placeholder="Enter your full name"]', { timeout: 10000 });
  188 |     await page.waitForTimeout(500);
  189 | 
  190 |     // Use unique test data
  191 |     const uniquePhone = '9111111111';
  192 |     const uniqueName = 'DataMatch Tester';
  193 |     const uniqueArea = 'Unique Sector XYZ';
  194 | 
  195 |     await page.fill('input[placeholder="Enter your full name"]', uniqueName);
  196 |     await page.fill('input[placeholder="9933880173"]', uniquePhone);
  197 |     await page.fill('input[placeholder="e.g., 123, Tower A"]', 'Apt 101');
  198 |     await page.fill('input[placeholder="e.g., Sector 14, MG Road"]', uniqueArea);
  199 |     await page.fill('input[placeholder="e.g., Near Metro Station"]', 'Test Landmark');
  200 |     await page.fill('input[placeholder="e.g., 122001"]', '121001');
  201 | 
  202 |     await page.click('button:has-text("Place Order")');
  203 |     const orderResponse = await apiHelper.waitForOrderAPIResponse(201);
  204 |     const orderId = orderResponse.data.orderId;
  205 | 
  206 |     // Verify exact match in MongoDB
  207 |     await page.waitForTimeout(1000);
  208 |     const orderInDB = await getOrder(orderId);
  209 | 
  210 |     expect(orderInDB?.customerName).toBe(uniqueName);
  211 |     expect(orderInDB?.phone).toBe(uniquePhone);
  212 |     expect(orderInDB?.address.street).toContain(uniqueArea);
  213 |     expect(orderInDB?.whatsappNotified).toBe(true); // WhatsApp should be triggered
  214 | 
  215 |     console.log(`✅ Data integrity verified: All form fields match MongoDB`);
  216 | 
  217 |     // Cleanup
  218 |     await deleteOrderByOrderId(orderId);
  219 |   });
  220 | });
  221 | 
```