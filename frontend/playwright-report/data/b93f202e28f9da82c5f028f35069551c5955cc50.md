# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: order-flow.spec.ts >> End-to-End Order Placement Flow >> Complete order flow: Add items → Checkout → Create Order → Save in MongoDB
- Location: tests\order-flow.spec.ts:32:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=1')
Expected: visible
Error: strict mode violation: locator('text=1') resolved to 25 elements:
    1) <span class="text-sm font-medium">9933880173</span> aka getByRole('link', { name: '9933880173', exact: true })
    2) <span class="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full flex items-center justify-center shadow-lg">1</span> aka getByRole('link', { name: '1', exact: true })
    3) <span>Small - ₹100</span> aka getByRole('button', { name: 'Small - ₹100' })
    4) <span class="w-8 text-center font-bold text-gray-800">1</span> aka getByText('1').nth(3)
    5) <span>Add ₹100</span> aka getByRole('button', { name: 'Add ₹100' })
    6) <span>Small - ₹120</span> aka getByRole('button', { name: 'Small - ₹120' })
    7) <span class="w-8 text-center font-bold text-gray-800">1</span> aka getByText('1', { exact: true }).nth(2)
    8) <span>Add ₹120</span> aka getByRole('button', { name: 'Add ₹120' })
    9) <span>Small - ₹140</span> aka getByRole('button', { name: 'Small - ₹140' })
    10) <span class="w-8 text-center font-bold text-gray-800">1</span> aka getByText('1', { exact: true }).nth(3)
    ...

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=1')

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
          - text: Menu
        - link "Cart" [ref=e20] [cursor=pointer]:
          - /url: /cart
      - generic [ref=e21]:
        - generic [ref=e22]:
          - img [ref=e23]
          - generic [ref=e26]: Gurgaon, India
        - link "9933880173" [ref=e27] [cursor=pointer]:
          - /url: tel:+919933880173
          - img [ref=e28]
          - generic [ref=e30]: "9933880173"
        - link "1" [ref=e31] [cursor=pointer]:
          - /url: /cart
          - img [ref=e33]
          - generic [ref=e37]: "1"
  - main [ref=e38]:
    - generic [ref=e39]:
      - generic [ref=e41]:
        - heading "Our Menu 📋" [level=1] [ref=e42]
        - paragraph [ref=e43]: Explore our wide range of delicious Indian fast food
      - generic [ref=e46]:
        - generic [ref=e47]:
          - img [ref=e48]
          - textbox "Search your favorite food..." [ref=e51]
        - button "Filters" [ref=e52] [cursor=pointer]:
          - img [ref=e53]
          - generic [ref=e54]: Filters
      - generic [ref=e57]:
        - button "🍕 Pizza (Veg)" [ref=e58] [cursor=pointer]:
          - generic [ref=e59]: 🍕
          - generic [ref=e60]: Pizza (Veg)
        - button "🍗 Pizza (Non-Veg)" [ref=e62] [cursor=pointer]:
          - generic [ref=e63]: 🍗
          - generic [ref=e64]: Pizza (Non-Veg)
        - button "➕ Extras" [ref=e65] [cursor=pointer]:
          - generic [ref=e66]: ➕
          - generic [ref=e67]: Extras
        - button "🍔 Burgers (Veg)" [ref=e68] [cursor=pointer]:
          - generic [ref=e69]: 🍔
          - generic [ref=e70]: Burgers (Veg)
        - button "🍗 Burgers (Non-Veg)" [ref=e71] [cursor=pointer]:
          - generic [ref=e72]: 🍗
          - generic [ref=e73]: Burgers (Non-Veg)
        - button "🥟 Momo" [ref=e74] [cursor=pointer]:
          - generic [ref=e75]: 🥟
          - generic [ref=e76]: Momo
        - button "🥟 Pan Fry Momo" [ref=e77] [cursor=pointer]:
          - generic [ref=e78]: 🥟
          - generic [ref=e79]: Pan Fry Momo
        - button "🍝 Pasta" [ref=e80] [cursor=pointer]:
          - generic [ref=e81]: 🍝
          - generic [ref=e82]: Pasta
      - generic [ref=e83]:
        - generic [ref=e84]:
          - heading "Pizza (Veg)" [level=2] [ref=e85]
          - paragraph [ref=e86]: 6 items available
        - generic [ref=e87]:
          - generic [ref=e88]:
            - generic [ref=e89]:
              - img "Classic Pizza" [ref=e90]
              - generic [ref=e96]:
                - img [ref=e97]
                - text: Bestseller
              - generic [ref=e99]:
                - img [ref=e100]
                - generic [ref=e102]: "4.2"
              - generic [ref=e103]:
                - img [ref=e104]
                - generic [ref=e107]: 20-25 min
            - generic [ref=e108]:
              - heading "Classic Pizza" [level=3] [ref=e109]
              - paragraph [ref=e110]: Fresh tomato sauce, mozzarella cheese, and classic herbs
              - button "Small - ₹100" [ref=e112] [cursor=pointer]:
                - generic [ref=e113]: Small - ₹100
                - img [ref=e114]
              - generic [ref=e116]:
                - generic [ref=e117]:
                  - button [ref=e118] [cursor=pointer]:
                    - img [ref=e119]
                  - generic [ref=e120]: "1"
                  - button [ref=e121] [cursor=pointer]:
                    - img [ref=e122]
                - button "Added" [active] [ref=e123] [cursor=pointer]:
                  - generic [ref=e124]:
                    - img [ref=e125]
                    - generic [ref=e127]: Added
          - generic [ref=e128]:
            - generic [ref=e129]:
              - img "Onion Pizza" [ref=e130]
              - generic [ref=e135]:
                - img [ref=e136]
                - generic [ref=e138]: "4"
              - generic [ref=e139]:
                - img [ref=e140]
                - generic [ref=e143]: 20-25 min
            - generic [ref=e144]:
              - heading "Onion Pizza" [level=3] [ref=e145]
              - paragraph [ref=e146]: Loaded with fresh onions and melted cheese
              - button "Small - ₹120" [ref=e148] [cursor=pointer]:
                - generic [ref=e149]: Small - ₹120
                - img [ref=e150]
              - generic [ref=e152]:
                - generic [ref=e153]:
                  - button [ref=e154] [cursor=pointer]:
                    - img [ref=e155]
                  - generic [ref=e156]: "1"
                  - button [ref=e157] [cursor=pointer]:
                    - img [ref=e158]
                - button "Add ₹120" [ref=e159] [cursor=pointer]:
                  - generic [ref=e160]:
                    - img [ref=e161]
                    - generic [ref=e162]: Add ₹120
          - generic [ref=e163]:
            - generic [ref=e164]:
              - img "Veggie Corn Pizza" [ref=e165]
              - generic [ref=e171]: Popular
              - generic [ref=e172]:
                - img [ref=e173]
                - generic [ref=e175]: "4.3"
              - generic [ref=e176]:
                - img [ref=e177]
                - generic [ref=e180]: 22-28 min
            - generic [ref=e181]:
              - heading "Veggie Corn Pizza" [level=3] [ref=e182]
              - paragraph [ref=e183]: Sweet corn, bell peppers, onions, and cheese blend
              - button "Small - ₹140" [ref=e185] [cursor=pointer]:
                - generic [ref=e186]: Small - ₹140
                - img [ref=e187]
              - generic [ref=e189]:
                - generic [ref=e190]:
                  - button [ref=e191] [cursor=pointer]:
                    - img [ref=e192]
                  - generic [ref=e193]: "1"
                  - button [ref=e194] [cursor=pointer]:
                    - img [ref=e195]
                - button "Add ₹140" [ref=e196] [cursor=pointer]:
                  - generic [ref=e197]:
                    - img [ref=e198]
                    - generic [ref=e199]: Add ₹140
          - generic [ref=e200]:
            - generic [ref=e201]:
              - img "Paneer Pizza" [ref=e202]
              - generic [ref=e207]:
                - generic [ref=e208]:
                  - img [ref=e209]
                  - text: Bestseller
                - generic [ref=e211]: Chef Special
              - generic [ref=e212]:
                - img [ref=e213]
                - generic [ref=e215]: "4.5"
              - generic [ref=e216]:
                - img [ref=e217]
                - generic [ref=e220]: 22-28 min
            - generic [ref=e221]:
              - heading "Paneer Pizza" [level=3] [ref=e222]
              - paragraph [ref=e223]: Tandoori paneer chunks with capsicum and onions
              - button "Small - ₹150" [ref=e225] [cursor=pointer]:
                - generic [ref=e226]: Small - ₹150
                - img [ref=e227]
              - generic [ref=e229]:
                - generic [ref=e230]:
                  - button [ref=e231] [cursor=pointer]:
                    - img [ref=e232]
                  - generic [ref=e233]: "1"
                  - button [ref=e234] [cursor=pointer]:
                    - img [ref=e235]
                - button "Add ₹150" [ref=e236] [cursor=pointer]:
                  - generic [ref=e237]:
                    - img [ref=e238]
                    - generic [ref=e239]: Add ₹150
          - generic [ref=e240]:
            - generic [ref=e241]:
              - img "Paneer Corn Pizza" [ref=e242]
              - generic [ref=e247]:
                - img [ref=e248]
                - generic [ref=e250]: "4.4"
              - generic [ref=e251]:
                - img [ref=e252]
                - generic [ref=e255]: 22-28 min
            - generic [ref=e256]:
              - heading "Paneer Corn Pizza" [level=3] [ref=e257]
              - paragraph [ref=e258]: Creamy paneer and sweet corn combination
              - button "Small - ₹170" [ref=e260] [cursor=pointer]:
                - generic [ref=e261]: Small - ₹170
                - img [ref=e262]
              - generic [ref=e264]:
                - generic [ref=e265]:
                  - button [ref=e266] [cursor=pointer]:
                    - img [ref=e267]
                  - generic [ref=e268]: "1"
                  - button [ref=e269] [cursor=pointer]:
                    - img [ref=e270]
                - button "Add ₹170" [ref=e271] [cursor=pointer]:
                  - generic [ref=e272]:
                    - img [ref=e273]
                    - generic [ref=e274]: Add ₹170
          - generic [ref=e275]:
            - generic [ref=e276]:
              - img "Cheese Mushroom Pizza" [ref=e277]
              - generic [ref=e283]: Premium
              - generic [ref=e284]:
                - img [ref=e285]
                - generic [ref=e287]: "4.6"
              - generic [ref=e288]:
                - img [ref=e289]
                - generic [ref=e292]: 25-30 min
            - generic [ref=e293]:
              - heading "Cheese Mushroom Pizza" [level=3] [ref=e294]
              - paragraph [ref=e295]: Sautéed mushrooms with extra cheese topping
              - button "Small - ₹190" [ref=e297] [cursor=pointer]:
                - generic [ref=e298]: Small - ₹190
                - img [ref=e299]
              - generic [ref=e301]:
                - generic [ref=e302]:
                  - button [ref=e303] [cursor=pointer]:
                    - img [ref=e304]
                  - generic [ref=e305]: "1"
                  - button [ref=e306] [cursor=pointer]:
                    - img [ref=e307]
                - button "Add ₹190" [ref=e308] [cursor=pointer]:
                  - generic [ref=e309]:
                    - img [ref=e310]
                    - generic [ref=e311]: Add ₹190
  - contentinfo [ref=e312]:
    - generic [ref=e314]:
      - generic [ref=e315]:
        - generic [ref=e316]:
          - img [ref=e318]
          - generic [ref=e320]:
            - heading "Pizza O Cafe" [level=3] [ref=e321]
            - paragraph [ref=e322]: The Family Restaurant
        - paragraph [ref=e323]: Serving the best Indian fast food since 2015. Quality ingredients, authentic taste, and quick delivery.
        - generic [ref=e324]:
          - link [ref=e325] [cursor=pointer]:
            - /url: "#"
            - img [ref=e326]
          - link [ref=e329] [cursor=pointer]:
            - /url: "#"
            - img [ref=e330]
          - link [ref=e332] [cursor=pointer]:
            - /url: "#"
            - img [ref=e333]
      - generic [ref=e335]:
        - heading "Quick Links" [level=4] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - link "Home" [ref=e339] [cursor=pointer]:
              - /url: /
          - listitem [ref=e340]:
            - link "Our Menu" [ref=e341] [cursor=pointer]:
              - /url: /menu
          - listitem [ref=e342]:
            - link "Cart" [ref=e343] [cursor=pointer]:
              - /url: /cart
      - generic [ref=e344]:
        - heading "Contact Us" [level=4] [ref=e345]
        - list [ref=e346]:
          - listitem [ref=e347]:
            - img [ref=e348]
            - generic [ref=e351]:
              - text: Galsi Thana Para, Near Eye Care,
              - text: Gurgaon, Haryana - 122001
          - listitem [ref=e352]:
            - img [ref=e353]
            - link "+91 9933880173" [ref=e355] [cursor=pointer]:
              - /url: tel:+919933880173
          - listitem [ref=e356]:
            - img [ref=e357]
            - generic [ref=e360]:
              - text: "Open: 10:00 AM - 11:00 PM"
              - text: All Days Open
      - generic [ref=e361]:
        - heading "We Accept" [level=4] [ref=e362]
        - generic [ref=e363]:
          - generic [ref=e364]: Cash on Delivery
          - generic [ref=e365]: UPI
          - generic [ref=e366]: Paytm
          - generic [ref=e367]: PhonePe
          - generic [ref=e368]: Google Pay
          - generic [ref=e369]: Cards
        - paragraph [ref=e371]:
          - text: "FSSAI License: 12345678901234"
          - text: "GSTIN: 06ABCDE1234F1Z5"
    - generic [ref=e374]:
      - paragraph [ref=e375]: © 2025 Pizza O Cafe. All rights reserved. Made with ❤️ in India
      - generic [ref=e376]:
        - generic [ref=e377]: Privacy Policy
        - generic [ref=e378]: •
        - generic [ref=e379]: Terms of Service
  - status [ref=e385]: Added Classic Pizza to cart!
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { APIHelper } from './fixtures/api-helper';
  3   | import { testCheckoutFormData, testOrderData } from './fixtures/test-data';
  4   | import {
  5   |   connectMongoDB,
  6   |   disconnectMongoDB,
  7   |   getOrder,
  8   |   deleteOrderByOrderId,
  9   |   verifyOrderExists,
  10  |   verifyOrderDetails,
  11  | } from './fixtures/mongodb-helper';
  12  | 
  13  | test.describe('End-to-End Order Placement Flow', () => {
  14  |   let apiHelper: APIHelper;
  15  | 
  16  |   test.beforeEach(async ({ page }) => {
  17  |     apiHelper = new APIHelper(page);
  18  |     
  19  |     // Verify backend is running
  20  |     const backendRunning = await apiHelper.verifyBackendIsRunning();
  21  |     if (!backendRunning) {
  22  |       throw new Error('Backend is not running. Please start it with: npm run dev in backend/');
  23  |     }
  24  | 
  25  |     await connectMongoDB();
  26  |   });
  27  | 
  28  |   test.afterEach(async () => {
  29  |     await disconnectMongoDB();
  30  |   });
  31  | 
  32  |   test('Complete order flow: Add items → Checkout → Create Order → Save in MongoDB', async ({
  33  |     page,
  34  |   }) => {
  35  |     // Step 1: Navigate to home page
  36  |     await page.goto('/');
  37  |     await expect(page.locator('h1')).toContainText('Indian Fast Food');
  38  | 
  39  |     // Step 2: Navigate to menu
  40  |     await page.click('text=Menu');
  41  |     await page.waitForLoadState('networkidle');
  42  |     await expect(page).toHaveURL(/.*menu/);
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
> 53  |     await expect(page.locator('text=1')).toBeVisible(); // Cart badge
      |                                          ^ Error: expect(locator).toBeVisible() failed
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
  143 |     await page.waitForSelector('input[placeholder="Enter your full name"]', { timeout: 10000 });
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
```