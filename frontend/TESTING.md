# Playwright Test Suite for Food Ordering App

Complete end-to-end test suite that verifies the full order placement flow from frontend to backend to MongoDB.

## 📦 Installation

```bash
cd frontend
npm install
npm install --save-dev @playwright/test mongodb
```

## 🚀 Quick Start

### 1. Start Backend Server (Terminal 1)
```bash
cd backend
npm install
npm run dev
```

Verify backend is running:
```
🚀 Server running in development mode on port 5000
```

### 2. Start Frontend Dev Server (Terminal 2)
```bash
cd frontend
npm run dev
```

Verify frontend is running:
```
Local:   http://localhost:5173
```

### 3. Ensure MongoDB is Accessible
- MongoDB Atlas connection is configured in `.env`
- Verify connection string is valid
- Tests will automatically connect and verify orders

### 4. Run Tests (Terminal 3)
```bash
cd frontend
npm test
```

## 📋 Test Files

### `tests/order-flow.spec.ts` - Complete Order Placement Flow
Tests the full end-to-end order journey:
- ✅ Navigate to home page
- ✅ Go to menu and add items to cart
- ✅ Proceed to checkout
- ✅ Fill delivery address form
- ✅ Place COD order
- ✅ Verify API response (201 status code)
- ✅ Confirm order saved in MongoDB
- ✅ Verify WhatsApp notification triggered
- ✅ Validate order data matches form input

**Test Cases:**
- `Complete order flow: Add items → Checkout → Create Order → Save in MongoDB`
- `COD order with multiple items - backend persistence`
- `Verify order data matches form input exactly`

### `tests/cart-operations.spec.ts` - Shopping Cart Functionality
Tests all cart interaction scenarios:
- ✅ Add single item to cart
- ✅ Add multiple different items
- ✅ Increase item quantity
- ✅ Remove items from cart
- ✅ Clear entire cart
- ✅ Cart totals calculate correctly
- ✅ Navigate to checkout from cart
- ✅ Prevent checkout with empty cart
- ✅ Preserve cart across navigation

**Test Cases:**
- 10 comprehensive cart operation tests

### `tests/api-integration.spec.ts` - Backend API Verification
Tests API endpoints and MongoDB integration:
- ✅ Backend health check (GET /api/health)
- ✅ Order creation (POST /api/orders)
- ✅ Order retrieval (GET /api/orders/:id)
- ✅ API response structure validation
- ✅ MongoDB data persistence
- ✅ Data consistency (API response matches MongoDB)
- ✅ Multiple independent orders
- ✅ Input validation

**Test Cases:**
- `Backend health check endpoint is accessible`
- `POST /api/orders creates order with correct status code`
- `Order API response contains all required fields`
- `GET /api/orders/:id retrieves order correctly`
- `MongoDB order document matches API response`
- `Order data persists in MongoDB after creation`
- `Multiple orders are stored independently in MongoDB`
- `Order validation rejects invalid data`

### `tests/checkout-validation.spec.ts` - Form Validation
Tests checkout form validation and UI behavior:
- ✅ Required field validation
- ✅ Phone number format validation (10 digits)
- ✅ Pincode format validation (6 digits)
- ✅ Input field character limits
- ✅ Payment method selection
- ✅ Order summary display
- ✅ Form labels and accessibility

**Test Cases:**
- 12 checkout validation tests

## 🧩 Test Fixtures

### `tests/fixtures/mongodb-helper.ts`
MongoDB connection and query utilities:
- `connectMongoDB()` - Establish connection
- `disconnectMongoDB()` - Clean up connection
- `getOrder(orderId)` - Fetch order by ID
- `getAllOrders()` - Get all orders
- `deleteOrderByOrderId(orderId)` - Delete test order
- `clearAllOrders()` - Clear all orders
- `verifyOrderExists(orderId)` - Check if order exists
- `verifyOrderDetails(orderId, expectedData)` - Validate order data

### `tests/fixtures/api-helper.ts`
API interception and verification utilities:
- `setupAPIInterception()` - Track API calls
- `waitForOrderAPIResponse(expectedStatus)` - Wait for order endpoint
- `verifyOrderPayload(expectedData)` - Validate request body
- `createOrderViaAPI(orderData)` - Direct API call
- `getOrderFromAPI(orderId)` - Fetch order via API
- `verifyBackendIsRunning()` - Health check

### `tests/fixtures/test-data.ts`
Reusable test data constants:
- `testOrderData` - Single item order
- `testOrderDataMultipleItems` - Multi-item order
- `testCheckoutFormData` - Checkout form values
- `testCheckoutFormDataMultiple` - Alternative form values
- `generateRandomPhone()` - Generate unique phone
- `generateRandomOrderId()` - Generate mock order ID

## 🎯 Running Specific Tests

### Run all tests
```bash
npm test
```

### Run specific test file
```bash
npx playwright test tests/order-flow.spec.ts
```

### Run tests in UI mode (interactive)
```bash
npm run test:ui
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run specific test by name
```bash
npx playwright test -g "Complete order flow"
```

### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run tests in a specific browser
```bash
npx playwright test --project=chromium
```

## 📊 Test Execution Flow

```
┌─────────────────────────────────────┐
│   Start Browser & Navigate to App   │
├─────────────────────────────────────┤
│   Add Items to Cart (Frontend)      │
├─────────────────────────────────────┤
│   Go to Checkout & Fill Form        │
├─────────────────────────────────────┤
│   Place Order (Frontend API Call)   │
├─────────────────────────────────────┤
│   ✅ Verify API Response (201)      │
├─────────────────────────────────────┤
│   ✅ Verify Order in MongoDB        │
├─────────────────────────────────────┤
│   ✅ Verify WhatsApp Notification   │
├─────────────────────────────────────┤
│   Generate HTML Report               │
└─────────────────────────────────────┘
```

## 📈 Test Reports

After tests complete, open the HTML report:
```bash
npx playwright show-report
```

Reports include:
- Test results (passed/failed)
- Screenshots of failures
- Video recordings of failed tests
- Detailed execution timeline
- Error messages and stack traces

## 🔧 Configuration

### `playwright.config.ts`
- **baseURL**: `http://localhost:5173` (frontend)
- **timeout**: Default 30 seconds per test
- **screenshot**: Capture on failures
- **video**: Record on failures
- **trace**: Full trace on first retry
- **workers**: 1 (sequential - important for DB cleanup)

### Environment Variables
Make sure these are set in `backend/.env`:
```env
MONGODB_URI=mongodb+srv://...
PORT=5000
NODE_ENV=development
```

## ✅ Success Criteria

Each test verifies:

### Frontend Level
- ✅ Elements render and are interactive
- ✅ Form validation works
- ✅ Cart updates correctly
- ✅ Navigation works
- ✅ User feedback (toasts) displays

### API Level
- ✅ Correct HTTP status codes
- ✅ Response structure valid
- ✅ Required fields present
- ✅ Data transformations correct
- ✅ Error handling works

### Database Level
- ✅ Order document created
- ✅ All fields populated correctly
- ✅ Indexes working
- ✅ Data persists
- ✅ Multiple orders independent

## 🐛 Debugging Failed Tests

### View video of failure
```bash
# Videos are saved in test-results/ folder
open test-results/order-flow-example-test-1/video.webm
```

### View screenshot
```bash
# Screenshots in test-results/ folder
open test-results/order-flow-example-test-1/test-failed-1.png
```

### Run single test with debug
```bash
npx playwright test tests/order-flow.spec.ts --debug
```

### Check console logs
```bash
# Add this to test to print logs
console.log('Order Response:', orderResponse);
```

## 🚨 Troubleshooting

### Backend not connecting
```bash
# Check backend is running
curl http://localhost:5000/api/health

# If not:
cd backend
npm run dev
```

### MongoDB connection fails
```bash
# Verify connection string in .env
# Test connection:
npm install --save mongodb
node -e "require('./tests/fixtures/mongodb-helper.ts')" 
```

### Tests timeout
- Increase timeout in `playwright.config.ts`
- Check if servers are running
- Verify network connectivity

### Port already in use
```bash
# Kill process on port 5173
# Windows: taskkill /F /IM node.exe
# Mac/Linux: lsof -ti:5173 | xargs kill -9

# Kill process on port 5000
# Windows: taskkill /F /IM node.exe
# Mac/Linux: lsof -ti:5000 | xargs kill -9
```

## 📝 Writing New Tests

### Template
```typescript
test('Your test description', async ({ page }) => {
  // 1. Setup
  await page.goto('/path');
  
  // 2. Action
  await page.click('selector');
  
  // 3. Assert
  await expect(page.locator('selector')).toBeVisible();
  
  // 4. Cleanup
  // Delete test data
});
```

### Using Fixtures
```typescript
import { connectMongoDB, disconnectMongoDB, getOrder } from './fixtures/mongodb-helper';
import { APIHelper } from './fixtures/api-helper';

test('Example', async ({ page }) => {
  const apiHelper = new APIHelper(page);
  await connectMongoDB();
  
  // Your test
  
  await disconnectMongoDB();
});
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Locators & Selectors](https://playwright.dev/docs/locators)
- [Test Assertions](https://playwright.dev/docs/assertions)
- [Debugging Tests](https://playwright.dev/docs/debug)

## 🎓 Test Coverage

**Current Coverage:**
- ✅ Happy path order creation (COD)
- ✅ Cart management (CRUD operations)
- ✅ Form validation
- ✅ API integration
- ✅ Database persistence

**Not Yet Covered (Future Enhancements):**
- ⚠️ Razorpay payment flow
- ⚠️ Failed payment handling
- ⚠️ Order cancellation
- ⚠️ Admin operations
- ⚠️ Authentication
- ⚠️ Performance testing
- ⚠️ Accessibility testing

## 🤝 Contributing

To add more tests:
1. Follow the existing test structure
2. Use fixtures for common operations
3. Clean up test data in `afterEach` hooks
4. Add descriptive test names
5. Include comments for complex flows

## 📞 Support

If tests fail:
1. Check that both servers (backend and frontend) are running
2. Verify MongoDB is accessible
3. Check `.env` files are correct
4. Look at test output for specific errors
5. Review HTML report for details
