import { Page, expect } from '@playwright/test';

export class LoginPage {

    constructor(private page: Page) {}

    emailTextbox = () => this.page.locator('input[type="email"]');

    passwordTextbox = () => this.page.locator('input[type="password"]');

    loginButton = () => this.page.locator('button[type="submit"]');

    proceedButton = () => this.page.locator('button[type="submit"]');

    stockAuditRe = () =>
     this.page.locator('//h3[normalize-space()="Stock Audit Reports"]');

     auditReport = () => this.page.locator('//*[@id="__nuxt"]/div[2]/div[2]/div/div[1]/div/div[1]/div[1]/div[1]/div/h3');

    forgotPasswordLink = () =>
        this.page.getByText('Forgot Password');

    async navigate() {
        await this.page.goto('https://staging-auth.tiara.jewelry/');

    }

    async login(email: string, password: string) {
        
         await this.page.waitForTimeout(30);

        await this.emailTextbox().fill(email);

         await this.page.waitForTimeout(60);

        await this.passwordTextbox().fill(password);

      await this.page.waitForTimeout(100);

        await this.loginButton().click();

        await this.proceedButton().click().catch(() => {});
    }


}