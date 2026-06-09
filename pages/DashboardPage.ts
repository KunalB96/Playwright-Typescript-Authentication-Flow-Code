import { Page, expect } from '@playwright/test';

export class DashboardPage {

    constructor(private page: Page) {}

    profileopener = () =>
       //   this.page.locator('[data-testid="profile-menu"]');
       this.page.locator('//div[@class=\'size-10 flex justify-center items-center bg-fill-weak\']//*[name()=\'svg\']');

    profileMenu = () =>
        this.page.locator('[data-testid="profile-switcher"]');

     logoutButton = () =>
         this.page.getByText('Logout');
 
    userManagementMenu = () =>
        this.page.getByText('User Management');



    async logout() {

       
        await this.profileopener().click();  

         await this.profileopener().waitFor({ state: 'visible' }); 

        await this.logoutButton().click();
    }
}