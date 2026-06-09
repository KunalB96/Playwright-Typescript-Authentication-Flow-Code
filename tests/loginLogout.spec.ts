import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { credentials } from '../fixtures/testData';

test('TC01 Valid Login', async ({ page }) => {

    const login = new LoginPage(page);

    await login.navigate();

    await login.login(
        credentials.admin.email,
        credentials.admin.password
    );

    await expect(page).toHaveURL("https://staging-hub.tiara.jewelry/");
});

test('TC02 Wrong Password', async ({ page }) => {

    const login = new LoginPage(page);

    await login.navigate();

    await login.login(
        credentials.admin.email,
        'wrong123'
    );

    await expect(
        page.getByText("Email or password is incorrect!")
    ).toBeVisible();
});

test('TC03 Invalid Email Format', async ({ page }) => {

    const login = new LoginPage(page);

    await login.navigate();

    await login.login(
        'abc',
        'teamwork'
    );

    await expect(page.locator('input[type="email"]'))
        .toHaveAttribute('type', 'email');
});

test('TC04 Empty Login', async ({ page }) => {

    const login = new LoginPage(page);

    await login.navigate();

    await login.loginButton().click();

    const isValid = await login.emailTextbox().evaluate(
        (el: HTMLInputElement) => el.checkValidity()
    );

    expect(isValid).toBe(false);

});

test('TC05 Logout', async ({ page }) => {

    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await login.navigate();

    await login.login(
        credentials.admin.email,
        credentials.admin.password
    );

 //   await page.pause();

    await dashboard.logout();

    await expect(page).toHaveURL(/auth/);
});

test('TC06 Direct URL After Logout', async ({ page }) => {

    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    // Login
    await login.navigate();

    await login.login(
        credentials.admin.email,
        credentials.admin.password
    );

    await expect(page).toHaveURL(/hub/);

    // Logout
    await dashboard.logout();

    // Try accessing Hub again
    await page.goto('https://staging-hub.tiara.jewelry/');

    // Verify redirected to login page
    await expect(page).toHaveURL(/auth/);
});

test('TC07 Refresh While Logged In', async ({ page }) => {

    const login = new LoginPage(page);

    await login.navigate();

    await login.login(
        credentials.admin.email,
        credentials.admin.password
    );

    // Verify login succeeded
    await expect(page).toHaveURL(/hub/);

    // Refresh page
    await page.reload();

    // Verify still logged in
    await expect(page).toHaveURL(/hub/);

    // Verify dashboard is visible
    await expect(
        page.locator('body')
    ).toBeVisible();
});