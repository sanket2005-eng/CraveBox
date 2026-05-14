# Testing FAQ & Troubleshooting

## ❓ Frequently Asked Questions

### Q: What should I run first?
**A:** In this order:
1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Run tests: `cd frontend && npm test`

### Q: Can I run tests without servers?
**A:** No. Playwright tests require:
- Backend running on port 5000
- Frontend on port 5173
- MongoDB Atlas accessible

### Q: How long do tests take?
**A:** Typically 2-5 minutes for all 34 tests depending on internet speed and MongoDB latency.

### Q: Do tests modify my database?
**A:** Yes, but they clean up after themselves. Each test:
1. Creates an order in MongoDB
2. Verifies it
3. Deletes it after test completes

### Q: Can I run tests in parallel?
**A:** Not recommended. Tests are configured to run sequentially to avoid DB conflicts.

### Q: How do I skip a test?
**A:** Use `test.skip()`:
```typescript
test.skip('Test name', async ({ page }) => {
  // This test won't run
});
```

### Q: How do I mark a test as "todo"?
**A:** Use `test.skip()` or comment it out:
```typescript
test.fixme('Razorpay integration', async ({ page }) => {
  // TODO: implement payment flow tests
});
```

---

## 🚨 Common Issues & Solutions

### Issue: "Backend is not running on port 5000"
**Solution:**
```bash
# Kill existing Node process
# Windows: taskkill /F /IM node.exe
# Mac/Linux: lsof -ti:5000 | xargs kill -9

# Start backend fresh
cd backend
npm run dev
```

### Issue: "Frontend dev server not accessible"
**Solution:**
```bash
# Verify port 5173 is free
# Windows: netstat -ano | findstr :5173
# Mac/Linux: lsof -i :5173

# If in use, kill and restart
cd frontend
npm run dev
```

### Issue: "MongoDB connection failed"
**Solution:**
```bash
# Check connection string in backend/.env
MONGODB_URI=mongodb+srv://user:pass@cluster0.xxx.mongodb.net/...

# Verify credentials are correct
# Check MongoDB Atlas network access settings
# Ensure your IP is whitelisted

# Test connection:
npm install mongodb
node -e "
  const { MongoClient } = require('mongodb');
  const client = new MongoClient(process.env.MONGODB_URI);
  client.connect()
    .then(() => { console.log('✅ Connected'); process.exit(0); })
    .catch(err => { console.log('❌ Error:', err.message); process.exit(1); });
"
```

### Issue: "Timeout waiting for selector"
**Solution:**
```bash
# Increase timeout in playwright.config.ts
use: {
  baseURL: 'http://localhost:5173',
  timeout: 60000, // Increase from 30000
}

# Or increase for specific test:
test.setTimeout(120000);
```

### Issue: "Test passes locally but fails in CI"
**Solution:**
```bash
# Make sure to install dependencies in CI
npm install
npm install --save-dev @playwright/test mongodb

# Install browsers
npx playwright install

# Run with specific configuration
npm test -- --project=chromium
```

### Issue: "API response is 400 or 422"
**Solution:**
This means form validation failed. Check:
1. Phone number format (must be 10 digits, starts with 6-9)
2. Pincode format (must be 6 digits)
3. All required fields filled
4. Items array not empty

### Issue: "Order not appearing in MongoDB"
**Solution:**
1. Check if order API call succeeded (look at response)
2. Verify MongoDB connection string
3. Check if order was deleted by cleanup
4. Verify collection name: `orders`
5. Check database name: `food_ordering`

### Issue: "Port already in use"
**Solution:**
```bash
# Windows - Kill specific port
netstat -ano | findstr :5173
taskkill /PID [PID] /F

# Mac/Linux
lsof -i :5173
kill -9 [PID]

# Or use different port
# Edit vite.config.js for frontend
# Edit PORT=XXXX in backend/.env
```

### Issue: "Tests fail intermittently"
**Solution:**
1. Add longer waits:
   ```typescript
   await page.waitForTimeout(1000);
   ```

2. Use better selectors:
   ```typescript
   await page.waitForLoadState('networkidle');
   ```

3. Check MongoDB latency
4. Run tests sequentially (already configured)

### Issue: "MongoDB network error"
**Solution:**
1. Check internet connection
2. Verify firewall isn't blocking MongoDB (port 27017)
3. Check MongoDB Atlas status page
4. Try connecting from MongoDB Compass
5. Verify IP whitelist in Atlas settings

### Issue: "Order created but whatsappNotified is false"
**Solution:**
Check if WhatsApp service is working:
1. Verify Twilio credentials in `.env`
2. Check backend logs for WhatsApp errors
3. Verify phone number format in order

### Issue: "Cannot find 'text=...' selector"
**Solution:**
1. Check text exactly matches what's on page
2. Text matching is case-sensitive
3. Use regex for partial matches:
   ```typescript
   page.locator('text=/some partial text/i')
   ```

4. Check element is visible:
   ```typescript
   await expect(element).toBeVisible();
   ```

---

## 🔍 Debugging Commands

### View test execution in browser (headed mode)
```bash
npx playwright test --headed
```

### Debug specific test
```bash
npx playwright test tests/order-flow.spec.ts --debug
```

### Run with inspector
```bash
npx playwright test --debug --project=chromium
```

### View network requests
```typescript
page.on('response', response => {
  console.log(response.url(), response.status());
});
```

### View console logs
```typescript
page.on('console', console.log);
```

### Take screenshot at specific point
```typescript
await page.screenshot({ path: 'debug.png' });
```

### Record video
```bash
npx playwright test --record-video=on
```

### Generate trace file
```bash
npx playwright test --trace on
npx playwright show-trace trace.zip
```

---

## 📋 Pre-flight Checklist

Before running tests, verify:
- [ ] Node.js 18+ installed: `node --version`
- [ ] Backend running: `curl http://localhost:5000/api/health`
- [ ] Frontend running: `curl http://localhost:5173`
- [ ] MongoDB Atlas accessible: Check credentials
- [ ] `.env` file updated with correct values
- [ ] `npm install` run in frontend folder
- [ ] `@playwright/test` installed: `npm list @playwright/test`
- [ ] `mongodb` installed: `npm list mongodb`
- [ ] No processes on ports 5000, 5173, 27017

---

## 📊 What to Check When Tests Fail

### Check 1: Server Logs
```bash
# Terminal 1 - Backend logs
cd backend && npm run dev
# Look for: "🚀 Server running on port 5000"
# Look for: "✅ MongoDB Connected"

# Terminal 2 - Frontend logs
cd frontend && npm run dev
# Look for: "Local: http://localhost:5173"
```

### Check 2: Network Requests
Open browser DevTools (F12):
- Network tab: Check API responses
- Console tab: Check for errors
- Application tab: Check local storage/cookies

### Check 3: Database State
Connect to MongoDB Atlas:
```bash
# Check if order was created
db.orders.findOne({ customerName: "Test User" })

# Check if orders are cleaned up
db.orders.find({}).count()
```

### Check 4: Test Output
```bash
# Run with verbose output
npm test -- --verbose

# Save output to file
npm test 2>&1 | tee test-output.txt
```

### Check 5: Test Report
```bash
# View detailed HTML report
npx playwright show-report
```

---

## 🆘 Getting Help

If tests still fail after troubleshooting:

1. **Collect diagnostics:**
   ```bash
   node --version > diagnostics.txt
   npm --version >> diagnostics.txt
   npm list @playwright/test >> diagnostics.txt
   npm list mongodb >> diagnostics.txt
   cat backend/.env >> diagnostics.txt  # Remove secrets first!
   ```

2. **Run test with full output:**
   ```bash
   npm test -- --verbose 2>&1 > test-debug.txt
   ```

3. **Check test results:**
   ```bash
   ls -la test-results/
   cat playwright-report/index.html
   ```

4. **Verify prerequisites one more time:**
   ```bash
   # Backend
   curl -v http://localhost:5000/api/health
   
   # Frontend
   curl -v http://localhost:5173
   
   # MongoDB
   npm exec -- node -e "
     const { MongoClient } = require('mongodb');
     new MongoClient('mongodb+srv://...').connect()
       .then(() => console.log('✅ MongoDB OK'))
       .catch(e => console.log('❌', e));
   "
   ```

---

## 📞 Support Resources

- **Playwright Docs:** https://playwright.dev
- **MongoDB Docs:** https://docs.mongodb.com
- **Troubleshooting:** https://playwright.dev/docs/troubleshooting
- **Debugging Guide:** https://playwright.dev/docs/debug

---

## ✅ Success Indicators

You know tests are working when you see:
```
✓ 34 tests passed in 2m 15s
```

And your MongoDB contains orders after tests complete:
```
db.orders.find({}).count()
// Returns 0 (because tests clean up)
```

---

**Last Updated:** May 13, 2026
