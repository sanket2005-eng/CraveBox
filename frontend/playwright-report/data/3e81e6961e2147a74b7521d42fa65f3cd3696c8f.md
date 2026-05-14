# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout-validation.spec.ts >> Checkout Form Validation >> Form fields are properly labeled
- Location: tests\checkout-validation.spec.ts:130:3

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button:has-text("Add to Cart")').first()

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
        - link [ref=e31] [cursor=pointer]:
          - /url: /cart
          - img [ref=e33]
  - main [ref=e37]:
    - generic [ref=e38]:
      - generic [ref=e40]:
        - heading "Our Menu 📋" [level=1] [ref=e41]
        - paragraph [ref=e42]: Explore our wide range of delicious Indian fast food
      - generic [ref=e45]:
        - generic [ref=e46]:
          - img [ref=e47]
          - textbox "Search your favorite food..." [ref=e50]
        - button "Filters" [ref=e51] [cursor=pointer]:
          - img [ref=e52]
          - generic [ref=e53]: Filters
      - generic [ref=e56]:
        - button "🍕 Pizza (Veg)" [ref=e57] [cursor=pointer]:
          - generic [ref=e58]: 🍕
          - generic [ref=e59]: Pizza (Veg)
        - button "🍗 Pizza (Non-Veg)" [ref=e61] [cursor=pointer]:
          - generic [ref=e62]: 🍗
          - generic [ref=e63]: Pizza (Non-Veg)
        - button "➕ Extras" [ref=e64] [cursor=pointer]:
          - generic [ref=e65]: ➕
          - generic [ref=e66]: Extras
        - button "🍔 Burgers (Veg)" [ref=e67] [cursor=pointer]:
          - generic [ref=e68]: 🍔
          - generic [ref=e69]: Burgers (Veg)
        - button "🍗 Burgers (Non-Veg)" [ref=e70] [cursor=pointer]:
          - generic [ref=e71]: 🍗
          - generic [ref=e72]: Burgers (Non-Veg)
        - button "🥟 Momo" [ref=e73] [cursor=pointer]:
          - generic [ref=e74]: 🥟
          - generic [ref=e75]: Momo
        - button "🥟 Pan Fry Momo" [ref=e76] [cursor=pointer]:
          - generic [ref=e77]: 🥟
          - generic [ref=e78]: Pan Fry Momo
        - button "🍝 Pasta" [ref=e79] [cursor=pointer]:
          - generic [ref=e80]: 🍝
          - generic [ref=e81]: Pasta
      - generic [ref=e82]:
        - generic [ref=e83]:
          - heading "Pizza (Veg)" [level=2] [ref=e84]
          - paragraph [ref=e85]: 6 items available
        - generic [ref=e86]:
          - generic [ref=e87]:
            - generic [ref=e88]:
              - img "Classic Pizza" [ref=e89]
              - generic [ref=e95]:
                - img [ref=e96]
                - text: Bestseller
              - generic [ref=e98]:
                - img [ref=e99]
                - generic [ref=e101]: "4.2"
              - generic [ref=e102]:
                - img [ref=e103]
                - generic [ref=e106]: 20-25 min
            - generic [ref=e107]:
              - heading "Classic Pizza" [level=3] [ref=e108]
              - paragraph [ref=e109]: Fresh tomato sauce, mozzarella cheese, and classic herbs
              - button "Small - ₹100" [ref=e111] [cursor=pointer]:
                - generic [ref=e112]: Small - ₹100
                - img [ref=e113]
              - generic [ref=e115]:
                - generic [ref=e116]:
                  - button [ref=e117] [cursor=pointer]:
                    - img [ref=e118]
                  - generic [ref=e119]: "1"
                  - button [ref=e120] [cursor=pointer]:
                    - img [ref=e121]
                - button "Add ₹100" [ref=e122] [cursor=pointer]:
                  - generic [ref=e123]:
                    - img [ref=e124]
                    - generic [ref=e125]: Add ₹100
          - generic [ref=e126]:
            - generic [ref=e127]:
              - img "Onion Pizza" [ref=e128]
              - generic [ref=e133]:
                - img [ref=e134]
                - generic [ref=e136]: "4"
              - generic [ref=e137]:
                - img [ref=e138]
                - generic [ref=e141]: 20-25 min
            - generic [ref=e142]:
              - heading "Onion Pizza" [level=3] [ref=e143]
              - paragraph [ref=e144]: Loaded with fresh onions and melted cheese
              - button "Small - ₹120" [ref=e146] [cursor=pointer]:
                - generic [ref=e147]: Small - ₹120
                - img [ref=e148]
              - generic [ref=e150]:
                - generic [ref=e151]:
                  - button [ref=e152] [cursor=pointer]:
                    - img [ref=e153]
                  - generic [ref=e154]: "1"
                  - button [ref=e155] [cursor=pointer]:
                    - img [ref=e156]
                - button "Add ₹120" [ref=e157] [cursor=pointer]:
                  - generic [ref=e158]:
                    - img [ref=e159]
                    - generic [ref=e160]: Add ₹120
          - generic [ref=e161]:
            - generic [ref=e162]:
              - img "Veggie Corn Pizza" [ref=e163]
              - generic [ref=e169]: Popular
              - generic [ref=e170]:
                - img [ref=e171]
                - generic [ref=e173]: "4.3"
              - generic [ref=e174]:
                - img [ref=e175]
                - generic [ref=e178]: 22-28 min
            - generic [ref=e179]:
              - heading "Veggie Corn Pizza" [level=3] [ref=e180]
              - paragraph [ref=e181]: Sweet corn, bell peppers, onions, and cheese blend
              - button "Small - ₹140" [ref=e183] [cursor=pointer]:
                - generic [ref=e184]: Small - ₹140
                - img [ref=e185]
              - generic [ref=e187]:
                - generic [ref=e188]:
                  - button [ref=e189] [cursor=pointer]:
                    - img [ref=e190]
                  - generic [ref=e191]: "1"
                  - button [ref=e192] [cursor=pointer]:
                    - img [ref=e193]
                - button "Add ₹140" [ref=e194] [cursor=pointer]:
                  - generic [ref=e195]:
                    - img [ref=e196]
                    - generic [ref=e197]: Add ₹140
          - generic [ref=e198]:
            - generic [ref=e199]:
              - img "Paneer Pizza" [ref=e200]
              - generic [ref=e205]:
                - generic [ref=e206]:
                  - img [ref=e207]
                  - text: Bestseller
                - generic [ref=e209]: Chef Special
              - generic [ref=e210]:
                - img [ref=e211]
                - generic [ref=e213]: "4.5"
              - generic [ref=e214]:
                - img [ref=e215]
                - generic [ref=e218]: 22-28 min
            - generic [ref=e219]:
              - heading "Paneer Pizza" [level=3] [ref=e220]
              - paragraph [ref=e221]: Tandoori paneer chunks with capsicum and onions
              - button "Small - ₹150" [ref=e223] [cursor=pointer]:
                - generic [ref=e224]: Small - ₹150
                - img [ref=e225]
              - generic [ref=e227]:
                - generic [ref=e228]:
                  - button [ref=e229] [cursor=pointer]:
                    - img [ref=e230]
                  - generic [ref=e231]: "1"
                  - button [ref=e232] [cursor=pointer]:
                    - img [ref=e233]
                - button "Add ₹150" [ref=e234] [cursor=pointer]:
                  - generic [ref=e235]:
                    - img [ref=e236]
                    - generic [ref=e237]: Add ₹150
          - generic [ref=e238]:
            - generic [ref=e239]:
              - img "Paneer Corn Pizza" [ref=e240]
              - generic [ref=e245]:
                - img [ref=e246]
                - generic [ref=e248]: "4.4"
              - generic [ref=e249]:
                - img [ref=e250]
                - generic [ref=e253]: 22-28 min
            - generic [ref=e254]:
              - heading "Paneer Corn Pizza" [level=3] [ref=e255]
              - paragraph [ref=e256]: Creamy paneer and sweet corn combination
              - button "Small - ₹170" [ref=e258] [cursor=pointer]:
                - generic [ref=e259]: Small - ₹170
                - img [ref=e260]
              - generic [ref=e262]:
                - generic [ref=e263]:
                  - button [ref=e264] [cursor=pointer]:
                    - img [ref=e265]
                  - generic [ref=e266]: "1"
                  - button [ref=e267] [cursor=pointer]:
                    - img [ref=e268]
                - button "Add ₹170" [ref=e269] [cursor=pointer]:
                  - generic [ref=e270]:
                    - img [ref=e271]
                    - generic [ref=e272]: Add ₹170
          - generic [ref=e273]:
            - generic [ref=e274]:
              - img "Cheese Mushroom Pizza" [ref=e275]
              - generic [ref=e281]: Premium
              - generic [ref=e282]:
                - img [ref=e283]
                - generic [ref=e285]: "4.6"
              - generic [ref=e286]:
                - img [ref=e287]
                - generic [ref=e290]: 25-30 min
            - generic [ref=e291]:
              - heading "Cheese Mushroom Pizza" [level=3] [ref=e292]
              - paragraph [ref=e293]: Sautéed mushrooms with extra cheese topping
              - button "Small - ₹190" [ref=e295] [cursor=pointer]:
                - generic [ref=e296]: Small - ₹190
                - img [ref=e297]
              - generic [ref=e299]:
                - generic [ref=e300]:
                  - button [ref=e301] [cursor=pointer]:
                    - img [ref=e302]
                  - generic [ref=e303]: "1"
                  - button [ref=e304] [cursor=pointer]:
                    - img [ref=e305]
                - button "Add ₹190" [ref=e306] [cursor=pointer]:
                  - generic [ref=e307]:
                    - img [ref=e308]
                    - generic [ref=e309]: Add ₹190
  - contentinfo [ref=e310]:
    - generic [ref=e312]:
      - generic [ref=e313]:
        - generic [ref=e314]:
          - img [ref=e316]
          - generic [ref=e318]:
            - heading "Pizza O Cafe" [level=3] [ref=e319]
            - paragraph [ref=e320]: The Family Restaurant
        - paragraph [ref=e321]: Serving the best Indian fast food since 2015. Quality ingredients, authentic taste, and quick delivery.
        - generic [ref=e322]:
          - link [ref=e323] [cursor=pointer]:
            - /url: "#"
            - img [ref=e324]
          - link [ref=e327] [cursor=pointer]:
            - /url: "#"
            - img [ref=e328]
          - link [ref=e330] [cursor=pointer]:
            - /url: "#"
            - img [ref=e331]
      - generic [ref=e333]:
        - heading "Quick Links" [level=4] [ref=e334]
        - list [ref=e335]:
          - listitem [ref=e336]:
            - link "Home" [ref=e337] [cursor=pointer]:
              - /url: /
          - listitem [ref=e338]:
            - link "Our Menu" [ref=e339] [cursor=pointer]:
              - /url: /menu
          - listitem [ref=e340]:
            - link "Cart" [ref=e341] [cursor=pointer]:
              - /url: /cart
      - generic [ref=e342]:
        - heading "Contact Us" [level=4] [ref=e343]
        - list [ref=e344]:
          - listitem [ref=e345]:
            - img [ref=e346]
            - generic [ref=e349]:
              - text: Galsi Thana Para, Near Eye Care,
              - text: Gurgaon, Haryana - 122001
          - listitem [ref=e350]:
            - img [ref=e351]
            - link "+91 9933880173" [ref=e353] [cursor=pointer]:
              - /url: tel:+919933880173
          - listitem [ref=e354]:
            - img [ref=e355]
            - generic [ref=e358]:
              - text: "Open: 10:00 AM - 11:00 PM"
              - text: All Days Open
      - generic [ref=e359]:
        - heading "We Accept" [level=4] [ref=e360]
        - generic [ref=e361]:
          - generic [ref=e362]: Cash on Delivery
          - generic [ref=e363]: UPI
          - generic [ref=e364]: Paytm
          - generic [ref=e365]: PhonePe
          - generic [ref=e366]: Google Pay
          - generic [ref=e367]: Cards
        - paragraph [ref=e369]:
          - text: "FSSAI License: 12345678901234"
          - text: "GSTIN: 06ABCDE1234F1Z5"
    - generic [ref=e372]:
      - paragraph [ref=e373]: © 2025 Pizza O Cafe. All rights reserved. Made with ❤️ in India
      - generic [ref=e374]:
        - generic [ref=e375]: Privacy Policy
        - generic [ref=e376]: •
        - generic [ref=e377]: Terms of Service
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Checkout Form Validation', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     // Add item to cart first
  6   |     await page.goto('/menu');
  7   |     await page.waitForLoadState('networkidle');
  8   |     
  9   |     const addToCartButtons = page.locator('[data-testid="add-to-cart-btn"]');
> 10  |     await addToCartButtons.first().click();
      |                                    ^ Error: locator.click: Test timeout of 30000ms exceeded.
  11  | 
  12  |     // Navigate to checkout
  13  |     await page.goto('/checkout');
  14  |     await page.waitForLoadState('networkidle');
  15  |   });
  16  | 
  17  |   test('Submit without filling required fields shows error', async ({ page }) => {
  18  |     // Try to submit empty form
  19  |     await page.click('button:has-text("Place Order")');
  20  | 
  21  |     // Verify error messages
  22  |     const errorMessage = page.locator('text=/Please fill all required fields|required/i');
  23  |     await expect(errorMessage).toBeVisible();
  24  |   });
  25  | 
  26  |   test('Invalid phone number shows error', async ({ page }) => {
  27  |     await page.fill('input[placeholder="Enter your full name"]', 'Test User');
  28  |     await page.fill('input[placeholder*="9933880173"]', '123'); // Too short
  29  |     
  30  |     await page.click('button:has-text("Place Order")');
  31  | 
  32  |     const errorMessage = page.locator('text=/valid.*phone|10.*digit/i');
  33  |     await expect(errorMessage).toBeVisible();
  34  |   });
  35  | 
  36  |   test('Valid phone number (10 digits) is accepted', async ({ page }) => {
  37  |     await page.fill('input[placeholder="Enter your full name"]', 'Valid Phone Test');
  38  |     await page.fill('input[placeholder*="9933880173"]', '9876543210');
  39  |     await page.fill('input[placeholder*="123"]', 'House 1');
  40  |     await page.fill('input[placeholder*="Sector"]', 'Sector 1');
  41  |     await page.fill('input[placeholder*="122001"]', '122001');
  42  | 
  43  |     // Should not show validation error
  44  |     const errorMessage = page.locator('text=/valid.*phone|Please enter/i');
  45  |     
  46  |     // Try to place order - should not show phone validation error
  47  |     await page.click('button:has-text("Place Order")');
  48  |     
  49  |     // Should either succeed or show different error, not phone error
  50  |     const phoneError = page.locator('text=/10.*digit mobile/i');
  51  |     await expect(phoneError).not.toBeVisible();
  52  |   });
  53  | 
  54  |   test('Pincode field limits to 6 digits', async ({ page }) => {
  55  |     const pincodeInput = page.locator('input[placeholder*="122001"]');
  56  |     
  57  |     await pincodeInput.fill('1234567890'); // Try to enter 10 digits
  58  |     const value = await pincodeInput.inputValue();
  59  |     
  60  |     // Should be limited to 6
  61  |     expect(value.length).toBeLessThanOrEqual(6);
  62  |   });
  63  | 
  64  |   test('Phone field limits to 10 digits', async ({ page }) => {
  65  |     const phoneInput = page.locator('input[placeholder*="9933880173"]');
  66  |     
  67  |     await phoneInput.fill('12345678901234'); // Try to enter more than 10
  68  |     const value = await phoneInput.inputValue();
  69  |     
  70  |     // Should be limited to 10
  71  |     expect(value.length).toBeLessThanOrEqual(10);
  72  |   });
  73  | 
  74  |   test('All required fields marked with asterisk', async ({ page }) => {
  75  |     // Verify required fields are marked
  76  |     const labels = page.locator('label:has-text("*")');
  77  |     const count = await labels.count();
  78  |     
  79  |     expect(count).toBeGreaterThanOrEqual(5); // Name, Phone, House, Area, Pincode
  80  |   });
  81  | 
  82  |   test('Form persists delivery address from cart context', async ({ page }) => {
  83  |     // Check if pre-filled with delivery address from context
  84  |     const cityInput = page.locator('input[value="Gurgaon"], input[placeholder="Gurgaon"]');
  85  |     const stateInput = page.locator('input[value="Haryana"], input[placeholder="Haryana"]');
  86  |     
  87  |     const cityExists = await cityInput.isVisible().catch(() => false);
  88  |     const stateExists = await stateInput.isVisible().catch(() => false);
  89  |     
  90  |     // At least one should be pre-filled
  91  |     expect(cityExists || stateExists).toBe(true);
  92  |   });
  93  | 
  94  |   test('Payment method selection is visible', async ({ page }) => {
  95  |     await expect(page.locator('text=Payment Method')).toBeVisible();
  96  |     await expect(page.locator('text=Cash on Delivery')).toBeVisible();
  97  |     await expect(page.locator('text=Credit/Debit Card')).toBeVisible();
  98  |   });
  99  | 
  100 |   test('COD is default payment method', async ({ page }) => {
  101 |     const codButton = page.locator('button:has-text("Cash on Delivery")');
  102 |     const isSelected = codButton.locator('..').locator('text=Cash on Delivery');
  103 |     
  104 |     // Should show as selected (look for visual indicator)
  105 |     await expect(codButton).toBeVisible();
  106 |   });
  107 | 
  108 |   test('Order summary shows all cost breakdowns', async ({ page }) => {
  109 |     await page.fill('input[placeholder="Enter your full name"]', 'Summary Test');
  110 |     await page.fill('input[placeholder*="9933880173"]', '9876543210');
```