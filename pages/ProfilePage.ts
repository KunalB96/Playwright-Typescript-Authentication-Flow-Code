import { Page } from '@playwright/test';



export class ProfilePage {

    constructor(public page: Page) {}

    profileopener = () =>
       
       this.page.locator('//div[@class=\'size-10 flex justify-center items-center bg-fill-weak\']//*[name()=\'svg\']');


     profileMenu = () =>
        this.page.locator('//*[@id="__nuxt"]/div[2]/header/div/div/div[3]/div[2]/span[1]');

    profileSwitcher = () =>
        this.page.locator("//span[normalize-space()='Switch']");

    profileDropdown = () =>
        this.page.locator('xpath=/html/body/aside/div/div[2]/div/div[2]/div/div/div');


    currentProfile = () =>
        this.page.locator("//span[@class='truncate text-sm text-weak leading-tight']");

    okButton = () =>
        this.page.locator("//span[normalize-space()='OK']");

    dashboardData = () =>
        this.page.locator('//*[@id="__nuxt"]/div[2]/div[2]/div/div[1]/div[10]/div[2]/div[1]/div/div[2]/p[2]');


    recentActivityMessageQA2 = () =>
    this.page.getByText(
        'Data import completed for store code: qa2'
    );

       recentActivityMessageQA = () =>
    this.page.getByText(
        'Updated the configuration for types: pdp'
    );

    
    async openProfileMenu() {

        await this.profileMenu().click();
    }


    async openproDropdown() {

        await this.profileDropdown().click();
    }


    async selectQA2() {

    await this.profileDropdown().click();

    await this.page.waitForTimeout(1000);

    await this.page.waitForTimeout(1000);

    // Send keys to dropdown
    await this.page.keyboard.press('ArrowDown');

    await this.page.waitForTimeout(500);

    await this.page.keyboard.press('Enter');

    await this.page.waitForTimeout(1000);

    // Ensure dropdown has focus
    // await this.profileDropdown().focus();

    // await this.profileDropdown().press('ArrowDown');

    // await this.page.waitForTimeout(500);

    // await this.profileDropdown().press('Enter');

    // await this.page.waitForTimeout(1000);

}



    async selectQA() {

    await this.profileDropdown().click();

    await this.page.waitForTimeout(1000);

    await this.page.keyboard.press('Enter');

    await this.page.waitForTimeout(1000);
    }


     async selectQA2ToQA() {

        await this.profileDropdown().click();

        await this.page.waitForTimeout(1000);

        await this.profileDropdown().press('Enter');

        await this.page.waitForTimeout(1000);

        console.log(
    'Profile After Selection:',
    await this.getCurrentProfile()
);
    }

    async clickProfileSwitcher() {

         await this.page.waitForTimeout(1000);

        await this.profileSwitcher().click();
    }

    async clickOK() {

        await this.okButton().click();
    }

    async getCurrentProfile() {

        return (
            await this.currentProfile().textContent()
        )?.trim();
    }
    
}
