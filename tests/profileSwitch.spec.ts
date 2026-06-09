import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';
import { credentials } from '../fixtures/testData';

test.beforeEach(async ({ page }) => {

    const login = new LoginPage(page);

    await login.navigate();

    await login.login(
        credentials.admin.email,
        credentials.admin.password
    );
});

test('TC20 Profile Switch Visible', async ({ page }) => {

   const login = new LoginPage(page);

    await login.navigate();

    await login.login(
        credentials.admin.email,
        credentials.admin.password
    );

    await expect(page).toHaveURL(/hub/);

    await page.locator(
        "//div[@class='size-10 flex justify-center items-center bg-fill-weak']//*[name()='svg']"
    ).click();

    await expect(
        page.locator("//span[normalize-space()='Switch']") 
    ).toBeVisible();
});




test('TC21 Current Profile QA', async ({ page }) => {

    const login = new LoginPage(page);
    const profile = new ProfilePage(page);

    await login.navigate();

    await login.login(
        credentials.admin.email,
        credentials.admin.password
    );

    await expect(page).toHaveURL(/hub/);

 await expect(
    profile.currentProfile()
).toContainText('QA');

console.log(
    'Current Profile:',
    await profile.getCurrentProfile()
);
});




test('TC22 Switch QA to QA2', async ({ page }) => {

    const login = new LoginPage(page);
    const profile = new ProfilePage(page);

    await login.navigate();

    await login.login(
        credentials.admin.email,
        credentials.admin.password
    );

    const beforeProfile =
        await profile.getCurrentProfile();

    console.log('Before:', beforeProfile);

    await profile.openProfileMenu();

    await profile.selectQA2();

    await profile.clickProfileSwitcher();

    await profile.clickOK();

    await page.waitForTimeout(5000);

    const afterProfile =
        await profile.getCurrentProfile();

    console.log('After:', afterProfile);

    expect(afterProfile).toBe('QA2');

     await expect(
        profile.recentActivityMessageQA2()
    ).toBeVisible();
});




test('TC23 Verify Profile Updated', async ({ page }) => {

    const profile = new ProfilePage(page);

     await profile.openProfileMenu();

    await profile.selectQA2();

     await profile.clickProfileSwitcher();

    await profile.clickOK();

    await page.waitForTimeout(5000);

    const afterProfile =
        await profile.getCurrentProfile();

    console.log('After:', afterProfile);

    expect(afterProfile).toBe('QA2')
});



test('TC24 Dashboard Data Changed', async ({ page }) => {

     const login = new LoginPage(page);
    const profile = new ProfilePage(page);

    await login.navigate();

    await login.login(
        credentials.admin.email,
        credentials.admin.password
    );

    const beforeProfile =
        await profile.getCurrentProfile();

    console.log('Before:', beforeProfile);

    await profile.openProfileMenu();

    await profile.selectQA2();

    await profile.clickProfileSwitcher();

    await profile.clickOK();

    await page.waitForTimeout(5000);

    const afterProfile =
        await profile.getCurrentProfile();

    console.log('After:', afterProfile);

    expect(afterProfile).toBe('QA2');

     await expect(
        profile.recentActivityMessageQA2()
    ).toBeVisible();
});





test('TC25 Switch QA2 Back To QA', async ({ page }) => {

    const login = new LoginPage(page);
    const profile = new ProfilePage(page);

    await login.navigate();

    await login.login(
        credentials.admin.email,
        credentials.admin.password
    );

    // Switch QA → QA2
    await profile.openProfileMenu();

    await profile.selectQA2();

    await page.waitForTimeout(1000);

    await profile.clickProfileSwitcher();

    await profile.clickOK();

    await page.waitForTimeout(5000);

     const current = await profile.getCurrentProfile();

      console.log('Current Profile:', current);

     expect(current).toBe('QA2');


        await expect(
        profile.recentActivityMessageQA2()
    ).toBeVisible();


    // Switch QA2 → QA
    await profile.openProfileMenu();

    await page.waitForTimeout(1000);

    await profile.selectQA2ToQA();

     await page.waitForTimeout(1000);

    await profile.clickProfileSwitcher();

    await profile.clickOK();

    await page.waitForTimeout(1000);


    // Verify profile restored
    expect(
        await profile.getCurrentProfile()
    ).toBe('QA');

   

    await expect(
        profile.recentActivityMessageQA()
    ).toBeVisible();
});




test('TC26 Refresh Keeps Profile', async ({ page }) => {

    const login = new LoginPage(page);
    const profile = new ProfilePage(page);

    await login.navigate();

    page.on('console', msg => {
    console.log(msg.text());
});

    await login.login(
        credentials.admin.email,
        credentials.admin.password
    );


await page.waitForTimeout(2000);

console.log(page.url());

    // Switch QA -> QA2
    await profile.openProfileMenu();

    await page.waitForTimeout(1000);

    await profile.selectQA2();

    await page.waitForTimeout(1000);

    await profile.clickProfileSwitcher();

    await profile.clickOK();

    await page.waitForTimeout(1000);

    // Verify QA2 before refresh
    const beforeRefresh =
        await profile.getCurrentProfile();

    console.log(
        'Before Refresh:',
        beforeRefresh
    );

    expect(beforeRefresh).toBe('QA2');

    // Refresh page
    await page.reload();

    await page.waitForLoadState('networkidle');

    await page.waitForTimeout(1000);

    // Verify QA2 still active
    const afterRefresh =
        await profile.getCurrentProfile();

    console.log(
        'After Refresh:',
        afterRefresh
    );

    expect(afterRefresh).toBe('QA2');

    // Optional dashboard verification
    await expect(
        profile.recentActivityMessageQA2()
    ).toBeVisible();
});