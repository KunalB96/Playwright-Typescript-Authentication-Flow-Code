import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { credentials } from '../fixtures/testData';
import { DashboardPage } from '../pages/DashboardPage';

test('TC13 Admin Login', async ({ page }) => {

    const login = new LoginPage(page);

    await login.navigate();

    await login.login(
      credentials.admin.email,
      credentials.admin.password
    );

    await expect(
      page.getByText('Admin')
    ).toBeVisible();
});

test('TC14 Owner Login', async ({ page }) => {

    const login = new LoginPage(page);

    await login.navigate();

    await login.login(
      credentials.owner.email,
      credentials.owner.password
    );

    await expect(page).toHaveURL(/hub/);

     // Verify Audit Reports is visible
  await expect(
    login.auditReport()
).toBeVisible();
});





test('TC15 Store Manager Login', async ({ page }) => {

    const login = new LoginPage(page);

    await login.navigate();

    await login.login(
      credentials.storeManager.email,
      credentials.storeManager.password
    );

    await expect(page).toHaveURL(/hub/);

       // Verify Stock Audit Reports is visible
  await expect(
    login.stockAuditRe()
).toBeVisible();
});



test('TC16 User Management Visible', async ({ page }) => {

    // Admin role verification
       const login = new LoginPage(page);

    await login.navigate();

    await login.login(
      credentials.admin.email,
      credentials.admin.password
    );

    await expect(
      page.getByText('User Management')
    ).toBeVisible();
});



test('TC17 User Management Hidden', async ({ page }) => {

    // Owner role verification
        const login = new LoginPage(page);

    await login.navigate();

    await login.login(
      credentials.owner.email,
      credentials.owner.password
    );

    await expect(page).toHaveURL(/hub/);

       // Verify User Management is NOT visible
    await expect(
        page.getByText('User Management')
    ).not.toBeVisible();

});




test('TC18 Restricted URL', async ({ page }) => {

    // Store Manager restriction validation

    const login = new LoginPage(page);

    await login.navigate();

    await login.login(
        credentials.storeManager.email,
        credentials.storeManager.password
    );

    await page.goto(
        'https://staging-hub.tiara.jewelry/portal/user-management'
    );

    // Verify Store Manager cannot stay on User Management page
    await expect(page).not.toHaveURL(
        /user-management/
    );
});

test('TC19 Switch Role Login', async ({ page }) => {

    // Admin logout then Owner login
     const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    // Login as Admin
    await login.navigate();

    await login.login(
        credentials.admin.email,
        credentials.admin.password
    );

    await expect(page).toHaveURL(/hub/);

    // Verify Admin Dashboard
    await expect(
      page.getByText('Admin')
    ).toBeVisible();

    // Logout
    await dashboard.logout();

    await expect(page).toHaveURL(/auth/);

    // Login as Owner
    await login.login(
        credentials.owner.email,
        credentials.owner.password
    );

    await expect(page).toHaveURL(/hub/);

    // Verify Owner Dashboard
     // Verify Audit Reports is visible
  await expect(
    login.auditReport()
).toBeVisible();
});