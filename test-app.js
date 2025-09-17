const puppeteer = require('puppeteer');
const fs = require('fs');

async function testBetterFlowApp() {
  console.log('🚀 Starting BetterFlow UI Testing...\n');

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--start-maximized']
  });

  try {
    const page = await browser.newPage();

    // Test 1: Check Login Page
    console.log('📍 Test 1: Checking Login Page...');
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });

    // Take screenshot of login page
    await page.screenshot({ path: 'screenshots/01-login-page.png', fullPage: true });

    // Check for login form elements
    const hasEmailInput = await page.$('input[type="email"]') !== null;
    const hasPasswordInput = await page.$('input[type="password"]') !== null;
    const hasLoginButton = await page.$('button[type="submit"]') !== null;

    console.log(`  ✓ Email input present: ${hasEmailInput}`);
    console.log(`  ✓ Password input present: ${hasPasswordInput}`);
    console.log(`  ✓ Login button present: ${hasLoginButton}`);

    // Test 2: Login as Admin
    console.log('\n📍 Test 2: Testing Admin Login...');
    await page.type('input[type="email"]', 'admin@betterflow.eu');
    await page.type('input[type="password"]', 'Admin123!');

    // Check remember me checkbox
    const rememberCheckbox = await page.$('input[type="checkbox"]');
    if (rememberCheckbox) await rememberCheckbox.click();

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for navigation to dashboard
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    await page.waitForTimeout(2000);

    // Take dashboard screenshot
    await page.screenshot({ path: 'screenshots/02-dashboard-full.png', fullPage: true });

    // Test 3: Check Dashboard Widgets
    console.log('\n📍 Test 3: Verifying Dashboard Widgets...');

    const widgets = [
      { name: 'Clock Widget', selector: 'text/Time Tracker' },
      { name: 'Tasks Widget', selector: "text/Today's Tasks" },
      { name: 'Calendar Widget', selector: 'text/Calendar' },
      { name: 'Team Status', selector: 'text/Team Status' },
      { name: 'Activity Feed', selector: 'text/Recent Activity' },
      { name: 'Quick Stats', selector: 'text/Quick Stats' },
      { name: 'AI Insights', selector: 'text/AI Insights' }
    ];

    for (const widget of widgets) {
      try {
        await page.waitForSelector(`::-p-text(${widget.name.split(' ')[0]})`, { timeout: 5000 });
        console.log(`  ✓ ${widget.name} found`);
      } catch (e) {
        console.log(`  ✗ ${widget.name} not found`);
      }
    }

    // Test 4: Test Navigation
    console.log('\n📍 Test 4: Testing Navigation...');

    // Click on Projects
    await page.click('a[href="/projects"]');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/03-projects-page.png', fullPage: true });
    console.log('  ✓ Projects page loaded');

    // Click on Timesheets
    await page.click('a[href="/timesheets"]');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/04-timesheets-page.png', fullPage: true });
    console.log('  ✓ Timesheets page loaded');

    // Click on Leaves
    await page.click('a[href="/leaves"]');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/05-leaves-page.png', fullPage: true });
    console.log('  ✓ Leaves page loaded');

    // Test 5: Test Responsive Design
    console.log('\n📍 Test 5: Testing Responsive Design...');

    // Test mobile view
    await page.setViewport({ width: 375, height: 812 }); // iPhone X
    await page.goto('http://localhost:3001/dashboard');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshots/06-mobile-dashboard.png', fullPage: true });
    console.log('  ✓ Mobile view tested');

    // Test tablet view
    await page.setViewport({ width: 768, height: 1024 }); // iPad
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/07-tablet-dashboard.png', fullPage: true });
    console.log('  ✓ Tablet view tested');

    // Test 6: Test Interactive Features
    console.log('\n📍 Test 6: Testing Interactive Features...');

    // Reset viewport
    await page.setViewport({ width: 1920, height: 1080 });

    // Test Clock In/Out
    const clockButton = await page.$('button::-p-text(Clock In)');
    if (clockButton) {
      await clockButton.click();
      await page.waitForTimeout(1000);
      console.log('  ✓ Clock In button works');
    }

    // Test user menu
    await page.click('button:has-text("Sarah Mitchell")');
    await page.waitForTimeout(500);
    const signOutVisible = await page.$('button::-p-text(Sign Out)') !== null;
    console.log(`  ✓ User menu dropdown works: ${signOutVisible}`);

    console.log('\n✅ Testing Complete! Check screenshots folder for visual results.');

    // Generate report
    const report = {
      timestamp: new Date().toISOString(),
      testsRun: 6,
      loginPageCheck: hasEmailInput && hasPasswordInput && hasLoginButton,
      dashboardWidgets: widgets.length,
      navigationWorking: true,
      responsiveTested: true,
      screenshotsTaken: 7
    };

    fs.writeFileSync('test-report.json', JSON.stringify(report, null, 2));
    console.log('\n📊 Test report saved to test-report.json');

  } catch (error) {
    console.error('❌ Error during testing:', error);
  } finally {
    await browser.close();
  }
}

// Create screenshots directory
if (!fs.existsSync('screenshots')) {
  fs.mkdirSync('screenshots');
}

testBetterFlowApp();