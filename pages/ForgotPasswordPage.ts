import { Page } from '@playwright/test';

export class ForgotPasswordPage {

    constructor(public page: Page) {}

    emailTextbox = () =>
        this.page.locator('input[type="email"]');

    submitButton = () =>
        this.page.locator('button[type="submit"]');

     profileopener = () =>
       //   this.page.locator('[data-testid="profile-menu"]');
       this.page.locator('//div[@class=\'size-10 flex justify-center items-center bg-fill-weak\']//*[name()=\'svg\']');


    profileOption = () =>
        this.page.locator("//span[normalize-space()='Profile']");

    passwordTab = () =>
        this.page.locator('//a[normalize-space()="Password"]');

    currentPassword = () =>
        this.page.locator('//input[@id=\'input-153\']');

    newPassword = () =>
        this.page.locator('xpath=//input[@placeholder="Enter new password"]');

    confirmPassword = () =>
        this.page.locator('xpath=//input[@placeholder="Enter confirm new password"]');

    saveButton = () =>
        this.page.locator('//*[@id="app"]/div/main/div/div/div[3]/form/div[5]/button');

    passwordMismatchError = () =>
        this.page.locator('//*[@id="app"]/div/main/div/div/div[3]/form/div[4]/div/div/div/div[2]/div/div/div');

    weakPasswordError = () =>
        this.page.locator('//*[@id="app"]/div/main/div/div/div[3]/form/div[3]/div/div/div/div[2]/div/div/div');



    async submitEmail(email: string) {

        await this.emailTextbox().fill(email);

        await this.submitButton().click();
    }

      async openPasswordSection() {

        await this.profileopener().click();

      //  await this.profileIcon().click();

      await this.page.waitForTimeout(1000); // Wait for the Profile Option to appear

       await this.profileOption().waitFor({
        state: 'visible'
    });

        await this.profileOption().click();

            await this.passwordTab().waitFor({
        state: 'visible'
    });

        await this.passwordTab().click();
    }
}