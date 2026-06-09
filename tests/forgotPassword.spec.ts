import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { credentials } from '../fixtures/testData';
import { waitForDebugger } from 'node:inspector';





test('TC08 Forgot Password Link', async ({ page }) => {

    const login = new LoginPage(page);

    await login.navigate();

    await login.forgotPasswordLink().click();

    await expect(
        page.locator('input[type="email"]')
    ).toBeVisible();

    await expect(page).toHaveURL("https://staging-auth.tiara.jewelry/");
});

test('TC09 Empty Email', async ({ page }) => {

  const login = new LoginPage(page);

    const forgot = new ForgotPasswordPage(page);

   await login.navigate();

    await login.forgotPasswordLink().click();


    await forgot.submitButton().click();

   const validationMessage =
  await forgot.emailTextbox().evaluate(
    (el: HTMLInputElement) => el.validationMessage
  );

   expect(validationMessage).toContain('fill out');
});


test('TC10 Valid Registered Email', async ({ page }) => {

    const login = new LoginPage(page);
    const forgot = new ForgotPasswordPage(page);

    await login.navigate();

    await login.forgotPasswordLink().click();

    await forgot.submitEmail(
        credentials.admin.email
    );

    // Verify actual success message here
       await expect(
     page.locator('//*[@id="__nuxt"]/div/div[1]/div[3]/div/div/div/div[1]/div/p[1]')
     ).toBeVisible();
});

test('TC11 Password Mismatch Validation', async ({ page }) => {

    const login = new LoginPage(page);
    const forgot = new ForgotPasswordPage(page);


    await login.navigate();

    await login.login(
        credentials.admin.email,
        credentials.admin.password
    );

    await expect(page).toHaveURL(/hub/);

    await forgot.openPasswordSection();

    await forgot.currentPassword().fill('teamwork');

    await forgot.page.waitForTimeout(500);

    await forgot.newPassword().fill('12345678');

  await page.mouse.wheel(0, 1000);

   await forgot.page.waitForTimeout(500);

    await forgot.confirmPassword().fill('123456');


  await forgot.page.waitForTimeout(500);

    await forgot.saveButton().click();

    await expect(
        forgot.passwordMismatchError()
    ).toBeVisible();
});





test('TC12 Weak Password Validation', async ({ page }) => {

    const login = new LoginPage(page);
    const forgot = new ForgotPasswordPage(page);

    await login.navigate();

    await login.login(
        credentials.admin.email,
        credentials.admin.password
    );

    await expect(page).toHaveURL(/hub/);

    await forgot.openPasswordSection();

    await forgot.currentPassword().fill('teamwork');

        await forgot.page.waitForTimeout(300);

    await forgot.newPassword().fill('1234');

    await forgot.confirmPassword().fill('1234');

        await forgot.page.waitForTimeout(200);

    await forgot.saveButton().click();

    await expect(
        forgot.weakPasswordError()
    ).toBeVisible();
});